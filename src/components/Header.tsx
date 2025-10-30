"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Menu, X } from 'lucide-react';
import WalletButton from './WalletButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || (path !== "/" && pathname?.startsWith(path));

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg group-hover:from-purple-500 group-hover:to-purple-600 transition-colors">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              DakuCrypto
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-purple-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/generate" 
              className={`text-sm font-medium transition-colors ${
                isActive('/generate') ? 'text-purple-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Generate
            </Link>
            <Link 
              href="/directory" 
              className={`text-sm font-medium transition-colors ${
                isActive('/directory') ? 'text-purple-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Directory
            </Link>
            <Link
              href="/generate"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
            >
              Create Website
            </Link>
            <WalletButton />
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/generate" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/generate') ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Generate
              </Link>
              <Link 
                href="/directory" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/directory') ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Directory
              </Link>
              <Link
                href="/generate"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Website
              </Link>
              <div className="pt-2">
                <WalletButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;