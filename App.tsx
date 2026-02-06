
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const defaultMenu: MenuItem[] = [
    { id: '1', label: 'TRANG CHỦ' },
    { 
      id: '2', 
      label: 'WINDOWS', 
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
      isDropdown: true,
      subItems: [
        { label: 'Phần mềm PC', targetLabel: 'Software' },
        { label: 'Driver PC', targetLabel: 'Driver PC' },
        { label: 'USB BOOT', targetLabel: 'BOOT USB' },
        { label: 'Thủ thuật', targetLabel: 'Thủ thuật' }
      ]
    },
    { id: 'kytu', label: 'KÝ TỰ ĐẸP', targetLabel: 'SPECIAL_CHARS' },
    { id: 'design', label: 'TẠO ẢNH AI', targetLabel: 'CREATE_IMAGE' },
    { id: 'contact', label: 'LIÊN HỆ', targetLabel: 'CONTACT_PAGE' }
  ];

  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    logoUrl: null,
    siteName: "Blog Phạm Hoài Vũ",
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
    menuItems: defaultMenu
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    const savedUser = localStorage.getItem('phv_session');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    const savedConfig = localStorage.getItem('phv_site_config');
    if (savedConfig) setSiteConfig(prev => ({ ...prev, ...JSON.parse(savedConfig) }));
    const savedPosts = localStorage.getItem('phv_posts');
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    else setPosts(INITIAL_POSTS);
  }, []);

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

  const filteredPosts = activeLabels 
    ? posts.filter(p => p.labels.some(l => activeLabels.includes(l)))
    : posts;

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6] text-slate-800 transition-colors duration-300 p-4 md:p-6">
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
      
      <main className="flex-grow container mx-auto py-10 max-w-7xl relative">
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
            sidebarOpen={sidebarOpen}
          />
        )}
        {currentPage === Page.POST && posts.find(p => p.id === currentPostId) && <PostPage post={posts.find(p => p.id === currentPostId)!} allPosts={posts} navigateTo={navigateTo} currentUser={currentUser} onLogin={() => {}} onLogout={() => {}} config={siteConfig} sidebarOpen={sidebarOpen} />}
        {currentPage === Page.ADMIN && <AdminDashboard posts={posts} navigateTo={navigateTo} onDelete={() => {}} onLogout={() => {}} />}
        {currentPage === Page.EDITOR && <EditorPage post={posts.find(p => p.id === currentPostId) || null} onSave={() => {}} onCancel={() => navigateTo(Page.ADMIN)} />}
        {currentPage === Page.SETTINGS && <SettingsPage config={siteConfig} onUpdate={() => {}} />}
        {currentPage === Page.SPECIAL_CHARS && <SpecialChars />}
        {currentPage === Page.CREATE_IMAGE && <CreateImage />}
        {(currentPage === Page.ABOUT || currentPage === Page.CONTACT) && <StaticPages type={currentPage} />}
      </main>

      <Footer navigateTo={navigateTo} currentUser={currentUser} logoUrl={siteConfig.logoUrl} onSelectLabel={handleLabelFilter} />
      <FloatingButtons />
    </div>
  );
};

export default App;
