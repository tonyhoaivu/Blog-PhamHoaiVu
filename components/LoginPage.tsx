
import React, { useState } from 'react';
import { Page, User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  navigateTo: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, navigateTo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Tài khoản Admin chính thức
    const ADMIN_USER = "admin";
    const ADMIN_PASSWORD = "0927099940@Phv";

    setTimeout(() => {
      // Sử dụng so sánh trực tiếp và trim để loại bỏ khoảng trắng thừa
      if (username.trim() === ADMIN_USER && password === ADMIN_PASSWORD) {
        onLogin({ email: username.trim(), role: 'admin' });
        navigateTo(Page.ADMIN);
      } else {
        setError('Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-white overflow-hidden">
        <div className="bg-blue-600 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-md">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Hệ thống Admin</h2>
            <p className="text-blue-100 text-[11px] font-bold uppercase tracking-[3px] mt-2 opacity-80">Blog Phạm Hoài Vũ Premium</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-12 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-[11px] font-black rounded-2xl border border-red-100 text-center uppercase tracking-wider animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Tên đăng nhập</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
                className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mật khẩu bảo mật</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? "Đang xác thực..." : "ĐĂNG NHẬP NGAY"}
          </button>

          <button 
            type="button"
            onClick={() => navigateTo(Page.HOME)}
            className="w-full text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors"
          >
            Hủy và quay về trang chủ
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
