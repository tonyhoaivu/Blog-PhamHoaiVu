
import React, { useState, useEffect, useMemo } from 'react';
import { Page, Post, TOCItem, User, SiteConfig } from '../types';
import DownloadSection from './DownloadSection';
import Sidebar from './Sidebar';
import PostCard from './PostCard';
import AdSlot from './AdSlot';

interface PostPageProps {
  post: Post;
  allPosts: Post[];
  navigateTo: (page: Page, id?: string) => void;
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  config: SiteConfig;
  sidebarOpen: boolean;
}

const PostPage: React.FC<PostPageProps> = ({ post, allPosts, navigateTo, currentUser, onLogin, onLogout, config, sidebarOpen }) => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const postUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    const headers = doc.querySelectorAll('h2, h3');
    const items: TOCItem[] = Array.from(headers).map((h, index) => ({
      id: `header-${index}`,
      text: h.textContent || '',
      level: parseInt(h.tagName.substring(1))
    }));
    setToc(items);
  }, [post.content]);

  const richContent = useMemo(() => {
    let html = post.content;
    toc.forEach((item, index) => {
      const tag = `h${item.level}`;
      const search = `<${tag}>${item.text}</${tag}>`;
      const replace = `<${tag} id="header-${index}">${item.text}</${tag}>`;
      html = html.replace(search, replace);
    });
    return html;
  }, [post.content, toc]);

  return (
    <div className={`grid grid-cols-1 ${sidebarOpen ? 'lg:grid-cols-10' : 'lg:grid-cols-1'} gap-12 transition-all duration-500`}>
      <article className={`${sidebarOpen ? 'lg:col-span-7' : 'lg:col-span-1 max-w-5xl mx-auto w-full'} space-y-8`}>
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-500/5 border border-white overflow-hidden">
          <div className="relative aspect-[21/9] overflow-hidden">
            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter drop-shadow-lg">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="p-10 md:p-16">
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
                {post.author[0]}
              </div>
              <div>
                <p className="font-black text-slate-900 uppercase tracking-tighter">{post.author}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{post.date} • {post.views} lượt xem</p>
              </div>
            </div>

            <AdSlot rawHtml={config.adsHeader} className="mb-8" />

            <div className="prose prose-slate max-w-none mb-16 text-lg font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: richContent }} />

            <AdSlot rawHtml={config.adsBelowContent} className="my-10" />

            {post.downloads && post.downloads.length > 0 && (
              <div className="space-y-8">
                <div className="text-center py-4 bg-sky-50 rounded-2xl border-2 border-dashed border-sky-100">
                   <p className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">DANH SÁCH TỆP TIN TẢI XUỐNG</p>
                </div>
                {post.downloads.map((dl, idx) => (
                  <div key={idx} className="space-y-6">
                    <DownloadSection download={dl} config={config} />
                    <AdSlot rawHtml={config.adsBelowContent} className="opacity-60" />
                  </div>
                ))}
              </div>
            )}
            
            <AdSlot rawHtml={config.adsBelowContent} className="mt-10" />
          </div>
        </div>
      </article>

      {sidebarOpen && (
        <div className="lg:col-span-3 space-y-12">
          <Sidebar 
            posts={allPosts} 
            navigateTo={navigateTo} 
            currentUser={currentUser}
            onLogin={onLogin}
            onLogout={onLogout}
            config={config}
          />
        </div>
      )}
    </div>
  );
};

export default PostPage;
