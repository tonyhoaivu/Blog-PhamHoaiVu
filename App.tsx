
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
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    else setPosts(INITIAL_POSTS);
  }, []);

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
    if (labelInput === '