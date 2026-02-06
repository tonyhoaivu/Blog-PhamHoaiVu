
import React from 'react';
import { Page, Post, User } from '../types';
import Sidebar from './Sidebar';
import PostCard from './PostCard';

interface HomePageProps {
  posts: Post[];
  navigateTo: (page: Page, id?: string) => void;
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ posts, navigateTo, currentUser, onLogin, onLogout }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-black flex items-center gap-3 dark:text-white uppercase tracking-tight">
              <span className="w-3 h-10 bg-primary-600 rounded-lg shadow-lg shadow-primary-500/30"></span>
              Cập nhật mới nhất
            </h2>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-6">
              Bản tin công nghệ từ Phạm Hoài Vũ
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onClick={() => navigateTo(Page.POST, post.id)} 
            />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-primary-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-600 text-white font-black shadow-lg shadow-primary-500/30">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 font-bold hover:bg-gray-50">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 font-bold hover:bg-gray-50">3</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-primary-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-8">
        <Sidebar 
          posts={posts} 
          navigateTo={navigateTo} 
          currentUser={currentUser}
          onLogin={onLogin}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
};

export default HomePage;