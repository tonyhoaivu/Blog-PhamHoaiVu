
import React, { useState, useEffect } from 'react';
import { Page, User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  navigateTo: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, navigateTo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

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
    setError('');

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
        navigateTo(Page.ADMIN);
      } else {
        setError('Tài khoản hoặc mật khẩu không chính xác.');
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingReset(true);
    setTimeout(() => {
      setIsSendingReset(false);
      setResetSent(true);
      setTimeout(() => {
        setForgotPasswordMode(false);
        setResetSent(false);
      }, 5000);
    }, 2000);
  };

  if (forgotPasswordMode) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-sky-100 overflow-hidden">
          <div className="bg-sky-600 p-10 text-center relative border-b-4 border-sky-800">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">QUÊN MẬT KHẨU?</h2>
            <p className="text-sky-100 text-[10px] font-bold uppercase tracking-[3px] mt-2">Gửi mã khôi phục đến Gmail Admin</p>
          </div>
          <div className="p-10 space-y-6">
            {resetSent ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-black text-slate-800 uppercase tracking-tight text-xl">ĐÃ GỬI Gmail!</h3>
                <p className="text-sm text-slate-500 font-medium">Vui lòng kiểm tra hộp thư đến của Gmail <b>{forgotEmail}</b> để khôi phục quyền truy cập.</p>
                <button onClick={() => setForgotPasswordMode(false)} className="mt-6 text-sky-600 font-black text-[11px] uppercase tracking-widest hover:underline">Quay lại đăng nhập</button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Gmail của Admin</label>
                    <input 
                      type="email" 
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="tonyhoaivu@gmail.com..."
                      className="w-full px-6 py-4 rounded-2xl bg-sky-50/50 border-2 border-transparent focus:border-sky-500 outline-none transition-all font-bold text-slate-700 shadow-inner"
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isSendingReset}
                  className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-sky-600/20 transition-all flex items-center justify-center gap-3"
                >
                  {isSendingReset ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ĐANG XỬ LÝ...
                    </>
                  ) : "GỬI YÊU CẦU"}
                </button>
                <button 
                  type="button"
                  onClick={() => setForgotPasswordMode(false)}
                  className="w-full text-[10px] font-black text-slate-400 hover:text-sky-600 uppercase tracking-widest transition-colors"
                >
                  HUỶ VÀ QUAY LẠI
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4 animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-sky-100 overflow-hidden">
        <div className="bg-sky-600 p-10 text-center relative border-b-4 border-sky-800">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mb-4 flex items-center justify-center mx-auto shadow-lg group">
              <svg className="h-8 w-8 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">HỆ THỐNG QUẢN TRỊ</h2>
            <p className="text-sky-100 text-[10px] font-bold uppercase tracking-[3px] mt-1">Phạm Hoài Vũ Blog Premium</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-[11px] font-black rounded-xl border border-red-100 text-center uppercase tracking-wider animate-shake">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Tài khoản quản trị</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin..."
                  className="w-full px-6 py-4 rounded-2xl bg-sky-50/50 border-2 border-transparent focus:border-sky-500 outline-none transition-all font-bold text-slate-700 shadow-inner"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-sky-300">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mật khẩu</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-6 py-4 rounded-2xl bg-sky-50/50 border-2 border-transparent focus:border-sky-500 outline-none transition-all font-bold text-slate-700 shadow-inner"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-sky-400 hover:text-sky-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded-lg border-sky-300 text-sky-600 focus:ring-sky-500 transition-all" 
              />
              <span className="text-[12px] font-black text-slate-500 group-hover:text-sky-700 transition-colors uppercase tracking-tight">Ghi nhớ</span>
            </label>
            <button 
              type="button" 
              onClick={() => setForgotPasswordMode(true)}
              className="text-[12px] font-black text-sky-600 hover:text-sky-800 hover:underline uppercase tracking-tight"
            >
              Quên mật khẩu?
            </button>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-sky-600/30 transition-all flex items-center justify-center gap-3 mt-4 active:scale-95"
          >
            {isLoading ? "ĐANG ĐĂNG NHẬP..." : "XÁC NHẬN"}
          </button>

          <button 
            type="button"
            onClick={() => navigateTo(Page.HOME)}
            className="w-full text-[10px] font-black text-slate-400 hover:text-sky-600 uppercase tracking-widest transition-colors pt-2"
          >
            QUAY LẠI TRANG CHỦ
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
