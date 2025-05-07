import { ShieldCheckIcon, LockClosedIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

const practices = [
  {
    title: 'Strong Password Management',
    description: 'Use unique, complex passwords for each account and enable two-factor authentication when available.',
    icon: LockClosedIcon,
    gradient: 'from-blue-500 to-cyan-500',
    tips: [
      'Use a password manager to generate and store secure passwords',
      'Enable 2FA on all accounts that support it',
      'Change passwords regularly',
      'Never share passwords with anyone',
      'Use different passwords for different accounts'
    ]
  },
  {
    title: 'Email Security',
    description: 'Be cautious with emails and protect yourself from phishing attempts.',
    icon: ExclamationTriangleIcon,
    gradient: 'from-purple-500 to-pink-500',
    tips: [
      'Verify sender email addresses carefully',
      'Don\'t click on suspicious links',
      'Be wary of urgent or threatening messages',
      'Check for spelling and grammar errors',
      'Verify website URLs before entering sensitive information'
    ]
  },
  {
    title: 'Safe Browsing Habits',
    description: 'Practice safe browsing to protect yourself from malicious websites and downloads.',
    icon: ShieldCheckIcon,
    gradient: 'from-green-500 to-emerald-500',
    tips: [
      'Use HTTPS websites whenever possible',
      'Keep your browser and plugins updated',
      'Use a reputable antivirus program',
      'Be cautious with public Wi-Fi networks',
      'Use a VPN when connecting to public networks'
    ]
  },
  {
    title: 'Data Protection',
    description: 'Protect your personal and sensitive data from unauthorized access.',
    icon: ShieldCheckIcon,
    gradient: 'from-amber-500 to-orange-500',
    tips: [
      'Regularly backup important data',
      'Encrypt sensitive files and communications',
      'Use secure cloud storage services',
      'Be careful with personal information on social media',
      'Shred sensitive documents before disposal'
    ]
  },
  {
    title: 'Device Security',
    description: 'Keep your devices secure and protected from malware and unauthorized access.',
    icon: LockClosedIcon,
    gradient: 'from-red-500 to-rose-500',
    tips: [
      'Keep operating systems and software updated',
      'Use strong device passwords or biometric authentication',
      'Enable device encryption',
      'Install apps only from official sources',
      'Regularly scan for malware'
    ]
  },
  {
    title: 'Social Engineering Awareness',
    description: 'Be aware of social engineering tactics used to manipulate people into revealing sensitive information.',
    icon: ExclamationTriangleIcon,
    gradient: 'from-indigo-500 to-violet-500',
    tips: [
      'Be skeptical of unsolicited requests',
      'Verify identities before sharing sensitive information',
      'Don\'t trust urgent or threatening messages',
      'Be careful with personal information on social media',
      'Report suspicious activities to relevant authorities'
    ]
  },
  {
    title: 'Network Security',
    description: 'Protect your home and work networks from unauthorized access.',
    icon: ShieldCheckIcon,
    gradient: 'from-teal-500 to-cyan-500',
    tips: [
      'Use strong Wi-Fi passwords',
      'Enable network encryption (WPA3)',
      'Change default router passwords',
      'Keep router firmware updated',
      'Use a firewall'
    ]
  },
  {
    title: 'Mobile Security',
    description: 'Keep your mobile devices secure and protected.',
    icon: LockClosedIcon,
    gradient: 'from-sky-500 to-blue-500',
    tips: [
      'Use screen locks and biometric authentication',
      'Keep apps and operating system updated',
      'Be careful with app permissions',
      'Use mobile security apps',
      'Enable remote wipe capabilities'
    ]
  },
  {
    title: 'Online Shopping Safety',
    description: 'Protect yourself while shopping online.',
    icon: ShieldCheckIcon,
    gradient: 'from-lime-500 to-green-500',
    tips: [
      'Use secure payment methods',
      'Shop only on reputable websites',
      'Check for HTTPS in the URL',
      'Use strong passwords for shopping accounts',
      'Monitor bank statements regularly'
    ]
  },
  {
    title: 'Children\'s Online Safety',
    description: 'Protect children from online threats and inappropriate content.',
    icon: ShieldCheckIcon,
    gradient: 'from-fuchsia-500 to-purple-500',
    tips: [
      'Use parental controls',
      'Monitor online activities',
      'Teach safe online behavior',
      'Keep devices in common areas',
      'Use child-friendly search engines'
    ]
  }
];

const SecurityPractices = () => {
  const [selectedPractice, setSelectedPractice] = useState(null);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(99,102,241,0.15),transparent)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Essential Cybersecurity
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Practices</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
              Follow these best practices to protect yourself from cyber threats and stay safe online.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Practices Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {practices.map((practice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${practice.gradient} rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`} />
              <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <practice.icon className="h-8 w-8 text-indigo-600" />
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">{practice.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{practice.description}</p>
                
                <button
                  onClick={() => setSelectedPractice(practice)}
                  className="mt-auto inline-flex items-center text-base font-semibold text-indigo-600 group-hover:text-indigo-500"
                >
                  View tips
                  <motion.span 
                    whileHover={{ x: 5 }}
                    className="ml-1"
                  >
                    →
                  </motion.span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Tips */}
      {selectedPractice && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center mb-4">
                <selectedPractice.icon className="h-8 w-8 text-indigo-600" />
                <h3 className="ml-3 text-2xl font-bold text-gray-900">{selectedPractice.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{selectedPractice.description}</p>
              
              <ul className="space-y-4">
                {selectedPractice.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">{tip}</span>
                  </motion.li>
                ))}
              </ul>
              
              <button
                onClick={() => setSelectedPractice(null)}
                className="mt-8 w-full bg-indigo-600 text-white rounded-full py-3 px-6 font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                Close
              </button>
            </motion.div>
          </div>
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm -z-10"
            onClick={() => setSelectedPractice(null)}
          />
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Protected with ShieldAI</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Put these security practices into action with our comprehensive security tools. 
            Join thousands of users who trust ShieldAI to keep them safe online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/phishing-detector"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors duration-200"
            >
              Try Phishing Detector
            </a>
            <a
              href="/file-scanner"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors duration-200"
            >
              Try File Scanner
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPractices;