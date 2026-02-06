
import React, { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const ADMIN_USER = "admin";
    const ADMIN_PASSWORD = "0927099940@Phv";

    setTimeout(() => {
      if (username.trim() === ADMIN_USER && password === ADMIN_PASSWORD) {
        onLogin({ email: username.trim(), role: 'admin' });
      } else {
        setError(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  if (currentUser) {
    return (
      <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-500/5 border border-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
            {currentUser.email[0].toUpperCase()}
          </div>
          <div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Administrator</p>
            <p className="text-sm font-black text-slate-900 line-clamp-1">{currentUser.email}</p>
          </div>
        </div>
        <div className="space-y-3">
          <button onClick={() => navigateTo(Page.ADMIN)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 shadow-md">QUẢN TRỊ</button>
          <button onClick={onLogout} className="w-full bg-slate-100 text-slate-500 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600">THOÁT</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-500/5 border border-white">
      <h3 className="text-[11px] font-black mb-6 flex items-center gap-2 text-slate-900 uppercase tracking-[3px]">
        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
        ĐĂNG NHẬP
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text" 
          placeholder="Tài khoản..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full px-5 py-4 rounded-xl bg-slate-50 border-2 ${error ? 'border-red-500' : 'border-transparent'} focus:border-blue-600 outline-none text-[12px] font-bold transition-all`}
          required
        />
        <input 
          type="password" 
          placeholder="Mật khẩu..." 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-5 py-4 rounded-xl bg-slate-50 border-2 ${error ? 'border-red-500' : 'border-transparent'} focus:border-blue-600 outline-none text-[12px] font-bold transition-all`}
          required
        />
        
        {error && <p className="text-[10px] font-black text-red-600 text-center uppercase tracking-wider">Sai thông tin!</p>}

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all mt-2"
        >
          {isLoading ? "..." : "XÁC NHẬN"}
        </button>
      </form>
    </div>
  );
};

export default SidebarLogin;
