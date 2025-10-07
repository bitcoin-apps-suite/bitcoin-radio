'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Upload,
  Sparkles,
  Video,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Mic,
  Globe,
  Youtube,
  Twitter,
  Bitcoin,
  Zap,
  Play,
  Settings,
  ChevronRight,
  BarChart3,
  Brain,
  Clock,
  DollarSign,
  Hash,
  Link2,
  RefreshCw,
  Scissors
} from 'lucide-react'
import Link from 'next/link'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import TopMenuBar from '@/components/TopMenuBar'
import DevSidebar from '@/components/DevSidebar'
import Dock from '@/components/Dock'
import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import BitcoinRadioStudio from '@/components/BitcoinRadioStudio'

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState('auto-generate')
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [generatedVideos, setGeneratedVideos] = useState<{
    id: string;
    title: string;
    duration: string;
    quality: string;
    platforms: string[];
  }[]>([])

  const automationWorkflows = [
    {
      id: 'contradiction-finder',
      title: 'Contradiction Finder',
      description: 'People who say one thing but do another',
      icon: <FileText className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      estimatedTime: '1 min',
      apiCost: '$0.02'
    },
    {
      id: 'political-comedy',
      title: 'Government Tech Comedy',
      description: 'Politicians who debate tech they don\'t understand',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-red-500 to-radio-brown-500',
      estimatedTime: '2 mins',
      apiCost: '$0.04'
    },
    {
      id: 'tech-irony-tracker',
      title: 'Tech Irony Tracker',
      description: 'Hilarious contradictions in tech discourse',
      icon: <Twitter className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      estimatedTime: '30 secs',
      apiCost: '$0.01'
    },
    {
      id: 'seamless-upload-detector',
      title: 'Seamless Upload Detector',
      description: 'People who complain about speed but upload instantly',
      icon: <Brain className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      estimatedTime: '45 secs',
      apiCost: '$0.02'
    },
    {
      id: 'format-war-generator',
      title: 'Format War Generator',
      description: 'Classic tech debates with modern twists',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-yellow-500 to-radio-brown-500',
      estimatedTime: '1 min',
      apiCost: '$0.03'
    },
    {
      id: 'crypto-battle-royale',
      title: 'Crypto Battle Royale',
      description: 'Epic blockchain debates and rap battles',
      icon: <Mic className="w-5 h-5" />,
      color: 'from-indigo-500 to-purple-500',
      estimatedTime: '3 mins',
      apiCost: '$0.08'
    }
  ]

  const handleGenerateVideo = () => {
    setGenerating(true)
    setTimeout(() => {
      setGeneratedVideos([
        {
          id: '1',
          title: 'Crypto influencer uploads hate video seamlessly while complaining about fees',
          duration: '0:34',
          quality: 'HD',
          platforms: ['spotify', 'apple-podcasts', 'twitter']
        },
        {
          id: '2',
          title: 'Government tech committee livestream goes surprisingly smooth',
          duration: '1:12',
          quality: '4K',
          platforms: ['spotify', 'twitter', 'facebook']
        },
        {
          id: '3',
          title: 'Tech debate gets heated while everyone argues over text messages',
          duration: '0:47',
          quality: 'HD',
          platforms: ['apple-podcasts', 'spotify', 'instagram']
        }
      ])
      setGenerating(false)
    }, 3000)
  }

  return (
    <DevSidebarProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white antialiased pb-24">
      <ProofOfConceptBar />
      <TopMenuBar />
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl mt-8">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-radio-brown-400 to-radio-brown-600 bg-clip-text text-transparent">Create Bitcoin Content</h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-radio-brown-500/10 to-yellow-500/10 rounded-xl border border-radio-brown-500/20 shadow-lg">
              <DollarSign className="w-4 h-4 text-radio-brown-500" />
              <span className="text-sm">Credits: 1,245</span>
            </div>
          </div>
        </div>
      </header>

      <ResponsiveLayout>
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-10 border-b border-white/5">
          <button
            onClick={() => setActiveTab('auto-generate')}
            className={`px-6 py-4 font-semibold transition-all duration-300 relative ${
              activeTab === 'auto-generate' 
                ? 'text-radio-brown-400' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Automation
            </span>
            {activeTab === 'auto-generate' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-radio-brown-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('browser-editor')}
            className={`px-6 py-4 font-semibold transition-all duration-300 relative ${
              activeTab === 'browser-editor' 
                ? 'text-radio-brown-400' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              Browser Editor
            </span>
            {activeTab === 'browser-editor' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-radio-brown-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('manual-upload')}
            className={`px-6 py-3 font-medium transition-all relative ${
              activeTab === 'manual-upload' 
                ? 'text-radio-brown-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Manual Upload
            </span>
            {activeTab === 'manual-upload' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-radio-brown-500" />
            )}
          </button>
        </div>

        {activeTab === 'auto-generate' ? (
          <>
            {/* Automation Workflows */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Choose Automation Workflow</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {automationWorkflows.map((workflow) => (
                  <motion.button
                    key={workflow.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedWorkflow(workflow.id)}
                    className={`relative p-6 rounded-2xl border text-left transition-all duration-300 ${
                      selectedWorkflow === workflow.id
                        ? 'border-radio-brown-500/50 bg-gradient-to-br from-radio-brown-500/15 to-radio-brown-600/10 shadow-xl shadow-radio-brown-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className={`absolute top-6 right-6 p-2 rounded-lg bg-gradient-to-br ${workflow.color}`}>
                      {workflow.icon}
                    </div>
                    <h3 className="font-bold mb-2">{workflow.title}</h3>
                    <p className="text-sm text-gray-400 mb-4 pr-12">{workflow.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {workflow.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {workflow.apiCost}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Configuration Panel */}
            {selectedWorkflow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl"
              >
                <h3 className="text-lg font-bold mb-4">Configure Automation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Source</label>
                    <select className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-radio-brown-500">
                      <option>Latest Bitcoin News</option>
                      <option>Top Reddit Posts</option>
                      <option>Twitter Trending</option>
                      <option>Custom RSS Feed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Audio Style</label>
                    <select className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-radio-brown-500">
                      <option>Educational</option>
                      <option>News Report</option>
                      <option>Technical Analysis</option>
                      <option>Hype/Promotional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <select className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-radio-brown-500">
                      <option>Short (30s - 1min)</option>
                      <option>Medium (2-5 mins)</option>
                      <option>Long (5-10 mins)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Platforms</label>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-radio-brown-500/20 border border-radio-brown-500 rounded-lg">Spotify</button>
                      <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20">Apple Podcasts</button>
                      <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20">Twitter</button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGenerateVideo}
                    disabled={generating}
                    className="px-8 py-3 bg-gradient-to-r from-radio-brown-500 to-yellow-500 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50"
                  >
                    {generating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Generate Audio
                      </>
                    )}
                  </motion.button>
                  <span className="text-sm text-gray-400">
                    Will generate 3-5 audio variations
                  </span>
                </div>
              </motion.div>
            )}

            {/* Generated Videos */}
            {generatedVideos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold mb-4">Generated Audio</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {generatedVideos.map((video) => (
                    <div key={video.id} className="bg-white/5 rounded-xl border border-white/10 p-4">
                      <div className="aspect-video bg-gradient-to-br from-radio-brown-500/20 to-yellow-500/20 rounded-lg mb-3 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white/50" />
                      </div>
                      <h4 className="font-medium mb-2">{video.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.quality}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-radio-brown-500 rounded-lg text-sm font-medium hover:bg-radio-brown-600">
                          Deploy
                        </button>
                        <button className="px-3 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20">
                          Preview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : activeTab === 'browser-editor' ? (
          /* Browser Editor Section */
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-400 mb-1">Professional Radio Studio Available</h3>
                <p className="text-sm text-gray-400">For advanced editing features, try our full-screen studio experience</p>
              </div>
              <Link 
                href="/studio"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Mic className="w-4 h-4" />
                Open Studio
              </Link>
            </div>
            
            <div className="h-[70vh]">
              <BitcoinRadioStudio 
                initialAudioFile={uploadedFile}
                onSave={(blob) => {
                  console.log('Audio saved:', blob)
                }}
                onExport={(blob, format) => {
                  console.log(`Audio exported as ${format}:`, blob)
                }}
              />
            </div>
          </div>
        ) : (
          /* Manual Upload Section */
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 rounded-xl border-2 border-dashed border-white/20 p-12 text-center">
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2">Upload Your Audio</h3>
              <p className="text-gray-400 mb-6">
                Drag and drop your Bitcoin radio content here, or click to browse
              </p>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                id="audio-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setUploadedFile(file)
                    setActiveTab('browser-editor')
                  }
                }}
              />
              <label
                htmlFor="audio-upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-radio-brown-500 rounded-lg font-medium cursor-pointer hover:bg-radio-brown-600 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Select Audio
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: MP3, WAV, M4A, FLAC (max 1GB)
              </p>
            </div>
          </div>
        )}
        </div>
      </ResponsiveLayout>
      
      <DevSidebar />
      <Dock />
    </div>
    </DevSidebarProvider>
  )
}