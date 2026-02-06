
import React, { useState, useEffect } from 'react';
import { Page, Post, User, SiteConfig, MenuItem } from './types';
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
import SpecialChars from './components/SpecialChars';
import CreateImage from './components/CreateImage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [activeLabels, setActiveLabels] = useState<string[] | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('phv_sidebar_state');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const defaultMenu: MenuItem[] = [
    { id: '1', label: 'TRANG CHỦ', icon: '🏠' },
    { 
      id: '2', 
      label: 'WINDOWS', 
      icon: '🪟',
      isDropdown: true,
      subItems: [
        { label: 'Win 7', targetLabel: 'Win 7' },
        { label: 'Win 8', targetLabel: 'Win 8' },
        { label: 'Win 10', targetLabel: 'Win 10' },
        { label: 'Win 11', targetLabel: 'Win 11' }
      ]
    },
    { 
      id: 'software', 
      label: 'PHẦN MỀM', 
      icon: '💻',
      isDropdown: true,
      subItems: [
        { label: 'Phần mềm PC', targetLabel: 'Software' },
        { label: 'Driver PC', targetLabel: 'Driver PC' },
        { label: 'USB BOOT', targetLabel: 'BOOT USB' },
        { label: 'Thủ thuật', targetLabel: 'Thủ thuật' }
      ]
    },
    { id: 'kytu', label: 'KÝ TỰ ĐẸP', icon: '✨', targetLabel: 'SPECIAL_CHARS' },
    { id: 'design', label: 'TẠO ẢNH AI', icon: '🎨', targetLabel: 'CREATE_IMAGE' },
    { id: 'contact', label: 'LIÊN HỆ', icon: '📧', targetLabel: 'CONTACT_PAGE' }
  ];

  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    logoUrl: null,
    footerLogoUrl: null,
    logoWidth: 150,
    logoHeight: 40,
    footerLogoWidth: 200,
    footerLogoHeight: 60,
    siteName: "PHẠM HOÀI VŨ Blog",
    adsenseScript: "",
    adsSidebar: "",
    adsHeader: "",
    adsBelowContent: "",
    adsHomePage: "",
    customCss: "",
    customJs: "",
    sidebarNewTabLabel: "MỚI NHẤT",
    sidebarPopularTabLabel: "PHỔ BIẾN",
    sidebarRandomTabLabel: "NGẪU NHIÊN",
    sidebarStatsTitle: "Thống kê Blog",
    sidebarAdsTitle: "Quảng cáo",
    homeLatestTitle: "BÀI VIẾT MỚI NHẤT",
    menuItems: defaultMenu,
    headerBgColor: "#ffffff",
    menuTextColor: "#334155",
    footerBgColor: "#0284c7",
    sidebarBgColor: "#ffffff",
    accentColor: "#0ea5e9"
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    const savedUser = localStorage.getItem('phv_session');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    const savedConfig = localStorage.getItem('phv_site_config');
    if (savedConfig) setSiteConfig(prev => ({ ...prev, ...JSON.parse(savedConfig) }));
    const savedPosts = localStorage.getItem('phv_posts');
    if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
    } else {
        setPosts(INITIAL_POSTS);
    }

    // Anti-Clone: Chặn hành động copy-paste và thêm bản quyền
    const handleCopy = (e: ClipboardEvent) => {
      if (currentUser?.role === 'admin') return; // Admin có quyền copy
      
      const selection = document.getSelection();
      if (selection) {
        const copyText = selection.toString();
        const watermark = `\n\nNguồn: phamhoaivu.vercel.app - Bản quyền thuộc về Phạm Hoài Vũ Blog. Vui lòng ghi nguồn khi chia sẻ lại.`;
        e.clipboardData?.setData('text/plain', copyText + watermark);
        e.preventDefault();
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => document.removeEventListener('copy', handleCopy);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('phv_sidebar_state', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    const oldStyle = document.getElementById('phv-custom-css');
    if (oldStyle) oldStyle.remove();
    if (siteConfig.customCss) {
      const style = document.createElement('style');
      style.id = 'phv-custom-css';
      style.innerHTML = siteConfig.customCss;
      document.head.appendChild(style);
    }

    const oldScript = document.getElementById('phv-custom-js');
    if (oldScript) oldScript.remove();
    if (siteConfig.customJs) {
      const script = document.createElement('script');
      script.id = 'phv-custom-js';
      script.innerHTML = siteConfig.customJs;
      document.body.appendChild(script);
    }
  }, [siteConfig.customCss, siteConfig.customJs]);

  const navigateTo = (page: Page, id?: string) => {
    setCurrentPage(page);
    if (id) setCurrentPostId(id);
    if (page !== Page.HOME) setActiveLabels(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLabelFilter = (labelInput: string) => {
    if (labelInput === 'SPECIAL_CHARS') return navigateTo(Page.SPECIAL_CHARS);
    if (labelInput === 'CREATE_IMAGE') return navigateTo(Page.CREATE_IMAGE);
    if (labelInput === 'CONTACT_PAGE') return navigateTo(Page.CONTACT);
    if (labelInput === 'All') {
      setActiveLabels(null);
      setCurrentPage(Page.HOME);
    } else {
      setActiveLabels([labelInput]);
      setCurrentPage(Page.HOME);
    }
  };

  const handleUpdateConfig = (newConfig: Partial<SiteConfig>) => {
    const updated = { ...siteConfig, ...newConfig };
    setSiteConfig(updated);
    localStorage.setItem('phv_site_config', JSON.stringify(updated));
  };

  const handleSavePost = (updatedPost: Post) => {
    let newPosts;
    const exists = posts.find(p => p.id === updatedPost.id);
    if (exists) {
      newPosts = posts.map(p => p.id === updatedPost.id ? updatedPost : p);
    } else {
      newPosts = [updatedPost, ...posts];
    }
    setPosts(newPosts);
    localStorage.setItem('phv_posts', JSON.stringify(newPosts));
    navigateTo(Page.ADMIN);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      const newPosts = posts.filter(p => p.id !== id);
      setPosts(newPosts);
      localStorage.setItem('phv_posts', JSON.stringify(newPosts));
    }
  };

  const filteredPosts = activeLabels 
    ? posts.filter(p => p.labels.some(l => activeLabels.includes(l)))
    : posts;

  return (
    <div className="min-h-screen flex flex-col bg-sky-50 text-slate-800 transition-colors duration-300 relative select-none">
      {/* Invisible Layer for Security */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02] overflow-hidden flex flex-wrap gap-20 p-20 select-none rotate-[-15deg]">
        {Array.from({length: 20}).map((_, i) => (
          <div key={i} className="text-4xl font-black whitespace-nowrap">PHAM HOAI VU SECURITY SYSTEM</div>
        ))}
      </div>

      <Header 
        isDarkMode={false}
        toggleDarkMode={() => {}}
        navigateTo={navigateTo} 
        currentPage={currentPage}
        currentUser={currentUser}
        onLogout={() => { setCurrentUser(null); localStorage.removeItem('phv_session'); navigateTo(Page.HOME); }}
        logoUrl={siteConfig.logoUrl}
        labels={Array.from(new Set(posts.flatMap(p => p.labels)))}
        onSelectLabel={handleLabelFilter}
        config={siteConfig}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 max-w-7xl relative z-10">
        {currentPage === Page.LOGIN && (
          <LoginPage 
            onLogin={(u) => { 
              setCurrentUser(u); 
              localStorage.setItem('phv_session', JSON.stringify(u)); 
              navigateTo(Page.ADMIN); 
            }} 
            navigateTo={navigateTo} 
          />
        )}
        {currentPage === Page.HOME && (
          <HomePage 
            posts={filteredPosts} 
            navigateTo={navigateTo} 
            currentUser={currentUser} 
            onLogin={(u) => { setCurrentUser(u); localStorage.setItem('phv_session', JSON.stringify(u)); }} 
            onLogout={() => { setCurrentUser(null); localStorage.removeItem('phv_session'); }} 
            config={siteConfig}
            activeLabel={activeLabels?.join(', ')}
            onClearFilter={() => setActiveLabels(null)}
            sidebarOpen={sidebarOpen}
          />
        )}
        {currentPage === Page.POST && posts.find(p => p.id === currentPostId) && <PostPage post={posts.find(p => p.id === currentPostId)!} allPosts={posts} navigateTo={navigateTo} currentUser={currentUser} onLogin={() => {}} onLogout={() => {}} config={siteConfig} sidebarOpen={sidebarOpen} />}
        {currentPage === Page.ADMIN && <AdminDashboard posts={posts} navigateTo={navigateTo} onDelete={handleDeletePost} onLogout={() => {}} />}
        {currentPage === Page.EDITOR && <EditorPage post={posts.find(p => p.id === currentPostId) || null} onSave={handleSavePost} onCancel={() => navigateTo(Page.ADMIN)} />}
        {currentPage === Page.SETTINGS && <SettingsPage config={siteConfig} onUpdate={handleUpdateConfig} />}
        {currentPage === Page.SPECIAL_CHARS && <SpecialChars />}
        {currentPage === Page.CREATE_IMAGE && <CreateImage />}
        {(currentPage === Page.ABOUT || currentPage === Page.CONTACT) && <StaticPages type={currentPage} />}
      </main>

      <Footer config={siteConfig} navigateTo={navigateTo} currentUser={currentUser} logoUrl={siteConfig.logoUrl} onSelectLabel={handleLabelFilter} />
      <FloatingButtons />
    </div>
  );
};

export default App;
