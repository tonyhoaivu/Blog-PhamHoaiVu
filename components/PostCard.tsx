
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <article 
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer group flex flex-col h-full border border-slate-100 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={post.thumbnail} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {post.labels.slice(0, 1).map(label => (
            <span key={label} className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{post.date}</span>
        </div>
        <h3 className="font-black text-lg leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 text-slate-900 uppercase tracking-tighter">
          {post.title}
        </h3>
        <p className="text-slate-500 text-[13px] line-clamp-3 mb-6 leading-relaxed font-medium">
          {post.summary}
        </p>
        <div className="mt-auto flex justify-between items-center pt-5 border-t border-slate-50">
          <span className="text-blue-600 text-[11px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
            Đọc bài viết
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{post.views.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
