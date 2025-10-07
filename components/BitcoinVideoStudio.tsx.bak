'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Scissors,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Type,
  Image as ImageIcon,
  Music,
  Layers,
  Undo,
  Redo,
  Save,
  Bitcoin,
  Sparkles,
  Coins
} from 'lucide-react'
import TokenizeModal, { TokenizationOptions } from './TokenizeModal'

interface BitcoinVideoStudioProps {
  initialVideoFile?: File | null
  onSave?: (videoBlob: Blob) => void
  onExport?: (videoBlob: Blob, format: string) => void
}

export default function BitcoinVideoStudio({ 
  initialVideoFile, 
  onSave, 
  onExport 
}: BitcoinVideoStudioProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedTool, setSelectedTool] = useState<string>('select')
  const [showTokenizeModal, setShowTokenizeModal] = useState(false)
  const [videoMetadata, setVideoMetadata] = useState({
    title: 'Untitled Video',
    duration: 0,
    size: 0,
    url: ''
  })
  const videoRef = useRef<HTMLVideoElement>(null)
  const studioRef = useRef<HTMLDivElement>(null)

  const tools = [
    { id: 'select', name: 'Select', icon: <Layers className="w-4 h-4" /> },
    { id: 'trim', name: 'Trim', icon: <Scissors className="w-4 h-4" /> },
    { id: 'text', name: 'Text', icon: <Type className="w-4 h-4" /> },
    { id: 'image', name: 'Image', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'audio', name: 'Audio', icon: <Music className="w-4 h-4" /> },
  ]

  const exportFormats = [
    { id: 'mp4', name: 'MP4 (YouTube)', quality: '1080p' },
    { id: 'webm', name: 'WebM (Web)', quality: '720p' },
    { id: 'mov', name: 'MOV (High Quality)', quality: '4K' },
  ]

  useEffect(() => {
    // Initialize video studio without omniclip for now
    // We'll implement our own editor using canvas and web APIs
    const initializeStudio = async () => {
      try {
        // Simulate initialization delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to initialize Bitcoin Video Studio:', error)
        setIsLoading(false)
      }
    }

    initializeStudio()
  }, [])

  useEffect(() => {
    if (initialVideoFile && videoRef.current) {
      const url = URL.createObjectURL(initialVideoFile)
      videoRef.current.src = url
      
      // Update video metadata
      videoRef.current.onloadedmetadata = () => {
        setVideoMetadata({
          title: initialVideoFile.name.replace(/\.[^/.]+$/, ''), // Remove file extension
          duration: videoRef.current?.duration || 0,
          size: initialVideoFile.size,
          url: url
        })
        setDuration(videoRef.current?.duration || 0)
      }
      
      return () => URL.revokeObjectURL(url)
    }
  }, [initialVideoFile])

  // Handle tokenization
  const handleTokenize = (protocol: string, options: TokenizationOptions) => {
    console.log('Tokenizing video with protocol:', protocol, options)
    // Here we would integrate with the blockchain tokenization service
    // For now, we'll just show a success message
    alert(`Video "${videoMetadata.title}" will be tokenized using ${protocol} protocol!`)
    setShowTokenizeModal(false)
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSave = () => {
    // Placeholder for save functionality
    console.log('Saving project...')
    if (onSave) {
      // This would be replaced with actual video export logic
      onSave(new Blob())
    }
  }

  const handleExport = (format: string) => {
    // Placeholder for export functionality
    console.log(`Exporting as ${format}...`)
    if (onExport) {
      // This would be replaced with actual video export logic
      onExport(new Blob(), format)
    }
  }

  if (isLoading) {
    return (
      <div className="h-full bg-gradient-to-b from-gray-950 via-black to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-white mb-2">Initializing Bitcoin Video Studio</h3>
          <p className="text-gray-400">Loading professional editing tools...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white flex flex-col">
      {/* Top Toolbar */}
      <div className="border-b border-white/10 bg-black/80 backdrop-blur-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                <Bitcoin className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">Bitcoin Video Studio</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Undo className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Redo className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {exportFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => handleExport(format.id)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center gap-2 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  {format.name}
                </button>
              ))}
              
              {/* Tokenize Button */}
              <button
                onClick={() => setShowTokenizeModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-lg flex items-center gap-2 transition-all text-sm font-semibold"
                title="Create NFT and shares for this video"
              >
                <Coins className="w-4 h-4" />
                Tokenize Video
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-16 border-r border-white/10 bg-black/50 backdrop-blur-sm p-2">
          <div className="space-y-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  selectedTool === tool.id
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                }`}
                title={tool.name}
              >
                {tool.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Center - Video Preview */}
        <div className="flex-1 flex flex-col">
          {/* Video Container */}
          <div className="flex-1 bg-black/30 p-8 flex items-center justify-center">
            <div className="relative max-w-4xl w-full">
              <video
                ref={videoRef}
                className="w-full h-auto rounded-xl shadow-2xl"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Video Overlay Controls */}
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                <button
                  onClick={handlePlayPause}
                  className="p-4 bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Controls */}
          <div className="border-t border-white/10 bg-black/50 backdrop-blur-sm p-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={handlePlayPause}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              <span className="text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
                  }}
                />
              </div>

              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>

            {/* Timeline Track */}
            <div className="h-24 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-white/10 p-2">
              <div className="h-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded border border-orange-500/30 flex items-center justify-center">
                <span className="text-xs text-orange-400 font-medium">Video Track</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 border-l border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="p-4">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Properties
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Resolution</label>
                <select className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500">
                  <option>1920x1080 (HD)</option>
                  <option>3840x2160 (4K)</option>
                  <option>1280x720 (720p)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Frame Rate</label>
                <select className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500">
                  <option>30 fps</option>
                  <option>60 fps</option>
                  <option>24 fps</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quality</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  defaultValue="85"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Future: Advanced editing features will be added here */}
      <div ref={studioRef} className="hidden">
        {/* Video editing canvas and advanced tools will be implemented here */}
      </div>

      {/* Tokenize Modal */}
      <TokenizeModal
        isOpen={showTokenizeModal}
        onClose={() => setShowTokenizeModal(false)}
        onTokenize={handleTokenize}
        videoTitle={videoMetadata.title}
        videoDuration={videoMetadata.duration}
        videoSize={videoMetadata.size}
        videoUrl={videoMetadata.url}
      />
    </div>
  )
}