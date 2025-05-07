import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ChartBarIcon,
  LinkIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import TestConnection from '../components/TestConnection';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <ShieldCheckIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-500" />
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Phishing Checks',
      value: userData?.phishingHistory?.length || 0,
      icon: LinkIcon,
      color: 'from-red-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-red-50 to-pink-50',
      textColor: 'text-red-600',
      trend: '+12%',
      trendIcon: ArrowTrendingUpIcon,
    },
    {
      name: 'Files Scanned',
      value: userData?.fileScanHistory?.length || 0,
      icon: DocumentMagnifyingGlassIcon,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50 to-emerald-50',
      textColor: 'text-green-600',
      trend: '+8%',
      trendIcon: ArrowTrendingUpIcon,
    },
    {
      name: 'Chat Interactions',
      value: userData?.chatHistory?.length || 0,
      icon: ChatBubbleLeftRightIcon,
      color: 'from-blue-500 to-indigo-500',
      bgGradient: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      textColor: 'text-blue-600',
      trend: '+15%',
      trendIcon: ArrowTrendingUpIcon,
    },
  ];

  return (
    <div className={`py-6 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with welcome message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Welcome back{userData?.firstName ? `, ${userData.firstName}` : ''}!
          </h1>
          <p className="mt-2 text-gray-600">Here's an overview of your security metrics</p>
        </div>
        
        {/* Enhanced Stats Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item, index) => (
            <div
              key={item.name}
              className={`transform hover:scale-105 transition-all duration-300 ease-in-out delay-${index * 100}`}
            >
              <div className={`bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl ${item.bgGradient}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg transform hover:rotate-3 transition-transform duration-300`}>
                      <item.icon className="h-7 w-7 text-white" aria-hidden="true" />
                    </div>
                    {/* <div className="flex items-center space-x-1 text-green-500 text-sm font-semibold">
                      <item.trendIcon className="h-4 w-4" />
                      <span>{item.trend}</span>
                    </div> */}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {item.name}
                    </h3>
                    <p className={`text-4xl font-bold ${item.textColor} mt-1`}>
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions with enhanced styling */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <ShieldCheckIcon className="h-6 w-6 mr-2 text-blue-500" />
            Quick Actions
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/phishing-detector"
              className="group relative rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center space-x-4 hover:border-blue-300"
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                <LinkIcon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Check URL</p>
                <p className="text-sm text-gray-500">Scan for phishing attempts</p>
              </div>
              <div className="flex-shrink-0 text-gray-300 group-hover:text-blue-500 transition-colors duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              to="/file-scanner"
              className="group relative rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center space-x-4 hover:border-green-300"
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 group-hover:scale-110 transition-transform duration-300">
                <DocumentMagnifyingGlassIcon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">Scan File</p>
                <p className="text-sm text-gray-500">Check for malware</p>
              </div>
              <div className="flex-shrink-0 text-gray-300 group-hover:text-green-500 transition-colors duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              to="/chatbot"
              className="group relative rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center space-x-4 hover:border-indigo-300"
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 group-hover:scale-110 transition-transform duration-300">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">Chat with AI</p>
                <p className="text-sm text-gray-500">Get security advice</p>
              </div>
              <div className="flex-shrink-0 text-gray-300 group-hover:text-indigo-500 transition-colors duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity with enhanced styling */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <ChartBarIcon className="h-6 w-6 mr-2 text-blue-500" />
            Recent Activity
          </h2>
          <div className="mt-6 bg-white shadow-lg rounded-xl overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {[...(userData?.phishingHistory || []), ...(userData?.fileScanHistory || []), ...(userData?.chatHistory || [])]
                .sort((a, b) => {
                  const dateA = new Date(a.timestamp || a.scanDate);
                  const dateB = new Date(b.timestamp || b.scanDate);
                  return dateB - dateA;
                })
                .slice(0, 5)
                .map((activity, index) => (
                  <li 
                    key={index}
                    className="transform transition-all duration-300 ease-in-out hover:bg-gray-50"
                  >
                    <div className="px-6 py-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${
                            activity.isPhishing !== undefined ? 'bg-red-100' :
                            activity.isInfected !== undefined ? 'bg-green-100' :
                            'bg-blue-100'
                          }`}>
                            {activity.isPhishing !== undefined ? (
                              <LinkIcon className="h-5 w-5 text-red-600" />
                            ) : activity.isInfected !== undefined ? (
                              <DocumentMagnifyingGlassIcon className="h-5 w-5 text-green-600" />
                            ) : (
                              <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {activity.url || activity.fileName || activity.query}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.isPhishing !== undefined
                                ? `Phishing Check: ${activity.isPhishing ? 'Suspicious' : 'Safe'}`
                                : activity.isInfected !== undefined
                                ? `File Scan: ${activity.isInfected ? 'Malware Detected' : 'File Safe'}`
                                : 'Chat Interaction'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-500">
                            {new Date(activity.timestamp || activity.scanDate).toLocaleDateString()}
                          </p>
                          <div className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            activity.isPhishing ? 'bg-red-100 text-red-800' :
                            activity.isInfected ? 'bg-red-100 text-red-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {activity.isPhishing || activity.isInfected ? 'Warning' : 'Safe'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Test Connection Component with animation */}
        <div className="mt-12 transform transition-all duration-300 ease-in-out hover:scale-102">
          <TestConnection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;