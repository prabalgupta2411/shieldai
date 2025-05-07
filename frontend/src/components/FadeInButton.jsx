import React from 'react';
import { motion } from 'framer-motion';

const FadeInButton = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeInButton; 