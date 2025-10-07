'use client'

import React from 'react'
import { Shield, FileText, Users, CheckCircle, AlertTriangle, Scale, Lock, Eye } from 'lucide-react'
import DevSidebar from '@/components/DevSidebar'
import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import Dock from '@/components/Dock'
import TopMenuBar from '@/components/TopMenuBar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import './compliance.css'

export default function CompliancePage() {
  return (
    <DevSidebarProvider>
      <div className="compliance-page">
        <ProofOfConceptBar />
        <TopMenuBar 
          onNewProject={() => console.log('New project')}
          onSaveProject={() => console.log('Save project')}
        />
        
        <ResponsiveLayout>
          <div className="compliance-container">
            {/* Hero Section */}
            <section className="compliance-hero">
              <h1><span style={{color: '#ffffff'}}>Platform</span> <span style={{color: '#f97316'}}>Compliance</span> <span style={{color: '#ffffff'}}>& Trust</span></h1>
              <p className="compliance-tagline">
                Built on transparency, security, and regulatory compliance
              </p>
              <div className="compliance-badge">Fully Compliant</div>
            </section>

            {/* Compliance Framework Section */}
            <section className="framework-section">
              <h2>Our Compliance Framework</h2>
              <div className="framework-grid">
                <div className="framework-item">
                  <Shield className="framework-icon" />
                  <h3>Data Protection</h3>
                  <p>Full GDPR compliance with user data sovereignty and right to deletion</p>
                  <div className="compliance-status verified">✓ Verified</div>
                </div>
                <div className="framework-item">
                  <FileText className="framework-icon" />
                  <h3>Financial Regulations</h3>
                  <p>KYC/AML compliance for creators earning above regulatory thresholds</p>
                  <div className="compliance-status verified">✓ Verified</div>
                </div>
                <div className="framework-item">
                  <Scale className="framework-icon" />
                  <h3>Content Standards</h3>
                  <p>Community guidelines ensuring legal and appropriate content</p>
                  <div className="compliance-status verified">✓ Verified</div>
                </div>
                <div className="framework-item">
                  <Lock className="framework-icon" />
                  <h3>Security Standards</h3>
                  <p>ISO 27001 aligned security practices and regular audits</p>
                  <div className="compliance-status verified">✓ Verified</div>
                </div>
              </div>
            </section>

            {/* Legal Structure Section */}
            <section className="legal-section">
              <h2>Legal Structure & Governance</h2>
              <div className="legal-content">
                <div className="legal-entity">
                  <h3>Corporate Structure</h3>
                  <div className="entity-details">
                    <p><strong>The Bitcoin Corporation LTD</strong></p>
                    <p>Registered in England and Wales</p>
                    <p>Company No. 16735102</p>
                    <p>Registered Office: London, United Kingdom</p>
                  </div>
                </div>
                
                <div className="governance-model">
                  <h3>Governance Model</h3>
                  <ul>
                    <li>Token holder governance for platform decisions</li>
                    <li>Creator council representation</li>
                    <li>Independent compliance advisory board</li>
                    <li>Quarterly transparency reports</li>
                    <li>Open source platform development</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Privacy & Data Section */}
            <section className="privacy-section">
              <h2>Privacy & Data Protection</h2>
              <div className="privacy-grid">
                <div className="privacy-item">
                  <Eye className="privacy-icon" />
                  <h3>Data Minimization</h3>
                  <p>We collect only essential data required for platform operation and creator payments</p>
                </div>
                <div className="privacy-item">
                  <Users className="privacy-icon" />
                  <h3>User Rights</h3>
                  <p>Full GDPR rights including data portability, correction, and deletion</p>
                </div>
                <div className="privacy-item">
                  <Shield className="privacy-icon" />
                  <h3>Encryption</h3>
                  <p>End-to-end encryption for sensitive data and secure blockchain storage</p>
                </div>
                <div className="privacy-item">
                  <CheckCircle className="privacy-icon" />
                  <h3>Consent Management</h3>
                  <p>Granular consent controls with easy opt-out mechanisms</p>
                </div>
              </div>
            </section>

            {/* Token Compliance Section */}
            <section className="token-compliance-section">
              <h2>$BVIDEO Token Compliance</h2>
              <div className="token-compliance-content">
                <div className="compliance-notice">
                  <AlertTriangle className="notice-icon" />
                  <div className="notice-content">
                    <h3>Important Notice</h3>
                    <p>$BVIDEO tokens are designed as utility tokens for platform participation and creator rewards, not as investment instruments.</p>
                  </div>
                </div>
                
                <div className="token-rules">
                  <h3>Token Distribution Rules</h3>
                  <ul>
                    <li><strong>Performance Based:</strong> Tokens allocated based on verified contribution value</li>
                    <li><strong>Creator Focus:</strong> Primary allocation for content creators and platform builders</li>
                    <li><strong>Transparent Distribution:</strong> All allocations recorded on blockchain</li>
                    <li><strong>Regulatory Compliance:</strong> Full compliance with applicable token regulations</li>
                    <li><strong>Anti-Speculation:</strong> Designed for utility, not speculation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Content Moderation Section */}
            <section className="moderation-section">
              <h2>Content Moderation & Standards</h2>
              <div className="moderation-content">
                <div className="moderation-approach">
                  <h3>Three-Tier Moderation</h3>
                  <div className="moderation-tiers">
                    <div className="tier">
                      <div className="tier-number">1</div>
                      <div className="tier-content">
                        <h4>Automated Screening</h4>
                        <p>AI-powered initial content analysis for obvious violations</p>
                      </div>
                    </div>
                    <div className="tier">
                      <div className="tier-number">2</div>
                      <div className="tier-content">
                        <h4>Community Review</h4>
                        <p>Trusted community members review flagged content</p>
                      </div>
                    </div>
                    <div className="tier">
                      <div className="tier-number">3</div>
                      <div className="tier-content">
                        <h4>Expert Appeal</h4>
                        <p>Professional review board for contested decisions</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="community-guidelines">
                  <h3>Community Guidelines</h3>
                  <div className="guidelines-grid">
                    <div className="guideline">
                      <CheckCircle className="guideline-icon allowed" />
                      <div>
                        <h4>Allowed Content</h4>
                        <ul>
                          <li>Educational Bitcoin content</li>
                          <li>Technical discussions</li>
                          <li>Creator economy content</li>
                          <li>Open source development</li>
                        </ul>
                      </div>
                    </div>
                    <div className="guideline">
                      <AlertTriangle className="guideline-icon restricted" />
                      <div>
                        <h4>Restricted Content</h4>
                        <ul>
                          <li>Financial advice without disclosure</li>
                          <li>Unsubstantiated price predictions</li>
                          <li>Spam or misleading content</li>
                          <li>Copyright infringing material</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Transparency Reports Section */}
            <section className="transparency-section">
              <h2>Transparency & Reporting</h2>
              <div className="transparency-content">
                <div className="reports-grid">
                  <div className="report-item">
                    <h3>Q4 2024 Transparency Report</h3>
                    <p>Platform statistics, moderation actions, and financial summary</p>
                    <a href="/reports/q4-2024.pdf" className="report-link">Download Report</a>
                  </div>
                  <div className="report-item">
                    <h3>Creator Economy Report</h3>
                    <p>Token distribution, creator earnings, and platform growth metrics</p>
                    <a href="/reports/creator-economy.pdf" className="report-link">Download Report</a>
                  </div>
                  <div className="report-item">
                    <h3>Security Audit Results</h3>
                    <p>Independent security assessment and vulnerability disclosures</p>
                    <a href="/reports/security-audit.pdf" className="report-link">Download Report</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
              <h2>Compliance Contact</h2>
              <div className="contact-content">
                <div className="contact-info">
                  <h3>Legal & Compliance Team</h3>
                  <p><strong>Email:</strong> compliance@bitcoin-video.com</p>
                  <p><strong>Legal Notices:</strong> legal@bitcoin-video.com</p>
                  <p><strong>Data Protection:</strong> privacy@bitcoin-video.com</p>
                  <p><strong>Content Reports:</strong> reports@bitcoin-video.com</p>
                </div>
                
                <div className="compliance-commitments">
                  <h3>Our Commitments</h3>
                  <ul>
                    <li>24/7 compliance monitoring</li>
                    <li>Quarterly compliance reviews</li>
                    <li>Annual independent audits</li>
                    <li>Transparent reporting</li>
                    <li>Responsive support team</li>
                  </ul>
                </div>
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