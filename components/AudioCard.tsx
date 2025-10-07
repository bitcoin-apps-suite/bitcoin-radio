import { motion } from 'framer-motion'
import { Play, Headphones, Clock, Sparkles, Volume2, Radio } from 'lucide-react'
import Image from 'next/image'

interface AudioCardProps {
  audioShow: {
    id: string
    title: string
    thumbnail: string
    channel: string
    listeners: string
    timestamp: string
    duration: string
    verified: boolean
    live?: boolean
    automated?: boolean
  }
}

export default function AudioCard({ audioShow }: AudioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group cursor-pointer"
    >
      {/* SoundCloud-style horizontal bar */}
      <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-radio-brown-500/30 transition-all duration-300 shadow-lg hover:shadow-radio-brown-500/10">
        <div className="flex items-center gap-4">
          {/* Album Art / Avatar */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-radio-brown-500 to-radio-brown-600 rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
            <Image
              src={audioShow.thumbnail}
              alt={audioShow.title}
              fill
              className="object-cover opacity-80"
              sizes="64px"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-300">
              <div className="w-8 h-8 bg-radio-brown-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 shadow-xl">
                <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
              </div>
            </div>
            
            {/* Status badges on artwork */}
            {audioShow.live && (
              <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-600 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                LIVE
              </div>
            )}
            
            {audioShow.automated && !audioShow.live && (
              <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Sparkles className="w-2.5 h-2.5" />
                AI
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title and metadata */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white line-clamp-1 group-hover:text-radio-brown-400 transition-colors duration-200 text-sm md:text-base">
                  {audioShow.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <span className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                    {audioShow.channel}
                    {audioShow.verified && (
                      <span className="w-3 h-3 bg-radio-brown-500 rounded-full flex items-center justify-center">
                        <svg className="w-1.5 h-1.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </div>
              
              {/* Duration */}
              <div className="text-xs text-gray-400 font-medium">
                {audioShow.duration}
              </div>
            </div>
            
            {/* Waveform visualization */}
            <div className="mb-3 relative">
              <div className="flex items-end gap-0.5 h-8 bg-gray-800/50 rounded-full px-3 py-2">
                {[...Array(40)].map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-gradient-to-t from-radio-brown-500 to-radio-brown-400 rounded-full transition-all duration-300 group-hover:from-radio-brown-400 group-hover:to-radio-brown-300"
                    style={{
                      width: '2px',
                      height: `${Math.random() * 70 + 10}%`,
                      opacity: Math.random() * 0.7 + 0.3
                    }}
                  />
                ))}
              </div>
              {/* Progress indicator (mock) */}
              <div className="absolute top-2 left-3 w-1/3 h-4 bg-gradient-to-r from-radio-brown-400/30 to-transparent rounded-full"></div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Headphones className="w-3 h-3" />
                {audioShow.listeners}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {audioShow.timestamp}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}