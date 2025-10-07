'use client'

import React from 'react'
import { Video, Users, Zap, ChevronRight, ExternalLink, DollarSign, Calendar, FileText, Briefcase } from 'lucide-react'
import DevSidebar from '@/components/DevSidebar'
import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import Dock from '@/components/Dock'
import TopMenuBar from '@/components/TopMenuBar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import './commissions.css'

export default function CommissionsPage() {
  return (
    <DevSidebarProvider>
      <div className="commissions-page">
        <ProofOfConceptBar />
        <TopMenuBar 
          onNewProject={() => console.log('New project')}
          onSaveProject={() => console.log('Save project')}
        />
        
        <ResponsiveLayout>
          <div className="commissions-container">
            {/* Hero Section */}
            <section className="commissions-hero">
              <h1><span style={{color: '#ffffff'}}>Video</span> <span style={{color: '#f97316'}}>Commissions</span> <span style={{color: '#ffffff'}}>Marketplace</span></h1>
              <p className="commissions-tagline">
                Commission professional video content from Bitcoin creators
              </p>
              <div className="commissions-badge">Open for Business</div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
              <h2>How Video Commissions Work</h2>
              <div className="steps-grid">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Post Your Brief</h3>
                    <p>Describe your video requirements, budget, and timeline</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Creators Bid</h3>
                    <p>Professional creators submit proposals and sample work</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Choose & Fund</h3>
                    <p>Select your creator and fund the project via smart contract</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Get Results</h3>
                    <p>Receive professional video content with full rights</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Commission Types Section */}
            <section className="commission-types-section">
              <h2>Popular Commission Types</h2>
              <div className="commission-types-grid">
                <div className="commission-type">
                  <Video className="commission-icon" />
                  <h3>Explainer Videos</h3>
                  <p>Educational content for Bitcoin concepts and technologies</p>
                  <div className="price-range">Starting from $500</div>
                </div>
                <div className="commission-type featured">
                  <Users className="commission-icon" />
                  <h3>Interview Content</h3>
                  <p>Professional interviews and documentary-style videos</p>
                  <div className="price-range">Starting from $1,000</div>
                </div>
                <div className="commission-type">
                  <Zap className="commission-icon" />
                  <h3>Promotional Videos</h3>
                  <p>Marketing content for Bitcoin products and services</p>
                  <div className="price-range">Starting from $750</div>
                </div>
                <div className="commission-type">
                  <FileText className="commission-icon" />
                  <h3>Tutorial Series</h3>
                  <p>Step-by-step educational video content</p>
                  <div className="price-range">Starting from $1,500</div>
                </div>
              </div>
            </section>

            {/* Creator Benefits Section */}
            <section className="creator-benefits-section">
              <h2>Why Creators Choose Our Platform</h2>
              <div className="benefits-content">
                <div className="benefits-grid">
                  <div className="benefit">
                    <h3>Fair Payment</h3>
                    <p>95% of commission goes to creators, 5% platform fee</p>
                  </div>
                  <div className="benefit">
                    <h3>Smart Contracts</h3>
                    <p>Automated payment upon milestone completion</p>
                  </div>
                  <div className="benefit">
                    <h3>Token Rewards</h3>
                    <p>Earn $BVIDEO tokens for successful project completion</p>
                  </div>
                  <div className="benefit">
                    <h3>Creator Profile</h3>
                    <p>Build your reputation with verified client reviews</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
              <h2>Commission Pricing Guide</h2>
              <div className="pricing-grid">
                <div className="pricing-tier">
                  <h3>Basic</h3>
                  <div className="price">$250 - $750</div>
                  <ul>
                    <li>✅ 1-3 minute videos</li>
                    <li>✅ Basic editing</li>
                    <li>✅ Standard delivery (7 days)</li>
                    <li>✅ 2 revision rounds</li>
                  </ul>
                </div>
                <div className="pricing-tier featured">
                  <h3>Professional</h3>
                  <div className="price">$750 - $2,000</div>
                  <ul>
                    <li>✅ 3-10 minute videos</li>
                    <li>✅ Advanced editing & graphics</li>
                    <li>✅ Fast delivery (5 days)</li>
                    <li>✅ Unlimited revisions</li>
                    <li>✅ Custom thumbnails</li>
                  </ul>
                </div>
                <div className="pricing-tier">
                  <h3>Enterprise</h3>
                  <div className="price">$2,000+</div>
                  <ul>
                    <li>✅ 10+ minute productions</li>
                    <li>✅ Full production team</li>
                    <li>✅ Priority support</li>
                    <li>✅ Multi-format delivery</li>
                    <li>✅ Source files included</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Active Commissions Section */}
            <section className="active-commissions-section">
              <h2>Active Commission Requests</h2>
              <div className="commissions-list">
                <div className="commission-item">
                  <div className="commission-header">
                    <h3>Bitcoin Lightning Network Explainer</h3>
                    <div className="commission-budget">$1,200</div>
                  </div>
                  <p>Need a 5-minute educational video explaining Lightning Network for beginners</p>
                  <div className="commission-meta">
                    <span className="deadline">Deadline: 14 days</span>
                    <span className="bids">3 bids</span>
                  </div>
                </div>
                
                <div className="commission-item">
                  <div className="commission-header">
                    <h3>DeFi vs Bitcoin Comparison</h3>
                    <div className="commission-budget">$800</div>
                  </div>
                  <p>Professional comparison video highlighting Bitcoin's advantages over DeFi</p>
                  <div className="commission-meta">
                    <span className="deadline">Deadline: 10 days</span>
                    <span className="bids">7 bids</span>
                  </div>
                </div>

                <div className="commission-item">
                  <div className="commission-header">
                    <h3>Mining Setup Tutorial</h3>
                    <div className="commission-budget">$1,500</div>
                  </div>
                  <p>Comprehensive tutorial series on Bitcoin mining setup and optimization</p>
                  <div className="commission-meta">
                    <span className="deadline">Deadline: 21 days</span>
                    <span className="bids">2 bids</span>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
              <h2>Ready to Commission Video Content?</h2>
              <div className="cta-buttons">
                <a 
                  href="/create?tab=commission" 
                  className="cta-btn primary"
                >
                  <Briefcase className="cta-icon" />
                  Post a Commission
                </a>
                <a 
                  href="/creators" 
                  className="cta-btn secondary"
                >
                  <Video className="cta-icon" />
                  Browse Creators
                </a>
              </div>
            </section>
          </div>
        </ResponsiveLayout>
        
        <DevSidebar />
        <Dock />
      </div>
    </DevSidebarProvider>
  );
}