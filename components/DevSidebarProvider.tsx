'use client'

import React, { createContext, useContext, useCallback, useSyncExternalStore } from 'react'

interface DevSidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const DevSidebarContext = createContext<DevSidebarContextType | undefined>(undefined)

const STORAGE_KEY = 'devSidebarCollapsed'
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('storage', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

function readCollapsed(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved !== null ? saved === 'true' : true
  } catch {
    return true
  }
}

// Always collapsed on the server so hydration matches.
const serverCollapsed = () => true

export function DevSidebarProvider({ children }: { children: React.ReactNode }) {
  const isCollapsed = useSyncExternalStore(subscribe, readCollapsed, serverCollapsed)

  const setIsCollapsed = useCallback((collapsed: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(collapsed))
    } catch {
      // storage unavailable; nothing to persist
    }
    listeners.forEach((l) => l())
  }, [])

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
