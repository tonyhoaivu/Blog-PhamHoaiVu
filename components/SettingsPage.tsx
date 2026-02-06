
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

  const handleSave = () => {
    onUpdate(localConfig);
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'logoUrl' | 'footerLogoUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLocalConfig(prev => ({ ...prev, [target]: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      label: 'MENU MỚI',
      icon: '📁',
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
      <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-[#1a1a1a] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6 border-b-4 border-orange-600">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">QUẢN TRỊ BLOG</h2>
            <p className="opacity-80 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Hệ thống tùy biến Menu & Giao diện</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
             <button onClick={() => setActiveTab('general')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'general' ? 'bg-orange-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>Cơ bản</button>
             <button onClick={() => setActiveTab('layout')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'layout' ? 'bg-orange-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>Bố cục & Menu</button>
             <button onClick={() => setActiveTab('custom')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'custom' ? 'bg-orange-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>Trang trí</button>
             <button onClick={() => setActiveTab('ads')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ads' ? 'bg-orange-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>Quảng cáo</button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {activeTab === 'general' && (
            <div className="space-y-10 animate-in slide-in-from-left-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Home Logo Upload */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">LOGO TRANG CHỦ (HEADER)</h4>
                  <div className="relative group aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden transition-all hover:border-orange-500">
                    {localConfig.logoUrl ? (
                      <img src={localConfig.logoUrl} alt="Logo Preview" className="max-h-full object-contain p-4" />
                    ) : (
                      <div className="text-center p-6">
                        <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kéo thả hoặc Click để chọn ảnh</p>
                      </div>
                    )}
                    <input type="file" onChange={(e) => handleLogoUpload(e, 'logoUrl')} className="absolute inset-0 opacity-0 cursor-pointer" />
                    {localConfig.logoUrl && (
                      <button onClick={() => setLocalConfig({...localConfig, logoUrl: null})} className="absolute top-4 right-4 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                    )}
                  </div>
                  <p className="text-[9px] text-gray-400 font-bold italic text-center">Hệ thống hỗ trợ mọi kích thước và dung lượng tệp tin.</p>
                </div>

                {/* Footer Logo Upload */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">LOGO CHÂN TRANG (FOOTER)</h4>
                  <div className="relative group aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden transition-all hover:border-orange-500">
                    {localConfig.footerLogoUrl ? (
                      <img src={localConfig.footerLogoUrl} alt="Footer Logo Preview" className="max-h-full object-contain p-4" />
                    ) : (
                      <div className="text-center p-6">
                        <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kéo thả hoặc Click để chọn ảnh</p>
                      </div>
                    )}
                    <input type="file" onChange={(e) => handleLogoUpload(e, 'footerLogoUrl')} className="absolute inset-0 opacity-0 cursor-pointer" />
                    {localConfig.footerLogoUrl && (
                      <button onClick={() => setLocalConfig({...localConfig, footerLogoUrl: null})} className="absolute top-4 right-4 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                    )}
                  </div>
                  <p className="text-[9px] text-gray-400 font-bold italic text-center">Tùy biến thương hiệu cho khu vực chân trang blog.</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">TÊN WEBSITE / THƯƠNG HIỆU</label>
                 <input 
                  type="text" 
                  value={localConfig.siteName} 
                  onChange={e => setLocalConfig({...localConfig, siteName: e.target.value})} 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-orange-500 outline-none rounded-2xl font-black text-xl shadow-inner" 
                 />
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-10 animate-in slide-in-from-left-4 duration-300">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-orange-600 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  HỆ THỐNG MENU TÙY BIẾN
                </h3>
                <button onClick={addMenuItem} className="text-[10px] font-black bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">+ THÊM MENU MỚI</button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {localConfig.menuItems.map(item => (
                  <div key={item.id} className="p-6 bg-gray-50 border border-gray-200 rounded-3xl relative group">
                    <button onClick={() => removeMenuItem(item.id)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all">✕</button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-end">
                      <div className="md:col-span-1">
                        <label className="text-[9px] font-black uppercase text-gray-400 block mb-1">Icon</label>
                        <input type="text" value={item.icon || ''} onChange={e => updateMenuItem(item.id, 'icon', e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-white bg-white shadow-sm text-center text-xl" placeholder="🏠" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[9px] font-black uppercase text-gray-400 block mb-1">Tên Menu</label>
                        <input type="text" value={item.label} onChange={e => updateMenuItem(item.id, 'label', e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-white bg-white shadow-sm text-[12px] font-black uppercase" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[9px] font-black uppercase text-gray-400 block mb-1">Nhãn lọc (Dấu phẩy cho nhiều)</label>
                        <input type="text" value={item.targetLabel || ''} onChange={e => updateMenuItem(item.id, 'targetLabel', e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-white bg-white shadow-sm text-[11px] font-bold" placeholder="Windows, Phần mềm..." />
                      </div>
                      <div className="flex items-center gap-4 h-12">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" checked={item.isDropdown} onChange={e => updateMenuItem(item.id, 'isDropdown', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                          <span className="text-[10px] font-black uppercase text-gray-500">Dropdown</span>
                        </label>
                        <button onClick={() => addSubItem(item.id)} className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </div>
                    </div>

                    {item.isDropdown && item.subItems && (
                      <div className="mt-6 ml-10 space-y-3 border-l-2 border-orange-200 pl-6 animate-in slide-in-from-top-2">
                        {item.subItems.map((sub, idx) => (
                          <div key={idx} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-100 relative group/sub">
                            <button onClick={() => removeSubItem(item.id, idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs opacity-0 group-hover/sub:opacity-100 transition-all">✕</button>
                            <div className="flex-grow">
                              <label className="text-[8px] font-black uppercase text-gray-400">Tên Menu Con</label>
                              <input type="text" value={sub.label} onChange={e => updateSubItem(item.id, idx, 'label', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-transparent focus:border-orange-500 text-[10px] font-bold" />
                            </div>
                            <div className="flex-grow">
                              <label className="text-[8px] font-black uppercase text-gray-400">Nhãn cần lọc</label>
                              <input type="text" value={sub.targetLabel} onChange={e => updateSubItem(item.id, idx, 'targetLabel', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-transparent focus:border-orange-500 text-[10px] font-bold" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-300">
               <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-orange-600 border-b pb-4">TÙY CHỈNH MÀU SẮC (THEO MẪU MỚI)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Màu nền Header (Tối)</label>
                      <input type="color" value={localConfig.headerBgColor || '#1a1a1a'} onChange={e => setLocalConfig({...localConfig, headerBgColor: e.target.value})} className="w-full h-10 rounded-xl cursor-pointer" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Màu điểm nhấn (Cam)</label>
                      <input type="color" value={localConfig.accentColor || '#f97316'} onChange={e => setLocalConfig({...localConfig, accentColor: e.target.value})} className="w-full h-10 rounded-xl cursor-pointer" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Màu chữ Menu</label>
                      <input type="color" value={localConfig.menuTextColor || '#ffffff'} onChange={e => setLocalConfig({...localConfig, menuTextColor: e.target.value})} className="w-full h-10 rounded-xl cursor-pointer" />
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">MÃ TRANG TRÍ (CSS / JS)</label>
                 <textarea 
                  value={localConfig.customCss} 
                  onChange={e => setLocalConfig({...localConfig, customCss: e.target.value})} 
                  placeholder="/* Thêm CSS tuyết rơi, hoa đào... */"
                  className="w-full h-48 p-6 bg-gray-50 rounded-3xl font-mono text-xs outline-none border border-transparent focus:border-orange-500 shadow-inner" 
                 />
                 <textarea 
                  value={localConfig.customJs} 
                  onChange={e => setLocalConfig({...localConfig, customJs: e.target.value})} 
                  placeholder="// Thêm Script hiệu ứng..."
                  className="w-full h-48 p-6 bg-gray-50 rounded-3xl font-mono text-xs outline-none border border-transparent focus:border-orange-500 shadow-inner mt-4" 
                 />
               </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-300">
               <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                 <h3 className="text-sm font-black uppercase tracking-widest text-orange-600 border-b pb-4 mb-6 flex items-center gap-2">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                   QUẢN LÝ MÃ QUẢNG CÁO
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Quảng cáo Đầu trang (Header Ad)</label>
                      <textarea 
                        value={localConfig.adsHeader} 
                        onChange={e => setLocalConfig({...localConfig, adsHeader: e.target.value})} 
                        placeholder="<!-- Dán mã AdSense hoặc HTML tại đây -->"
                        className="w-full h-32 p-4 bg-white border border-gray-200 rounded-2xl font-mono text-[10px] outline-none focus:border-orange-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Quảng cáo Sidebar</label>
                      <textarea 
                        value={localConfig.adsSidebar} 
                        onChange={e => setLocalConfig({...localConfig, adsSidebar: e.target.value})} 
                        placeholder="<!-- Dán mã AdSense hoặc HTML tại đây -->"
                        className="w-full h-32 p-4 bg-white border border-gray-200 rounded-2xl font-mono text-[10px] outline-none focus:border-orange-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Quảng cáo Trang chủ (Dưới bài viết)</label>
                      <textarea 
                        value={localConfig.adsHomePage} 
                        onChange={e => setLocalConfig({...localConfig, adsHomePage: e.target.value})} 
                        className="w-full h-32 p-4 bg-white border border-gray-200 rounded-2xl font-mono text-[10px] outline-none focus:border-orange-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Quảng cáo Bài viết (Dưới nội dung)</label>
                      <textarea 
                        value={localConfig.adsBelowContent} 
                        onChange={e => setLocalConfig({...localConfig, adsBelowContent: e.target.value})} 
                        className="w-full h-32 p-4 bg-white border border-gray-200 rounded-2xl font-mono text-[10px] outline-none focus:border-orange-500" 
                      />
                    </div>
                 </div>
               </div>
            </div>
          )}

          {saveStatus && (
            <div className="p-4 bg-green-500 text-white text-xs font-black text-center rounded-2xl animate-bounce uppercase tracking-widest">
              ✓ ĐÃ LƯU TẤT CẢ THAY ĐỔI
            </div>
          )}

          <div className="pt-8 border-t">
             <button onClick={handleSave} className="w-full bg-orange-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-orange-600/30 hover:bg-orange-700 transition-all active:scale-95">LƯU CẤU HÌNH HỆ THỐNG</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
