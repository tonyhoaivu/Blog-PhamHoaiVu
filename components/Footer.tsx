
import React from 'react';
import { Page, User } from '../types';

interface FooterProps {
  navigateTo: (page: Page, id?: string) => void;
  currentUser: User | null;
  logoUrl: string | null;
}

const Footer: React.FC<FooterProps> = ({ navigateTo, currentUser, logoUrl }) => {
  return (
    <footer className="mt-20 pb-10 bg-[#f4f7f6] dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-[40px] shadow-2xl shadow-blue-500/20 overflow-hidden relative">
          <div className="relative z-10 p-10 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
            <div className="space-y-6">
              <div className="flex items-center gap-3 cursor-pointer group w-fit" onClick={() => navigateTo(Page.HOME)}>
                {logoUrl ? (
                   <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain brightness-0 invert" />
                ) : (
                  <>
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"><svg className="h-6 w-6 text-blue-700" viewBox="0 0 20 20" fill="currentColor"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/></svg></div>
                    <h2 className="text-2xl font-black tracking-tight uppercase">Tony <span className="text-yellow-400">Hoài Vũ</span></h2>
                  </>
                )}
              </div>
              <p className="text-blue-50 text-sm opacity-90 leading-relaxed italic">"Chia sẻ Template, thủ thuật & tài nguyên miễn phí. Sáng tạo mỗi ngày cùng PHV Blog!"</p>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
              </div>
            </div>

            <div>
              <h3 className="font-black text-white/50 mb-8 uppercase text-[11px] tracking-[0.3em]">DANH MỤC</h3>
              <ul className="space-y-4">
                {['Windows ISO', 'Phần mềm', 'Driver', 'Thủ thuật', 'Đồ họa'].map(m => (
                  <li key={m}><button onClick={() => navigateTo(Page.HOME)} className="text-white hover:text-yellow-400 text-sm font-bold transition-all flex items-center gap-3">○ {m}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-black text-white/50 mb-8 uppercase text-[11px] tracking-[0.3em]">LIÊN HỆ</h3>
              <div className="space-y-5">
                 <div className="flex items-start gap-4"><div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div><div><p className="text-[10px] uppercase font-black opacity-50">Email</p><p className="text-sm font-black">tonyhoaivu@gmail.com</p></div></div>
                 <div className="flex items-start gap-4"><div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></div><div><p className="text-[10px] uppercase font-black opacity-50">Hotline</p><p className="text-sm font-black">0927 099 940</p></div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center px-4 gap-6">
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">© 2025 <span className="text-gray-900 dark:text-white">PhamHoaiVu</span>. Powered by PHV CMS.</p>
          <nav className="flex gap-8 text-[11px] font-black text-gray-500 uppercase tracking-widest">
            <button className="hover:text-blue-600">Sitemap</button>
            <button className="hover:text-blue-600">Privacy</button>
            <button className="hover:text-blue-600">Disclaimer</button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
