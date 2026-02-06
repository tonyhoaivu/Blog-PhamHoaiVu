
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
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [forgotEmail, setForgotEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('phv_remembered_user');
    const savedPass = localStorage.getItem('phv_remembered_pass');
    if (savedUser && savedPass) {
      setUsername(savedUser);
      setPassword(savedPass);
      setRememberMe(true);
    }
  }, []);

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
        onLogin({ email: username.trim(), role: 'admin' });
      } else {
        setError(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setMode('login');
      }, 3000);
    }, 1500);
  };

  if (currentUser) {
    return (
      <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-sky-500/5 border border-sky-50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
            {currentUser.email[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Administrator</p>
            <p className="text-sm font-black text-slate-900 truncate">{currentUser.email}</p>
          </div>
        </div>
        <div className="space-y-3">
          <button onClick={() => navigateTo(Page.ADMIN)} className="w-full bg-sky-600 text-white py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-sky-700 shadow-md transition-all">QUẢN TRỊ</button>
          <button onClick={onLogout} className="w-full bg-slate-100 text-slate-500 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all">THOÁT</button>
        </div>
      </div>
    );
  }

  if (mode === 'forgot') {
    return (
      <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-sky-500/5 border border-sky-50 animate-in fade-in zoom-in duration-300">
        <h3 className="text-[11px] font-black mb-6 flex items-center gap-2 text-slate-900 uppercase tracking-[3px]">
          <span className="w-1.5 h-6 bg-sky-600 rounded-full"></span>
          QUÊN MẬT KHẨU
        </h3>
        {isSent ? (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase">Đã gửi liên kết khôi phục!</p>
          </div>
        ) : (
          <form onSubmit={handleForgot} className="space-y-4">
            <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Nhập Gmail Admin để nhận mã khôi phục mật khẩu.</p>
            <input 
              type="email" 
              placeholder="Email admin..." 
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-sky-50/50 border-2 border-transparent focus:border-sky-600 outline-none text-[12px] font-bold transition-all"
              required
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-sky-600 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
            >
              {isLoading ? "ĐANG GỬI..." : "GỬI Gmail"}
            </button>
            <button 
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-[10px] font-black text-gray-400 hover:text-sky-600 uppercase tracking-widest"
            >
              QUAY LẠI
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-sky-500/5 border border-sky-50 animate-in fade-in duration-300">
      <h3 className="text-[11px] font-black mb-6 flex items-center gap-2 text-slate-900 uppercase tracking-[3px]">
        <span className="w-1.5 h-6 bg-sky-600 rounded-full"></span>
        ĐĂNG NHẬP
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Tài khoản..." 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full px-5 py-4 rounded-xl bg-sky-50/50 border-2 ${error ? 'border-red-500' : 'border-transparent'} focus:border-sky-600 outline-none text-[12px] font-bold transition-all`}
            required
          />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Mật khẩu..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl bg-sky-50/50 border-2 ${error ? 'border-red-500' : 'border-transparent'} focus:border-sky-600 outline-none text-[12px] font-bold transition-all`}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-400 hover:text-sky-600 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-sky-300 text-sky-600 focus:ring-sky-500 transition-all" 
            />
            <span className="text-[10px] font-black text-gray-400 group-hover:text-sky-600 uppercase tracking-tight">Ghi nhớ</span>
          </label>
          <button 
            type="button" 
            onClick={() => setMode('forgot')}
            className="text-[10px] font-black text-sky-600 hover:underline uppercase tracking-tight"
          >
            Quên mật khẩu?
          </button>
        </div>
        
        {error && <p className="text-[10px] font-black text-red-600 text-center uppercase tracking-wider animate-shake">Sai thông tin!</p>}

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-sky-600 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
        >
          {isLoading ? "ĐANG ĐĂNG NHẬP..." : "XÁC NHẬN"}
        </button>
      </form>
    </div>
  );
};

export default SidebarLogin;
