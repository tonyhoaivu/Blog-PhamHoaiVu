
import React, { useState, useRef, useEffect } from 'react';
import { Page, User } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  navigateTo: (page: Page, id?: string) => void;
  currentPage: Page;
  currentUser: User | null;
  onLogout: () => void;
  logoUrl: string | null;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, navigateTo, currentPage, currentUser, onLogout, logoUrl }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = ['Windows', 'Software', 'Driver', 'Thủ Thuật', 'USB BOOT'];

  return (
    <div className="w-full sticky top-0 z-50">
      <div className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800 py-1.5 px-4 flex justify-end items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <button onClick={toggleDarkMode} className="hover:text-primary-600 transition-colors">
          {isDarkMode ? '🌙 DARK MODE' : '☀️ LIGHT MODE'}
        </button>
        {currentUser && <button onClick={onLogout} className="text-red-500">Đăng xuất</button>}
      </div>

      <header className="bg-[#4285f4] shadow-xl">
        <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="cursor-pointer flex items-center gap-3" onClick={() => navigateTo(Page.HOME)}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain rounded-lg" />
              ) : (
                <>
                  <div className="bg-white p-1.5 rounded-lg shadow-inner">
                    <svg className="h-6 w-6 text-[#4285f4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h1 className="text-xl font-black text-white tracking-tighter">PHV BLOG</h1>
                </>
              )}
            </div>

            <nav className="hidden lg:flex items-center">
              <button onClick={() => navigateTo(Page.HOME)} className={`px-4 py-5 text-sm font-bold text-white uppercase hover:bg-white/10 ${currentPage === Page.HOME ? 'bg-white/20 border-b-2' : ''}`}>Trang Chủ</button>
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="px-4 py-5 text-sm font-bold text-white uppercase hover:bg-white/10 flex items-center gap-1">Chuyên Mục ▾</button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-52 bg-white rounded-b-xl shadow-2xl py-2 overflow-hidden border-t">
                    {categories.map(c => <button key={c} className="w-full text-left px-6 py-3 text-xs font-bold text-gray-700 hover:bg-blue-50">{c}</button>)}
                  </div>
                )}
              </div>
              <button onClick={() => navigateTo(Page.ABOUT)} className={`px-4 py-5 text-sm font-bold text-white uppercase hover:bg-white/10 ${currentPage === Page.ABOUT ? 'bg-white/20 border-b-2' : ''}`}>Giới thiệu</button>
            </nav>
          </div>

          <div className="hidden md:flex flex-grow max-w-xs mx-8">
            <input type="text" placeholder="Tìm kiếm..." className="w-full bg-white/20 border border-white/30 text-white placeholder-white/70 px-4 py-2 rounded-xl outline-none focus:bg-white focus:text-gray-800 transition-all text-sm" />
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
