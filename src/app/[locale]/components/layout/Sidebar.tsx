'use client';

import { useState, useEffect } from 'react'; // 1. Import hooks
import { Search, BarChart3, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SidebarProps {
  activeNav?: string;
  onNavChange?: (nav: string) => void;
}

export default function Sidebar({
  activeNav = 'Reports',
  onNavChange,
}: SidebarProps) {
  const t = useTranslations();
  // 2. Add state to hold the user's name
  const [userName, setUserName] = useState('');

  // 3. Use useEffect to safely access localStorage on the client
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.fullName || '');
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        setUserName('');
      }
    }
  }, []); // The empty array [] ensures this runs only once on mount

  const navigationItems = [
    { name: t('menu.home'), icon: BarChart3 },
    { name: t('menu.manager'), icon: BarChart3 },
    { name: t('menu.report'), icon: BarChart3 },
  ];

  const handleNavClick = (navName: string) => {
    if (onNavChange) {
      onNavChange(navName);
    }
  };

  const handleLogout = () => {
    // This is fine because it only runs on a user click, which is always on the client
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="w-64 bg-neutral-700 p-6 flex flex-col">
      {/* ... (Logo and Search sections are unchanged) ... */}
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-sm">D</span>
        </div>
        <span className="text-white font-bold text-lg">Dashdark X</span>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search for..."
          className="w-full bg-neutral-600 text-white placeholder-neutral-400 rounded-lg pl-10 pr-4 py-2 text-sm"
        />
      </div>

      {/* ... (Navigation section is unchanged) ... */}
      <nav className="flex-1">
        {navigationItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
              activeNav === item.name
                ? 'bg-primary text-white'
                : 'text-neutral-300 hover:bg-neutral-600'
            }`}
            onClick={() => handleNavClick(item.name)}
          >
            <div className="flex items-center">
              <item.icon className="w-4 h-4 mr-3" />
              <span className="text-sm">{item.name}</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-neutral-600 pt-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-neutral-500 rounded-full mr-3"></div>
          <div>
            {/* 4. Use the state variable in your JSX */}
            <p className="text-white text-sm font-medium">{userName}</p>
            <p className="text-neutral-400 text-xs">Account settings</p>
            <a
              href="#"
              className="text-neutral-400 text-xs"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-primary to-secondary-4 text-white py-3 rounded-lg flex items-center justify-center text-sm font-medium">
          Get template
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
