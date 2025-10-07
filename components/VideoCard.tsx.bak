import { motion } from 'framer-motion'
import { Play, Eye, Clock, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface VideoCardProps {
  video: {
    id: string
    title: string
    thumbnail: string
    channel: string
    views: string
    timestamp: string
    duration: string
    verified: boolean
    live?: boolean
    automated?: boolean
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden mb-3 shadow-lg">
        {/* Thumbnail */}
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10" />
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/90 backdrop-blur-sm rounded-md text-xs font-medium">
          {video.duration}
        </div>
        
        {/* Live indicator */}
        {video.live && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 rounded-md text-xs font-bold flex items-center gap-1 shadow-lg">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        )}
        
        {/* AI Generated badge */}
        {video.automated && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md text-xs font-bold flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3" />
            AI
          </div>
        )}
        
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 shadow-xl">
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </div>
        </div>
      </div>
      
      <div className="px-1">
        <h3 className="font-semibold text-white line-clamp-2 mb-2 group-hover:text-orange-400 transition-colors duration-200 leading-tight">
          {video.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
          <span className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            {video.channel}
            {video.verified && (
              <span className="w-3.5 h-3.5 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {video.views} views
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.timestamp}
          </span>
        </div>
      </div>
    </motion.div>
  )
}