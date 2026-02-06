
import React, { useState } from 'react';
import { SiteConfig, MenuItem } from '../types';

interface SettingsPageProps {
  config: SiteConfig;
  onUpdate: (config: Partial<SiteConfig>) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ config, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'ads' | 'layout' | 'custom'>('general');
  const [localConfig, setLocalConfig] = useState<SiteConfig>(config);
  const [saveStatus, setSaveStatus] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLocalConfig({ ...localConfig, logoUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdate(localConfig);
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      label: 'Menu Mới',
      isDropdown: false
    };
    setLocalConfig({ ...localConfig, menuItems: [...localConfig.menuItems, newItem] });
  };

  const removeMenuItem = (id: string) => {
    setLocalConfig({ ...localConfig, menuItems: localConfig.menuItems.filter(m => m.id !== id) });
  };

  const updateMenuItem = (id: string, field: keyof MenuItem, value: any) => {
    const newItems = localConfig.menuItems.map(m => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    });
    setLocalConfig({ ...localConfig, menuItems: newItems });
  };

  const addSubItem = (parentId: string) => {
    const newItems = localConfig.menuItems.map(m => {
      if (m.id === parentId) {
        const subItems = m.subItems || [];
        return { ...m, isDropdown: true, subItems: [...subItems, { label: 'Menu Con Mới', targetLabel: 'Category' }] };
      }
      return m;
    });
    setLocalConfig({ ...localConfig, menuItems: newItems });
  };

  const removeSubItem = (parentId: string, index: number) => {
    const newItems = localConfig.menuItems.map(m => {
      if (m.id === parentId && m.subItems) {
        return { ...m, subItems: m.subItems.filter((_, i) => i !== index) };
      }
      return m;
    });
    setLocalConfig({ ...localConfig, menuItems: newItems });
  };

  const updateSubItem = (parentId: string, index: number, field: 'label' | 'targetLabel', value: string) => {
    const newItems = localConfig.menuItems.map(m => {
      if (m.id === parentId && m.subItems) {
        const newSubItems = [...m.subItems];
        newSubItems[index] = { ...newSubItems[index], [field]: value };
        return { ...m, subItems: newSubItems };
      }
      return m;
    });
    setLocalConfig({ ...localConfig, menuItems: newItems });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 animate-in fade-in duration-700">
      <div className="bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden glass-card">
        <div className="bg-primary-600 p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Quản Lý Blog</h2>
            <p className="opacity-80 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Hệ thống quản trị Phạm Hoài Vũ Premium</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
             <button onClick={() => setActiveTab('general')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'general' ? 'bg-white text-primary-600' : 'bg-white/10 hover:bg-white/20'}`}>Cơ bản</button>
             <button onClick={() => setActiveTab('ads')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ads' ? 'bg-white text-primary-600' : 'bg-white/10 hover:bg-white/20'}`}>Quảng cáo</button>
             <button onClick={() => setActiveTab('layout')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'layout' ? 'bg-white text-primary-600' : 'bg-white/10 hover:bg-white/20'}`}>Bố cục & Menu</button>
             <button onClick={() => setActiveTab('custom')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'custom' ? 'bg-white text-primary-600' : 'bg-white/10 hover:bg-white/20'}`}>Trang trí</button>
          </div>
        </div>

        <div className="p-10 space-y-8">
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                 <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Logo nhận diện (Base64)</label>
                    <div className="w-full aspect-video bg-gray-50 dark:bg-gray-900 rounded-[2rem] border-2 border-dashed flex items-center justify-center overflow-hidden p-6 relative group">
                        {localConfig.logoUrl ? (
                          <img src={localConfig.logoUrl} className="max-h-full object-contain" alt="Logo preview" />
                        ) : <span className="text-xs font-bold text-gray-300">Chưa có Logo</span>}
                        <input type="file" onChange={handleFileChange} id="logo-up" className="hidden" />
                        <label htmlFor="logo-up" className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer font-black text-[10px] uppercase">Thay đổi ảnh</label>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Tên Website</label>
                    <input 
                      type="text" 
                      value={localConfig.siteName}
                      onChange={e => setLocalConfig({...localConfig, siteName: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 rounded-2xl font-black uppercase text-sm dark:text-white outline-none"
                    />
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-10 animate-in slide-in-from-left-4 duration-300">
              <div className="bg-gray-50 dark:bg-gray-900/30 p-8 rounded-[2rem] space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary-600 border-b pb-4">Đổi tên các nhãn hiển thị</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tiêu đề Home (Cập nhật mới nhất)</label>
                    <input type="text" value={localConfig.homeLatestTitle} onChange={e => setLocalConfig({...localConfig, homeLatestTitle: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tab Sidebar (MỚI NHẤT)</label>
                    <input type="text" value={localConfig.sidebarNewTabLabel} onChange={e => setLocalConfig({...localConfig, sidebarNewTabLabel: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tab Sidebar (PHỔ BIẾN)</label>
                    <input type="text" value={localConfig.sidebarPopularTabLabel} onChange={e => setLocalConfig({...localConfig, sidebarPopularTabLabel: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tab Sidebar (NGẪU NHIÊN)</label>
                    <input type="text" value={localConfig.sidebarRandomTabLabel} onChange={e => setLocalConfig({...localConfig, sidebarRandomTabLabel: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sidebar (Thống kê Blog)</label>
                    <input type="text" value={localConfig.sidebarStatsTitle} onChange={e => setLocalConfig({...localConfig, sidebarStatsTitle: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sidebar (Quảng cáo)</label>
                    <input type="text" value={localConfig.sidebarAdsTitle} onChange={e => setLocalConfig({...localConfig, sidebarAdsTitle: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-bold" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary-600">Quản lý Menu Trang Chủ</h3>
                  <button onClick={addMenuItem} className="text-[9px] font-black bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all">+ THÊM MENU MỚI</button>
                </div>

                <div className="space-y-4">
                  {localConfig.menuItems.map(item => (
                    <div key={item.id} className="p-6 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-3xl relative group">
                      <button onClick={() => removeMenuItem(item.id)} className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all">✕</button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                        <div className="md:col-span-2 space-y-1">
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-[9px] font-bold uppercase text-gray-400">Tên hiển thị</label>
                            <button onClick={() => addSubItem(item.id)} className="text-[8px] font-black bg-primary-100 text-primary-700 px-2 py-0.5 rounded uppercase">+ THÊM MENU CON</button>
                          </div>
                          <input type="text" value={item.label} onChange={e => updateMenuItem(item.id, 'label', e.target.value)} className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 dark:bg-gray-800 text-xs font-black dark:text-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase text-gray-400 block mb-1">Nhãn lọc (Dấu phẩy cho nhiều nhãn)</label>
                          <input type="text" value={item.targetLabel || ''} onChange={e => updateMenuItem(item.id, 'targetLabel', e.target.value)} className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 dark:bg-gray-800 text-xs font-bold" placeholder="VD: Win 7, Win 10" />
                        </div>
                        <div className="flex items-center gap-2 pt-5">
                          <input type="checkbox" checked={item.isDropdown} onChange={e => updateMenuItem(item.id, 'isDropdown', e.target.checked)} className="w-4 h-4" id={`drop-${item.id}`} />
                          <label htmlFor={`drop-${item.id}`} className="text-[9px] font-bold uppercase text-gray-400 cursor-pointer">Kích hoạt Dropdown</label>
                        </div>
                      </div>

                      {item.isDropdown && item.subItems && item.subItems.length > 0 && (
                        <div className="ml-8 mt-4 border-l-2 border-primary-100 dark:border-primary-900 pl-6 space-y-4">
                          {item.subItems.map((sub, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row gap-4 items-end bg-white dark:bg-gray-800 p-4 rounded-2xl border dark:border-gray-700 relative group/sub">
                              <button onClick={() => removeSubItem(item.id, idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs opacity-0 group-hover/sub:opacity-100 transition-all">✕</button>
                              <div className="flex-grow space-y-1 w-full md:w-auto">
                                <label className="text-[8px] font-bold uppercase text-gray-400">Tên Menu Con</label>
                                <input type="text" value={sub.label} onChange={e => updateSubItem(item.id, idx, 'label', e.target.value)} className="w-full px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 text-[10px] font-bold" />
                              </div>
                              <div className="flex-grow space-y-1 w-full md:w-auto">
                                <label className="text-[8px] font-bold uppercase text-gray-400">Nhãn cần lọc</label>
                                <input type="text" value={sub.targetLabel} onChange={e => updateSubItem(item.id, idx, 'targetLabel', e.target.value)} className="w-full px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 text-[10px] font-bold" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-4 duration-300">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Quảng cáo Đầu trang (Header)</label>
                 <textarea value={localConfig.adsHeader} onChange={e => setLocalConfig({...localConfig, adsHeader: e.target.value})} className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-mono text-[10px] outline-none" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Quảng cáo Sidebar</label>
                 <textarea value={localConfig.adsSidebar} onChange={e => setLocalConfig({...localConfig, adsSidebar: e.target.value})} className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-mono text-[10px] outline-none" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Quảng cáo Trang chủ</label>
                 <textarea value={localConfig.adsHomePage} onChange={e => setLocalConfig({...localConfig, adsHomePage: e.target.value})} className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-mono text-[10px] outline-none" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Quảng cáo Dưới nội dung</label>
                 <textarea value={localConfig.adsBelowContent} onChange={e => setLocalConfig({...localConfig, adsBelowContent: e.target.value})} className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-mono text-[10px] outline-none" />
               </div>
            </div>
          )}

          {saveStatus && (
            <div className="p-4 bg-green-500 text-white text-xs font-black text-center rounded-2xl animate-bounce uppercase tracking-widest">
              Đã lưu thành công!
            </div>
          )}

          <div className="pt-8 border-t dark:border-gray-700">
             <button onClick={handleSave} className="w-full bg-primary-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-primary-500/30 hover:bg-primary-700 transition-all active:scale-95">LƯU TẤT CẢ THAY ĐỔI</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
