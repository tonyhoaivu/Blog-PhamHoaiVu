
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

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, navigateTo, currentPage, currentUser, onLogout, logoUrl, labels, onSelectLabel, config }) => {
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

  const handleLabelClick = (label: string, menuText?: string) => {
    if (label === 'SPECIAL_CHARS') {
        navigateTo(Page.SPECIAL_CHARS);
    } else if (label === 'CREATE_IMAGE') {
        navigateTo(Page.CREATE_IMAGE, undefined, { type: menuText });
    } else {
        onSelectLabel(label);
    }
    setActiveDropdown(null);
  };

  const handleMenuItemClick = (item: any) => {
    if (item.label === 'Trang Chủ') {
        navigateTo(Page.HOME);
        setActiveDropdown(null);
    } else if (item.targetLabel) {
        handleLabelClick(item.targetLabel, item.label);
    } else {
        navigateTo(Page.HOME);
    }
  };

  return (
    <div className="w-full sticky top-0 z-50">
      <div className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800 py-1.5 px-4 flex justify-end items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <button onClick={toggleDarkMode} className="hover:text-primary-600 transition-colors flex items-center gap-1">
          {isDarkMode ? '🌙 DARK MODE' : '☀️ LIGHT MODE'}
        </button>
        {currentUser ? (
           <>
            <button onClick={() => navigateTo(Page.ADMIN)} className="text-primary-600">ADMIN</button>
            <button onClick={onLogout} className="text-red-500">Đăng xuất</button>
           </>
        ) : (
          <button onClick={() => navigateTo(Page.LOGIN)} className="hover:text-primary-600 transition-colors">QUẢN TRỊ</button>
        )}
      </div>

      <header className="bg-[#4285f4] shadow-xl">
        <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="cursor-pointer flex items-center gap-3" onClick={() => navigateTo(Page.HOME)}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain rounded-lg brightness-0 invert" />
              ) : (
                <>
                  <div className="bg-white p-1.5 rounded-lg shadow-inner">
                    <svg className="h-6 w-6 text-[#4285f4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h1 className="text-xl font-black text-white tracking-tighter">{config.siteName}</h1>
                </>
              )}
            </div>

            <nav className="hidden lg:flex items-center h-16" ref={dropdownRef}>
              {config.menuItems.map(item => (
                <div key={item.id} className="relative h-full flex items-center">
                  <button 
                    onClick={() => {
                        if (item.isDropdown) {
                            setActiveDropdown(activeDropdown === item.id ? null : item.id);
                        } else {
                            handleMenuItemClick(item);
                        }
                    }} 
                    className={`px-4 h-full text-[11px] font-black text-white uppercase hover:bg-white/10 transition-all flex items-center gap-1 ${activeDropdown === item.id ? 'bg-white/10' : ''}`}
                  >
                    {item.label} {item.isDropdown && '▾'}
                  </button>
                  {item.isDropdown && activeDropdown === item.id && (
                    <div className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 rounded-b-2xl shadow-2xl py-2 border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-2">
                      {item.subItems?.map((sub, idx) => (
                        <button key={idx} onClick={() => handleLabelClick(sub.targetLabel, sub.label)} className="w-full text-left px-6 py-3 text-[10px] font-black text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 uppercase transition-colors">{sub.label}</button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex flex-grow max-w-[200px] ml-4">
            <div className="relative w-full text-white">
              <input type="text" placeholder="Tìm tệp..." className="w-full bg-white/20 border border-white/30 text-white placeholder-white/70 px-4 py-2 pl-9 rounded-xl outline-none focus:bg-white focus:text-gray-800 transition-all text-xs font-bold" />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
