'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Radio, 
  Bitcoin, 
  Mail, 
  Twitter, 
  Github, 
  Globe, 
  Heart,
  ExternalLink,
  Podcast,
  Headphones,
  Music,
  Mic
} from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribe:', email)
    setEmail('')
  }

  const footerLinks = {
    platform: [
      { name: 'Radio Studio', href: '/studio' },
      { name: 'Live Broadcasting', href: '/live' },
      { name: 'Podcast Creator', href: '/podcast' },
      { name: 'Music Library', href: '/music' },
      { name: 'Analytics', href: '/analytics' },
    ],
    community: [
      { name: 'Discord', href: 'https://discord.gg/bitcoin-radio' },
      { name: 'Telegram', href: 'https://t.me/bitcoin_radio' },
      { name: 'Reddit', href: 'https://reddit.com/r/BitcoinRadio' },
      { name: 'Bitcoin Forum', href: 'https://bitcointalk.org' },
      { name: 'BSV Association', href: 'https://bsvassociation.org' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Open Source Tools', href: '/tools' },
      { name: 'AzuraCast Integration', href: '/azuracast' },
    ],
    company: [
      { name: 'About Bitcoin OS', href: '/about' },
      { name: 'Roadmap', href: '/roadmap' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Contact', href: '/contact' },
    ]
  }

  const openSourceTools = [
    { name: 'AzuraCast', description: 'Web radio management', url: 'https://azuracast.com' },
    { name: 'LibreTime', description: 'Broadcast automation', url: 'https://libretime.org' },
    { name: 'Castopod', description: 'Podcast hosting', url: 'https://castopod.org' },
    { name: 'Icecast', description: 'Streaming server', url: 'https://icecast.org' },
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-950 via-black to-gray-950 border-t border-radio-brown-500/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-radio-brown-500 to-radio-brown-600 rounded-xl shadow-lg">
                <Radio className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Bitcoin Radio</h3>
                <p className="text-radio-brown-400 text-sm">Powered by Bitcoin SV</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              The world's first blockchain-native radio platform. Create, broadcast, and monetize 
              your audio content with Bitcoin micropayments and NFT tokenization.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-radio-brown-400" />
                Stay Updated
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-radio-brown-500 focus:outline-none text-white text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-radio-brown-500 to-radio-brown-600 rounded-lg font-medium hover:from-radio-brown-600 hover:to-radio-brown-700 transition-all duration-300 text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: 'https://twitter.com/bitcoin_radio' },
                { icon: Github, href: 'https://github.com/bitcoin-os/bitcoin-radio' },
                { icon: Globe, href: 'https://bitcoinsv.org' },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-800 hover:bg-radio-brown-500 rounded-lg transition-colors duration-300"
                >
                  <Icon className="w-4 h-4 text-gray-300 hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Podcast className="w-4 h-4 text-radio-brown-400" />
              Platform
            </h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-radio-brown-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-radio-brown-400" />
              Community
            </h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-radio-brown-400 transition-colors duration-200 text-sm flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Music className="w-4 h-4 text-radio-brown-400" />
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-radio-brown-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Open Source Tools Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Github className="w-4 h-4 text-radio-brown-400" />
            Built on Open Source
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {openSourceTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors duration-300 group"
              >
                <h5 className="text-radio-brown-400 font-medium text-sm group-hover:text-orange-300">
                  {tool.name}
                </h5>
                <p className="text-gray-500 text-xs mt-1">{tool.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <p className="flex items-center gap-1">
                © 2024 Bitcoin Radio. Built with 
                <Heart className="w-3 h-3 text-red-500 mx-1" />
                on Bitcoin SV
              </p>
              <Link href="/privacy" className="hover:text-radio-brown-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-radio-brown-400 transition-colors">
                Terms of Service
              </Link>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Bitcoin className="w-4 h-4 text-radio-brown-400" />
              <span>Powered by Bitcoin SV blockchain</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}