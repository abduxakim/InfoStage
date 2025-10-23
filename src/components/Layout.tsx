import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import LoginModal from './LoginModal';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center">
                <span className="text-white">IS</span>
              </div>
              <span className="text-xl bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">InfoStage</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive('/') ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className={`transition-colors ${
                  isActive('/categories') ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                Categories
              </Link>
              <Link
                to="/trending"
                className={`transition-colors ${
                  isActive('/trending') ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                Trending
              </Link>
              <Link
                to="/search"
                className={`transition-colors ${
                  isActive('/search') ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                Search
              </Link>
              <Link
                to="/about"
                className={`transition-colors ${
                  isActive('/about') ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                About
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLoginOpen(true)}
                className="hidden md:flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <nav className="px-4 py-4 space-y-3">
              <Link
                to="/"
                className="block py-2 text-slate-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="block py-2 text-slate-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/trending"
                className="block py-2 text-slate-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Trending
              </Link>
              <Link
                to="/search"
                className="block py-2 text-slate-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                to="/about"
                className="block py-2 text-slate-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Login
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center">
                  <span className="text-white">IS</span>
                </div>
                <span className="text-xl text-white">InfoStage</span>
              </div>
              <p className="text-sm">Your premier destination for discovering and exploring events worldwide.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/trending" className="hover:text-white transition-colors">
                    Trending
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-center">
            <p>&copy; 2025 InfoStage. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
