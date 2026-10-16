'use client'

import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import TopMenuBar from '@/components/TopMenuBar'
import ResponsiveLayout from '@/components/ResponsiveLayout'

export default function RadioExchange() {
  return (
    <DevSidebarProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white antialiased">
        <ProofOfConceptBar />
        <TopMenuBar onNewProject={() => (window.location.href = '/')} />
        <ResponsiveLayout>
          <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              Radio Exchange
            </h1>
            <p className="text-gray-400 text-lg">
              No show tokens are listed yet. When creators tokenise shows they will appear here, and trades will
              settle from your own wallet.
            </p>
          </div>
        </ResponsiveLayout>
      </div>
    </DevSidebarProvider>
  )
}
