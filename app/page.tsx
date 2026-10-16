'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  Upload, 
  User,
  Bitcoin,
  TrendingUp,
  Play,
  Sparkles,
  BarChart3,
  Home,
  Compass,
  BookOpen,
  Video,
  ToggleRight,
  Settings,
  Monitor,
  Plus,
  FileVideo,
  Clock,
  Folder,
  Radio,
  Mic,
  Headphones,
  Volume2,
  MicIcon,
  Music
} from 'lucide-react'
import Link from 'next/link'
import AudioCard from '@/components/AudioCard'
import AudioSkeleton from '@/components/AudioSkeleton'
import MobileNav from '@/components/MobileNav'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import TopMenuBar from '@/components/TopMenuBar'
import DevSidebar from '@/components/DevSidebar'
import Dock from '@/components/Dock'
import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import BitcoinRadioStudio from '@/components/BitcoinRadioStudio'
import RadioProjectSidebar from '@/components/RadioProjectSidebar'
import Footer from '@/components/Footer'
import OSTaskbar from '@/components/OSTaskbar'
import SaveOnChain from '@/components/SaveOnChain'

interface AudioShow {
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
  category: string
}

interface RadioProject {
  id: string
  name: string
  thumbnail: string
  duration: string
  lastModified: string
  status: 'draft' | 'published' | 'processing'
  created_at: string
  updated_at: string
}

