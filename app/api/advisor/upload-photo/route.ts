import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function isAuthorized(req: NextRequest): string | null {
  // Allow admin
  const adminCookie = req.cookies.get('admin_session')?.value
  if (adminCookie && adminCookie === process.env.ADMIN_PASSWORD) return 'admin'
  // Allow advisor (self-upload)
  const advisorEmail = req.cookies.get('advisor_session')?.value
  if (advisorEmail) return advisorEmail
  return null
}

export async function POST(req: NextRequest) {
  const auth = isAuthorized(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('photo') as File | null
    const advisorId = formData.get('advisor_id') as string | null

    if (!file || !advisorId) {
      return NextResponse.json({ error: 'Photo and advisor_id required' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG, or WebP images allowed' }, { status: 400 })
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 2MB' }, { status: 400 })
    }

    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'
    const fileName = `${advisorId}.${ext}`
    const buffer = await file.arrayBuffer()

    // Upload to Supabase Storage
    const { error: uploadErr } = await supabase.storage
      .from('advisor-photos')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadErr) {
      console.error('Storage upload error:', uploadErr)
      return NextResponse.json({ error: `Upload failed: ${uploadErr.message}` }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('advisor-photos')
      .getPublicUrl(fileName)

    const photoUrl = urlData.publicUrl

    // Update advisor record
    const { error: updateErr } = await supabase
      .from('advisors')
      .update({ photo_url: photoUrl })
      .eq('id', advisorId)

    if (updateErr) {
      return NextResponse.json({ error: `DB update failed: ${updateErr.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true, photo_url: photoUrl })
  } catch (err) {
    console.error('Photo upload error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
