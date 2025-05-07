import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingAnimation from './components/LoadingAnimation';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PhishingDetector from './pages/PhishingDetector';
import FileScanner from './pages/FileScanner';
import SecurityPractices from './pages/SecurityPractices';
import PrivateRoute from './components/PrivateRoute';
import ChatBotPage from './pages/ChatBotPage';
import ScanHistory from './components/ScanHistory';
import SignupPage from './pages/SignupPage';
import PublicRoute from './components/PublicRoute';
import NewsPage from './pages/NewsPage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <AnimatePresence>
          {loading && <LoadingAnimation />}
        </AnimatePresence>
        
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes - Only accessible when NOT logged in */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            } />

            {/* Protected Routes - Only accessible when logged in */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />

            {/* Redirect root to dashboard if logged in, otherwise to login */}
            <Route path="/" element={
              <Home/>
            } />

            <Route path="/security-practices" element={<SecurityPractices />} />
            <Route
              path="/phishing-detector"
              element={
                <PrivateRoute>
                  <PhishingDetector />
                </PrivateRoute>
              }
            />
            <Route
              path="/file-scanner"
              element={
                <PrivateRoute>
                  <FileScanner />
                </PrivateRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <PrivateRoute>
                  <ChatBotPage />
                </PrivateRoute>
              }
            />
            <Route path="/history" element={<ScanHistory />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </main>

        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
