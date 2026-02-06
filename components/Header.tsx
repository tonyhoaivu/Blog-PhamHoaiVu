
import React, { useState, useRef, useEffect } from 'react';
import { Page, User, SiteConfig } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  navigateTo: (page: Page, id?: string, params?: any) => void;
  currentPage: Page;
  currentUser: User | null;
  onLogout: () => void;
  logoUrl: string | null;
  labels: string[];
  onSelectLabel: (label: string) => void;
  config: SiteConfig;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentUser, onLogout, logoUrl, config, onSelectLabel, currentPage }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-2xl border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {navigateTo(Page.HOME); onSelectLabel('All');}}>
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
          ) : (
            <>
              <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-600/20 group-hover:scale-110 transition-transform">V</div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tighter text-white uppercase leading-none italic">BLOG</span>
                <span className="font-black text-xs tracking-widest text-cyan-500 uppercase leading-none italic">PHẠM HOÀI VŨ</span>
              </div>
            </>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
          {config.menuItems.map(item => (
            <div key={item.id} className="relative">
              <button 
                onClick={() => {
                  if (item.isDropdown) {
                    setActiveDropdown(activeDropdown === item.id ? null : item.id);
                  } else if (item.label === 'TRANG CHỦ') {
                    navigateTo(Page.HOME);
                    onSelectLabel('All');
                  } else if (item.targetLabel) {
                    onSelectLabel(item.targetLabel);
                  }
                }}
                onMouseEnter={() => item.isDropdown && setActiveDropdown(item.id)}
                className={`px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all flex items-center gap-2 rounded-lg ${activeDropdown === item.id ? 'text-cyan-400 bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {item.label}
                {item.isDropdown && (
                  <svg className={`w-3 h-3 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                )}
              </button>

              {item.isDropdown && activeDropdown === item.id && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl py-3 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.subItems?.map((sub, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => {
                        onSelectLabel(sub.targetLabel);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-cyan-600 hover:text-white transition-all flex items-center justify-between"
                    >
                      {sub.label}
                      <div className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100"></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button onClick={() => navigateTo(Page.ADMIN)} className="text-[10px] font-black bg-cyan-600/20 text-cyan-400 px-4 py-2 rounded-full border border-cyan-400/30">ADMIN</button>
              <button onClick={onLogout} className="text-[10px] font-black bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">THOÁT</button>
            </div>
          ) : (
            <button onClick={() => navigateTo(Page.CONTACT)} className="bg-cyan-600 px-6 py-2.5 rounded-full text-[10px] font-black text-white hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-600/30 active:scale-95 uppercase tracking-widest">LIÊN HỆ</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
