
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
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/5 pb-12">
          
          {/* Cột 1: Giới thiệu */}
          <div className="space-y-6">
            <h4 className="text-xl font-black tracking-tighter uppercase">Tony Hoài Vũ</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Tony Hoài Vũ - Chuyên trang chia sẻ Template Blogspot, thủ thuật máy tính, bộ cài Windows và tài nguyên đồ họa miễn phí cho cộng đồng.
            </p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all">FB</a>
               <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-300 hover:bg-red-600 hover:text-white transition-all">YT</a>
               <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-300 hover:bg-blue-400 hover:text-white transition-all">TW</a>
            </div>
          </div>

          {/* Cột 2: Danh mục chính */}
          <div className="space-y-6">
            <h5 className="text-[13px] font-black uppercase tracking-[0.2em] text-blue-500">DANH MỤC</h5>
            <ul className="space-y-3">
              {[
                { label: 'WINDOWS', target: 'Win 11' },
                { label: 'Phần mềm PC', target: 'Software' },
                { label: 'Driver Máy Tính', target: 'Driver PC' },
                { label: 'BOOT USB', target: 'BOOT USB' },
                { label: 'Thủ thuật công nghệ', target: 'Thủ thuật' },
                { label: 'Game PC ISO', target: 'ISO' }
              ].map(cat => (
                <li key={cat.label}>
                  <button onClick={() => onSelectLabel(cat.target)} className="text-slate-400 text-sm hover:text-blue-500 transition-colors text-left">
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Liên kết */}
          <div className="space-y-6">
            <h5 className="text-[13px] font-black uppercase tracking-[0.2em] text-blue-500">LIÊN KẾT</h5>
            <ul className="space-y-3">
              {['Về tôi', 'Chính sách bảo mật', 'Điều khoản sử dụng', 'Liên hệ hợp tác'].map(item => (
                <li key={item}>
                  <button onClick={() => navigateTo(Page.ABOUT)} className="text-slate-400 text-sm hover:text-blue-500 transition-colors text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Đăng ký */}
          <div className="space-y-6">
            <h5 className="text-[13px] font-black uppercase tracking-[0.2em] text-blue-500">BẢN TIN</h5>
            <p className="text-slate-400 text-sm">Nhận thông báo bài viết mới nhất qua Email.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email của bạn..." className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500 flex-grow" />
              <button className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-blue-700">Gửi</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
          <div>© 2026 {domain} - ALL RIGHTS RESERVED</div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Tony Hoài Vũ Blog</span>
            <span className="hover:text-white cursor-pointer transition-colors">Premium Template</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
