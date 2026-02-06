
import React from 'react';
import { Page, User, SiteConfig } from '../types';

interface FooterProps {
  navigateTo: (page: Page, id?: string) => void;
  currentUser: User | null;
  logoUrl: string | null;
  onSelectLabel: (label: string) => void;
  config: SiteConfig;
}

const Footer: React.FC<FooterProps> = ({ navigateTo, logoUrl, onSelectLabel, config }) => {
  const domain = "phamhoaivu.vercel.app";

  return (
    <footer className="max-w-6xl mx-auto w-full mb-10 mt-16">
      <div 
        className="text-white p-12 md:p-16 rounded-[4rem] shadow-2xl flex flex-col md:flex-row gap-16 relative overflow-hidden"
        style={{ 
          background: config.footerBgColor 
            ? `linear-gradient(to bottom right, ${config.footerBgColor}, ${config.footerBgColor}cc)` 
            : 'linear-gradient(to bottom right, #2563eb, #3b82f6)' 
        }}
      >
        
        {/* Cột 1: Brand & Social */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-3">
            {config.footerLogoUrl ? (
              <img src={config.footerLogoUrl} alt="Footer Logo" className="object-contain" style={{ width: config.footerLogoWidth || 'auto', height: config.footerLogoHeight || 60 }} />
            ) : (
              <>
                <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-pulse"></div>
                <h4 className="text-3xl font-black tracking-tight uppercase">Tony Hoài Vũ</h4>
              </>
            )}
          </div>
          <p className="text-blue-50 text-base leading-relaxed max-w-xs opacity-90 font-medium">
            Chia sẻ Template, thủ thuật Blogspot & tài nguyên thiết kế miễn phí. Cùng sáng tạo mỗi ngày!
          </p>
          <div className="flex gap-4">
             {['fb', 'yt', 'gh'].map((icon) => (
               <div key={icon} className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center font-black text-[10px] uppercase cursor-pointer hover:bg-white hover:text-blue-600 transition-all duration-300">
                 {icon}
               </div>
             ))}
          </div>
        </div>

        {/* Cột 2: Danh mục (Tối giản theo yêu cầu) */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-black uppercase tracking-[3px] text-blue-200">DANH MỤC</h4>
          <ul className="space-y-3 text-sm font-bold">
            {[
              { label: 'Windows', target: 'Win 11' },
              { label: 'Phần Mềm', target: 'Software' },
              { label: 'KÝ TỰ ĐẸP', target: 'SPECIAL_CHARS' },
              { label: 'TẠO ẢNH AI', target: 'CREATE_IMAGE' },
              { label: 'Liên Hệ', target: 'CONTACT_PAGE' }
            ].map(item => (
              <li 
                key={item.label} 
                onClick={() => onSelectLabel(item.target)} 
                className="hover:translate-x-2 transition-transform cursor-pointer opacity-80 hover:opacity-100 flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-black uppercase tracking-[3px] text-blue-200">LIÊN HỆ</h4>
          <ul className="space-y-4 text-sm font-bold">
            <li className="flex items-center gap-3">
              <span className="text-xl">✉️</span> tonyhoaivu@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl">☎️</span> Hỗ trợ 24/7 trực tuyến
            </li>
            <li className="pt-4">
              <button onClick={() => navigateTo(Page.CONTACT)} className="bg-white text-blue-600 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-50 transition">Gửi tin nhắn</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Chân trang dưới cùng */}
      <div className="mt-10 px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 font-black uppercase tracking-[3px]">
        <p>© 2026 {domain}</p>
        <div className="flex gap-8">
          <span className="hover:text-blue-600 cursor-pointer transition">Contact</span>
          <span className="hover:text-blue-600 cursor-pointer transition">Sitemap</span>
          <span className="hover:text-blue-600 cursor-pointer transition">Privacy</span>
          <span className="hover:text-blue-600 cursor-pointer transition">Disclaimer</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
