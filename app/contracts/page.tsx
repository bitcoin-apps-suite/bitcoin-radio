'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Github, ExternalLink, Clock, DollarSign, Users, Code, AlertCircle } from 'lucide-react'

interface Contract {
  id: string;
  githubIssueNumber: number;
  githubIssueUrl: string;
  title: string;
  description: string;
  reward: string;
  estimatedHours: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'available' | 'claimed' | 'in_progress' | 'submitted' | 'completed' | 'expired';
  category: 'developer' | 'writing';
  assignee?: {
    githubUsername: string;
    handcashHandle?: string;
    claimedAt: string;
    deadline: string;
  };
  pullRequest?: {
    number: number;
    url: string;
    status: 'open' | 'closed' | 'merged';
  };
  skills: string[];
  deliverables: string[];
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [showClaimModal, setShowClaimModal] = useState(false)
  
  // Form state for claim modal
  const [claimForm, setClaimForm] = useState({
    githubUsername: '',
    handcashHandle: '',
    estimatedDays: 7
  })

  useEffect(() => {
    fetchContracts()
  }, [])

  const fetchContracts = async () => {
    try {
      // Fetch GitHub issues
      const response = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-video/issues?state=all&per_page=100')
      
      if (!response.ok) {
        console.warn('GitHub API response not OK:', response.status)
        throw new Error(`GitHub API error: ${response.status}`)
      }
      
      const issues = await response.json()
      
      if (issues.message && issues.message.includes('rate limit')) {
        console.warn('GitHub API rate limited')
        throw new Error('Rate limited')
      }
      
      if (!Array.isArray(issues)) {
        throw new Error('Invalid response format')
      }
      
      // Also fetch pull requests to match with issues
      const prsResponse = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-video/pulls?state=all&per_page=100')
      const pullRequests = prsResponse.ok ? await prsResponse.json() : []
      
      // Map issues to contracts - ONLY DEVELOPER CONTRACTS
      const mappedContracts = issues.map((issue: any): Contract | null => {
        const body = issue.body || ''
        
        let priorityMatch = body.match(/\*\*Priority:\*\*\s*(Critical|High|Medium|Low)/i)
        let hoursMatch = body.match(/\*\*Estimated Hours:\*\*\s*([\d,]+)/i)
        let rewardMatch = body.match(/\*\*Token Reward:\*\*\s*([\d,]+)\s*BVIDEO/i)
        
        // Find matching PR if exists
        const matchingPR = pullRequests.find((pr: any) => 
          pr.body && pr.body.includes(`#${issue.number}`)
        )
        
        // Extract description
        let description = ''
        const descMatch = body.match(/##\s*(?:📋\s*)?(?:Overview|Description)\s*\n([\s\S]*?)(?=##|$)/i)
        if (descMatch) {
          description = descMatch[1].trim().split('\n\n')[0].replace(/^Implement\s+/i, '').trim()
        } else {
          description = body.split('## Tasks')[0].replace('## Overview', '').trim()
        }
        
        // Parse tasks section for skills
        let skills: string[] = ['TypeScript', 'React', 'Next.js']
        const tasksMatch = body.match(/##\s*(?:🎯\s*)?Tasks\s*\n([\s\S]*?)(?=##|$)/i)
        if (tasksMatch) {
          const tasks = tasksMatch[1]
          if (tasks.includes('BSV') || tasks.includes('blockchain')) skills.push('BSV')
          if (tasks.includes('HandCash')) skills.push('HandCash SDK')
          if (tasks.includes('video') || tasks.includes('Video')) skills.push('Video Processing')
          if (tasks.includes('NFT') || tasks.includes('token')) skills.push('NFT/Tokens')
          if (tasks.includes('payment') || tasks.includes('Payment')) skills.push('Payments')
          if (tasks.includes('mobile') || tasks.includes('Mobile')) skills.push('Mobile')
          if (tasks.includes('API') || tasks.includes('api')) skills.push('API Development')
        }
        
        // Default reward based on issue number for demo
        if (!rewardMatch) {
          const tokenAmount = Math.floor(Math.random() * 50000) + 10000 // 10k-60k BVIDEO
          rewardMatch = ['', tokenAmount.toLocaleString()]
        }
        
        // Extract deliverables
        const deliverables: string[] = []
        const criteriaMatch = body.match(/##\s*(?:✅\s*)?Acceptance Criteria\s*\n([\s\S]*?)(?=##|$)/i)
        if (criteriaMatch) {
          const criteria = criteriaMatch[1]
          const items = criteria.match(/- .*/g) || []
          items.forEach((item: string) => {
            deliverables.push(item.replace(/^- (\[ \] )?/, '').trim())
          })
        }
        
        // Determine contract status
        let status: Contract['status'] = 'available'
        if (issue.state === 'closed') {
          status = 'completed'
        } else if (matchingPR) {
          if (matchingPR.state === 'closed' && matchingPR.merged_at) {
            status = 'completed'
          } else if (matchingPR.state === 'open') {
            status = 'submitted'
          }
        } else if (issue.assignee) {
          status = 'in_progress'
        }
        
        // Get contract from localStorage if it exists
        const storedContract = localStorage.getItem(`contract-${issue.number}`)
        const contractData = storedContract ? JSON.parse(storedContract) : null
        
        return {
          id: `contract-${issue.number}`,
          githubIssueNumber: issue.number,
          githubIssueUrl: issue.html_url,
          title: issue.title,
          description: description,
          reward: rewardMatch ? `${rewardMatch[1]} BVIDEO` : '25,000 BVIDEO',
          estimatedHours: hoursMatch ? parseInt(hoursMatch[1].replace(/,/g, '')) : Math.floor(Math.random() * 40) + 8,
          priority: (priorityMatch ? priorityMatch[1] : 'Medium') as Contract['priority'],
          category: 'developer' as const,
          status,
          assignee: contractData?.assignee || (issue.assignee ? {
            githubUsername: issue.assignee.login,
            claimedAt: issue.assigned_at || new Date().toISOString(),
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          } : undefined),
          pullRequest: matchingPR ? {
            number: matchingPR.number,
            url: matchingPR.html_url,
            status: matchingPR.state
          } : undefined,
          skills,
          deliverables: deliverables.slice(0, 5) // Limit to 5 deliverables
        }
      })
      
      const filteredContracts: Contract[] = mappedContracts.filter((contract: Contract | null): contract is Contract => contract !== null)
      
      setContracts(filteredContracts)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch contracts:', error)
      
      // Show a message directing users to GitHub
      setContracts([{
        id: 'github-redirect',
        githubIssueNumber: 0,
        githubIssueUrl: 'https://github.com/bitcoin-apps-suite/bitcoin-video/issues',
        title: '📋 View Developer Contracts on GitHub',
        description: 'Unable to load contracts from GitHub API. Click to view all available developer contracts directly on GitHub.',
        priority: 'Low' as const,
        reward: 'Various',
        status: 'available' as const,
        category: 'developer' as const,
        estimatedHours: 0,
        skills: ['Visit GitHub'],
        deliverables: ['View and claim contracts on GitHub']
      }])
      setLoading(false)
    }
  }

  const handleClaimContract = async () => {
    if (!selectedContract || !claimForm.githubUsername) return
    
    // Store claim in localStorage
    const contractClaim = {
      id: selectedContract.id,
      githubIssueNumber: selectedContract.githubIssueNumber,
      assignee: {
        githubUsername: claimForm.githubUsername,
        handcashHandle: claimForm.handcashHandle,
        claimedAt: new Date().toISOString(),
        deadline: new Date(Date.now() + claimForm.estimatedDays * 24 * 60 * 60 * 1000).toISOString()
      }
    }
    
    localStorage.setItem(`contract-${selectedContract.githubIssueNumber}`, JSON.stringify(contractClaim))
    
    // Update local state
    const updatedContracts = contracts.map(c => 
      c.id === selectedContract.id 
        ? { ...c, status: 'claimed' as Contract['status'], assignee: contractClaim.assignee }
        : c
    )
    setContracts(updatedContracts)
    
    // Close modals
    setShowClaimModal(false)
    setSelectedContract(null)
    
    // Reset form
    setClaimForm({
      githubUsername: '',
      handcashHandle: '',
      estimatedDays: 7
    })
  }

  const getStatusColor = (status: Contract['status']) => {
    switch (status) {
      case 'available': return '#22c55e'
      case 'claimed': return '#f59e0b'
      case 'in_progress': return '#3b82f6'
      case 'submitted': return '#8b5cf6'
      case 'completed': return '#6b7280'
      case 'expired': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getPriorityColor = (priority: Contract['priority']) => {
    switch (priority) {
      case 'Critical': return '#ef4444'
      case 'High': return '#f59e0b'
      case 'Medium': return '#3b82f6'
      case 'Low': return '#6b7280'
      default: return '#6b7280'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Developer Contracts
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Build features, earn $BVIDEO tokens & platform equity
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-300 text-sm font-semibold">
            <Code className="w-4 h-4" />
            DEVELOPER OPPORTUNITIES
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {contracts.filter(c => c.status === 'available').length}
            </div>
            <div className="text-gray-400">Available</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {contracts.filter(c => c.status === 'in_progress' || c.status === 'claimed').length}
            </div>
            <div className="text-gray-400">In Progress</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {contracts.filter(c => c.status === 'submitted').length}
            </div>
            <div className="text-gray-400">Under Review</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-gray-400 mb-2">
              {contracts.filter(c => c.status === 'completed').length}
            </div>
            <div className="text-gray-400">Completed</div>
          </div>
        </div>

        {/* Token Allocation Info */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-4">
            <DollarSign className="w-8 h-8 text-orange-400 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-orange-300 mb-2">$BVIDEO Developer Rewards</h3>
              <p className="text-gray-300 mb-3">
                We're offering <strong>substantial $BVIDEO token rewards</strong> to developers who help build out the platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong className="text-orange-300">Total Supply:</strong><br />
                  1,000,000,000 $BVIDEO
                </div>
                <div>
                  <strong className="text-orange-300">Developer Rewards:</strong><br />
                  Substantial token allocation
                </div>
                <div>
                  <strong className="text-orange-300">Plus Equity:</strong><br />
                  Platform ownership shares
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-400">Loading developer contracts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {contracts.map(contract => (
              <div 
                key={contract.id} 
                className={`bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 hover:border-orange-500/50 transition-all cursor-pointer ${
                  contract.status !== 'available' ? 'opacity-75' : ''
                }`}
                onClick={() => contract.status === 'available' && setSelectedContract(contract)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white leading-tight pr-2">
                    {contract.title}
                  </h3>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-semibold text-white flex-shrink-0"
                    style={{ backgroundColor: getStatusColor(contract.status) }}
                  >
                    {contract.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {contract.description}
                </p>
                
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <span 
                    className="px-2 py-1 rounded text-white font-semibold"
                    style={{ backgroundColor: getPriorityColor(contract.priority) }}
                  >
                    {contract.priority}
                  </span>
                  <span className="text-orange-400 font-bold">{contract.reward}</span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {contract.estimatedHours}h
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {contract.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {contract.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      +{contract.skills.length - 3} more
                    </span>
                  )}
                </div>

                {contract.assignee && (
                  <div className="text-xs text-gray-400 mb-3">
                    <span className="font-semibold">Assigned to:</span> @{contract.assignee.githubUsername}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <a 
                    href={contract.githubIssueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-white text-xs transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-3 h-3" />
                    Issue #{contract.githubIssueNumber}
                  </a>
                  {contract.status === 'available' && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contract Details Modal */}
        {selectedContract && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button 
                className="float-right text-gray-400 hover:text-white text-2xl"
                onClick={() => setSelectedContract(null)}
              >
                ×
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-4 pr-8">{selectedContract.title}</h2>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span 
                  className="px-3 py-1 rounded text-white font-semibold"
                  style={{ backgroundColor: getPriorityColor(selectedContract.priority) }}
                >
                  {selectedContract.priority} Priority
                </span>
                <span className="px-3 py-1 bg-orange-500 text-white font-bold rounded">
                  {selectedContract.reward}
                </span>
                <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedContract.estimatedHours} hours
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300">{selectedContract.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContract.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedContract.deliverables.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Key Deliverables</h3>
                  <ul className="text-gray-300 space-y-1">
                    {selectedContract.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex gap-3">
                <a 
                  href={selectedContract.githubIssueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on GitHub
                </a>
                <button 
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold transition-colors"
                  onClick={() => setShowClaimModal(true)}
                >
                  Claim Contract
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Claim Contract Modal */}
        {showClaimModal && selectedContract && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center p-4 z-60">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full">
              <button 
                className="float-right text-gray-400 hover:text-white text-2xl"
                onClick={() => setShowClaimModal(false)}
              >
                ×
              </button>
              
              <h2 className="text-xl font-bold text-white mb-4">Claim Contract</h2>
              <p className="text-gray-300 mb-6">Please provide your details to claim this contract</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">GitHub Username *</label>
                  <input 
                    type="text"
                    value={claimForm.githubUsername}
                    onChange={(e) => setClaimForm({...claimForm, githubUsername: e.target.value})}
                    placeholder="your-github-username"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">HandCash Handle (optional)</label>
                  <input 
                    type="text"
                    value={claimForm.handcashHandle}
                    onChange={(e) => setClaimForm({...claimForm, handcashHandle: e.target.value})}
                    placeholder="$yourhandle"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Estimated Days to Complete</label>
                  <input 
                    type="number"
                    value={claimForm.estimatedDays}
                    onChange={(e) => setClaimForm({...claimForm, estimatedDays: parseInt(e.target.value) || 7})}
                    min="1"
                    max="30"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button 
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    onClick={() => setShowClaimModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold transition-colors disabled:opacity-50"
                    onClick={handleClaimContract}
                    disabled={!claimForm.githubUsername}
                  >
                    Claim Contract
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}