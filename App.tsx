
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
import AdSlot from './components/AdSlot';
import SpecialChars from './components/SpecialChars';
import CreateImage from './components/CreateImage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [activeLabels, setActiveLabels] = useState<string[] | null>(null);
  const [toolParams, setToolParams] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const defaultMenu: MenuItem[] = [
    { id: '1', label: 'Trang Chủ' },
    { 
      id: '2', 
      label: 'Windows', 
      targetLabel: 'Win 7, Win 8, Win 10, Win 11' 
    },
    { 
      id: '3', 
      label: 'Phần Mềm', 
      targetLabel: 'Phần Mềm'
    },
    { id: '4', label: 'Thủ thuật', targetLabel: 'Thủ thuật' },
    { 
      id: '6', 
      label: 'Tạo Ảnh', 
      isDropdown: true,
      subItems: [
        { label: 'Tạo Ảnh Avatar', targetLabel: 'CREATE_IMAGE' },
        { label: 'Ảnh Bìa', targetLabel: 'CREATE_IMAGE' },
        { label: 'Tạo Logo', targetLabel: 'CREATE_IMAGE' },
        { label: 'Ảnh Nền', targetLabel: 'CREATE_IMAGE' }
      ]
    },
    { id: '7', label: 'Ký Tự Đặc Biệt', targetLabel: 'SPECIAL_CHARS' },
    { id: '5', label: 'Giới thiệu', targetLabel: 'Giới thiệu Blog' }
  ];

  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    logoUrl: null,
    siteName: "PHV BLOG",
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
    homeLatestTitle: "Cập nhật mới nhất",
    menuItems: defaultMenu
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('phv_session');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const savedConfig = localStorage.getItem('phv_site_config');
    if (savedConfig) {
      const parsedConfig: SiteConfig = JSON.parse(savedConfig);
      setSiteConfig(prev => ({ ...prev, ...parsedConfig }));
      
      if (parsedConfig.adsenseScript) {
        window.dispatchEvent(new CustomEvent('adsenseUpdate', { detail: parsedConfig.adsenseScript }));
      }

      if (parsedConfig.customCss) {
        const styleId = 'phv-custom-css';
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
          styleTag = document.createElement('style');
          styleTag.id = styleId;
          document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = parsedConfig.customCss;
      }

      if (parsedConfig.customJs) {
        const scriptId = 'phv-custom-js';
        let scriptTag = document.getElementById(scriptId);
        if (scriptTag) scriptTag.remove();
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.innerHTML = parsedConfig.customJs;
        document.body.appendChild(scriptTag);
      }
    } else {
      localStorage.setItem('phv_site_config', JSON.stringify(siteConfig));
    }

    const savedPosts = localStorage.getItem('phv_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem('phv_posts', JSON.stringify(INITIAL_POSTS));
    }

    if (localStorage.getItem('phv_darkmode') === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    const updated = { ...siteConfig, ...newConfig };
    setSiteConfig(updated);
    localStorage.setItem('phv_site_config', JSON.stringify(updated));
    if (newConfig.customCss || newConfig.customJs || newConfig.adsenseScript) {
        window.location.reload();
    }
  };

  const navigateTo = (page: Page, id?: string, params?: any) => {
    const adminPages = [Page.ADMIN, Page.EDITOR, Page.SETTINGS];
    if (adminPages.includes(page) && (!currentUser || currentUser.role !== 'admin')) {
      setCurrentPage(Page.LOGIN);
    } else {
      setCurrentPage(page);
    }
    if (id) setCurrentPostId(id);
    if (params) setToolParams(params);
    if (page !== Page.HOME) setActiveLabels(null);
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
    if (confirm("Bạn có chắc chắn muốn XÓA VĨNH VIỄN bài viết này không?")) {
      const newPosts = posts.filter(p => p.id !== id);
      setPosts(newPosts);
      localStorage.setItem('phv_posts', JSON.stringify(newPosts));
    }
  };

  const handleLabelFilter = (labelInput: string | string[]) => {
      // Special check for Tool keywords in targetLabel
      if (typeof labelInput === 'string') {
        if (labelInput === 'SPECIAL_CHARS') {
          navigateTo(Page.SPECIAL_CHARS);
          return;
        }
        if (labelInput === 'CREATE_IMAGE') {
          navigateTo(Page.CREATE_IMAGE);
          return;
        }
      }

      if (Array.isArray(labelInput)) {
          setActiveLabels(labelInput);
      } else {
          setActiveLabels(labelInput.split(',').map(s => s.trim()));
      }
      setCurrentPage(Page.HOME);
  };

  const filteredPosts = activeLabels 
    ? posts.filter(p => p.labels.some(l => activeLabels.includes(l)))
    : posts;

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
        labels={Array.from(new Set(posts.flatMap(p => p.labels)))}
        onSelectLabel={handleLabelFilter}
        config={siteConfig}
      />
      
      {siteConfig.adsHeader && (
        <div className="container mx-auto px-4 max-w-7xl mt-4">
           <AdSlot rawHtml={siteConfig.adsHeader} />
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {currentPage === Page.LOGIN && <LoginPage onLogin={(u) => { setCurrentUser(u); localStorage.setItem('phv_session', JSON.stringify(u)); navigateTo(Page.ADMIN); }} navigateTo={navigateTo} />}
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
          />
        )}
        {currentPage === Page.POST && posts.find(p => p.id === currentPostId) && <PostPage post={posts.find(p => p.id === currentPostId)!} allPosts={posts} navigateTo={navigateTo} currentUser={currentUser} onLogin={(u) => setCurrentUser(u)} onLogout={() => setCurrentUser(null)} config={siteConfig} />}
        {currentPage === Page.ADMIN && <AdminDashboard posts={posts} navigateTo={navigateTo} onDelete={handleDeletePost} onLogout={() => setCurrentUser(null)} />}
        {currentPage === Page.EDITOR && <EditorPage post={posts.find(p => p.id === currentPostId) || null} onSave={handleSavePost} onCancel={() => navigateTo(Page.ADMIN)} />}
        {currentPage === Page.SETTINGS && <SettingsPage config={siteConfig} onUpdate={updateConfig} />}
        {currentPage === Page.SPECIAL_CHARS && <SpecialChars />}
        {currentPage === Page.CREATE_IMAGE && <CreateImage initialType={toolParams?.type} />}
        {(currentPage === Page.ABOUT || currentPage === Page.CONTACT) && <StaticPages type={currentPage} />}
      </main>

      <Footer navigateTo={navigateTo} currentUser={currentUser} logoUrl={siteConfig.logoUrl} />
      <FloatingButtons />
    </div>
  );
};

export default App;
