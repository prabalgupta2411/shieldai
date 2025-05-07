import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-6">
              <img
                src="/shieldai_logo_v2.png"
                alt="ShieldAI Logo"
                className="h-32 w-auto"
              />
            </div>
            <p className="text-gray-600">
              Protecting users from cyber threats through advanced AI-powered security solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/security-practices" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                  Security Practices
                </Link>
              </li>
              <li>
                <Link to="/phishing-detector" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                  Phishing Detector
                </Link>
              </li>
              <li>
                <Link to="/file-scanner" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                  File Scanner
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                  Security ChatBot
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact</h3>
            <p className="text-gray-600">
              Email: support@shieldai.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} ShieldAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;