'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useDevSidebar } from './DevSidebarProvider'
import { 
  ChevronLeft,
  ChevronRight,
  Monitor,
  FileCode,
  FileText,
  Coins,
  Github,
  GitPullRequest,
  BookOpen,
  History,
  CheckCircle,
  Terminal,
  Package,
  Upload,
  Video,
  Sparkles,
  BarChart3,
  TrendingUp,
  Search,
  Briefcase,
  Users,
  Store,
  Play,
  Handshake
} from 'lucide-react'
import './DevSidebar.css'

export default function DevSidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useDevSidebar()
  const [issueCount, setIssueCount] = useState<number>(0)

  // Fetch GitHub issues count
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-video/issues?state=open')
        const data = await response.json()
        setIssueCount(Array.isArray(data) ? data.length : 0)
      } catch (error) {
        console.error('Error fetching issues:', error)
        setIssueCount(0)
      }
    }
    fetchIssues()
  }, [])

  const menuItems: Array<{
    path?: string
    icon?: React.ComponentType<{ size?: number; className?: string }>
    label?: string
    badge?: string
    divider?: boolean
    section?: string
    external?: boolean
  }> = [
    // Token & Equity at top
    { path: '/token', icon: Coins, label: '$BRADIO', badge: 'NEW' },
    { path: '/grants', icon: TrendingUp, label: 'GRANTS' },
    { path: '/commissions', icon: Handshake, label: 'Commission Hub', badge: 'BETA' },
    
    // Radio Creators Section
    { divider: true },
    { section: 'CREATORS' },
    { path: '/', icon: Monitor, label: 'Radio Studio' },
    { path: '/create', icon: Upload, label: 'Upload & Edit', badge: 'NEW' },
    { path: '/feed', icon: Play, label: 'Watch Feed' },
    { path: '/creator/offers', icon: FileText, label: 'Create Content Offer' },
    { path: '/publisher/requests', icon: Search, label: 'Find Sponsors', badge: '8' },
    { path: '/docs/creator-guide', icon: BookOpen, label: 'Creator Guide' },
    
    // Publishers Section
    { divider: true },
    { section: 'PUBLISHERS' },
    { path: '/publisher/offer', icon: Briefcase, label: 'Commission Radio' },
    { path: '/creator/marketplace', icon: Users, label: 'Find Creators', badge: '24' },
    { path: '/analytics', icon: BarChart3, label: 'Campaign Analytics' },
    { path: '/enterprise', icon: Store, label: 'Enterprise Plan' },
    
    // Developers Section
    { divider: true },
    { section: 'DEVELOPERS' },
    { path: '/developer/offer', icon: Sparkles, label: 'Create Dev Offer' },
    { path: '/contracts', icon: Terminal, label: 'Find Work', badge: issueCount > 0 ? String(issueCount) : '0' },
    { path: '/contributions', icon: Users, label: 'Contributors', badge: '3' },
    { path: '/api', icon: Package, label: 'API Reference' },
    
    // System
    { divider: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-video', icon: Github, label: 'GitHub', external: true },
    { path: '/changelog', icon: History, label: 'Changelog' },
    { path: '/status', icon: CheckCircle, label: 'Status', badge: 'OK' }
  ]

  const stats = {
    totalTokens: '1,000,000,000',
    forDevelopers: 'Substantial',
    contributors: '3',
    openTasks: issueCount || 12
  }

  return (
    <div className={`dev-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="dev-sidebar-header">
        {!isCollapsed && (
          <div className="dev-sidebar-title">
            <Sparkles className="dev-sidebar-logo" />
            <span>Contracts Hub</span>
          </div>
        )}
        <button 
          className="dev-sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="dev-sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.divider) {
            return <div key={index} className="dev-sidebar-divider" />
          }

          if (item.section) {
            return !isCollapsed ? (
              <div key={index} className="dev-sidebar-section">
                {item.section}
              </div>
            ) : null
          }

          const Icon = item.icon
          const isActive = pathname === item.path

          if (item.external) {
            return (
              <a
                key={`${item.path}-${index}`}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                {Icon && <Icon size={20} />}
                {!isCollapsed && (
                  <>
                    <span className="dev-sidebar-label">{item.label}</span>
                    {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                  </>
                )}
              </a>
            )
          }

          return (
            <a
              key={`${item.path}-${index}`}
              href={item.path || '/'}
              className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              {Icon && <Icon size={20} />}
              {!isCollapsed && (
                <>
                  <span className="dev-sidebar-label">{item.label}</span>
                  {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                </>
              )}
            </a>
          )
        })}
      </nav>

      {/* Stats section */}
      {!isCollapsed && (
        <div className="dev-sidebar-stats">
          <h4>$BRADIO Token Pool</h4>
          <div className="dev-stat">
            <span className="dev-stat-label">Total Tokens</span>
            <span className="dev-stat-value">{stats.totalTokens}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">For Developers</span>
            <span className="dev-stat-value">{stats.forDevelopers}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Contributors</span>
            <span className="dev-stat-value">{stats.contributors}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Open Contracts</span>
            <span className="dev-stat-value">{stats.openTasks}</span>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      {!isCollapsed && (
        <div className="dev-sidebar-footer">
          <div className="dev-sidebar-cta">
            <p>Earn $BRADIO Tokens</p>
            <a 
              href="/contracts" 
              className="dev-sidebar-cta-button"
            >
              Browse Dev Contracts
            </a>
          </div>
        </div>
      )}
    </div>
  )
}