export default function BitcoinRadio() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'split' | 'studio' | 'watch'>('split')
  const [studioView, setStudioView] = useState<'projects' | 'editor'>('projects')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedProject, setSelectedProject] = useState<RadioProject | null>(null)
  const [projectSidebarRefresh, setProjectSidebarRefresh] = useState(0)

  const categories = [
    { id: 'all', name: 'All', icon: <Home className="w-4 h-4" /> },
    { id: 'education', name: 'Education', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'news', name: 'News', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'analysis', name: 'Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'podcasts', name: 'Podcasts', icon: <Mic className="w-4 h-4" /> },
    { id: 'live', name: 'Live Radio', icon: <Radio className="w-4 h-4" /> },
    { id: 'music', name: 'Music', icon: <Music className="w-4 h-4" /> },
    { id: 'automated', name: 'AI Generated', icon: <Sparkles className="w-4 h-4" /> },
  ]

  // Shows come from creators saving them on-chain; no made-up listings.
  const audioShows: AudioShow[] = []

  const filteredShows = selectedCategory === 'all' 
    ? audioShows 
    : audioShows.filter(v => v.category === selectedCategory)



  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setStudioView('editor')
      setViewMode('studio') // Switch to full studio mode
    }
  }

  const createNewProject = () => {
    setSelectedProject(null)
    setUploadedFile(null)
    setStudioView('editor')
    setViewMode('studio') // Switch to full studio mode
  }

  const handleProjectSelect = (project: RadioProject) => {
    setSelectedProject(project)
    setStudioView('editor')
    setViewMode('studio') // Switch to full studio mode
  }

  const handleAudioClick = (audioShow: AudioShow) => {
    // Switch to full listen mode when clicking on an audio show
    setViewMode('watch')
    // Here you could also navigate to an audio player page
    console.log('Playing audio show:', audioShow.title)
  }

  const handleNewProject = () => {
    createNewProject()
  }

  const openProject = (project: RadioProject) => {
    setStudioView('editor')
  }

  return (
    <DevSidebarProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white antialiased pb-24 main-app-container">
        <ProofOfConceptBar />
        <TopMenuBar 
          onNewProject={createNewProject}
          onSaveProject={() => console.log('Save project')}
        />
        <OSTaskbar currentPage="home" />
        
        <ResponsiveLayout>
          {/* Header */}
          <header className="sticky top-0 z-50 glass border-b border-white/10 shadow-2xl mt-8">
        <div className="px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Mobile Nav */}
            <MobileNav />
            
            {/* Logo and Search */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="p-1 sm:p-1.5 bg-gradient-to-br from-radio-brown-500 to-radio-brown-600 rounded-xl shadow-lg group-hover:shadow-radio-brown-500/25 transition-all duration-300 group-hover:scale-110 animate-glow">
                  <Radio className="w-6 sm:w-8 h-6 sm:h-8 text-white group-hover:rotate-3 transition-transform" />
                </div>
                <span className="text-lg sm:text-xl font-bold hidden sm:block text-gradient">Bitcoin Radio</span>
              </Link>
              
              {/* Mode Navigation */}
              <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
                <button
                  onClick={() => setViewMode('studio')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    viewMode === 'studio' 
                      ? 'bg-radio-brown-500/20 border border-radio-brown-500/30 text-radio-brown-400' 
                      : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Radio className="w-4 h-4" />
                  <span className="hidden sm:block">Studio</span>
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    viewMode === 'split' 
                      ? 'bg-gradient-to-r from-radio-brown-500/20 to-blue-500/20 border border-white/20 text-white' 
                      : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:block">Both</span>
                </button>
                <button
                  onClick={() => setViewMode('watch')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    viewMode === 'watch' 
                      ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400' 
                      : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Headphones className="w-4 h-4" />
                  <span className="hidden sm:block">Listen</span>
                </button>
              </div>
              
              <div className="flex-1 max-w-2xl hidden sm:block">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Bitcoin radio shows, podcasts..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 glass rounded-full focus:outline-none focus:border-radio-brown-500 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 focus:shadow-lg focus:shadow-radio-brown-500/20 text-sm sm:text-base"
                  />
                  <Search className="absolute left-3 top-2 sm:top-2.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <Link
                  href="/create"
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-radio-brown-500 to-radio-brown-600 rounded-lg sm:rounded-xl font-medium sm:font-semibold hover:from-radio-brown-600 hover:to-radio-brown-700 transition-all duration-300 shadow-lg hover:shadow-radio-brown-500/25 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <Mic className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="hidden sm:block">Record</span>
                </Link>
                
                <Link
                  href="/studio"
                  className="px-2 sm:px-3 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 flex items-center gap-1 text-sm sm:text-base"
                  title="Radio Studio"
                >
                  <Radio className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="hidden lg:block">Studio</span>
                </Link>
              </div>
              
              <button className="p-2 sm:p-2.5 glass-hover rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-lg hidden sm:block">
                <Bell className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
              
              <button className="p-2 sm:p-2.5 glass-hover rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-lg">
                <User className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-3 sm:px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 font-medium ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-radio-brown-500 to-radio-brown-600 text-white shadow-lg shadow-radio-brown-500/25'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category.icon}
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

          {/* Main Content - Dynamic View Modes */}
          <main className="p-6 lg:p-8">
            {viewMode === 'split' ? (
              /* Split View - Both Modes Side by Side */
              <div className="flex gap-6 h-[calc(100vh-200px)]">
                {/* Left Side - Studio Mode */}
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-radio-brown-400 mb-2">📻 Studio Mode</h2>
                    <p className="text-gray-400 text-sm">Professional radio show and podcast creation tools</p>
                  </div>
                  <div className="flex h-full bg-gradient-to-b from-gray-950 via-black to-gray-950 rounded-xl overflow-hidden border border-radio-brown-500/30">
                    {/* Radio Projects Sidebar */}
                    <div className="w-[280px] flex-shrink-0">
                      <RadioProjectSidebar
                        onProjectSelect={handleProjectSelect}
                        onNewProject={handleNewProject}
                        currentProjectId={selectedProject?.id}
                        refreshTrigger={projectSidebarRefresh}
                        uploadedFile={uploadedFile}
                      />
                    </div>
                    
                    {/* Main Studio Content */}
                    <div className="flex-1 overflow-hidden">
                      {studioView === 'editor' ? (
                        /* Studio Editor View */
                        <div className="h-full">
                          <BitcoinRadioStudio 
                            initialAudioFile={uploadedFile}
                            onSave={(blob) => {
                              console.log('Video saved:', blob)
                              setProjectSidebarRefresh(prev => prev + 1)
                            }}
                            onExport={(blob, format) => {
                              console.log(`Video exported as ${format}:`, blob)
                            }}
                          />
                        </div>
                      ) : (
                        /* Studio Welcome/Dashboard View */
                        <div className="p-8 h-full flex items-center justify-center">
                          <div className="text-center max-w-xl">
                            <div className="p-6 bg-gradient-to-br from-radio-brown-500/20 via-radio-brown-600/10 to-yellow-500/20 rounded-3xl border border-radio-brown-500/20 backdrop-blur-sm shadow-2xl">
                              <FileVideo className="w-12 h-12 mx-auto mb-4 text-radio-brown-400" />
                              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Bitcoin Radio Studio
                              </h3>
                              <p className="text-gray-300 mb-6 text-sm">
                                Create, edit, and broadcast professional Bitcoin radio shows
                              </p>
                              <div className="flex gap-3 justify-center">
                                <button
                                  onClick={createNewProject}
                                  className="px-4 py-2 bg-gradient-to-r from-radio-brown-500 to-radio-brown-600 rounded-xl font-semibold hover:from-radio-brown-600 hover:to-radio-brown-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-radio-brown-500/25 transform hover:scale-105 text-sm"
                                >
                                  <Plus className="w-4 h-4" />
                                  Start Creating
                                </button>
                                <label className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer flex items-center gap-2 text-sm">
                                  <input
                                    type="file"
                                    accept="audio/*"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                  />
                                  <Upload className="w-4 h-4" />
                                  Import Video
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side - Listen Mode */}
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-blue-400 mb-2">🎧 Listen Mode</h2>
                    <p className="text-gray-400 text-sm">SoundCloud-style audio feed and discovery</p>
                  </div>
                  <div className="h-full bg-gradient-to-b from-gray-950 via-black to-gray-950 rounded-xl overflow-hidden border border-blue-500/30 p-4">
                    <div className="h-full overflow-y-auto">
                      {/* Audio Shows List */}
                      <AnimatePresence mode="wait">
                        {isLoading ? (
                          <div className="space-y-3">
                            {[...Array(6)].map((_, index) => (
                              <AudioSkeleton key={index} />
                            ))}
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-3"
                          >
                            {filteredShows.length === 0 && <p className="col-span-full py-8 text-center text-gray-400">No shows yet.</p>}
                            {filteredShows.slice(0, 6).map((audioShow, index) => (
                              <motion.div
                                key={audioShow.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleAudioClick(audioShow)}
                                className="cursor-pointer"
                              >
                                <AudioCard audioShow={audioShow} />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            ) : viewMode === 'studio' ? (
              /* Full Studio Mode */
              <div className="h-[calc(100vh-200px)] bg-gradient-to-b from-gray-950 via-black to-gray-950 rounded-xl overflow-hidden border border-radio-brown-500/30">
                <div className="flex h-full">
                  {/* Radio Projects Sidebar */}
                  <div className="w-[280px] flex-shrink-0">
                    <RadioProjectSidebar
                      onProjectSelect={handleProjectSelect}
                      onNewProject={handleNewProject}
                      currentProjectId={selectedProject?.id}
                      refreshTrigger={projectSidebarRefresh}
                      uploadedFile={uploadedFile}
                    />
                  </div>
                  
                  {/* Main Studio Content */}
                  <div className="flex-1 overflow-hidden">
                    {studioView === 'editor' ? (
                      /* Studio Editor View */
                      <div className="h-full">
                        <BitcoinRadioStudio 
                          initialAudioFile={uploadedFile}
                          onSave={(blob) => {
                            console.log('Audio saved:', blob)
                            setProjectSidebarRefresh(prev => prev + 1)
                          }}
                          onExport={(blob, format) => {
                            console.log(`Audio exported as ${format}:`, blob)
                          }}
                        />
                      </div>
                    ) : (
                      /* Studio Welcome/Dashboard View */
                      <div className="p-8 h-full flex items-center justify-center">
                        <div className="text-center max-w-2xl">
                          <div className="p-8 bg-gradient-to-br from-radio-brown-500/20 via-radio-brown-600/10 to-yellow-500/20 rounded-3xl border border-radio-brown-500/20 backdrop-blur-sm shadow-2xl">
                            <Radio className="w-16 h-16 mx-auto mb-6 text-radio-brown-400" />
                            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              Bitcoin Radio Studio
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                              Create, edit, and publish professional Bitcoin radio shows and podcasts - all in your browser
                            </p>
                            <div className="flex gap-4 justify-center">
                              <button
                                onClick={createNewProject}
                                className="px-6 py-3 bg-gradient-to-r from-radio-brown-500 to-radio-brown-600 rounded-xl font-semibold hover:from-radio-brown-600 hover:to-radio-brown-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-radio-brown-500/25 transform hover:scale-105"
                              >
                                <Plus className="w-5 h-5" />
                                Start Creating
                              </button>
                              <label className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer flex items-center gap-2">
                                <input
                                  type="file"
                                  accept="audio/*"
                                  className="hidden"
                                  onChange={handleFileUpload}
                                />
                                <Upload className="w-5 h-5" />
                                Import Audio
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Full Listen Mode */
              <div className="h-[calc(100vh-200px)]">
                {/* Audio Shows List */}
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(8)].map((_, index) => (
                        <AudioSkeleton key={index} />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      {filteredShows.length === 0 && <div className="col-span-full py-8"><p className="mb-6 text-center text-gray-400">No shows yet. Save a short recording on-chain to be the first.</p><SaveOnChain accept="audio/*" noun="recording" /></div>}
                      {filteredShows.map((audioShow, index) => (
                        <motion.div
                          key={audioShow.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleAudioClick(audioShow)}
                          className="cursor-pointer"
                        >
                          <AudioCard audioShow={audioShow} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </main>
        </ResponsiveLayout>
        
        <Footer />
        
        <DevSidebar />
        <Dock />
      </div>
    </DevSidebarProvider>
  )
}
