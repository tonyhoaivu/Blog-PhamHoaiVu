
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  author: string;
  date: string;
  labels: string[];
  thumbnail: string;
  popular: boolean;
  views: number;
  downloads?: DownloadInfo[];
}

export interface DownloadInfo {
  version: string;
  size: string;
  md5: string;
  sha1?: string;
  freeLink: string;
  proLink: string;
  fileData?: string;
  fileName?: string;
}

export interface User {
  email: string;
  role: 'admin' | 'user';
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string; // Emoji, mã SVG, hoặc Base64
  targetLabel?: string;
  isDropdown?: boolean;
  subItems?: { label: string; targetLabel: string }[];
}

export interface SiteConfig {
  logoUrl: string | null;
  footerLogoUrl: string | null;
  logoWidth?: number;
  logoHeight?: number;
  footerLogoWidth?: number;
  footerLogoHeight?: number;
  siteName: string;
  // Ads slots
  adsenseScript: string;
  adsSidebar: string;
  adsHeader: string;
  adsBelowContent: string;
  adsHomePage: string;
  // Custom decoration
  customCss: string;
  customJs: string;
  // Layout Labels
  sidebarNewTabLabel: string;
  sidebarPopularTabLabel: string;
  sidebarRandomTabLabel: string;
  sidebarStatsTitle: string;
  sidebarAdsTitle: string;
  homeLatestTitle: string;
  // Dynamic Menu
  menuItems: MenuItem[];
  // Color Customization
  headerBgColor?: string;
  menuTextColor?: string;
  footerBgColor?: string;
  sidebarBgColor?: string;
  accentColor?: string; 
  menuActiveBorderColor?: string;
}

export enum Page {
  HOME = 'home',
  POST = 'post',
  ADMIN = 'admin',
  EDITOR = 'editor',
  ABOUT = 'about',
  CONTACT = 'contact',
  SETTINGS = 'settings',
  LOGIN = 'login',
  SPECIAL_CHARS = 'special_chars',
  CREATE_IMAGE = 'create_image'
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}
