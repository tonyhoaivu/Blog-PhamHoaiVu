
import React, { useState, useMemo } from 'react';
import { Post, Page, SiteConfig } from '../types';

interface SidebarTabsProps {
  posts: Post[];
  navigateTo: (page: Page, id?: string) => void;
  config: SiteConfig;
}

const SidebarTabs: React.FC<SidebarTabsProps> = ({ posts, navigateTo, config }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'popular' | 'random'>('new');

  const filteredPosts = useMemo(() => {
    switch (activeTab) {
      case 'popular':
        return [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
      case 'random':
        return [...posts].sort(() => Math.random() - 0.5).slice(0, 5);
      case 'new':
      default:
        return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    }
  }, [activeTab, posts]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden glass-card">
      <div className="flex border-b dark:border-gray-700">
        {[
          { label: config.sidebarNewTabLabel, key: 'new' },
          { label: config.sidebarPopularTabLabel, key: 'popular' },
          { label: config.sidebarRandomTabLabel, key: 'random' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-4 text-[10px] font-black tracking-widest transition-all ${
              activeTab === tab.key 
                ? 'bg-primary-600 text-white' 
                : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-5">
        <ul className="space-y-4">
          {filteredPosts.map((post) => (
            <li 
              key={post.id} 
              className="flex gap-3 items-center group cursor-pointer"
              onClick={() => navigateTo(Page.POST, post.id)}
            >
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">
                 <img src={post.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title} />
              </div>
              <div className="flex-grow">
                <p className="text-xs font-black leading-snug group-hover:text-primary-600 transition-colors line-clamp-2 dark:text-gray-200 uppercase tracking-tighter">
                  {post.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{post.date}</span>
                  <span className="text-[9px] font-black text-primary-500">{post.views.toLocaleString()} VIEW</span>
                </div>
              </div>
            </li>
          ))}
          {filteredPosts.length === 0 && (
            <li className="py-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Đang tải dữ liệu...
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SidebarTabs;
