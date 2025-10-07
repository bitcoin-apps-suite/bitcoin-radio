export default function AudioSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden mb-3">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent animate-[shimmer_2s_infinite]" />
        {/* Audio waveform skeleton */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="flex items-end gap-1 h-12">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-600 rounded-full animate-pulse"
                style={{
                  width: '3px',
                  height: `${Math.random() * 100 + 20}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="px-1 space-y-2">
        <div className="h-5 bg-gray-800 rounded-lg w-full" />
        <div className="h-4 bg-gray-800 rounded-lg w-3/4" />
        <div className="flex gap-3">
          <div className="h-3 bg-gray-800 rounded w-24" />
          <div className="h-3 bg-gray-800 rounded w-20" />
        </div>
      </div>
    </div>
  )
}