'use client'

import { useState } from 'react'
import { Code, Monitor, Smartphone, Tablet, RefreshCw, Bug } from 'lucide-react'

export default function DeveloperBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [viewport, setViewport] = useState('desktop')

  // Always show for demo purposes
  // if (process.env.NODE_ENV !== 'development') {
  //   return null
  // }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-[99998] p-2 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        title="Developer Tools"
      >
        <Code className="w-4 h-4" />
      </button>

      {/* Developer Panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-[99998] bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-xl text-white text-sm">
          <div className="flex items-center gap-2 mb-3">
            <Bug className="w-4 h-4 text-orange-500" />
            <span className="font-semibold">Developer Tools</span>
          </div>
          
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-400">Viewport:</label>
              <div className="flex gap-1 mt-1">
                {[
                  { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                  { id: 'tablet', icon: Tablet, label: 'Tablet' },
                  { id: 'desktop', icon: Monitor, label: 'Desktop' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setViewport(item.id)}
                      className={`p-1 rounded text-xs flex items-center gap-1 ${
                        viewport === item.id ? 'bg-orange-500 text-black' : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-700">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-1 text-xs hover:text-orange-400 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Reload
              </button>
            </div>
            
            <div className="pt-1 text-xs text-gray-500">
              Bitcoin Video v1.0.0
            </div>
          </div>
        </div>
      )}
    </>
  )
}