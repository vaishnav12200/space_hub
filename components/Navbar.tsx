'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/planets', label: 'Planets' },
    { href: '/stars', label: 'Stars' },
    { href: '/galaxies', label: 'Galaxies' },
    { href: '/nebulae', label: 'Nebulae' },
    { href: '/black-holes', label: 'Black Holes' },
    { href: '/news', label: 'News' },
    { href: '/missions', label: 'Missions' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#040b1e] via-[#16213e] to-[#040b1e] backdrop-blur-md border-b border-[#1dd1f2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#1dd1f2] to-[#8a2be2] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold glow-text group-hover:text-[#1dd1f2] transition-colors">
              Space Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${ 
                    pathname === item.href
                      ? 'text-[#1dd1f2] neon-border bg-[#1dd1f2]/10'
                      : 'text-gray-300 hover:text-[#1dd1f2] hover:bg-[#1dd1f2]/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#16213e] inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[#1dd1f2] hover:bg-[#1dd1f2]/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1dd1f2]"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#040b1e]/95 backdrop-blur-md border-t border-[#1dd1f2]/20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-[#1dd1f2] neon-border bg-[#1dd1f2]/10'
                    : 'text-gray-300 hover:text-[#1dd1f2] hover:bg-[#1dd1f2]/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;