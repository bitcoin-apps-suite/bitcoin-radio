'use client'

import React from 'react'
import { Video, Upload, Edit, Share2, Coins, Users, Zap, TrendingUp, Shield, Palette, Code, Smartphone } from 'lucide-react'
import DevSidebar from '@/components/DevSidebar'
import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import Dock from '@/components/Dock'
import TopMenuBar from '@/components/TopMenuBar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import './features.css'

export default function FeaturesPage() {
  return (
    <DevSidebarProvider>
      <div className="features-page">
        <ProofOfConceptBar />
        <TopMenuBar 
          onNewProject={() => console.log('New project')}
          onSaveProject={() => console.log('Save project')}
        />
        
        <ResponsiveLayout>
          <div className="features-container">
            {/* Hero Section */}
            <section className="features-hero">
              <h1><span style={{color: '#ffffff'}}>Platform</span> <span style={{color: '#f97316'}}>Features</span> <span style={{color: '#ffffff'}}>& Capabilities</span></h1>
              <p className="features-tagline">
                Professional video creation tools powered by Bitcoin technology
              </p>
              <div className="features-badge">Full Featured</div>
            </section>

            {/* Core Features Section */}
            <section className="core-features-section">
              <h2>Core Video Features</h2>
              <div className="features-grid">
                <div className="feature-card featured">
                  <Video className="feature-icon" />
                  <h3>Professional Radio Studio</h3>
                  <p>Browser-based video editing with timeline, transitions, and effects</p>
                  <ul className="feature-list">
                    <li>Multi-track timeline editing</li>
                    <li>Real-time preview and rendering</li>
                    <li>Professional transitions and effects</li>
                    <li>Audio mixing and enhancement</li>
                  </ul>
                </div>
                
                <div className="feature-card">
                  <Upload className="feature-icon" />
                  <h3>Universal Upload</h3>
                  <p>Support for all major video formats with automatic optimization</p>
                  <ul className="feature-list">
                    <li>MP4, MOV, AVI, WebM support</li>
                    <li>Automatic format conversion</li>
                    <li>Quality optimization for web</li>
                    <li>Batch upload capabilities</li>
                  </ul>
                </div>

                <div className="feature-card">
                  <Edit className="feature-icon" />
                  <h3>AI-Powered Editing</h3>
                  <p>Intelligent editing assistance and content generation</p>
                  <ul className="feature-list">
                    <li>Auto-cut and scene detection</li>
                    <li>Smart thumbnail generation</li>
                    <li>Automated transcription</li>
                    <li>Content optimization suggestions</li>
                  </ul>
                </div>

                <div className="feature-card">
                  <Share2 className="feature-icon" />
                  <h3>Multi-Platform Publishing</h3>
                  <p>Distribute content across multiple platforms simultaneously</p>
                  <ul className="feature-list">
                    <li>Spotify, Apple Podcasts integration</li>
                    <li>Social media optimization</li>
                    <li>Custom embed codes</li>
                    <li>SEO-optimized descriptions</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Monetization Features Section */}
            <section className="monetization-section">
              <h2>Creator Monetization</h2>
              <div className="monetization-grid">
                <div className="monetization-card">
                  <Coins className="monetization-icon" />
                  <h3>$BVIDEO Token Rewards</h3>
                  <p>Earn platform tokens for quality content creation and engagement</p>
                  <div className="monetization-stats">
                    <div className="stat">
                      <span className="stat-value">95%</span>
                      <span className="stat-label">Creator Share</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">400M</span>
                      <span className="stat-label">Tokens for Creators</span>
                    </div>
                  </div>
                </div>

                <div className="monetization-card">
                  <TrendingUp className="monetization-icon" />
                  <h3>Video NFTs</h3>
                  <p>Tokenize your videos and sell ownership shares to fans</p>
                  <div className="monetization-features">
                    <ul>
                      <li>Fractional ownership sales</li>
                      <li>Royalty distribution</li>
                      <li>Limited edition releases</li>
                      <li>Fan investment opportunities</li>
                    </ul>
                  </div>
                </div>

                <div className="monetization-card">
                  <Users className="monetization-icon" />
                  <h3>Subscription Model</h3>
                  <p>Build recurring revenue with premium content subscriptions</p>
                  <div className="monetization-features">
                    <ul>
                      <li>Tiered subscription levels</li>
                      <li>Exclusive content access</li>
                      <li>Direct fan communication</li>
                      <li>Monthly revenue tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Advanced Features Section */}
            <section className="advanced-features-section">
              <h2>Advanced Platform Capabilities</h2>
              <div className="advanced-grid">
                <div className="advanced-feature">
                  <div className="advanced-icon-wrapper">
                    <Shield className="advanced-icon" />
                  </div>
                  <div className="advanced-content">
                    <h3>Blockchain Security</h3>
                    <p>Content integrity and ownership verification through Bitcoin SV blockchain</p>
                    <ul>
                      <li>Immutable content hashes</li>
                      <li>Ownership provenance</li>
                      <li>Copyright protection</li>
                      <li>Revenue transparency</li>
                    </ul>
                  </div>
                </div>

                <div className="advanced-feature">
                  <div className="advanced-icon-wrapper">
                    <Zap className="advanced-icon" />
                  </div>
                  <div className="advanced-content">
                    <h3>Lightning-Fast Delivery</h3>
                    <p>Global CDN network for instant video streaming and downloads</p>
                    <ul>
                      <li>Sub-second load times</li>
                      <li>Adaptive bitrate streaming</li>
                      <li>Global edge servers</li>
                      <li>Mobile optimization</li>
                    </ul>
                  </div>
                </div>

                <div className="advanced-feature">
                  <div className="advanced-icon-wrapper">
                    <Palette className="advanced-icon" />
                  </div>
                  <div className="advanced-content">
                    <h3>Brand Customization</h3>
                    <p>Complete control over your channel appearance and branding</p>
                    <ul>
                      <li>Custom channel themes</li>
                      <li>Logo and watermark overlay</li>
                      <li>Branded player controls</li>
                      <li>Custom domain support</li>
                    </ul>
                  </div>
                </div>

                <div className="advanced-feature">
                  <div className="advanced-icon-wrapper">
                    <Code className="advanced-icon" />
                  </div>
                  <div className="advanced-content">
                    <h3>Developer API</h3>
                    <p>Comprehensive APIs for custom integrations and applications</p>
                    <ul>
                      <li>RESTful API endpoints</li>
                      <li>Webhook notifications</li>
                      <li>SDK for major languages</li>
                      <li>GraphQL support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Analytics & Insights Section */}
            <section className="analytics-section">
              <h2>Analytics & Creator Insights</h2>
              <div className="analytics-content">
                <div className="analytics-dashboard">
                  <h3>Comprehensive Analytics Dashboard</h3>
                  <div className="analytics-features">
                    <div className="analytics-feature">
                      <h4>Audience Analytics</h4>
                      <ul>
                        <li>Demographic breakdown</li>
                        <li>Geographic distribution</li>
                        <li>Engagement patterns</li>
                        <li>Retention metrics</li>
                      </ul>
                    </div>
                    <div className="analytics-feature">
                      <h4>Revenue Analytics</h4>
                      <ul>
                        <li>Token earnings tracking</li>
                        <li>NFT sales performance</li>
                        <li>Subscription revenue</li>
                        <li>Commission insights</li>
                      </ul>
                    </div>
                    <div className="analytics-feature">
                      <h4>Content Performance</h4>
                      <ul>
                        <li>View count analytics</li>
                        <li>Engagement rates</li>
                        <li>Share tracking</li>
                        <li>Completion rates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="insights-panel">
                  <h3>AI-Powered Insights</h3>
                  <p>Machine learning analysis to help optimize your content strategy</p>
                  <div className="insights-features">
                    <div className="insight-item">
                      <span className="insight-emoji">🎯</span>
                      <span>Optimal posting times</span>
                    </div>
                    <div className="insight-item">
                      <span className="insight-emoji">📈</span>
                      <span>Trending topic suggestions</span>
                    </div>
                    <div className="insight-item">
                      <span className="insight-emoji">👥</span>
                      <span>Audience growth predictions</span>
                    </div>
                    <div className="insight-item">
                      <span className="insight-emoji">💰</span>
                      <span>Revenue optimization tips</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mobile Features Section */}
            <section className="mobile-features-section">
              <h2>Mobile-First Experience</h2>
              <div className="mobile-content">
                <div className="mobile-feature-card">
                  <Smartphone className="mobile-icon" />
                  <h3>Mobile Creator Studio</h3>
                  <p>Full video editing capabilities optimized for mobile devices</p>
                  <div className="mobile-capabilities">
                    <div className="capability">
                      <h4>Touch-Optimized Editing</h4>
                      <p>Intuitive gestures for cutting, trimming, and arranging clips</p>
                    </div>
                    <div className="capability">
                      <h4>Vertical Video Support</h4>
                      <p>Native support for vertical and square video formats</p>
                    </div>
                    <div className="capability">
                      <h4>Offline Editing</h4>
                      <p>Continue editing even without internet connection</p>
                    </div>
                  </div>
                </div>

                <div className="mobile-stats">
                  <h3>Mobile Performance</h3>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-number">2x</span>
                      <span className="stat-desc">Faster mobile rendering</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">90%</span>
                      <span className="stat-desc">Battery efficiency</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">5G</span>
                      <span className="stat-desc">Optimized streaming</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Coming Soon Section */}
            <section className="coming-soon-section">
              <h2>Coming Soon</h2>
              <div className="coming-soon-grid">
                <div className="coming-soon-item">
                  <h3>Live Streaming</h3>
                  <p>Real-time streaming with chat and token integration</p>
                  <div className="timeline">Q2 2025</div>
                </div>
                <div className="coming-soon-item">
                  <h3>VR/AR Support</h3>
                  <p>Immersive content creation and viewing experiences</p>
                  <div className="timeline">Q3 2025</div>
                </div>
                <div className="coming-soon-item">
                  <h3>Collaborative Editing</h3>
                  <p>Real-time collaboration on video projects</p>
                  <div className="timeline">Q4 2025</div>
                </div>
                <div className="coming-soon-item">
                  <h3>AI Voice Synthesis</h3>
                  <p>Generate natural voiceovers in multiple languages</p>
                  <div className="timeline">2026</div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
              <h2>Ready to Create?</h2>
              <p>Start using Bitcoin Radio's powerful features today</p>
              <div className="cta-buttons">
                <a href="/create" className="cta-btn primary">
                  <Video className="cta-icon" />
                  Start Creating
                </a>
                <a href="/docs" className="cta-btn secondary">
                  <Code className="cta-icon" />
                  View Documentation
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