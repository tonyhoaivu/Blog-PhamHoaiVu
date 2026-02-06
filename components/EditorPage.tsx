
import React, { useState, useEffect } from 'react';
import { Post, DownloadInfo } from '../types';
import ReactQuill from 'react-quill';

interface EditorPageProps {
  post: Post | null;
  onSave: (post: Post) => void;
  onCancel: () => void;
}

const EditorPage: React.FC<EditorPageProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [summary, setSummary] = useState(post?.summary || '');
  const [content, setContent] = useState(post?.content || '');
  const [labels, setLabels] = useState(post?.labels.join(', ') || '');
  const [thumbnail, setThumbnail] = useState(post?.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop');
  const [downloads, setDownloads] = useState<DownloadInfo[]>(post?.downloads || []);
  const [isCodeView, setIsCodeView] = useState(false);

  useEffect(() => {
    if (!post) {
      setSlug(title.toLowerCase().trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
      );
    }
  }, [title, post]);

  const handleAddDownload = () => {
    setDownloads([...downloads, { version: '', size: '', md5: '', freeLink: '', proLink: '' }]);
  };

  const updateDownload = (index: number, field: keyof DownloadInfo, value: string) => {
    const newDownloads = [...downloads];
    newDownloads[index] = { ...newDownloads[index], [field]: value };
    setDownloads(newDownloads);
  };

  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
        const sizeStr = parseFloat(sizeInMb) > 1000 
          ? (file.size / (1024 * 1024 * 1024)).toFixed(2) + ' GB' 
          : sizeInMb + ' MB';

        const newDownloads = [...downloads];
        newDownloads[index] = {
          ...newDownloads[index],
          version: file.name.split('.').slice(0, -1).join('.'),
          size: sizeStr,
          fileData: base64,
          fileName: file.name,
          md5: Math.random().toString(16).substring(2, 10).toUpperCase() + '... (Auto)'
        };
        setDownloads(newDownloads);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeDownload = (index: number) => {
    setDownloads(downloads.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("Vui lòng nhập tiêu đề bài viết.");
    
    onSave({
      id: post?.id || Date.now().toString(),
      title,
      slug: slug || Date.now().toString(),
      summary,
      content,
      author: 'Phạm Hoài Vũ',
      date: post?.date || new Date().toISOString().split('T')[0],
      labels: labels.split(',').map(l => l.trim()).filter(l => l),
      thumbnail,
      popular: post?.popular || false,
      views: post?.views || 0,
      downloads
    });
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm gap-4">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
           </div>
           <div>
             <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter">
               {post ? 'Cập Nhật Bài Viết' : 'Soạn Bài Viết Mới'}
             </h2>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Môi trường soạn thảo đa năng Premium</p>
           </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-6 py-3 text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all">Hủy bỏ</button>
          <button onClick={handleSubmit} className="px-10 py-3 bg-primary-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all hover:-translate-y-1 active:translate-y-0">Lưu & Xuất bản</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Tiêu đề bài đăng</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-7 py-5 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 outline-none rounded-3xl font-black text-2xl dark:text-white transition-all shadow-inner"
                  placeholder="Ví dụ: Anhdv Boot 2024 v24.1 Premium..."
                />
             </div>

             <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-grow space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Đường dẫn thân thiện (Slug)</label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-700 text-xs text-gray-400 font-bold shadow-inner">
                    <span className="opacity-50 font-mono">/post/</span>
                    <input value={slug} onChange={e => setSlug(e.target.value)} className="bg-transparent border-none outline-none text-primary-600 ml-1 flex-grow font-black lowercase" />
                  </div>
                </div>
             </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
             <div className="px-8 py-5 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nội dung chi tiết (Editor Đa Năng)</span>
                </div>
                <button onClick={() => setIsCodeView(!isCodeView)} className="text-[9px] font-black bg-white dark:bg-gray-800 border dark:border-gray-700 px-4 py-2 rounded-xl text-gray-500 uppercase tracking-widest hover:bg-primary-50 hover:text-primary-600 transition-all shadow-sm">
                  {isCodeView ? 'Chế độ Trực Quan' : 'Chỉnh sửa HTML'}
                </button>
             </div>
             {isCodeView ? (
                <textarea 
                  value={content} 
                  onChange={e => setContent(e.target.value)}
                  className="w-full h-[600px] p-8 font-mono text-sm bg-gray-900 text-green-400 outline-none resize-none"
                />
             ) : (
                <div className="h-[650px] dark:bg-gray-800">
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent} 
                    modules={quillModules}
                    className="h-[550px] dark:text-white" 
                  />
                </div>
             )}
          </div>

          <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm space-y-8">
             <div className="flex justify-between items-center border-b dark:border-gray-700 pb-6">
                <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                  <div className="w-2 h-8 bg-red-600 rounded-full shadow-lg shadow-red-500/20"></div>
                  Cấu hình tải tệp (Hỗ trợ Upload)
                </h3>
                <button type="button" onClick={handleAddDownload} className="text-[9px] font-black bg-red-50 dark:bg-red-900/20 text-red-600 px-6 py-3 rounded-2xl uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100 dark:border-red-800 shadow-sm">
                   + Thêm mục tải mới
                </button>
             </div>

             <div className="space-y-8">
                {downloads.map((dl, idx) => (
                  <div key={idx} className="p-8 bg-gray-50/50 dark:bg-gray-900/40 rounded-[2rem] border-2 border-dashed border-gray-100 dark:border-gray-700 relative group transition-all hover:border-red-200">
                    <button type="button" onClick={() => removeDownload(idx)} className="absolute -top-3 -right-3 w-10 h-10 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl flex items-center justify-center text-gray-300 hover:text-red-600 hover:border-red-200 shadow-lg transition-all opacity-0 group-hover:opacity-100">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>

                    <div className="mb-6 flex items-center gap-4">
                        <label className="flex-grow cursor-pointer bg-white dark:bg-gray-800 border-2 border-primary-500/30 dark:border-primary-500/20 hover:bg-primary-50 dark:hover:bg-primary-900/10 py-4 rounded-2xl text-center transition-all">
                            <input type="file" className="hidden" onChange={(e) => handleFileUpload(idx, e)} />
                            <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">
                                {dl.fileData ? `Đã tải lên: ${dl.fileName}` : '📁 TẢI TỆP LÊN TRỰC TIẾP (TỰ ĐIỀN THÔNG TIN)'}
                            </span>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Phiên bản / Tên file</label>
                          <input value={dl.version} onChange={e => updateDownload(idx, 'version', e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-xs font-bold dark:text-white shadow-sm" placeholder="v11.1 Pro" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Dung lượng</label>
                          <input value={dl.size} onChange={e => updateDownload(idx, 'size', e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-xs font-bold dark:text-white shadow-sm" placeholder="Ví dụ: 5.2 GB" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Mã MD5</label>
                          <input value={dl.md5} onChange={e => updateDownload(idx, 'md5', e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-[10px] font-mono dark:text-gray-300 shadow-sm" placeholder="Mã bảo mật tệp..." />
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Link tải (Nếu không upload tệp)</label>
                          <input value={dl.freeLink} onChange={e => updateDownload(idx, 'freeLink', e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-[10px] text-blue-600 font-bold shadow-sm" placeholder="Link Drive, Fshare..." />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Link mua Premium (Tùy chọn)</label>
                          <input value={dl.proLink} onChange={e => updateDownload(idx, 'proLink', e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-[10px] text-green-600 font-bold shadow-sm" placeholder="Link Donate hoặc Mua bản quyền..." />
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm space-y-8 sticky top-24">
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Ảnh đại diện bài đăng</label>
                    <button 
                      onClick={() => setThumbnail('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop')} 
                      className="text-[8px] font-black text-red-500 uppercase tracking-widest hover:underline"
                    >
                      Xóa ảnh
                    </button>
                 </div>
                 <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-gray-50 border-2 border-gray-50 dark:border-gray-700 relative group shadow-sm">
                    <img src={thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Thumbnail Preview" />
                    <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-center px-4">
                        <svg className="w-8 h-8 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest bg-sky-600 px-4 py-2 rounded-xl">Tải ảnh lên từ máy</span>
                        <input type="file" className="hidden" onChange={handleThumbnailUpload} />
                    </label>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[8px] font-bold text-slate-400 uppercase ml-1">Hoặc dán link ảnh trực tiếp</label>
                    <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl outline-none focus:border-primary-500 text-[10px] font-bold dark:text-gray-300 shadow-inner" placeholder="https://..." />
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Mô tả tóm tắt</label>
                 <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={5} className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-[2rem] outline-none focus:border-primary-500 text-xs font-medium dark:text-gray-300 resize-none shadow-inner" placeholder="Tóm tắt ngắn..." />
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nhãn bài viết</label>
                 <input value={labels} onChange={e => setLabels(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl outline-none focus:border-primary-500 text-xs font-black uppercase tracking-widest dark:text-white shadow-inner" placeholder="WINDOWS, SOFTWARE..." />
              </div>

              <div className="pt-6 border-t dark:border-gray-700 space-y-4">
                 <button onClick={handleSubmit} className="w-full bg-primary-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary-500/30 hover:bg-primary-700 transition-all hover:-translate-y-1 active:scale-95">XUẤT BẢN NGAY</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
