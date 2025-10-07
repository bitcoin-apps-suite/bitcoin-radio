'use client'

import React from 'react'
import { Coins, Code, Video, Users, TrendingUp, Zap, ChevronRight, Github, ExternalLink, PieChart, BarChart3 } from 'lucide-react'
import DevSidebar from '@/components/DevSidebar'
import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import Dock from '@/components/Dock'
import TopMenuBar from '@/components/TopMenuBar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import './token.css'

export default function TokenPage() {
  return (
    <DevSidebarProvider>
      <div className="token-page">
        <ProofOfConceptBar />
        <TopMenuBar 
          onNewProject={() => console.log('New project')}
          onSaveProject={() => console.log('Save project')}
        />
        
        <ResponsiveLayout>
          <div className="token-container">
        {/* Hero Section */}
        <section className="token-hero">
          <h1><span style={{color: '#ffffff'}}>The</span> <span style={{color: '#8B4513'}}>Bitcoin</span> Radio <span style={{color: '#ffffff'}}>Token</span></h1>
          <p className="token-tagline">
            Decentralized radio creation meets creator ownership
          </p>
          <div className="token-badge">$BRADIO</div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <h2>Our Creator-First Philosophy</h2>
          <div className="philosophy-content">
            <p>
              Bitcoin Radio is an <strong>open-source creator economy platform</strong> built on Bitcoin SV. 
              Our mission is to give radio creators true ownership of their content through NFTs, 
              revenue sharing, and platform equity participation.
            </p>
            <p>
              The $BRADIO token represents our commitment to creating a sustainable economic model that 
              rewards creators, developers, and community contributors while fostering innovation in decentralized radio.
            </p>
            <div className="philosophy-points">
              <div className="point">
                <h3>Creator Ownership</h3>
                <p>True ownership through NFTs and revenue shares</p>
              </div>
              <div className="point">
                <h3>Developer Rewards</h3>
                <p>Significant token allocation for platform builders</p>
              </div>
              <div className="point">
                <h3>Community Driven</h3>
                <p>Governance and growth guided by stakeholders</p>
              </div>
            </div>
          </div>
        </section>

        {/* Token Model Section */}
        <section className="token-model-section">
          <h2>The $BRADIO Token Model</h2>
          <div className="model-card">
            <h3>How It Works</h3>
            <ul>
              <li>
                <strong>Creator Rewards:</strong> 40% of tokens (400M $BRADIO) allocated to radio creators 
                based on content quality, engagement, and platform growth contribution
              </li>
              <li>
                <strong>Developer Rewards:</strong> Significant token allocation distributed to 
                developers who build features, fix bugs, and improve the platform
              </li>
              <li>
                <strong>Revenue Sharing:</strong> Token holders receive dividends from platform revenues 
                including NFT sales, subscription fees, and exchange commissions
              </li>
              <li>
                <strong>Platform Equity:</strong> Major contributors may receive equity participation 
                in addition to token rewards
              </li>
              <li>
                <strong>Governance Rights:</strong> $BRADIO holders vote on platform features, 
                revenue distribution, and strategic decisions
              </li>
            </ul>
          </div>

          <div className="model-card warning">
            <h3>Important Notices</h3>
            <ul>
              <li>
                <strong>Performance Based:</strong> Token allocation based on contribution quality 
                and impact, not guaranteed for participation
              </li>
              <li>
                <strong>Creator Economy:</strong> Designed as creator rewards and platform participation, 
                not investment instruments
              </li>
              <li>
                <strong>Revenue Sharing:</strong> Dividends distributed based on platform performance 
                and community governance decisions
              </li>
              <li>
                <strong>Blockchain Native:</strong> All tokens issued and tracked on Bitcoin SV 
                blockchain for transparency and immutability
              </li>
            </ul>
          </div>
        </section>

        {/* Business Model Section */}
        <section className="business-section">
          <h2>The Bitcoin Radio Economy</h2>
          <div className="business-content">
            <p className="intro">
              Our sustainable creator economy combines multiple revenue streams to reward creators, 
              developers, and token holders while maintaining platform growth.
            </p>

            <div className="business-model">
              <h3>Creator Revenue Streams</h3>
              <div className="revenue-streams">
                <div className="stream">
                  <h4>Audio NFTs</h4>
                  <p>Tokenize audio shows, sell ownership shares</p>
                  <p className="price">95% to creator</p>
                </div>
                <div className="stream featured">
                  <h4>Subscriptions</h4>
                  <p>Premium content and exclusive access</p>
                  <p className="price">90% to creator</p>
                </div>
                <div className="stream">
                  <h4>Tips & Donations</h4>
                  <p>Direct fan support and appreciation</p>
                  <p className="price">95% to creator</p>
                </div>
              </div>
              
              <h3 style={{marginTop: '40px'}}>Platform Revenue</h3>
              <div className="revenue-streams">
                <div className="stream">
                  <h4>NFT Marketplace</h4>
                  <p>Audio NFT trading and royalties</p>
                  <p className="price">2.5% fee</p>
                </div>
                <div className="stream featured">
                  <h4>Creator Shares</h4>
                  <p>Investment in creator revenue streams</p>
                  <p className="price">1.5% fee</p>
                </div>
                <div className="stream">
                  <h4>Premium Features</h4>
                  <p>Advanced tools and analytics</p>
                  <p className="price">Monthly fees</p>
                </div>
              </div>
            </div>

            <div className="value-flow">
              <h3>Value Distribution</h3>
              <div className="flow-diagram">
                <div className="flow-item">
                  <span>Platform Revenue</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>$BRADIO Token Buybacks</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Dividends to Token Holders</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Creator & Developer Rewards</span>
                </div>
              </div>
              <p style={{textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)'}}>
                The Bitcoin Radio platform enables creators to tokenize their content, build audiences, and 
                share in platform success through a transparent, blockchain-based economy.
              </p>
            </div>
          </div>
        </section>

        {/* How to Contribute Section */}
        <section className="contribute-section">
          <h2>How to Earn $BRADIO Tokens</h2>
          <div className="contribute-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Audio Shows</h3>
              <p>Upload original audio content and build your audience on the platform</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Develop Features</h3>
              <p>Contribute code through GitHub issues and help build the platform</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Build Community</h3>
              <p>Engage with creators, promote platform growth, and participate in governance</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Earn Rewards</h3>
              <p>Receive $BRADIO tokens based on contribution value and community impact</p>
            </div>
          </div>

          <div className="contribution-examples">
            <h3>What We Reward</h3>
            <ul>
              <li>✅ High-quality audio content</li>
              <li>✅ Platform feature development</li>
              <li>✅ Community building and engagement</li>
              <li>✅ Bug fixes and improvements</li>
              <li>✅ Creator tools and integrations</li>
              <li>✅ Educational content and tutorials</li>
            </ul>
          </div>
        </section>

        {/* Token Stats Section */}
        <section className="stats-section">
          <h2>Token Distribution</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3>Total Supply</h3>
              <p className="stat-value">1,000,000,000</p>
              <p className="stat-label">$BRADIO tokens</p>
            </div>
            <div className="stat">
              <h3>For Creators</h3>
              <p className="stat-value">400M</p>
              <p className="stat-label">40% allocation</p>
            </div>
            <div className="stat">
              <h3>For Developers</h3>
              <p className="stat-value">Substantial</p>
              <p className="stat-label">Token rewards</p>
            </div>
            <div className="stat">
              <h3>Blockchain</h3>
              <p className="stat-value">BSV</p>
              <p className="stat-label">Bitcoin SV</p>
            </div>
          </div>
        </section>

        {/* Legal Section */}
        <section className="legal-section">
          <h2>Economic Model & Governance</h2>
          <div className="legal-content">
            <p>
              <strong>Revenue Sharing:</strong> $BRADIO token holders participate in platform success 
              through dividend distributions from NFT sales, subscription revenues, and marketplace fees. 
              Distribution amounts determined by governance vote and platform performance.
            </p>
            <p>
              <strong>Creator Economy:</strong> Our model prioritizes creator ownership and fair 
              compensation. Creators retain 90-95% of revenues while building equity through token 
              rewards and potential platform ownership participation.
            </p>
            <p>
              <strong>Developer Incentives:</strong> Substantial token rewards allocated to reward 
              platform development. Contributors earn tokens for merged code, bug fixes, and feature 
              implementations that add measurable value.
            </p>
            <p>
              <strong>Governance Rights:</strong> Token holders vote on feature priorities, revenue 
              distribution parameters, and platform governance decisions through on-chain voting mechanisms.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to Join the Creator Economy?</h2>
          <div className="cta-buttons">
            <a 
              href="/contracts" 
              className="cta-btn primary"
            >
              <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
              Browse Dev Contracts
            </a>
            <a 
              href="https://github.com/bitcoin-apps-suite/bitcoin-radio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-btn secondary"
            >
              <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              View on GitHub
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