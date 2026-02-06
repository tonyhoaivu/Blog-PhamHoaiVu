
import React, { useState } from 'react';
import { Page, User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  navigateTo: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, navigateTo }) => {
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Tài khoản Admin theo yêu cầu
    const ADMIN_USER = "admin";
    const ADMIN_PASSWORD = "0927099940@Phv";

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
        onLogin({ email: username, role: 'admin' });
        navigateTo(Page.ADMIN);
      } else {
        setError('Tài khoản hoặc mật khẩu không chính xác.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setSuccess(`Hướng dẫn khôi phục mật khẩu đã được gửi đến ${forgotEmail}. Vui lòng kiểm tra hộp thư Gmail của bạn.`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-primary-600 p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            {view === 'login' ? 'Quản trị viên' : 'Khôi phục mật khẩu'}
          </h2>
          <p className="text-primary-100 text-[10px] font-bold uppercase tracking-widest mt-1">Hệ thống bảo mật PHV Blog</p>
        </div>

        {view === 'login' ? (
          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 text-xs font-bold rounded-2xl border border-red-100 dark:border-red-800 animate-shake text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Tài khoản</label>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Mật khẩu</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all dark:text-white"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500 p-1"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <button 
                type="button"
                onClick={() => setView('forgot')}
                className="text-[10px] font-black text-primary-600 hover:underline uppercase tracking-widest"
              >
                Quên mật khẩu?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary-500/30 transition-all flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'ĐĂNG NHẬP HỆ THỐNG'}
            </button>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => navigateTo(Page.HOME)}
                className="text-[10px] font-black text-gray-400 hover:text-primary-600 uppercase tracking-widest transition-colors"
              >
                Trở về trang chủ
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotSubmit} className="p-10 space-y-6">
            {success ? (
              <div className="space-y-6 py-4 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-sm font-bold text-gray-600 leading-relaxed">{success}</p>
                <button 
                  type="button"
                  onClick={() => { setView('login'); setSuccess(''); }}
                  className="w-full bg-primary-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest"
                >
                  Quay lại đăng nhập
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Nhập Email khôi phục (Gmail)</label>
                    <input 
                      type="email" 
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="vidu@gmail.com"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary-500/30 transition-all flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'GỬI YÊU CẦU KHÔI PHỤC'}
                </button>

                <div className="text-center">
                  <button 
                    type="button"
                    onClick={() => setView('login')}
                    className="text-[10px] font-black text-primary-600 hover:underline uppercase tracking-widest transition-colors"
                  >
                    Quay lại đăng nhập
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
