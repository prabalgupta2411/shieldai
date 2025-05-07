import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { LinkIcon, ExclamationTriangleIcon, CheckCircleIcon, ShieldCheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Circular Progress Component with animation
const CircularProgress = ({ percentage, color, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [offset, setOffset] = useState(circumference);

  // Animate when percentage changes
  useState(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (percentage / 100) * circumference);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage, circumference]);
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={`${color} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-xl font-bold transition-all duration-500">{percentage.toFixed(0)}%</span>
    </div>
  );
};

const PhishingDetector = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setIsVisible(false);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/phishing/check`,
        { url },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setResult(response.data);
      setTimeout(() => setIsVisible(true), 100);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error checking URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-6 transform hover:scale-110 transition-transform duration-300">
            <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Phishing URL Detector
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Protect yourself from malicious websites. Enter a URL below to analyze its safety.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                URL to check
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="url"
                  id="url"
                  required
                  className="block w-full pl-10 pr-3 py-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center py-3 px-6 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking...
                </>
              ) : (
                <>
                  Check URL
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>

        {result && (
          <div className={`mt-12 transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`rounded-2xl p-8 shadow-xl ${
              result.isPhishing 
                ? 'bg-gradient-to-br from-red-50 to-pink-50 border border-red-100' 
                : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100'
            }`}>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <div className="flex-shrink-0 mr-4">
                    {result.isPhishing ? (
                      <div className="p-4 bg-red-100 rounded-xl transform hover:rotate-6 transition-transform duration-300">
                        <ExclamationTriangleIcon className="h-8 w-8 text-red-500" aria-hidden="true" />
                      </div>
                    ) : (
                      <div className="p-4 bg-green-100 rounded-xl transform hover:rotate-6 transition-transform duration-300">
                        <CheckCircleIcon className="h-8 w-8 text-green-500" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${
                      result.isPhishing ? 'text-red-800' : 'text-green-800'
                    }`}>
                      {result.isPhishing ? 'Potential Phishing URL Detected' : 'URL Appears Safe'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 truncate max-w-xs">
                      {url}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                    <span className="text-sm font-medium text-gray-700 mb-2">Phishing Probability</span>
                    <CircularProgress 
                      percentage={result.probability * 100} 
                      color={result.isPhishing ? 'text-red-500' : 'text-green-500'} 
                    />
                  </div>
                  <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                    <span className="text-sm font-medium text-gray-700 mb-2">Confidence</span>
                    <CircularProgress 
                      percentage={result.confidence * 100} 
                      color="text-blue-500" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Analysis Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm transform hover:scale-105 transition-all duration-300">
                    <span className="font-medium text-gray-700">URL</span>
                    <p className="mt-1 text-gray-600 break-all text-sm">{url}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm transform hover:scale-105 transition-all duration-300">
                    <span className="font-medium text-gray-700">Risk Level</span>
                    <p className={`mt-1 font-semibold ${
                      result.isPhishing ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {result.isPhishing ? 'High Risk' : 'Low Risk'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Tips for Identifying Phishing URLs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🔍", text: "Check for misspellings in the domain name" },
              { icon: "🌐", text: "Look for suspicious subdomains" },
              { icon: "🔒", text: "Verify the website uses HTTPS" },
              { icon: "⚠️", text: "Be cautious of URLs containing IP addresses" },
              { icon: "🔑", text: "Check for suspicious patterns like 'login', 'secure', 'verify'" },
              { icon: "🎯", text: "Watch out for shortened URLs" }
            ].map((tip, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{tip.icon}</span>
                  <span className="text-sm text-gray-600">{tip.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingDetector;