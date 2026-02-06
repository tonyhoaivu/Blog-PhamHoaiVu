
import React, { useState } from 'react';
import { Page, Post, User, SiteConfig } from '../types';
import AdSlot from './AdSlot';
import SidebarLogin from './SidebarLogin';
import SidebarTabs from './SidebarTabs';

interface SidebarProps {
  posts: Post[];
  navigateTo: (page: Page, id?: string) => void;
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  config: SiteConfig;
  onSelectLabel?: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ posts, navigateTo, currentUser, onLogin, onLogout, config, onSelectLabel }) => {
  const labels = Array.from(new Set(posts.flatMap(p => p.labels)));
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <aside className="space-y-8">
      <SidebarLogin 
        currentUser={currentUser} 
        onLogin={onLogin} 
        onLogout={onLogout} 
        navigateTo={navigateTo} 
      />

      {/* Newsletter Widget */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 shadow-xl shadow-primary-500/20 text-white overflow-hidden relative group">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="relative z-10">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-2">Nhận Tin Mới Nhất</h3>
          <p className="text-[10px] font-bold opacity-80 mb-6 leading-relaxed uppercase tracking-tighter italic">Đăng ký Gmail để nhận bài viết Premium sớm nhất từ Phạm Hoài Vũ.</p>
          
          {subscribed ? (
            <div className="bg-white/20 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center animate-bounce">
              🎉 ĐĂNG KÝ THÀNH CÔNG!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input 
                type="email" 
                placeholder="Nhập Gmail của bạn..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl outline-none placeholder-white/50 text-[11px] font-bold focus:bg-white/20 transition-all"
              />
              <button className="w-full bg-white text-primary-600 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-gray-100 transition-all active:scale-95">
                ĐĂNG KÝ NGAY
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Quảng Cáo Sidebar */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 glass-card">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 flex items-center justify-between">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{config.sidebarAdsTitle}</span>
           <span className="text-[8px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">Sponsor</span>
        </div>
        <div className="p-4 flex justify-center min-h-[100px]">
          {config?.adsSidebar ? (
             <AdSlot rawHtml={config.adsSidebar} />
          ) : (
            <div className="flex flex-col items-center justify-center text-center opacity-20">
               <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
               <span className="text-[8px] font-black uppercase">AD SPACE 300x250</span>
            </div>
          )}
        </div>
      </div>

      <SidebarTabs posts={posts} navigateTo={navigateTo} config={config} />

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 glass-card">
        <h3 className="text-sm font-black mb-6 flex items-center gap-2 dark:text-white uppercase tracking-[0.2em] text-gray-500">
          <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
          Chuyên mục
        </h3>
        <div className="flex flex-wrap gap-2">
          {labels.length > 0 ? labels.map(label => (
            <button 
              key={label} 
              onClick={() => onSelectLabel && onSelectLabel(label)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-gray-600 dark:text-gray-400 text-[11px] font-black rounded-lg transition-all uppercase tracking-widest shadow-sm"
            >
              {label}
            </button>
          )) : <p className="text-[10px] text-gray-400 font-bold italic">Chưa có nhãn nào</p>}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 glass-card">
        <h3 className="text-sm font-black mb-5 flex items-center gap-2 dark:text-white uppercase tracking-[0.2em] text-gray-500">
          <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
          {config.sidebarStatsTitle}
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
    </aside>
  );
};

export default Sidebar;
