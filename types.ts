
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
}

export interface User {
  email: string;
  role: 'admin' | 'user';
}

export interface SiteConfig {
  logoUrl: string | null;
  adsenseScript: string;
  siteName: string;
}

export enum Page {
  HOME = 'home',
  POST = 'post',
  ADMIN = 'admin',
  EDITOR = 'editor',
  ABOUT = 'about',
  CONTACT = 'contact',
  SETTINGS = 'settings',
  LOGIN = 'login'
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}
