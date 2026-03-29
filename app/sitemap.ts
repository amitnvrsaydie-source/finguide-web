import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: advisors } = await supabase
    .from('advisors')
    .select('id')

  const advisorUrls: MetadataRoute.Sitemap = (advisors || []).map(a => ({
    url: `https://zerobias.in/advisors/${a.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: 'https://zerobias.in', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://zerobias.in/advisors', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://zerobias.in/services', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://zerobias.in/finprofile', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://zerobias.in/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://zerobias.in/booking', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...advisorUrls,
  ]
}
