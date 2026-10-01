import React, { useState } from 'react';
import { Newspaper, Sparkles, Menu, X, ArrowRight, BarChart3, HelpCircle, Info, Code2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'news' | 'how-it-works' | 'about' | 'architecture';
  setActiveTab: (tab: 'home' | 'news' | 'how-it-works' | 'about' | 'architecture') => void;
  onFetchAndSimplify: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onFetchAndSimplify,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'news' | 'how-it-works' | 'about' | 'architecture') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element / logo brand wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center relative shadow-sm group-hover:bg-blue-600 transition-colors">
              <Newspaper className="w-5 h-5 text-slate-100" />
              <Sparkles className="w-3 h-3 text-amber-400 absolute -top-0.5 -right-0.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Market<span className="text-blue-600 group-hover:text-slate-900">Plain</span>
              </span>
            </div>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors hover:text-slate-900 relative py-1 ${
                activeTab === 'home' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              Home
              {activeTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('news')}
              className={`transition-colors hover:text-slate-900 relative py-1 ${
                activeTab === 'news' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              Latest News
              {activeTab === 'news' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`transition-colors hover:text-slate-900 relative py-1 ${
                activeTab === 'how-it-works' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              How It Works
              {activeTab === 'how-it-works' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors hover:text-slate-900 relative py-1 ${
                activeTab === 'about' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              About
              {activeTab === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('architecture')}
              className={`transition-colors hover:text-slate-900 relative py-1 ${
                activeTab === 'architecture' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              API & Architecture
              {activeTab === 'architecture' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('news');
                onFetchAndSimplify();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              Fetch & Simplify
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-md text-left text-sm font-medium ${
                activeTab === 'home' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('news')}
              className={`px-3 py-2 rounded-md text-left text-sm font-medium ${
                activeTab === 'news' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Latest News
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`px-3 py-2 rounded-md text-left text-sm font-medium ${
                activeTab === 'how-it-works' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-md text-left text-sm font-medium ${
                activeTab === 'about' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className={`px-3 py-2 rounded-md text-left text-sm font-medium ${
                activeTab === 'architecture' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              API & Architecture
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setActiveTab('news');
                onFetchAndSimplify();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              Fetch & Simplify News
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
