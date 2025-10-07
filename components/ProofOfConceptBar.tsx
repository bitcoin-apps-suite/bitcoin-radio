'use client'

import { AlertTriangle } from 'lucide-react'
import './ProofOfConceptBar.css'

export default function ProofOfConceptBar() {
  return (
    <div className="poc-bar">
      <div className="poc-content">
        <AlertTriangle className="w-4 h-4 poc-icon" />
        <span className="poc-text">PROOF OF CONCEPT - This is a demonstration of Bitcoin OS</span>
        <AlertTriangle className="w-4 h-4 poc-icon" />
      </div>
    </div>
  )
}