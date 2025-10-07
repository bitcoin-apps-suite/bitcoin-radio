'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Bitcoin,
  Upload,
  FileVideo,
  Folder,
  Clock,
  Star,
  MoreHorizontal,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import BitcoinRadioStudio from '@/components/BitcoinRadioStudio'

interface Project {
  id: string
  name: string
  thumbnail: string
  duration: string
  lastModified: string
  status: 'draft' | 'published' | 'processing'
}

export default function StudioPage() {
  const [view, setView] = useState<'projects' | 'editor'>('projects')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const projects: Project[] = [
    {
      id: '1',
      name: 'Bitcoin Halving Analysis',
      thumbnail: 'https://picsum.photos/320/180?random=10',
      duration: '3:24',
      lastModified: '2 hours ago',
      status: 'draft'
    },
    {
      id: '2', 
      name: 'Lightning Network Tutorial',
      thumbnail: 'https://picsum.photos/320/180?random=11',
      duration: '8:45',
      lastModified: '1 day ago', 
      status: 'published'
    },
    {
      id: '3',
      name: 'Market Analysis Oct 2024',
      thumbnail: 'https://picsum.photos/320/180?random=12',
      duration: '5:12',
      lastModified: '3 days ago',
      status: 'processing'
    }
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setView('editor')
    }
  }

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setView('editor')
  }

  const createNewProject = () => {
    setSelectedProject(null)
    setUploadedFile(null)
    setView('editor')
  }

  if (view === 'editor') {
    return (
      <div className="h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
        {/* Studio Header */}
        <div className="border-b border-white/10 bg-black/80 backdrop-blur-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView('projects')}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-radio-brown-500 to-radio-brown-600 rounded-lg">
                  <Bitcoin className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg">Bitcoin Radio Studio</span>
                {selectedProject && (
                  <>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-300">{selectedProject.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full Screen Editor */}
        <div className="h-[calc(100vh-73px)]">
          <BitcoinRadioStudio 
            initialAudioFile={uploadedFile}
            onSave={(blob) => {
              console.log('Project saved:', blob)
              // Here you would save to your backend/blockchain
            }}
            onExport={(blob, format) => {
              console.log(`Project exported as ${format}:`, blob)
              // Here you would handle the export
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-gradient-to-br from-radio-brown-500 to-radio-brown-600 rounded-xl shadow-lg">
                  <Bitcoin className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-radio-brown-400 to-radio-brown-600 bg-clip-text text-transparent">
                  Bitcoin Radio Studio
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                id="studio-upload"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="studio-upload"
                className="px-4 py-2 bg-gradient-to-r from-radio-brown-500 to-radio-brown-600 rounded-lg font-medium cursor-pointer hover:from-radio-brown-600 hover:to-radio-brown-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Upload className="w-4 h-4" />
                Import Video
              </label>
              
              <button
                onClick={createNewProject}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-radio-brown-500/20 via-radio-brown-600/10 to-yellow-500/20 p-8 border border-radio-brown-500/20 backdrop-blur-sm shadow-2xl">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Professional Radio Studio
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Create, edit, and publish Bitcoin content with professional tools - all in your browser
            </p>
            <div className="flex gap-4">
              <button
                onClick={createNewProject}
                className="px-6 py-3 bg-gradient-to-r from-radio-brown-500 to-radio-brown-600 rounded-xl font-semibold hover:from-radio-brown-600 hover:to-radio-brown-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-radio-brown-500/25 transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Start Creating
              </button>
              <label
                htmlFor="studio-upload"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Import Existing
              </label>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Your Projects</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Folder className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openProject(project)}
                  className="bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer hover:border-radio-brown-500/30 transition-all duration-300 group"
                >
                  <div className="aspect-video relative">
                    <img 
                      src={project.thumbnail} 
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-3 bg-black/50 rounded-full backdrop-blur-sm">
                        <FileVideo className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs font-mono">
                      {project.duration}
                    </div>
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'published' ? 'bg-green-600' :
                      project.status === 'processing' ? 'bg-yellow-600' :
                      'bg-gray-600'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold mb-2 group-hover:text-radio-brown-400 transition-colors">
                      {project.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{project.lastModified}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileVideo className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-gray-400 mb-6">
                Start creating your first Bitcoin video project
              </p>
              <button
                onClick={createNewProject}
                className="px-6 py-3 bg-gradient-to-r from-radio-brown-500 to-radio-brown-600 rounded-lg font-medium hover:from-radio-brown-600 hover:to-radio-brown-700 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Create First Project
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20">
            <Star className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="font-semibold mb-2">Templates</h4>
            <p className="text-sm text-gray-400 mb-4">Start with professional Bitcoin video templates</p>
            <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
              Browse Templates →
            </button>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20">
            <FileVideo className="w-8 h-8 text-green-400 mb-3" />
            <h4 className="font-semibold mb-2">Screen Recording</h4>
            <p className="text-sm text-gray-400 mb-4">Record your screen for tutorials and demos</p>
            <button className="text-green-400 text-sm font-medium hover:text-green-300 transition-colors">
              Start Recording →
            </button>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20">
            <Bitcoin className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="font-semibold mb-2">AI Generation</h4>
            <p className="text-sm text-gray-400 mb-4">Generate videos with Bitcoin-focused AI</p>
            <Link 
              href="/create"
              className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors"
            >
              Try AI Tools →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}