
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
}

const PostPage: React.FC<PostPageProps> = ({ post, allPosts, navigateTo, currentUser, onLogin, onLogout, config }) => {
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

  const relatedPosts = useMemo(() => {
    return allPosts
      .filter(p => p.id !== post.id && p.labels.some(l => post.labels.includes(l)))
      .slice(0, 3);
  }, [allPosts, post]);

  const shareLinks = [
    { name: 'Facebook', color: 'bg-[#1877f2]', icon: 'FB', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}` },
    { name: 'Zalo', color: 'bg-[#0068ff]', icon: 'Z', url: `https://zalo.me/s/qr-share/?url=${encodeURIComponent(postUrl)}` },
    { name: 'Line', color: 'bg-[#00c300]', icon: 'L', url: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(postUrl)}` },
    { name: 'Telegram', color: 'bg-[#0088cc]', icon: 'T', url: `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}` },
    { name: 'Twitter', color: 'bg-[#1da1f2]', icon: 'X', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}` },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
      <article className="lg:col-span-7 space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden glass-card">
          <div className="relative aspect-[21/9] overflow-hidden">
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
               <div className="flex flex-wrap gap-2 mb-3">
                {post.labels.map(l => (
                  <span key={l} className="px-3 py-1 bg-primary-600 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-lg">
                    {l}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-md uppercase tracking-tighter">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="flex items-center justify-between mb-10 pb-6 border-b dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-xl font-black">
                  {post.author[0]}
                </div>
                <div>
                  <p className="font-black dark:text-white uppercase tracking-tighter">{post.author}</p>
                  <p className="text-xs font-bold text-gray-400">{post.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views || 0} lượt xem
              </div>
            </div>

            {toc.length > 0 && (
              <div className="mb-10 p-6 bg-gray-50 dark:bg-gray-900/40 rounded-3xl border border-gray-100 dark:border-gray-700">
                <h4 className="font-black mb-5 flex items-center gap-3 uppercase text-xs tracking-[0.2em] text-gray-500">
                  <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
                  Mục lục nội dung
                </h4>
                <ul className="space-y-3">
                  {toc.map((item, idx) => (
                    <li key={idx} className={`${item.level === 3 ? 'ml-6' : ''}`}>
                      <a 
                        href={`#header-${idx}`} 
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-all text-sm font-bold flex items-center gap-3 group"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(`header-${idx}`)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full group-hover:bg-primary-500 group-hover:scale-150 transition-all"></span>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div 
              className="prose dark:prose-invert max-w-none mb-12 text-lg"
              dangerouslySetInnerHTML={{ __html: richContent }}
            />

            {/* Content Ad Slot */}
            {config.adsBelowContent && (
               <div className="my-12">
                  <AdSlot rawHtml={config.adsBelowContent} />
               </div>
            )}

            {post.downloads && post.downloads.map((dl, idx) => (
              <DownloadSection key={idx} download={dl} />
            ))}

            <div className="mt-12 pt-8 border-t dark:border-gray-700">
              <div className="flex flex-col gap-6">
                 <div>
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">CHIA SẺ BÀI VIẾT</h4>
                   <div className="flex flex-wrap gap-3">
                      {shareLinks.map(link => (
                        <a 
                          key={link.name} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`${link.color} text-white px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg active:scale-95`}
                        >
                          <span className="text-xs">{link.icon}</span>
                          {link.name}
                        </a>
                      ))}
                   </div>
                 </div>

                 <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-black mr-2 self-center text-gray-400 uppercase tracking-widest">TAGS:</span>
                    {post.labels.map(l => (
                      <button key={l} className="px-4 py-1.5 bg-gray-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 text-[10px] font-black rounded-lg transition-colors uppercase tracking-wider border border-transparent hover:border-primary-100">
                        #{l}
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3 dark:text-white uppercase tracking-tight">
              <span className="w-3 h-10 bg-primary-600 rounded-lg shadow-lg shadow-primary-500/30"></span>
              Có thể bạn quan tâm
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(p => (
                <PostCard key={p.id} post={p} onClick={() => navigateTo(Page.POST, p.id)} />
              ))}
            </div>
          </div>
        )}
      </article>

      <div className="lg:col-span-3 space-y-8 hidden lg:block">
        <Sidebar 
          posts={allPosts} 
          navigateTo={navigateTo} 
          currentUser={currentUser}
          onLogin={onLogin}
          onLogout={onLogout}
          config={config}
        />
      </div>
    </div>
  );
};

export default PostPage;
