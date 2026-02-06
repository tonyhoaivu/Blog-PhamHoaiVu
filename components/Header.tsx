
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
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentUser, onLogout, logoUrl, config, onSelectLabel, sidebarOpen, setSidebarOpen, currentPage }) => {
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
    <header className="max-w-6xl mx-auto w-full sticky top-4 z-50">
      <div className="bg-white/90 backdrop-blur-xl border border-white shadow-xl shadow-blue-500/5 rounded-[2.5rem] px-8 h-20 flex items-center justify-between">
        
        {/* LOGO & SIDEBAR TOGGLE */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2.5 bg-slate-100 rounded-full hover:bg-blue-600 hover:text-white transition-all text-slate-500 lg:flex hidden"
            title={sidebarOpen ? "Đóng Sidebar" : "Mở Sidebar"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={sidebarOpen ? "M4 6h16M4 12h10M4 18h16" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => {navigateTo(Page.HOME); onSelectLabel('All');}}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black shadow-lg">V</div>
                <div className="flex flex-col">
                  <span className="font-black text-lg tracking-tighter text-slate-900 leading-none">Pham</span>
                  <span className="font-black text-lg tracking-tighter text-blue-600 leading-none">HoaiVu</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-4" ref={dropdownRef}>
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
                className={`px-4 py-2 text-[12px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-full ${activeDropdown === item.id ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600'}`}
              >
                {item.label}
                {item.isDropdown && (
                  <svg className={`w-3 h-3 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                )}
              </button>

              {item.isDropdown && activeDropdown === item.id && (
                <div className="absolute top-full left-0 w-52 bg-white border border-slate-100 shadow-2xl py-4 rounded-[1.5rem] mt-2 animate-in fade-in slide-in-from-top-2">
                  {item.subItems?.map((sub, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => {
                        onSelectLabel(sub.targetLabel);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-6 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                    >
                      {sub.label}
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
            <button onClick={() => navigateTo(Page.ADMIN)} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-md">ADMIN</button>
          ) : (
            <button onClick={() => navigateTo(Page.LOGIN)} className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition shadow-md">Đăng Nhập</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
