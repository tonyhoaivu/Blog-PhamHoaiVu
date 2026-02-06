
import React from 'react';
import { Page, Post, User, SiteConfig } from '../types';
import Sidebar from './Sidebar';
import PostCard from './PostCard';
import AdSlot from './AdSlot';

interface HomePageProps {
  posts: Post[];
  navigateTo: (page: Page, id?: string) => void;
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  config: SiteConfig;
  activeLabel?: string | null;
  onClearFilter?: () => void;
  sidebarOpen: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ posts, navigateTo, currentUser, onLogin, onLogout, config, activeLabel, onClearFilter, sidebarOpen }) => {
  return (
    <div className={`grid grid-cols-1 ${sidebarOpen ? 'lg:grid-cols-10' : 'lg:grid-cols-1'} gap-12 transition-all duration-500`}>
      <div className={`${sidebarOpen ? 'lg:col-span-7' : 'lg:col-span-1 max-w-5xl mx-auto w-full'}`}>
        <div className="mb-12 border-l-4 border-blue-600 pl-6 py-1">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none">
            {activeLabel && activeLabel !== 'All' ? `CHUYÊN MỤC: ${activeLabel}` : config.homeLatestTitle}
          </h2>
          <p className="text-slate-500 text-[11px] mt-2 italic font-black uppercase tracking-widest">
            {activeLabel ? `Khám phá tài nguyên trong danh mục ${activeLabel}` : `Tài nguyên công nghệ mới nhất từ ${config.siteName}`}
          </p>
        </div>
        
        {posts.length > 0 ? (
          <div className={`grid grid-cols-1 ${sidebarOpen ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onClick={() => navigateTo(Page.POST, post.id)} 
              />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 shadow-sm">
             <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Không tìm thấy bài viết nào</p>
             <button onClick={onClearFilter} className="mt-4 text-[11px] font-black text-blue-600 uppercase tracking-widest hover:underline">Xem tất cả bài viết</button>
          </div>
        )}
      </div>

      {sidebarOpen && (
        <div className="lg:col-span-3 space-y-12 animate-in fade-in slide-in-from-right-4">
          <Sidebar 
            posts={posts} 
            navigateTo={navigateTo} 
            currentUser={currentUser}
            onLogin={onLogin}
            onLogout={onLogout}
            config={config}
            onSelectLabel={activeLabel ? () => onClearFilter && onClearFilter() : undefined}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
