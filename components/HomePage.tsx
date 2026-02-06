
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
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
      <div className="lg:col-span-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black flex items-center gap-3 dark:text-white uppercase tracking-tight">
              <span className="w-3 h-10 bg-primary-600 rounded-lg shadow-lg shadow-primary-500/30"></span>
              {activeLabel ? `Chuyên mục: ${activeLabel}` : config.homeLatestTitle}
            </h2>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-6">
              {activeLabel ? `Hiển thị các bài viết thuộc nhãn ${activeLabel}` : `Bản tin công nghệ từ ${config.siteName}`}
            </p>
          </div>
          {activeLabel && (
            <button 
              onClick={onClearFilter}
              className="px-4 py-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-[10px] font-black uppercase rounded-xl hover:bg-red-100 transition-all border border-red-100 dark:border-red-800"
            >
              Xóa lọc nhãn
            </button>
          )}
        </div>
        
        {config.adsHomePage && (
          <div className="mb-10">
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
          <div className="py-20 text-center bg-white dark:bg-gray-800 rounded-[3rem] border-4 border-dashed border-gray-100 dark:border-gray-700">
             <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
             </div>
             <p className="text-sm font-black text-gray-300 uppercase tracking-[0.3em]">Không tìm thấy bài viết nào</p>
          </div>
        )}
        
        {posts.length > 0 && (
          <div className="mt-12 flex justify-center items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-primary-600 transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-600 text-white font-black shadow-lg shadow-primary-500/30">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 font-bold hover:bg-gray-50 shadow-sm">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-primary-600 transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="lg:col-span-3 space-y-8">
        <Sidebar 
          posts={posts} 
          navigateTo={navigateTo} 
          currentUser={currentUser}
          onLogin={onLogin}
          onLogout={onLogout}
          config={config}
          onSelectLabel={onClearFilter ? (l) => { onClearFilter(); navigateTo(Page.HOME); } : undefined}
        />
      </div>
    </div>
  );
};

export default HomePage;
