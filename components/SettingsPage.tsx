
import React, { useState } from 'react';
import { SiteConfig } from '../types';

interface SettingsPageProps {
  config: SiteConfig;
  onUpdate: (config: Partial<SiteConfig>) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ config, onUpdate }) => {
  const [tempLogo, setTempLogo] = useState<string | null>(config.logoUrl);
  const [saveStatus, setSaveStatus] = useState(false);
  const [adsScript, setAdsScript] = useState(config.adsenseScript);
  const [siteName, setSiteName] = useState(config.siteName);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return alert("Ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.");
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setTempLogo(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    onUpdate({
      adsenseScript: adsScript,
      siteName: siteName,
      logoUrl: tempLogo
    });
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);

    // Phát sự kiện cập nhật adsense cho index.html lắng nghe
    window.dispatchEvent(new CustomEvent('adsenseUpdate', { detail: adsScript }));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in duration-700">
      <div className="bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden glass-card">
        <div className="bg-primary-600 p-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Thiết lập Website</h2>
            <p className="opacity-80 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Phạm Hoài Vũ CMS - Control Panel</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>

        <div className="p-12 space-y-12">
          {/* Logo Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary-600 rounded-full"></div>
                <label className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Logo nhận diện thương hiệu</label>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10 p-10 bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border-2 border-dashed border-gray-100 dark:border-gray-700 shadow-inner">
               <div className="w-40 h-40 bg-white dark:bg-gray-800 rounded-3xl shadow-xl flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700 p-4 relative group">
                  {tempLogo ? (
                    <img src={tempLogo} alt="Logo preview" className="max-w-full max-h-full object-contain transition-transform group-hover:scale-110" />
                  ) : (
                    <div className="text-gray-200 dark:text-gray-700 text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span className="text-[8px] font-black uppercase tracking-widest">Chưa có ảnh</span>
                    </div>
                  )}
                  {tempLogo && (
                    <button onClick={() => setTempLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all font-black text-[10px] uppercase">Gỡ ảnh</button>
                  )}
               </div>
               <div className="flex-grow space-y-6">
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 leading-relaxed italic">"Tải ảnh logo của bạn lên (nên chọn định dạng PNG trong suốt) để thay thế cho logo chữ mặc định trên toàn trang web."</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden" 
                    id="logo-upload-field" 
                  />
                  <label 
                    htmlFor="logo-upload-field"
                    className="inline-flex items-center gap-3 bg-gray-900 dark:bg-primary-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-700 cursor-pointer shadow-xl transition-all hover:-translate-y-1 active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                    Chọn tệp ảnh mới
                  </label>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest opacity-60">Yêu cầu: JPG, PNG, WEBP • Max 2MB</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {/* Site Name */}
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-primary-600 rounded-full"></div>
                  <label className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Tên hiển thị Blog</label>
               </div>
               <input 
                type="text" 
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-7 py-5 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none rounded-3xl font-black text-sm uppercase tracking-widest dark:text-white shadow-inner transition-all"
                placeholder="Ví dụ: PHẠM HOÀI VŨ BLOG"
              />
            </div>

            {/* Adsense Managed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-primary-600 rounded-full"></div>
                   <label className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Quản lý Google Adsense (Script Code)</label>
                </div>
                <span className="text-[9px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg font-black uppercase">Chèn tự động</span>
              </div>
              <textarea 
                value={adsScript}
                onChange={(e) => setAdsScript(e.target.value)}
                rows={8}
                className="w-full px-7 py-6 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none rounded-[2.5rem] font-mono text-[11px] dark:text-gray-300 shadow-inner resize-none transition-all"
                placeholder="Dán toàn bộ mã Script Adsense (từ <script> đến </script>) tại đây..."
              />
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                <p className="text-[10px] text-blue-700 dark:text-blue-300 leading-relaxed font-bold">Lưu ý: Hệ thống sẽ tự động chèn mã này vào thẻ &lt;head&gt; và các vị trí quảng cáo đã được định sẵn trên toàn blog (Sidebar, Banner 2 bên, v.v.).</p>
              </div>
            </div>
          </div>

          {saveStatus && (
            <div className="p-5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-black text-center rounded-2xl border border-green-200 dark:border-green-800 animate-bounce uppercase tracking-widest">
              Hệ thống đã cập nhật cấu hình thành công!
            </div>
          )}

          <div className="pt-8 border-t dark:border-gray-700">
             <button 
               onClick={handleSaveAll}
               className="w-full bg-primary-600 text-white py-6 rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl shadow-primary-500/30 hover:bg-primary-700 transition-all hover:-translate-y-1 active:scale-95"
             >
               CẬP NHẬT TẤT CẢ THAY ĐỔI
             </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
         <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] opacity-50">Powered by PHV Engine 2025</p>
      </div>
    </div>
  );
};

export default SettingsPage;
