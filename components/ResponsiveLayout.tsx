'use client'

import { useDevSidebar } from './DevSidebarProvider'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  const { isCollapsed } = useDevSidebar()
  
  // Simple responsive layout using Tailwind classes only
  const layoutClasses = isCollapsed 
    ? 'ml-0 lg:ml-16' // 60px = 4rem = 16 in Tailwind
    : 'ml-0 lg:ml-64' // 260px = 16rem = 64 in Tailwind
  
  return (
    <div className={`transition-all duration-300 ${layoutClasses} ${className}`}>
      {children}
    </div>
  )
}