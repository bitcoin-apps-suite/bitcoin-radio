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
  Settings,
  Type,
  Music,
  Layers,
  Undo,
  Redo,
  Save,
  Bitcoin,
  Sparkles,
  Coins,
  Mic,
  Radio,
  Headphones,
  BarChart3
} from 'lucide-react'
import TokenizeModal, { TokenizationOptions } from './TokenizeModal'

interface BitcoinRadioStudioProps {
  initialAudioFile?: File | null
  onSave?: (audioBlob: Blob) => void
  onExport?: (audioBlob: Blob, format: string) => void
}

export default function BitcoinRadioStudio({ 
  initialAudioFile, 
  onSave, 
  onExport 
}: BitcoinRadioStudioProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedTool, setSelectedTool] = useState<string>('select')
  const [showTokenizeModal, setShowTokenizeModal] = useState(false)
  const [audioMetadata, setAudioMetadata] = useState({
    title: 'Untitled Radio Show',
    duration: 0,
    size: 0,
    url: ''
  })

  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const tools = [
    { id: 'select', icon: <BarChart3 className="w-4 h-4" />, name: 'Select' },
    { id: 'cut', icon: <Scissors className="w-4 h-4" />, name: 'Cut' },
    { id: 'record', icon: <Mic className="w-4 h-4" />, name: 'Record' },
    { id: 'text', icon: <Type className="w-4 h-4" />, name: 'Text' },
    { id: 'music', icon: <Music className="w-4 h-4" />, name: 'Music' },
    { id: 'effects', icon: <Sparkles className="w-4 h-4" />, name: 'Effects' }
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)

    if (initialAudioFile) {
      const url = URL.createObjectURL(initialAudioFile)
      setAudioMetadata({
        title: initialAudioFile.name.replace(/\.[^/.]+$/, ""),
        duration: 0,
        size: initialAudioFile.size,
        url: url
      })
    }
  }, [initialAudioFile])

  const handleTokenize = (options: TokenizationOptions) => {
    console.log('Tokenizing radio show with options:', options)
    // Here you would implement the actual tokenization logic
    setShowTokenizeModal(false)
  }

  const handleSave = () => {
    console.log('Saving radio show...')
    if (onSave && audioRef.current) {
      // Create a mock blob for demonstration
      const blob = new Blob(['mock audio data'], { type: 'audio/mp3' })
      onSave(blob)
    }
  }

  const handleExport = (format: string) => {
    console.log(`Exporting radio show as ${format}...`)
    if (onExport && audioRef.current) {
      // Create a mock blob for demonstration
      const blob = new Blob(['mock audio data'], { type: `audio/${format}` })
      onExport(blob, format)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Here you would implement actual recording logic
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-radio-brown-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading Radio Studio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-950 via-black to-gray-950">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-radio-brown-500" />
            Bitcoin Radio Studio
          </h2>
          <div className="text-sm text-gray-400">
            {audioMetadata.title}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTokenizeModal(true)}
            className="px-3 py-1.5 bg-gradient-to-r from-radio-brown-500 to-yellow-500 rounded-lg font-medium hover:from-radio-brown-600 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2 text-sm"
          >
            <Bitcoin className="w-4 h-4" />
            Tokenize
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <div className="relative group">
            <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="absolute right-0 top-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                onClick={() => handleExport('mp3')}
                className="block w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors text-sm"
              >
                Export as MP3
              </button>
              <button
                onClick={() => handleExport('wav')}
                className="block w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors text-sm"
              >
                Export as WAV
              </button>
              <button
                onClick={() => handleExport('m4a')}
                className="block w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors text-sm"
              >
                Export as M4A
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-16 bg-black/30 border-r border-gray-800 flex flex-col items-center py-4 gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                selectedTool === tool.id
                  ? 'bg-radio-brown-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              title={tool.name}
            >
              {tool.icon}
            </button>
          ))}
        </div>

        {/* Center - Audio Waveform */}
        <div className="flex-1 flex flex-col">
          {/* Audio Controls */}
          <div className="p-4 border-b border-gray-800 bg-black/30">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleRecording}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Mic className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 bg-radio-brown-500 hover:bg-radio-brown-600 rounded-full flex items-center justify-center transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <div className="flex-1 bg-gray-800 rounded-lg h-2 relative">
                <div 
                  className="bg-radio-brown-500 h-full rounded-lg transition-all duration-300"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              <div className="text-sm text-gray-400 font-mono">
                {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / 
                {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Waveform Display */}
          <div className="flex-1 p-4">
            <div className="h-full bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-32 rounded-lg"
                style={{ background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(59, 130, 246, 0.1))' }}
              />
              <div className="absolute">
                <div className="flex items-center gap-4 text-center">
                  <Headphones className="w-16 h-16 text-gray-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-400 mb-2">Audio Waveform</h3>
                    <p className="text-gray-500">
                      {audioMetadata.url ? 'Visualizing audio...' : 'Import or record audio to get started'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-black/30 border-l border-gray-800 p-4">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Properties
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Show Title</label>
              <input
                type="text"
                value={audioMetadata.title}
                onChange={(e) => setAudioMetadata(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-radio-brown-500 focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Volume</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="80"
                className="w-full accent-radio-brown-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Effects</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-radio-brown-500" />
                  <span className="text-sm text-gray-300">Noise Reduction</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-radio-brown-500" />
                  <span className="text-sm text-gray-300">Compressor</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-radio-brown-500" />
                  <span className="text-sm text-gray-300">EQ</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element */}
      {audioMetadata.url && (
        <audio
          ref={audioRef}
          src={audioMetadata.url}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration)
            }
          }}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime)
            }
          }}
        />
      )}

      {/* Tokenize Modal */}
      <TokenizeModal
        isOpen={showTokenizeModal}
        onClose={() => setShowTokenizeModal(false)}
        onTokenize={handleTokenize}
        contentType="audio"
        title={audioMetadata.title}
        duration={audioMetadata.duration}
        size={audioMetadata.size}
        url={audioMetadata.url}
      />
    </div>
  )
}