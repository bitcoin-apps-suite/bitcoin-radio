'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { 
  FileVideo, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Clock,
  Upload,
  Play,
  Trash2,
  ArrowLeft,
  ArrowRight,
  AlertTriangle
} from 'lucide-react'

interface VideoProject {
  id: string
  name: string
  thumbnail: string
  duration: string
  lastModified: string
  status: 'draft' | 'published' | 'processing'
  created_at: string
  updated_at: string
}

interface VideoProjectSidebarProps {
  onProjectSelect: (project: VideoProject) => void
  onNewProject: () => void
  currentProjectId?: string
  refreshTrigger?: number
  uploadedFile?: File | null
}

const VideoProjectSidebar: React.FC<VideoProjectSidebarProps> = ({
  onProjectSelect,
  onNewProject,
  currentProjectId,
  refreshTrigger,
  uploadedFile
}) => {
  const [projects, setProjects] = useState<VideoProject[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const [isResizing, setIsResizing] = useState(false)

  // Sample projects data - in real app this would come from localStorage/database
  const sampleProjects: VideoProject[] = [
    {
      id: '1',
      name: 'Bitcoin Halving Analysis',
      thumbnail: 'https://picsum.photos/320/180?random=10',
      duration: '3:24',
      lastModified: '2 hours ago',
      status: 'draft',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2', 
      name: 'Lightning Network Tutorial',
      thumbnail: 'https://picsum.photos/320/180?random=11',
      duration: '8:45',
      lastModified: '1 day ago',
      status: 'published',
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      name: 'Market Analysis Oct 2024',
      thumbnail: 'https://picsum.photos/320/180?random=12',
      duration: '5:12',
      lastModified: '3 days ago',
      status: 'processing',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  const loadProjects = useCallback(async () => {
    setIsLoading(true)
    try {
      // In real app, load from localStorage or API
      const savedProjects = localStorage.getItem('bitcoin-video-projects')
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects))
      } else {
        setProjects(sampleProjects)
        localStorage.setItem('bitcoin-video-projects', JSON.stringify(sampleProjects))
      }
    } catch (error) {
      console.error('Failed to load projects:', error)
      setProjects(sampleProjects)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProjects()
    
    const handleProjectCreated = () => {
      loadProjects()
    }
    
    window.addEventListener('videoProjectCreated', handleProjectCreated)
    
    return () => {
      window.removeEventListener('videoProjectCreated', handleProjectCreated)
    }
  }, [loadProjects])

  useEffect(() => {
    if (currentProjectId || refreshTrigger) {
      loadProjects()
    }
  }, [currentProjectId, refreshTrigger, loadProjects])

  // Auto-create project from uploaded file
  useEffect(() => {
    if (uploadedFile) {
      const newProject: VideoProject = {
        id: `project-${Date.now()}`,
        name: uploadedFile.name.replace(/\.[^/.]+$/, ""), // Remove extension
        thumbnail: 'https://picsum.photos/320/180?random=' + Math.floor(Math.random() * 100),
        duration: '0:00',
        lastModified: 'Just now',
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      const updatedProjects = [newProject, ...projects]
      setProjects(updatedProjects)
      localStorage.setItem('bitcoin-video-projects', JSON.stringify(updatedProjects))
      
      // Auto-select the new project
      onProjectSelect(newProject)
    }
  }, [uploadedFile, projects, onProjectSelect])

  const handleDeleteProject = async (projectId: string, projectName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (deleteConfirmId !== projectId) {
      setDeleteConfirmId(projectId)
      setTimeout(() => {
        setDeleteConfirmId(null)
      }, 3000)
      return
    }
    
    setDeleteConfirmId(null)
    
    try {
      const updatedProjects = projects.filter(project => project.id !== projectId)
      setProjects(updatedProjects)
      localStorage.setItem('bitcoin-video-projects', JSON.stringify(updatedProjects))
      
      if (currentProjectId === projectId) {
        onNewProject()
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60))
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    } else if (diffHours < 168) {
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return '✅'
      case 'processing': return '⏳'
      default: return '📝'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-400'
      case 'processing': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  // Handle resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      
      const newWidth = e.clientX
      if (newWidth >= 200 && newWidth <= 500) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing])

  return (
    <div 
      className={`video-project-sidebar ${isCollapsed ? 'collapsed' : ''}`}
      style={{ 
        width: isCollapsed ? '50px' : `${sidebarWidth}px`,
        height: '100%',
        background: 'linear-gradient(to bottom, rgb(3, 7, 18), rgb(0, 0, 0), rgb(3, 7, 18))',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div 
        className="sidebar-header"
        style={{
          padding: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        >
          {isCollapsed ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
        </button>
        {!isCollapsed && (
          <h3 style={{ 
            color: 'white', 
            fontSize: '1rem', 
            fontWeight: '600', 
            margin: 0 
          }}>
            Video Projects
          </h3>
        )}
      </div>
      
      {!isCollapsed && (
        <div 
          className="sidebar-content"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <div 
            className="sidebar-actions"
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <button 
              className="new-project-btn" 
              onClick={onNewProject}
              style={{
                background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(251, 146, 60))',
                border: 'none',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Plus size={16} />
              New Project
            </button>
            
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="search-input"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.borderColor = 'rgb(249, 115, 22)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                }}
              />
              <Search 
                size={16} 
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}
              />
            </div>
          </div>

          <div 
            style={{
              flex: 1,
              overflow: 'auto',
              padding: '0 1rem 1rem'
            }}
          >
            {isLoading ? (
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.6)', 
                textAlign: 'center', 
                padding: '2rem' 
              }}>
                Loading projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.6)', 
                textAlign: 'center', 
                padding: '2rem',
                fontSize: '0.875rem'
              }}>
                {searchQuery ? 'No projects found' : 'No projects yet. Create your first video!'}
              </div>
            ) : (
              <div className="project-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filteredProjects.map(project => (
                  <div
                    key={project.id}
                    className={`project-item ${currentProjectId === project.id ? 'active' : ''}`}
                    style={{
                      background: currentProjectId === project.id 
                        ? 'rgba(249, 115, 22, 0.1)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      border: currentProjectId === project.id 
                        ? '1px solid rgba(249, 115, 22, 0.3)' 
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.75rem',
                      padding: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (currentProjectId !== project.id) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentProjectId !== project.id) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      }
                    }}
                  >
                    <button 
                      className="project-button"
                      onClick={() => onProjectSelect(project)}
                      style={{
                        background: 'none',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: 'white'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>
                          {getStatusIcon(project.status)}
                        </span>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={{ 
                            fontWeight: '600', 
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {project.name || 'Untitled'}
                          </div>
                          <div style={{ 
                            fontSize: '0.75rem', 
                            color: 'rgba(255, 255, 255, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <Clock size={12} />
                            {formatDate(project.updated_at)}
                            <span className={getStatusColor(project.status)}>
                              • {project.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                    <button
                      className={`delete-btn ${deleteConfirmId === project.id ? 'confirm-delete' : ''}`}
                      onClick={(e) => handleDeleteProject(project.id, project.name, e)}
                      title={deleteConfirmId === project.id ? 'Click again to delete' : `Delete ${project.name}`}
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        background: deleteConfirmId === project.id ? 'rgb(239, 68, 68)' : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '0.375rem',
                        padding: '0.25rem',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        opacity: 0.7,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                    >
                      {deleteConfirmId === project.id ? <AlertTriangle size={12} /> : <Trash2 size={12} />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {!isCollapsed && (
        <div 
          className="sidebar-resize-handle"
          onMouseDown={handleMouseDown}
          style={{ 
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            cursor: 'col-resize',
            background: 'transparent',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(249, 115, 22, 0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        />
      )}
    </div>
  )
}

export default VideoProjectSidebar