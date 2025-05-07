import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Security Practices", href: "/security-practices" },
  { name: "News", href: "/news" },
  { name: "Dashboard", href: "/dashboard", protected: true },
  { name: "Phishing Detector", href: "/phishing-detector", protected: true },
  { name: "File Scanner", href: "/file-scanner", protected: true },
  { name: "ChatBot", href: "/chatbot", protected: true },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Add spacer div to prevent content from being covered */}
      <div className="h-16" />
      
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex h-16 items-center justify-between">
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center">
                <img
                  src="/avatar-shieldai-circle.png"
                  alt="ShieldAI Logo"
                  className="h-12 w-12 transition-transform duration-300 hover:scale-110"
                />
                {/* <span className="ml-2 text-xl font-bold text-gray-900">
                  ShieldAI
                </span> */}
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-8">
              {navigation.map((item) => {
                if (item.protected && !token) return null;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-semibold transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="rounded-full px-4 py-2 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full px-4 py-2 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <Dialog
          as="div"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="-m-1.5 p-1.5 flex items-center"
              >
                <img
                  src="/avatar-shieldai-circle.png"
                  alt="ShieldAI Logo"
                  className="h-8 w-8"
                />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  ShieldAI
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => {
                    if (item.protected && !token) return null;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'text-indigo-600 bg-indigo-50'
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
                <div className="py-6">
                  {token ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="block w-full rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block w-full rounded-lg bg-indigo-600 px-3 py-2 text-center text-base font-semibold text-white hover:bg-indigo-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}