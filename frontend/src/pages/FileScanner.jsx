import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DocumentMagnifyingGlassIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const FileScanner = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Simulate scan progress when loading
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 300);
    } else {
      setScanProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to scan');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/filescan/scan`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setScanProgress(100);
      setTimeout(() => {
        setResult(response.data);
      }, 500);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error scanning file');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setResult(null);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            File Scanner
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Upload a file to check for potential malware or suspicious content.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="mt-12"
          variants={itemVariants}
        >
          <motion.div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-all duration-300 ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
            animate={dragActive ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-1 text-center">
              <motion.div animate={dragActive ? pulseAnimation : {}}>
                <DocumentMagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
              </motion.div>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">Any file up to 100MB</p>
            </div>
          </motion.div>

          <AnimatePresence>
            {file && (
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center p-2 bg-blue-50 rounded-md">
                  <DocumentMagnifyingGlassIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <p className="text-sm text-gray-600">Selected: <span className="font-medium">{file.name}</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            className="mt-6"
            variants={itemVariants}
          >
            <button
              type="submit"
              disabled={loading || !file}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Scanning...' : 'Scan File'}
            </button>
          </motion.div>
        </motion.form>

        <AnimatePresence>
          {loading && (
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-50 rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Scanning file...</span>
                  <span className="text-sm text-gray-500">{Math.round(scanProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={`rounded-md p-4 ${
                  result.isInfected ? 'bg-red-50' : 'bg-green-50'
                }`}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <motion.div
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {result.isInfected ? (
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                      ) : (
                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                      )}
                    </motion.div>
                  </div>
                  <div className="ml-3">
                    <h3 className={`text-sm font-medium ${
                      result.isInfected ? 'text-red-800' : 'text-green-800'
                    }`}>
                      {result.isInfected ? 'Malware Detected' : 'File Appears Safe'}
                    </h3>
                    <div className="mt-2 text-sm text-gray-700">
                      <p><span className="font-medium">File:</span> {result.fileName}</p>
                      {result.viruses && result.viruses.length > 0 && (
                        <motion.div 
                          className="mt-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                        >
                          <p className="font-medium">Detected Viruses:</p>
                          <ul className="list-disc pl-5">
                            {result.viruses.map((virus, index) => (
                              <motion.li 
                                key={index} 
                                className="text-red-600"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                              >
                                {virus}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                      <p className="mt-1"><span className="font-medium">Scan Date:</span> {new Date(result.scanDate).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="mt-12"
          variants={itemVariants}
        >
          <h2 className="text-lg font-medium text-gray-900">Tips for Safe File Handling</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            {[
              "Only download files from trusted sources",
              "Be cautious of executable files (.exe, .bat, .cmd)",
              "Keep your antivirus software updated",
              "Scan files before opening them",
              "Be wary of files with unusual sizes or extensions"
            ].map((tip, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 5, color: '#2563EB' }}
              >
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <span className="ml-2">{tip}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FileScanner;