
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

  const accentColor = config.accentColor || '#0ea5e9';

  return (
    <header className="sticky top-0 z-50 w-full shadow-md transition-all duration-300" style={{ backgroundColor: config.headerBgColor || '#ffffff', borderBottom: `3px solid ${accentColor}` }}>
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between max-w-7xl">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-sky-50 rounded-lg transition-colors text-slate-500 lg:flex hidden"
            title={sidebarOpen ? "Đóng Sidebar" : "Mở Sidebar"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button 
            onClick={() => {navigateTo(Page.HOME); onSelectLabel('All');}}
            className="h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center transition-all shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </button>

          <div className="flex items-center gap-2 cursor-pointer group ml-1" onClick={() => {navigateTo(Page.HOME); onSelectLabel('All');}}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tighter text-slate-900 uppercase leading-none">PHẠM HOÀI VŨ</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-sky-600 uppercase">Blog</span>
              </div>
            )}
          </div>
        </div>

        <nav className="hidden lg:flex items-center h-full" ref={dropdownRef}>
          {config.menuItems.filter(i => i.label !== 'TRANG CHỦ').map(item => (
            <div 
              key={item.id} 
              className="relative h-full flex items-center"
              onMouseEnter={() => item.isDropdown && setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => {
                  if (item.targetLabel) onSelectLabel(item.targetLabel);
                }}
                className="px-5 py-2 text-[13px] font-bold uppercase tracking-wide transition-all flex items-center gap-2 text-slate-600 hover:text-sky-600 rounded-full hover:bg-sky-50/50"
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                {item.label}
                {item.isDropdown && (
                  <svg className={`w-3 h-3 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                )}
              </button>

              {item.isDropdown && activeDropdown === item.id && (
                <div className="absolute top-[80%] left-0 w-60 bg-white border border-sky-100 shadow-2xl py-3 rounded-2xl animate-in fade-in slide-in-from-top-2">
                  {item.subItems?.map((sub, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => {
                        onSelectLabel(sub.targetLabel);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-6 py-3 text-[12px] font-bold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-all flex items-center justify-between"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-2 text-xs text-slate-700 outline-none focus:border-sky-400 w-44 shadow-inner"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-400">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          </div>

          {currentUser && (
            <button onClick={() => navigateTo(Page.ADMIN)} className="bg-sky-600 text-white px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-sky-700 transition shadow-lg shadow-sky-600/20">
              QUẢN TRỊ
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
