'use client'

import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import TopMenuBar from '@/components/TopMenuBar'
import AudioExchangeView from '@/components/AudioExchangeView'
import ResponsiveLayout from '@/components/ResponsiveLayout'

export default function VideoExchange() {
  return (
    <DevSidebarProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white antialiased">
        <ProofOfConceptBar />
        <TopMenuBar 
          onNewProject={() => window.location.href = '/'}
          onSaveProject={() => console.log('Save project')}
        />
        
        <ResponsiveLayout>
          <div className="container mx-auto px-4 py-8 mt-20">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                🎬 Video Exchange
              </h1>
              <p className="text-gray-400 text-lg">
                Trade tokenized videos, invest in creator shares, and earn from video performance
              </p>
            </div>
            
            <AudioExchangeView />
          </div>
        </ResponsiveLayout>
      </div>
    </DevSidebarProvider>
  )
}