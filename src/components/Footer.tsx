import React from 'react';
import { Newspaper, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'news' | 'how-it-works' | 'about' | 'architecture') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNav = (tab: 'home' | 'news' | 'how-it-works' | 'about' | 'architecture') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center relative">
                <Newspaper className="w-4 h-4" />
                <Sparkles className="w-2.5 h-2.5 text-amber-300 absolute -top-0.5 -right-0.5" />
              </div>
              <span className="text-lg font-bold tracking-tight">MarketPlain</span>
            </div>

            <p className="text-sm text-slate-300 font-medium">
              “Understand Financial News. In Simple Words.”
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              MarketPlain bridges the gap between complex Wall Street terminology and everyday investors, translating global financial news with Groq Llama 3.3 70B.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>NewsAPI Live & Groq LPU Connected</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('news')}
                  className="hover:text-white transition-colors"
                >
                  Latest News
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors"
                >
                  About MarketPlain
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('architecture')}
                  className="hover:text-white transition-colors"
                >
                  API Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Technology
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>NewsAPI.org</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>Groq Cloud (LPU)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>Llama 3.3 70B</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>FastAPI / Python 3.11</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>React 19 & Tailwind CSS</span>
              </li>
            </ul>
          </div>

          {/* Disclaimers & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Compliance & Ethics
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Designed for educational accessibility. Uses zero-temperature constrained inference to prevent financial speculation or hallucinated data.
            </p>
            <div className="pt-2">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>BTech AI/DS Research & Development</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400 text-center md:text-left">
            MarketPlain provides simplified news summaries for informational and educational purposes only. It does not provide financial or investment advice.
          </p>

          <p className="text-[11px] text-slate-400 font-mono">
            © {new Date().getFullYear()} MarketPlain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
