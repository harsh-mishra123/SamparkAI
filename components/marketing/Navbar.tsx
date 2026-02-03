'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/documentation', label: 'Docs' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <span className="text-xl font-bold">S</span>
            </div>
            <span className="text-xl font-bold gradient-text">SamparkAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/ai-customer-chat">
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-semibold transition-all flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Sampark AI
              </button>
            </Link>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/login">
                  <button className="gradient-btn">Get Started</button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-card border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/ai-customer-chat" onClick={() => setIsOpen(false)}>
              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-semibold transition-all flex items-center justify-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4" />
                Sampark AI Chat
              </button>
            </Link>
            {isSignedIn ? (
              <div className="py-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button className="gradient-btn w-full mt-2">Get Started</button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
