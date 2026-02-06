
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
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('phv_remembered');
    if (saved) {
      try {
        const { username: savedUser, password: savedPassword } = JSON.parse(saved);
        setUsername(savedUser);
        setPassword(savedPassword);
        setRememberMe(true);
      } catch (e) {
        console.error("Error loading remembered info");
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const ADMIN_USER = "admin";
    const ADMIN_PASSWORD = "0927099940@Phv";

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
        if (rememberMe) {
          localStorage.setItem('phv_remembered', JSON.stringify({ username, password }));
        } else {
          localStorage.removeItem('phv_remembered');
        }
        onLogin({ email: username, role: 'admin' });
      } else {
        setError(true);
      }
      setIsLoading(false);
    }, 800);
  };

  if (currentUser) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 glass-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center font-black shadow-lg shadow-primary-500/20">
            {currentUser.email[0].toUpperCase()}
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Administrator</p>
            <p className="text-sm font-bold dark:text-white">Xin chào, {currentUser.email}!</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <button 
            onClick={() => navigateTo(Page.EDITOR)}
            className="w-full bg-primary-600 text-white py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
          >
            Viết bài mới
          </button>
          <button 
            onClick={() => navigateTo(Page.SETTINGS)}
            className="w-full bg-gray-50 dark:bg-gray-900 dark:text-white py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Quản Lý Blog
          </button>
          <button 
            onClick={onLogout}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-2 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 glass-card">
      <h3 className="text-[10px] font-black mb-5 flex items-center gap-2 dark:text-white uppercase tracking-[0.2em] text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        ĐĂNG NHẬP
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text" 
          placeholder="Tên đăng nhập" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border ${error ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} outline-none focus:border-primary-500 text-[11px] font-medium transition-all dark:text-white`}
          required
        />
        <div className="relative">
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Mật khẩu" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border ${error ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} outline-none focus:border-primary-500 text-[11px] font-medium transition-all dark:text-white`}
            required
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            )}
          </button>
        </div>
        
        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors uppercase tracking-widest">Ghi nhớ</span>
          </label>
          <button 
            type="button"
            onClick={() => navigateTo(Page.LOGIN)}
            className="text-[9px] font-black text-primary-600 hover:underline uppercase tracking-widest"
          >
            Quên?
          </button>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary-500/20 active:scale-95 transition-all flex justify-center items-center mt-2"
        >
          {isLoading ? (
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'XÁC NHẬN'}
        </button>
      </form>
    </div>
  );
};

export default SidebarLogin;
