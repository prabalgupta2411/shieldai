'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShieldCheckIcon, 
  LinkIcon, 
  DocumentMagnifyingGlassIcon, 
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
  UserGroupIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import FadeInButton from '../components/FadeInButton'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Security Practices', href: '/security-practices' },
  { name: 'Dashboard', href: '/dashboard', protected: true },
  { name: 'Phishing Detector', href: '/phishing-detector', protected: true },
  { name: 'File Scanner', href: '/file-scanner', protected: true },
  { name: 'ChatBot', href: '/chatbot', protected: true },
]

const features = [
  {
    name: 'Phishing Link Detection',
    description: 'Check any URL for potential phishing attempts and protect yourself from malicious websites.',
    icon: LinkIcon,
    href: '/phishing-detector',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'File Scanner',
    description: 'Scan files for potential malware and viruses before opening them.',
    icon: DocumentMagnifyingGlassIcon,
    href: '/file-scanner',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Security ChatBot',
    description: 'Get instant answers to your cybersecurity questions and learn best practices.',
    icon: ChatBubbleLeftRightIcon,
    href: '/chatbot',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Security Practices',
    description: 'Learn essential cybersecurity practices to protect yourself online.',
    icon: ShieldCheckIcon,
    href: '/security-practices',
    gradient: 'from-amber-500 to-orange-500',
  },
]

const stats = [
  { id: 1, name: 'Protected Users', value: '10,000+', icon: UserGroupIcon },
  { id: 2, name: 'Threats Blocked', value: '50,000+', icon: ShieldCheckIcon },
  { id: 3, name: 'Files Scanned', value: '1M+', icon: DocumentMagnifyingGlassIcon },
  { id: 4, name: 'Real-time Updates', value: '24/7', icon: BoltIcon },
]

export default function ShieldAIHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with animations */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(99,102,241,0.15),transparent)]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl py-24 sm:py-48 lg:py-56 text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-8xl">
                Protect Yourself with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> ShieldAI</span>
              </h1>
            </motion.div>
            <p className="mt-8 text-xl leading-8 text-gray-600">
              Advanced AI-powered cybersecurity platform to protect you from phishing attempts,
              malware, and other cyber threats. Stay safe online with our comprehensive security tools.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <FadeInButton>
                <Link
                  to="/register"
                  className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all duration-200 hover:shadow-xl"
                >
                  Get Started Free
                </Link>
              </FadeInButton>
              <FadeInButton>
                <Link 
                  to="/security-practices" 
                  className="text-lg font-semibold text-gray-900 transition-all duration-200 hover:text-indigo-600"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </FadeInButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center rounded-2xl bg-white/10 p-8 text-center"
              >
                <stat.icon className="h-10 w-10 text-white mb-4" />
                <dt className="text-sm leading-6 text-indigo-100">{stat.name}</dt>
                <dd className="text-4xl font-bold tracking-tight text-white mt-2">{stat.value}</dd>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Section with gradient cards */}
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl lg:text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Stay Protected</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need to stay safe online
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            ShieldAI provides a comprehensive suite of security tools to protect you from various cyber threats.
            Our AI-powered solutions help you identify and avoid potential security risks.
          </p>
        </motion.div>
        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`} />
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-200 h-full flex flex-col">
                <feature.icon className="h-10 w-10 text-indigo-600 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-gray-900">{feature.name}</h3>
                <p className="mt-4 text-base text-gray-600 flex-grow">{feature.description}</p>
                <FadeInButton>
                  <Link
                    to={feature.href}
                    className="mt-6 inline-flex items-center text-base font-semibold text-indigo-600 group-hover:text-indigo-500"
                  >
                    Try it now
                    <motion.span 
                      whileHover={{ x: 5 }}
                      className="ml-1"
                    >
                      →
                    </motion.span>
                  </Link>
                </FadeInButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Start Protecting Yourself Today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
              Join thousands of users who trust ShieldAI to keep them safe online. Sign up now and get started for free.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <FadeInButton>
                <Link
                  to="/register"
                  className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all duration-200"
                >
                  Get Started Free
                </Link>
              </FadeInButton>
              <FadeInButton>
                <Link 
                  to="/security-practices" 
                  className="text-lg font-semibold text-white transition-all duration-200 hover:text-indigo-100"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </FadeInButton>
            </div>
          </div>
        </div>
        <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
          <div
            className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-25"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}