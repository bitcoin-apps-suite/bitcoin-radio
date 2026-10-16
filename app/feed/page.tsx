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
  Settings
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

export default function BitcoinRadio() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading] = useState(false)

  const categories = [
    { id: 'all', name: 'All', icon: <Home className="w-4 h-4" /> },
    { id: 'education', name: 'Education', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'news', name: 'News', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'analysis', name: 'Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'tutorials', name: 'Tutorials', icon: <Compass className="w-4 h-4" /> },
    { id: 'automated', name: 'AI Generated', icon: <Sparkles className="w-4 h-4" /> },
  ]

  const audioShows: AudioShow[] = []

  const filteredShows = selectedCategory === 'all' 
    ? audioShows 
    : audioShows.filter(v => v.category === selectedCategory)

  return (
    <DevSidebarProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white antialiased pb-24 main-app-container">
        <ProofOfConceptBar />
        <TopMenuBar />
        
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
                  <img 
                    src="/bitcoin-radio.jpg" 
                    alt="Bitcoin Radio"
                    className="w-6 sm:w-8 h-6 sm:h-8 object-cover rounded-lg group-hover:rotate-3 transition-transform"
                  />
                </div>
                <span className="text-lg sm:text-xl font-bold hidden sm:block text-gradient">Bitcoin Radio</span>
              </Link>
              
              {/* View Toggle */}
              <Link 
                href="/"
                className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm"
                title="Switch to Studio Mode"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:block">Creator Mode</span>
                <ToggleRight className="w-5 h-5 text-radio-brown-400" />
              </Link>
              
              <div className="flex-1 max-w-2xl hidden sm:block">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Bitcoin radio content..."
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
                  <Upload className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="hidden sm:block">Create</span>
                </Link>
                
                <Link
                  href="/studio"
                  className="px-2 sm:px-3 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 flex items-center gap-1 text-sm sm:text-base"
                  title="Radio Studio"
                >
                  <Video className="w-4 sm:w-5 h-4 sm:h-5" />
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

          {/* Main Content */}
          <main className="p-6 lg:p-8">
          {/* Audio Grid */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <AudioSkeleton key={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredShows.length === 0 && <p className="col-span-full py-12 text-center text-gray-400">No shows yet. Creators can save recordings on-chain from the home page.</p>}
                {filteredShows.map((audioShow, index) => (
                  <motion.div
                    key={audioShow.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AudioCard audioShow={audioShow} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          </main>
        </ResponsiveLayout>
        
        <DevSidebar />
        <Dock />
      </div>
    </DevSidebarProvider>
  )
}
