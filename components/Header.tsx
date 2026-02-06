
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

const Header: React.FC<HeaderProps> = ({ navigateTo, currentUser, onLogout, logoUrl, config, onSelectLabel }) => {
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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between max-w-7xl">
        {/* LOGO */}
        <div className="flex items-center gap-1 cursor-pointer group" onClick={() => {navigateTo(Page.HOME); onSelectLabel('All');}}>
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
          ) : (
            <div className="flex items-center">
              <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">Pham</span>
              <span className="font-black text-2xl tracking-tighter text-blue-600 uppercase">HoaiVu</span>
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-2" ref={dropdownRef}>
          {config.menuItems.map(item => (
            <div 
              key={item.id} 
              className="relative"
              onMouseEnter={() => item.isDropdown && setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => {
                  if (item.label === 'TRANG CHỦ') {
                    navigateTo(Page.HOME);
                    onSelectLabel('All');
                  } else if (item.targetLabel) {
                    onSelectLabel(item.targetLabel);
                  }
                }}
                className={`px-4 py-2 text-[13px] font-bold uppercase tracking-wide transition-all flex items-center gap-1.5 rounded-lg ${activeDropdown === item.id ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'}`}
              >
                {item.label}
                {item.isDropdown && (
                  <svg className={`w-3 h-3 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                )}
              </button>

              {item.isDropdown && activeDropdown === item.id && (
                <div className="absolute top-full left-0 w-52 bg-white border border-slate-100 shadow-2xl py-2 rounded-b-xl animate-in fade-in slide-in-from-top-1">
                  {item.subItems?.map((sub, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => {
                        onSelectLabel(sub.targetLabel);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-5 py-3 text-[13px] font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-between"
                    >
                      {sub.label}
                      <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100"></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button onClick={() => navigateTo(Page.ADMIN)} className="text-[11px] font-bold bg-blue-50 text-blue-600 px-4 py-2 rounded-full border border-blue-100 uppercase tracking-wider">ADMIN</button>
              <button onClick={onLogout} className="text-[11px] font-bold bg-red-600 text-white px-4 py-2 rounded-full shadow-lg uppercase tracking-wider">THOÁT</button>
            </div>
          ) : (
            <button onClick={() => navigateTo(Page.LOGIN)} className="p-2.5 text-slate-400 hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
