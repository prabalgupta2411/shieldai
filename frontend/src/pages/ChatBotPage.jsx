import { useState, useEffect } from 'react';
import { Webchat, WebchatProvider, getClient } from '@botpress/webchat';
import { buildTheme } from "@botpress/webchat-generator";
import { motion } from 'framer-motion';
import { ShieldCheckIcon, LockClosedIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

// Configuration constants moved to the top for better organization
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;


const EXAMPLE_QUESTIONS = [
  { id: 1, text: "How can I create a strong password?" },
  { id: 2, text: "What are the signs of a phishing email?" },
  { id: 3, text: "How can I protect my data from ransomware?" },
  { id: 4, text: "What is two-factor authentication?" },
  { id: 5, text: "How can I secure my home network?" },
  { id: 6, text: "What should I do if my data is breached?" },
  { id: 7, text: "How often should I update my software?" },
  { id: 8, text: "What are common social engineering tactics?" }
];

const SECURITY_TIPS = [
  "Use a password manager for strong, unique passwords",
  "Enable two-factor authentication whenever possible",
  "Keep your software and operating systems updated",
  "Be cautious about sharing personal information online",
  "Use VPN when connecting to public Wi-Fi"
];

// Component for animated question items with click functionality
const QuestionItem = ({ question, onClick }) => {
  return (
    <motion.li 
      className="flex items-start p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors duration-200"
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onClick(question.text)}
    >
      <QuestionMarkCircleIcon className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
      <span className="ml-2 text-gray-700">{question.text}</span>
    </motion.li>
  );
};

// Security tip component with animation
const SecurityTip = ({ tip, index }) => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center">
        <ShieldCheckIcon className="h-5 w-5 text-indigo-500" />
        <span className="ml-2 text-gray-700 font-medium">{tip}</span>
      </div>
    </motion.div>
  );
};

const ChatBotPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('questions');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialize Botpress client
  const client = getClient({
    clientId: CLIENT_ID,
  });
  
  // Theme configuration
  const { theme, style } = buildTheme({
    themeName: "light",
    themeColor: "#4F46E5", // Indigo color for better contrast
  });

  // Webchat configuration
  const configuration = {
    composerPlaceholder: "Ask a cybersecurity question...",
    botName: "ShieldAI",
    botAvatar: "/avatar-shieldai-circle.png",
    botDescription:
      "ShieldAI Chatbot is a smart, real-time cybersecurity assistant built to guide users through online safety, threat awareness, and digital hygiene",
    color: '#4F46E5',
    containerWidth: '100%',
    containerHeight: '100%',
    showPoweredBy: false,
    enableTranscriptDownload: true,
    style: {
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontSize: '16px',
      borderRadius: '12px',
      boxShadow: '0 8px 16px -2px rgba(79, 70, 229, 0.15), 0 4px 8px -2px rgba(79, 70, 229, 0.1)',
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle clicking on a question example
  const handleQuestionClick = (questionText) => {
    // In a real implementation, this would send the question to the chatbot
    console.log("Question clicked:", questionText);
    // You could integrate with the Botpress API here to send the message
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <div className="flex justify-center mb-4">
            <motion.div 
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
            >
              <LockClosedIcon className="h-16 w-16 text-indigo-600" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 sm:text-5xl">
            Cybersecurity Assistant
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Your personal AI guide for staying safe online. Get instant advice on security best practices, 
            threat awareness, and digital protection strategies.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Sidebar with categories and examples */}
            <div className="p-6 bg-gradient-to-b from-blue-50 to-indigo-50 border-r border-gray-100">
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <button 
                    onClick={() => setSelectedCategory('questions')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      selectedCategory === 'questions' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Example Questions
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('tips')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      selectedCategory === 'tips' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Security Tips
                  </button>
                </div>

                <AnimatedContent selectedCategory={selectedCategory} 
                  handleQuestionClick={handleQuestionClick} />
              </div>

              <div className="bg-indigo-600 rounded-lg p-4 text-white">
                <h3 className="font-medium mb-2">Security Alert</h3>
                <p className="text-sm text-indigo-100">
                  Remember to regularly update your passwords and enable two-factor authentication on all your accounts.
                </p>
              </div>
            </div>

            {/* Chat container */}
            <div className="lg:col-span-2">
              {!isLoaded ? (
                <LoadingAnimation />
              ) : (
                <div className="h-[650px] w-full">
                  <WebchatProvider theme={theme} client={client} configuration={configuration}>
                    <Webchat />
                  </WebchatProvider>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.footer 
          className="mt-12 text-center text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} ShieldAI Cybersecurity Assistant. All rights reserved.</p>
        </motion.footer>
      </div>
    </motion.div>
  );
};

// Loading animation component
const LoadingAnimation = () => {
  return (
    <div className="h-[650px] w-full flex flex-col items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-6"
      >
        <ShieldCheckIcon className="h-16 w-16 text-indigo-500" />
      </motion.div>
      <p className="text-gray-600 font-medium">Loading your secure chat...</p>
      <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

// Content area component
const AnimatedContent = ({ selectedCategory, handleQuestionClick }) => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="mt-4">
      {selectedCategory === 'questions' ? (
        <motion.ul 
          className="space-y-3"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {EXAMPLE_QUESTIONS.map((question) => (
            <QuestionItem 
              key={question.id} 
              question={question} 
              onClick={handleQuestionClick} 
            />
          ))}
        </motion.ul>
      ) : (
        <motion.div 
          className="space-y-3"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {SECURITY_TIPS.map((tip, index) => (
            <SecurityTip key={index} tip={tip} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ChatBotPage;