
import React, { useState, useEffect } from 'react';
import { Page, User } from '../types';

interface SidebarLoginProps {
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  navigateTo: (page: Page) => void;
}

const SidebarLogin: React.FC<SidebarLoginProps> = ({ currentUser, onLogin, onLogout, navigateTo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Khởi tạo và ghi nhớ tài khoản
  useEffect(() => {
    const savedUser = localStorage.getItem('phv_remembered_user');
    const savedPass = localStorage.getItem('phv_remembered_pass');
    if (savedUser && savedPass) {
      setUsername(savedUser);
      setPassword(savedPass);
    }
  }, []);

  const handleSocialLogin = (platform: 'google' | 'facebook') => {
    setIsLoading(true);
    setTimeout(() => {
      const userData: User = { 
        email: `user_${platform}_${Math.floor(Math.random() * 9000) + 1000}@gmail.com`, 
        role: 'user' 
      };
      onLogin(userData);
      localStorage.setItem('phv_session', JSON.stringify(userData));
      setIsLoading(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const ADMIN_USER = "admin";
    const ADMIN_PASSWORD = "0927099940@Phv";

    setTimeout(() => {
      if (username.trim() === ADMIN_USER && password === ADMIN_PASSWORD) {
        if (rememberMe) {
          localStorage.setItem('phv_remembered_user', username.trim());
          localStorage.setItem('phv_remembered_pass', password);
        } else {
          localStorage.removeItem('phv_remembered_user');
          localStorage.removeItem('phv_remembered_pass');
        }
        
        const adminData: User = { email: username.trim(), role: 'admin' };
        onLogin(adminData);
        localStorage.setItem('phv_session', JSON.stringify(adminData));
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
      setIsLoading(false);
    }, 1000);
  };

  if (currentUser) {
    return (
      <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-sky-50 animate-in zoom-in duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-2xl shadow-lg">
            {currentUser.email[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{currentUser.role === 'admin' ? 'Administrator' : 'Verified VIP'}</p>
            <p className="text-sm font-black text-slate-900 truncate leading-none mt-1">{currentUser.email}</p>
          </div>
        </div>
        <div className="space-y-3">
          {currentUser.role === 'admin' && (
            <button onClick={() => navigateTo(Page.ADMIN)} className="w-full bg-sky-600 text-white py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-sky-700 shadow-xl shadow-sky-600/10 transition-all active:scale-95">BẢNG ĐIỀU KHIỂN</button>
          )}
          <button onClick={() => { onLogout(); localStorage.removeItem('phv_session'); }} className="w-full bg-slate-100 text-slate-500 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all">ĐĂNG XUẤT</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-sky-50 animate-in fade-in duration-300">
      <h3 className="text-[11px] font-black mb-6 flex items-center gap-2 text-slate-900 uppercase tracking-[3px]">
        <span className="w-1.5 h-6 bg-sky-600 rounded-full"></span>
        ĐĂNG NHẬP NHANH
      </h3>

      <div className="space-y-3 mb-6">
        <button onClick={() => handleSocialLogin('google')} disabled={isLoading} className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm group">
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4 group-hover:scale-110 transition-transform" alt="G" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Google Connect</span>
        </button>
        <button onClick={() => handleSocialLogin('facebook')} disabled={isLoading} className="w-full flex items-center justify-center gap-3 py-3 bg-[#1877F2] text-white rounded-xl hover:bg-blue-700 transition shadow-sm group">
           <svg className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
          <span className="text-[10px] font-black uppercase tracking-widest">Facebook Connect</span>
        </button>
      </div>

      <div className="relative flex items-center gap-4 mb-6 opacity-30">
        <div className="flex-grow h-px bg-slate-400"></div>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Admin</span>
        <div className="flex-grow h-px bg-slate-400"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Tên đăng nhập..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border-2 ${error ? 'border-red-500 animate-shake' : 'border-transparent'} focus:border-sky-600 outline-none text-[12px] font-bold shadow-inner transition-all`}
          required
        />
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Mật khẩu..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border-2 ${error ? 'border-red-500 animate-shake' : 'border-transparent'} focus:border-sky-600 outline-none text-[12px] font-bold shadow-inner transition-all`}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-600 text-[10px] font-black">
            {showPassword ? "ẨN" : "HIỆN"}
          </button>
        </div>

        <div className="flex items-center gap-2 px-1">
          <input type="checkbox" id="remember_quick" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer" />
          <label htmlFor="remember_quick" className="text-[10px] font-black text-slate-400 uppercase tracking-tighter cursor-pointer">Ghi nhớ đăng nhập</label>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black shadow-xl transition-all active:scale-95 disabled:bg-slate-400">
          {isLoading ? "XÁC THỰC..." : "ĐĂNG NHẬP ADMIN"}
        </button>
      </form>
    </div>
  );
};

export default SidebarLogin;
