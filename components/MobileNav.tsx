'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Home, 
  TrendingUp, 
  Sparkles, 
  History, 
  Bitcoin,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2.5 glass-hover rounded-xl transition-all duration-200"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-72 glass z-50 p-6 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                    <Bitcoin className="w-5 h-5 text-black" />
                  </div>
                  <span className="font-bold text-gradient">Bitcoin Video</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 glass-hover rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl glass-hover"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/trending"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl glass-hover"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Trending</span>
                </Link>
                <Link
                  href="/automated"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl glass-hover"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>AI Generated</span>
                </Link>
                <Link
                  href="/history"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl glass-hover"
                >
                  <History className="w-5 h-5" />
                  <span>History</span>
                </Link>
                
                <div className="pt-4 mt-4 border-t border-white/10">
                  <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Automation
                  </h3>
                  <Link
                    href="/create"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:to-yellow-500/20 border border-orange-500/20 transition-all duration-300"
                  >
                    <Zap className="w-5 h-5 text-orange-400" />
                    <div>
                      <span className="block text-sm font-medium">Auto Creator</span>
                      <span className="text-xs text-gray-400">Generate videos</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}