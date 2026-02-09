
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
      onLogin({ email: `tony_${platform}@gmail.com`, role: 'user' });
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
        }
        onLogin({ email: username.trim(), role: 'admin' });
      } else {
        setError(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  if (currentUser) {
    return (
      <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-sky-50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-sky-500/20">
            {currentUser.email[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{currentUser.role === 'admin' ? 'Administrator' : 'Verified User'}</p>
            <p className="text-sm font-black text-slate-900 truncate">{currentUser.email}</p>
          </div>
        </div>
        <div className="space-y-3">
          {currentUser.role === 'admin' && (
            <button onClick={() => navigateTo(Page.ADMIN)} className="w-full bg-sky-600 text-white py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-sky-700 shadow-md transition-all">DASHBOARD</button>
          )}
          <button onClick={onLogout} className="w-full bg-slate-100 text-slate-500 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all">THOÁT TÀI KHOẢN</button>
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
        <button 
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="G" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Google Login</span>
        </button>
        <button 
          onClick={() => handleSocialLogin('facebook')}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 bg-[#1877F2] text-white rounded-xl hover:bg-blue-700 transition shadow-sm"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Facebook Login</span>
        </button>
      </div>

      <div className="relative flex items-center gap-4 mb-6 opacity-20">
        <div className="flex-grow h-px bg-slate-900"></div>
        <span className="text-[10px] font-black uppercase">Admin</span>
        <div className="flex-grow h-px bg-slate-900"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Tài khoản..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border-2 ${error ? 'border-red-500' : 'border-transparent'} focus:border-sky-600 outline-none text-[12px] font-bold shadow-inner`}
          required
        />
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Mật khẩu..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border-2 ${error ? 'border-red-500' : 'border-transparent'} focus:border-sky-600 outline-none text-[12px] font-bold shadow-inner`}
            required
          />
        </div>
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-black shadow-lg transition-all"
        >
          {isLoading ? "ĐANG XÁC THỰC..." : "ĐĂNG NHẬP"}
        </button>
      </form>
    </div>
  );
};

export default SidebarLogin;
