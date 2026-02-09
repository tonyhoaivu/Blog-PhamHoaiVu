
import React, { useState, useEffect, useMemo } from 'react';
import { Page, Post, TOCItem, User, SiteConfig } from '../types';
import DownloadSection from './DownloadSection';
import Sidebar from './Sidebar';
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
  const [likes, setLikes] = useState(Math.floor(Math.random() * 500) + 100);
  const [hasLiked, setHasLiked] = useState(false);
  
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

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;
    if (platform === 'fb') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    if (platform === 'tw') window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  return (
    <div className={`grid grid-cols-1 ${sidebarOpen ? 'lg:grid-cols-10' : 'lg:grid-cols-1'} gap-12 transition-all duration-500`}>
      <article className={`${sidebarOpen ? 'lg:col-span-7' : 'lg:col-span-1 max-w-5xl mx-auto w-full'} space-y-8 relative`}>
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-white overflow-hidden relative z-10">
          <div className="relative aspect-[21/9] overflow-hidden">
            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter drop-shadow-lg">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl">
                  {post.author[0]}
                </div>
                <div>
                  <p className="font-black text-slate-900 uppercase tracking-tighter">{post.author}</p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{post.date} • {post.views} lượt xem</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all ${hasLiked ? 'bg-pink-100 text-pink-600 shadow-inner' : 'bg-slate-50 text-slate-500 hover:bg-pink-50 hover:text-pink-500'}`}
                >
                  <svg className="w-4 h-4" fill={hasLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  {likes} LIKE
                </button>
                <div className="flex items-center gap-1">
                   <button onClick={() => handleShare('fb')} className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg></button>
                   <button onClick={() => handleShare('tw')} className="p-2.5 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition shadow-md"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></button>
                </div>
              </div>
            </div>

            <AdSlot rawHtml={config.adsHeader} className="mb-8" />

            <div 
              className="prose prose-slate max-w-none mb-16 text-lg font-medium leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: richContent }} 
            />

            {post.downloads && post.downloads.length > 0 && (
              <div className="space-y-8 mt-12">
                {post.downloads.map((dl, idx) => (
                  <DownloadSection key={idx} download={dl} config={config} postLabels={post.labels} />
                ))}
              </div>
            )}

            <div className="mt-20 pt-12 border-t border-slate-100">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full"></span>
                Bình luận ({Math.floor(likes/5)})
              </h3>
              
              <div className="bg-slate-50 rounded-[2rem] p-8">
                 {!currentUser ? (
                   <div className="text-center py-6 space-y-4">
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Vui lòng đăng nhập để gửi bình luận</p>
                      <div className="flex justify-center gap-3">
                         <button onClick={() => navigateTo(Page.LOGIN)} className="bg-white border border-slate-200 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">Google Login</button>
                         <button onClick={() => navigateTo(Page.LOGIN)} className="bg-white border border-slate-200 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 hover:text-white transition-all shadow-sm">Facebook Login</button>
                      </div>
                   </div>
                 ) : (
                   <div className="space-y-4">
                      <textarea 
                        placeholder="Viết cảm nghĩ của bạn về bài viết này..."
                        className="w-full bg-white border-2 border-transparent focus:border-sky-500 rounded-2xl p-5 outline-none min-h-[120px] text-sm font-medium shadow-inner"
                      />
                      <div className="flex justify-end">
                        <button className="bg-sky-600 text-white px-10 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-sky-600/20 hover:bg-sky-700 transition-all">Gửi bình luận</button>
                      </div>
                   </div>
                 )}
              </div>
            </div>
            
            <div className="mt-16 pt-8 italic text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                Mọi hành vi sao chép nội dung trái phép đều vi phạm chính sách DMCA của Phạm Hoài Vũ Blog.
            </div>
          </div>
        </div>
      </article>

      {sidebarOpen && (
        <div className="lg:col-span-3 space-y-12">
          <Sidebar posts={allPosts} navigateTo={navigateTo} currentUser={currentUser} onLogin={onLogin} onLogout={onLogout} config={config} />
        </div>
      )}
    </div>
  );
};

export default PostPage;
