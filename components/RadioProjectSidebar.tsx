'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { 
  Radio, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Clock,
  Upload,
  Play,
  Trash2,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Mic,
  Headphones
} from 'lucide-react'

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

interface RadioProjectSidebarProps {
  onProjectSelect: (project: RadioProject) => void
  onNewProject: () => void
  currentProjectId?: string
  refreshTrigger?: number
  uploadedFile?: File | null
}

const RadioProjectSidebar: React.FC<RadioProjectSidebarProps> = ({
  onProjectSelect,
  onNewProject,
  currentProjectId,
  refreshTrigger,
  uploadedFile
}) => {
  const [projects, setProjects] = useState<RadioProject[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const [isResizing, setIsResizing] = useState(false)

  // Mock data for demonstration
  const mockProjects: RadioProject[] = [
    {
      id: '1',
      name: 'Bitcoin Halving Special',
      thumbnail: 'https://picsum.photos/160/90?random=1',
      duration: '45:23',
      lastModified: '2 hours ago',
      status: 'draft',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T12:30:00Z'
    },
    {
      id: '2',
      name: 'Lightning Network Deep Dive',
      thumbnail: 'https://picsum.photos/160/90?random=2',
      duration: '1:08:15',
      lastModified: '1 day ago',
      status: 'published',
      created_at: '2024-01-14T09:00:00Z',
      updated_at: '2024-01-14T10:08:00Z'
    },
    {
      id: '3',
      name: 'Market Analysis Podcast',
      thumbnail: 'https://picsum.photos/160/90?random=3',
      duration: '32:45',
      lastModified: '3 days ago',
      status: 'processing',
      created_at: '2024-01-12T14:22:00Z',
      updated_at: '2024-01-12T15:30:00Z'
    }
  ]

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects)
      setIsLoading(false)
    }, 500)
  }, [refreshTrigger])

  // Add uploaded file as new project
  useEffect(() => {
    if (uploadedFile) {
      const newProject: RadioProject = {
        id: Date.now().toString(),
        name: uploadedFile.name.replace(/\.[^/.]+$/, ""),
        thumbnail: 'https://picsum.photos/160/90?random=' + Date.now(),
        duration: '0:00',
        lastModified: 'Just now',
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setProjects(prev => [newProject, ...prev])
    }
  }, [uploadedFile])

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = useCallback((projectId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setDeleteConfirmId(projectId)
  }, [])

  const confirmDelete = useCallback((projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId))
    setDeleteConfirmId(null)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-400'
      case 'processing': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <Play className="w-3 h-3" />
      case 'processing': return <Clock className="w-3 h-3 animate-spin" />
      default: return <Mic className="w-3 h-3" />
    }
  }

  return (
    <div 
      className="h-full bg-gradient-to-b from-gray-950 to-black border-r border-orange-500/30 flex flex-col relative"
      style={{ width: isCollapsed ? 60 : sidebarWidth }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        {!isCollapsed && (
          <>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-orange-400 flex items-center gap-2">
                <Radio className="w-4 h-4" />
                Radio Projects
              </h3>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <button
              onClick={onNewProject}
              className="w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2 justify-center text-sm mb-3"
            >
              <Plus className="w-4 h-4" />
              New Show
            </button>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shows..."
                className="w-full px-3 py-2 pl-9 bg-gray-800 border border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none text-white text-sm"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </>
        )}
        
        {isCollapsed && (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-2 hover:bg-gray-800 rounded transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={onNewProject}
              className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-3 animate-pulse">
                <div className="bg-gray-800 rounded-lg h-16" />
              </div>
            ))}
          </div>
        ) : isCollapsed ? (
          <div className="p-2">
            {filteredProjects.slice(0, 5).map((project) => (
              <button
                key={project.id}
                onClick={() => onProjectSelect(project)}
                className={`w-full p-2 rounded-lg mb-2 transition-all duration-300 flex items-center justify-center ${
                  currentProjectId === project.id
                    ? 'bg-orange-500/20 border border-orange-500/50'
                    : 'hover:bg-gray-800'
                }`}
              >
                <Radio className="w-4 h-4 text-orange-400" />
              </button>
            ))}
          </div>
        ) : (
          <div className="p-3">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-8">
                <Headphones className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No radio shows found</p>
                <button
                  onClick={onNewProject}
                  className="mt-2 text-orange-400 hover:text-orange-300 text-sm"
                >
                  Create your first show
                </button>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onProjectSelect(project)}
                  className={`p-3 rounded-xl mb-3 cursor-pointer transition-all duration-300 group relative ${
                    currentProjectId === project.id
                      ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/50 shadow-lg'
                      : 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-12 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white text-sm truncate group-hover:text-orange-400 transition-colors">
                        {project.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs ${getStatusColor(project.status)} flex items-center gap-1`}>
                          {getStatusIcon(project.status)}
                          {project.status}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{project.duration}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{project.lastModified}</p>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleDelete(project.id, e)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Delete Confirmation */}
                  {deleteConfirmId === project.id && (
                    <div className="absolute inset-0 bg-red-900/90 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                      <div className="text-center">
                        <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                        <p className="text-sm text-white mb-3">Delete this show?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => confirmDelete(project.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs font-medium transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-xs font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-3 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">
            {filteredProjects.length} show{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  )
}

export default RadioProjectSidebar