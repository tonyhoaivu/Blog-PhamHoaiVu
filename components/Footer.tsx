
import React from 'react';
import { Page, User } from '../types';

interface FooterProps {
  navigateTo: (page: Page, id?: string) => void;
  currentUser: User | null;
  logoUrl: string | null;
  onSelectLabel: (label: string) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo, logoUrl, onSelectLabel }) => {
  const domain = "phamhoaivu.vercel.app";

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10 px-6 mt-20">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
        
        {/* Cột 1: Thông tin */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo(Page.HOME)}>
            {logoUrl ? (
               <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
               <>
                <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">V</div>
                <div className="flex flex-col">
                  <span className="font-black text-xl tracking-tighter text-white uppercase leading-none">BLOG</span>
                  <span className="font-black text-xs tracking-widest text-cyan-400 uppercase leading-none italic">PHẠM HOÀI VŨ</span>
                </div>
               </>
            )}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Hệ thống chia sẻ tài nguyên công nghệ, bộ cài Windows và thủ thuật máy tính chuyên nghiệp hàng đầu. Sứ mệnh mang lại trải nghiệm tối ưu nhất cho người dùng.
          </p>
        </div>

        {/* Cột 2: Chuyên mục (Sitemap) */}
        <div className="space-y-6">
          <h4 className="text-white font-black text-[10px] tracking-[0.3em] uppercase flex items-center gap-2">
            <span className="w-1 h-4 bg-cyan-500"></span>
            CHUYÊN MỤC
          </h4>
          <ul className="space-y-3">
            {[
              { label: 'Windows (7, 8, 10, 11)', target: 'Win 11' },
              { label: 'Phần mềm máy tính', target: 'Software' },
              { label: 'Driver Máy Tính', target: 'Driver PC' },
              { label: 'BOOT USB', target: 'BOOT USB' },
              { label: 'Thủ thuật công nghệ', target: 'Thủ thuật' },
              { label: 'Kho Game PC & Mobile', target: 'ISO' }
            ].map(cat => (
              <li key={cat.label}>
                <button onClick={() => onSelectLabel(cat.target)} className="text-slate-500 text-[11px] font-bold uppercase tracking-wider hover:text-cyan-400 transition-all flex items-center gap-2">
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Support */}
        <div className="space-y-6">
          <h4 className="text-white font-black text-[10px] tracking-[0.3em] uppercase flex items-center gap-2">
             <span className="w-1 h-4 bg-cyan-500"></span>
             HỖ TRỢ
          </h4>
          <ul className="space-y-3">
            {['Về Blog Phạm Hoài Vũ', 'Chính sách bảo mật', 'Điều khoản sử dụng', 'Liên hệ quảng cáo'].map(item => (
              <li key={item}>
                <button onClick={() => navigateTo(Page.ABOUT)} className="text-slate-500 text-[11px] font-bold uppercase tracking-wider hover:text-cyan-400 transition-all">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 4: Social */}
        <div className="space-y-6">
          <h4 className="text-white font-black text-[10px] tracking-[0.3em] uppercase flex items-center gap-2">
             <span className="w-1 h-4 bg-cyan-500"></span>
             KẾT NỐI
          </h4>
          <div className="flex gap-4">
             <a href="#" className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all shadow-lg active:scale-95">FB</a>
             <a href="#" className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-cyan-400 hover:text-white transition-all shadow-lg active:scale-95">YT</a>
             <a href="#" className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all shadow-lg active:scale-95">IG</a>
          </div>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-relaxed">
            Hợp tác: phamhoaivu@gmail.com
          </p>
        </div>
      </div>

      <div className="text-center border-t border-white/5 pt-10 flex flex-col items-center gap-4">
        <div className="text-slate-600 text-[9px] font-black tracking-[0.5em] uppercase">
          {domain} © 2026 - BLOG PHẠM HOÀI VŨ PREMIUM
        </div>
        <div className="flex gap-4 text-slate-800 text-[8px] font-black uppercase tracking-widest">
           <span>Power by Gemini AI</span>
           <span>•</span>
           <span>Luxury Tech Edition</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
