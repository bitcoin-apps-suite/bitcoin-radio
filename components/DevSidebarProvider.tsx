'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface DevSidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const DevSidebarContext = createContext<DevSidebarContextType | undefined>(undefined)

export function DevSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true) // Always start collapsed to match server
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Only run on client side after mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed')
      const shouldBeCollapsed = saved !== null ? saved === 'true' : true
      setIsCollapsed(shouldBeCollapsed)
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('devSidebarCollapsed', isCollapsed.toString())
    }
  }, [isCollapsed, isInitialized])

  return (
    <DevSidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </DevSidebarContext.Provider>
  )
}

export function useDevSidebar() {
  const context = useContext(DevSidebarContext)
  if (context === undefined) {
    throw new Error('useDevSidebar must be used within a DevSidebarProvider')
  }
  return context
}