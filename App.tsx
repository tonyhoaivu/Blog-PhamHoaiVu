
import React, { useState, useEffect, useMemo } from 'react';
import { Page, Post, User, SiteConfig } from './types';
import { INITIAL_POSTS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PostPage from './components/PostPage';
import AdminDashboard from './components/AdminDashboard';
import EditorPage from './components/EditorPage';
import StaticPages from './components/StaticPages';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import FloatingButtons from './components/FloatingButtons';
import AdSlot from './components/AdSlot';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    logoUrl: null,
    adsenseScript: "",
    siteName: "PHV BLOG"
  });

  useEffect(() => {
    // Auth Session
    const savedUser = localStorage.getItem('phv_session');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    // Site Config
    const savedConfig = localStorage.getItem('phv_site_config');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setSiteConfig(parsedConfig);
      
      // Inject adsense script if exists
      if (parsedConfig.adsenseScript) {
        window.dispatchEvent(new CustomEvent('adsenseUpdate', { detail: parsedConfig.adsenseScript }));
      }
    }

    // Posts Database
    const savedPosts = localStorage.getItem('phv_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem('phv_posts', JSON.stringify(INITIAL_POSTS));
    }

    // Appearance
    if (localStorage.getItem('phv_darkmode') === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    const updated = { ...siteConfig, ...newConfig };
    setSiteConfig(updated);
    localStorage.setItem('phv_site_config', JSON.stringify(updated));
  };

  const navigateTo = (page: Page, id?: string) => {
    // Admin Security Shield
    const adminPages = [Page.ADMIN, Page.EDITOR, Page.SETTINGS];
    if (adminPages.includes(page) && (!currentUser || currentUser.role !== 'admin')) {
      setCurrentPage(Page.LOGIN);
    } else {
      setCurrentPage(page);
    }

    if (id) setCurrentPostId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePost = (updatedPost: Post) => {
    const newPosts = posts.some(p => p.id === updatedPost.id)
      ? posts.map(p => p.id === updatedPost.id ? updatedPost : p)
      : [updatedPost, ...posts];
    setPosts(newPosts);
    localStorage.setItem('phv_posts', JSON.stringify(newPosts));
    navigateTo(Page.ADMIN);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này không? Dữ liệu sẽ mất vĩnh viễn.")) {
      const newPosts = posts.filter(p => p.id !== id);
      setPosts(newPosts);
      localStorage.setItem('phv_posts', JSON.stringify(newPosts));
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDarkMode ? 'dark bg-gray-950 text-gray-100' : 'bg-[#f8fbfd] text-gray-900'}`}>
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => {
            const nv = !isDarkMode;
            setIsDarkMode(nv);
            localStorage.setItem('phv_darkmode', String(nv));
            document.documentElement.classList.toggle('dark');
        }}
        navigateTo={navigateTo} 
        currentPage={currentPage}
        currentUser={currentUser}
        onLogout={() => { 
          setCurrentUser(null); 
          localStorage.removeItem('phv_session'); 
          navigateTo(Page.HOME); 
        }}
        logoUrl={siteConfig.logoUrl}
      />

      {/* PC Side Banners Fixed 160x600 - High Resolution Desktop only */}
      <div className="side-banner side-banner-left hidden 2xl:flex flex-col items-center">
         <div className="w-full h-full glass-card rounded-3xl p-3 border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden relative group">
            <AdSlot slot="fixed-left-vertical" className="h-full" />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] px-2 py-1 rounded font-black uppercase tracking-widest shadow-lg">AD</div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-[9px] font-black text-gray-300 dark:text-gray-700 uppercase tracking-[0.2em] vertical-text">Ads Sponsored</span>
            </div>
         </div>
      </div>
      <div className="side-banner side-banner-right hidden 2xl:flex flex-col items-center">
         <div className="w-full h-full glass-card rounded-3xl p-3 border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden relative group">
            <AdSlot slot="fixed-right-vertical" className="h-full" />
            <div className="absolute top-2 right-2 bg-red-600 text-white text-[8px] px-2 py-1 rounded font-black uppercase tracking-widest shadow-lg">AD</div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-[9px] font-black text-gray-300 dark:text-gray-700 uppercase tracking-[0.2em] vertical-text">Ads Sponsored</span>
            </div>
         </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {currentPage === Page.LOGIN && <LoginPage onLogin={(u) => { setCurrentUser(u); localStorage.setItem('phv_session', JSON.stringify(u)); navigateTo(Page.ADMIN); }} navigateTo={navigateTo} />}
        {currentPage === Page.HOME && <HomePage posts={posts} navigateTo={navigateTo} currentUser={currentUser} onLogin={(u) => { setCurrentUser(u); localStorage.setItem('phv_session', JSON.stringify(u)); }} onLogout={() => { setCurrentUser(null); localStorage.removeItem('phv_session'); }} />}
        {currentPage === Page.POST && posts.find(p => p.id === currentPostId) && <PostPage post={posts.find(p => p.id === currentPostId)!} allPosts={posts} navigateTo={navigateTo} currentUser={currentUser} onLogin={(u) => setCurrentUser(u)} onLogout={() => setCurrentUser(null)} />}
        {currentPage === Page.ADMIN && <AdminDashboard posts={posts} navigateTo={navigateTo} onDelete={handleDeletePost} onLogout={() => setCurrentUser(null)} />}
        {currentPage === Page.EDITOR && <EditorPage post={posts.find(p => p.id === currentPostId) || null} onSave={handleSavePost} onCancel={() => navigateTo(Page.ADMIN)} />}
        {currentPage === Page.SETTINGS && <SettingsPage config={siteConfig} onUpdate={updateConfig} />}
        {(currentPage === Page.ABOUT || currentPage === Page.CONTACT) && <StaticPages type={currentPage} />}
      </main>

      <Footer navigateTo={navigateTo} currentUser={currentUser} logoUrl={siteConfig.logoUrl} />
      <FloatingButtons />
    </div>
  );
};

export default App;
