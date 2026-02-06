
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
}

const HomePage: React.FC<HomePageProps> = ({ posts, navigateTo, currentUser, onLogin, onLogout, config, activeLabel, onClearFilter }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
      <div className="lg:col-span-7">
        <div className="mb-12 border-l-4 border-blue-600 pl-6 py-1">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none">
            {activeLabel && activeLabel !== 'All' ? `CHUYÊN MỤC: ${activeLabel}` : config.homeLatestTitle}
          </h2>
          <p className="text-slate-500 text-[10px] mt-2 italic font-black uppercase tracking-widest">
            {activeLabel ? `Khám phá tài nguyên trong danh mục ${activeLabel}` : `Tài nguyên công nghệ mới nhất từ ${config.siteName}`}
          </p>
        </div>
        
        {config.adsHomePage && (
          <div className="mb-12">
            <AdSlot rawHtml={config.adsHomePage} />
          </div>
        )}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onClick={() => navigateTo(Page.POST, post.id)} 
              />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
             <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Không tìm thấy bài viết nào trong chuyên mục này</p>
             <button onClick={onClearFilter} className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Xem tất cả bài viết</button>
          </div>
        )}
        
        {posts.length > 0 && (
          <div className="mt-16 flex justify-center items-center gap-3">
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/></svg>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-600 text-white font-black shadow-xl shadow-blue-600/30">1</button>
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">2</button>
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
            </button>
          </div>
        )}
      </div>

      <div className="lg:col-span-3 space-y-12">
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
    </div>
  );
};

export default HomePage;
