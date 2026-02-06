
import React from 'react';
import { Page, Post, User } from '../types';
import AdSlot from './AdSlot';
import SidebarLogin from './SidebarLogin';
import SidebarTabs from './SidebarTabs';

interface SidebarProps {
  posts: Post[];
  navigateTo: (page: Page, id?: string) => void;
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ posts, navigateTo, currentUser, onLogin, onLogout }) => {
  const labels = Array.from(new Set(posts.flatMap(p => p.labels)));

  return (
    <aside className="space-y-8">
      {/* Quick Login Sidebar Area */}
      <SidebarLogin 
        currentUser={currentUser} 
        onLogin={onLogin} 
        onLogout={onLogout} 
        navigateTo={navigateTo} 
      />

      {/* Banner Quảng Cáo Google AdSense */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 glass-card">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 flex items-center justify-between">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quảng cáo tài trợ</span>
           <span className="text-[8px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold uppercase">Sponsor</span>
        </div>
        <div className="p-4 flex justify-center">
          <AdSlot slot="sidebar-fixed-300x250" />
        </div>
      </div>

      {/* Bài đăng Tabs (Mới nhất, Phổ biến, Ngẫu nhiên) */}
      <SidebarTabs posts={posts} navigateTo={navigateTo} />

      {/* Thống kê lượt xem */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 glass-card">
        <h3 className="text-sm font-black mb-5 flex items-center gap-2 dark:text-white uppercase tracking-[0.2em] text-gray-500">
          <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
          Thống kê Blog
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tổng lượt xem:</span>
            <span className="text-lg font-black text-primary-600">1,245,890</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đang online:</span>
            <span className="text-lg font-black text-orange-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              42
            </span>
          </div>
        </div>
      </div>

      {/* Nhãn (Labels) - Tag Cloud */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 glass-card">
        <h3 className="text-sm font-black mb-6 flex items-center gap-2 dark:text-white uppercase tracking-[0.2em] text-gray-500">
          <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
          Chuyên mục
        </h3>
        <div className="flex flex-wrap gap-2">
          {labels.map(label => (
            <button 
              key={label} 
              className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-gray-600 dark:text-gray-400 text-[11px] font-black rounded-lg transition-all uppercase tracking-widest shadow-sm"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
