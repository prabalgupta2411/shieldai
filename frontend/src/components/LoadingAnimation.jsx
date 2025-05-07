import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShield } from 'react-icons/fi';

const LoadingAnimation = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate random particles
    const particleCount = 15;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
    setParticles(newParticles);
  }, []);

  // Logo path variants for morphing effect
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 2, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/10 animate-pulse" />
      
      {/* Animated particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-blue-400/30"
          initial={{ 
            x: particle.x * 2,
            y: particle.y * 2,
            scale: 0,
            opacity: 0
          }}
          animate={{ 
            x: [particle.x, particle.x + (Math.random() * 40 - 20)],
            y: [particle.y, particle.y + (Math.random() * 40 - 20)],
            scale: particle.scale,
            opacity: particle.opacity
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 0.5
          }}
          style={{
            width: `${10 + Math.random() * 15}px`,
            height: `${10 + Math.random() * 15}px`,
            filter: `blur(${Math.random() * 2 + 1}px)`
          }}
        />
      ))}

      {/* Main animation container */}
      <div className="relative">
        {/* Main logo with moving gradient */}
        <motion.div 
          className="relative w-40 h-40 flex items-center justify-center rounded-full overflow-hidden"
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0.4 }}
        >
          <div className="absolute inset-0 bg-gray-800 rounded-full"></div>
          
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-blue-600/40 rounded-full"
            animate={{ 
              background: [
                "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.4) 100%)",
                "linear-gradient(225deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.4) 100%)",
                "linear-gradient(315deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.4) 100%)",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.4) 100%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Shield Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FiShield className="w-24 h-24 text-blue-500 relative z-10" />
          </motion.div>
          
          {/* Subtle inner shadow */}
          <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none"></div>
        </motion.div>
        
        {/* Animated dots around the logo */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: 'center',
              transform: `rotate(${i * 60}deg) translateY(-90px) translateX(-50%)`
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ 
              delay: 1 + i * 0.1,
              duration: 1.5,
              ease: "easeOut" 
            }}
          >
            <motion.div 
              className="w-full h-full rounded-full bg-blue-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "mirror",
                duration: 2,
                delay: i * 0.2
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Loading text with typing effect */}
      <motion.div
        className="absolute bottom-40 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center">
          <motion.h2 
            className="text-2xl font-bold text-blue-400"
          >
            Shield<span className="text-white">AI</span>
          </motion.h2>
        </div>
        
        <motion.div 
          className="mt-4 flex items-center justify-center space-x-2 text-gray-400"
        >
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation; 