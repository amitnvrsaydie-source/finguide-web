export function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="skeleton h-5 w-36 rounded-lg" />
          <div className="skeleton h-3.5 w-24 rounded-lg" />
        </div>
        <div className="skeleton h-6 w-10 rounded-full" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
        <div className="skeleton h-3 w-3/5 rounded" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-24 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <div className="skeleton h-3 w-28 rounded" />
        <div className="skeleton h-8 w-24 rounded-full" />
      </div>
    </div>
  )
}

export function SkeletonProfile() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="skeleton h-4 w-32 rounded mb-8" />
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <div className="skeleton h-8 w-48 rounded-lg" />
            <div className="skeleton h-4 w-36 rounded-lg" />
          </div>
          <div className="skeleton h-6 w-10 rounded-full" />
        </div>
        <div className="space-y-2 mt-4">
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-5/6 rounded" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="skeleton h-6 w-24 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
        </div>
      </div>
      <div className="skeleton h-24 w-full rounded-2xl mb-6" />
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 animate-pulse space-y-4">
        <div className="skeleton h-5 w-40 rounded" />
        <div className="skeleton h-10 w-full rounded-lg" />
        <div className="skeleton h-10 w-full rounded-lg" />
        <div className="skeleton h-10 w-full rounded-lg" />
        <div className="skeleton h-10 w-full rounded-lg" />
        <div className="skeleton h-12 w-full rounded-lg" />
      </div>
    </div>
  )
}

export function SkeletonText({ className = '' }: { className?: string }) {
  return <div className={`skeleton rounded ${className}`} />
}
