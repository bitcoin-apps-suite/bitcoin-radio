'use client'

import { useState } from 'react'
import { Radio, DollarSign, Users, Code, Mic, Zap, CheckCircle, Clock, TrendingUp, Github } from 'lucide-react'
import DevSidebar from '@/components/DevSidebar'
import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import Dock from '@/components/Dock'
import TopMenuBar from '@/components/TopMenuBar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import OSTaskbar from '@/components/OSTaskbar'

export default function GrantsPage() {
  const [activeTab, setActiveTab] = useState('available')

  const grants = [
    {
      id: 1,
      title: 'Audio Processing Infrastructure',
      description: 'Build scalable audio encoding, compression, and streaming infrastructure for high-quality radio content delivery.',
      reward: 'Large $BRADIO',
      equity: '2%',
      timeline: '3-6 months',
      status: 'available',
      category: 'Infrastructure',
      requirements: ['Audio Processing', 'Cloud Infrastructure', 'CDN', 'FFmpeg'],
      milestones: [
        'Audio upload and validation system',
        'Multi-format encoding pipeline',
        'Streaming optimization',
        'Performance testing and deployment'
      ]
    },
    {
      id: 2,
      title: 'Creator NFT Marketplace',
      description: 'Develop a complete NFT marketplace for radio content with minting, trading, and royalty distribution.',
      reward: 'Large $BRADIO',
      equity: '3%',
      timeline: '4-8 months',
      status: 'available',
      category: 'Web3',
      requirements: ['Smart Contracts', 'NFT Standards', 'BSV', 'Web3 UX'],
      milestones: [
        'NFT minting system',
        'Marketplace interface',
        'Royalty distribution',
        'Secondary market trading'
      ]
    },
    {
      id: 3,
      title: 'Mobile Creator App',
      description: 'React Native mobile application for content creators with audio recording, editing, and publishing.',
      reward: 'Large $BRADIO',
      equity: '2.5%',
      timeline: '4-7 months',
      status: 'in_progress',
      category: 'Mobile',
      requirements: ['React Native', 'Audio Editing', 'Mobile UX', 'Microphone APIs'],
      milestones: [
        'Core app structure',
        'Audio recording and editing',
        'Publishing workflow',
        'App store deployment'
      ]
    },
    {
      id: 4,
      title: 'Creator Analytics Dashboard',
      description: 'Comprehensive analytics platform for creators to track performance, earnings, and audience insights.',
      reward: 'Substantial $BRADIO',
      equity: '1.5%',
      timeline: '2-4 months',
      status: 'completed',
      category: 'Analytics',
      requirements: ['Data Visualization', 'Real-time Analytics', 'Dashboard Design'],
      milestones: [
        'Data collection system',
        'Visualization components',
        'Performance metrics',
        'Export and reporting'
      ]
    }
  ]

  const filteredGrants = grants.filter(grant => 
    activeTab === 'all' || grant.status === activeTab
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'in_progress': return 'bg-blue-500'
      case 'completed': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <Zap className="w-4 h-4" />
      case 'in_progress': return <Clock className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <DevSidebarProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
        <ProofOfConceptBar />
        <TopMenuBar 
          onNewProject={() => console.log('New project')}
          onSaveProject={() => console.log('Save project')}
        />
        <OSTaskbar currentPage="grants" />
        
        <ResponsiveLayout>
          <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-radio-brown-500 to-radio-brown-600 rounded-full mb-6">
            <Radio className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-radio-brown-400 to-radio-brown-500 bg-clip-text text-transparent">
            Developer Grants
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Large-scale development grants for building core radio platform features. 
            Earn significant $BRADIO tokens plus platform equity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-radio-brown-400">Large</div>
              <div className="text-gray-400 text-sm">Token Rewards</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-radio-brown-400">Up to 5%</div>
              <div className="text-gray-400 text-sm">Platform Equity</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-blue-400">6-12 Months</div>
              <div className="text-gray-400 text-sm">Project Timeline</div>
            </div>
          </div>
        </div>

        {/* Grant Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Grant Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Large Token Rewards</h3>
              <p className="text-gray-400 text-sm">Substantial $BRADIO tokens per grant</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-radio-brown-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-radio-brown-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Platform Equity</h3>
              <p className="text-gray-400 text-sm">1.5% - 5% ownership in the platform</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Team Support</h3>
              <p className="text-gray-400 text-sm">Technical mentorship and guidance</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Milestone Payments</h3>
              <p className="text-gray-400 text-sm">Progressive payments as you complete milestones</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-1">
            {[
              { id: 'available', label: 'Available', icon: Zap },
              { id: 'in_progress', label: 'In Progress', icon: Clock },
              { id: 'completed', label: 'Completed', icon: CheckCircle },
              { id: 'all', label: 'All Grants', icon: Code }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-radio-brown-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Grants Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredGrants.map(grant => (
            <div key={grant.id} className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 hover:border-radio-brown-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">{grant.category}</span>
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 text-white rounded ${getStatusColor(grant.status)}`}>
                      {getStatusIcon(grant.status)}
                      {grant.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{grant.title}</h3>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{grant.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-400">Token Reward</div>
                  <div className="font-bold text-green-400">{grant.reward}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Equity</div>
                  <div className="font-bold text-purple-400">{grant.equity}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Timeline</div>
                  <div className="font-bold text-blue-400">{grant.timeline}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Required Skills</div>
                <div className="flex flex-wrap gap-2">
                  {grant.requirements.map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Key Milestones</div>
                <ul className="text-sm text-gray-300 space-y-1">
                  {grant.milestones.slice(0, 3).map((milestone, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-radio-brown-400 mt-1">•</span>
                      {milestone}
                    </li>
                  ))}
                  {grant.milestones.length > 3 && (
                    <li className="text-gray-400">...and {grant.milestones.length - 3} more</li>
                  )}
                </ul>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className={`flex-1 px-4 py-2 rounded font-semibold transition-colors ${
                    grant.status === 'available' 
                      ? 'bg-radio-brown-500 hover:bg-radio-brown-600 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={grant.status !== 'available'}
                >
                  {grant.status === 'available' ? 'Apply for Grant' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Application Process */}
        <div className="bg-gradient-to-r from-radio-brown-500/10 to-radio-brown-600/10 border border-radio-brown-500/30 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Grant Application Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-radio-brown-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold mb-2">Submit Proposal</h4>
              <p className="text-gray-400 text-sm">Submit a detailed proposal with timeline and approach</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-radio-brown-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold mb-2">Technical Review</h4>
              <p className="text-gray-400 text-sm">Technical evaluation and team interview</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold mb-2">Grant Approval</h4>
              <p className="text-gray-400 text-sm">Approval and milestone agreement</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-semibold mb-2">Development</h4>
              <p className="text-gray-400 text-sm">Build with ongoing support and milestone payments</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-radio-brown-500/10 to-radio-brown-600/10 border border-radio-brown-500/30 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Build the Future?</h3>
            <p className="text-gray-300 mb-6">
              Apply for a grant and help build the next generation of decentralized radio platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-radio-brown-500 hover:bg-radio-brown-600 text-white font-semibold rounded-lg transition-colors">
                <Radio className="w-4 h-4" />
                Apply for Grant
              </button>
              <a 
                href="/contracts"
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
              >
                <Code className="w-4 h-4" />
                Browse Smaller Contracts
              </a>
              <a 
                href="https://github.com/bitcoin-apps-suite/bitcoin-radio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
                View GitHub
              </a>
            </div>
          </div>
        </div>
          </div>
        </ResponsiveLayout>
        
        <DevSidebar />
        <Dock />
      </div>
    </DevSidebarProvider>
  )
}