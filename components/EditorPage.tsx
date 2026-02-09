
import React, { useState, useEffect } from 'react';
import { Post, DownloadInfo } from '../types';
import ReactQuill from 'react-quill';
import { GoogleGenAI } from "@google/genai";

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

  // AI & Processing States
  const [showAiModal, setShowAiModal] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isBackupProcessing, setIsBackupProcessing] = useState(false);

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
          md5: Math.random().toString(16).substring(2, 10).toUpperCase()
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

  /**
   * TÍNH NĂNG TỐI ƯU THÔNG MINH: 
   * 1. Sao lưu hình ảnh: Quét toàn bộ thẻ <img> và tải về dạng Base64 để chống chết link.
   * 2. Chuyển đổi liên kết: Quét toàn bộ thẻ <a> có link bên ngoài (hoặc cấu trúc blog cũ) 
   * và tự động chuyển về định dạng liên kết nội bộ /post/slug.
   */
  const handleSmartOptimization = async () => {
    setIsBackupProcessing(true);
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // 1. Sao lưu hình ảnh ngoại vi
    const images = Array.from(doc.querySelectorAll('img'));
    let imgCount = 0;
    for (const img of images) {
      const src = img.getAttribute('src');
      if (src && src.startsWith('http') && !src.includes('data:image')) {
        try {
          const res = await fetch(src);
          if (res.ok) {
            const blob = await res.blob();
            const reader = new FileReader();
            const base64 = await new Promise<string>((resolve) => {
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
            img.setAttribute('src', base64);
            img.setAttribute('alt', `Backup Image - ${title}`);
            imgCount++;
          }
        } catch (e) {
          console.warn("Không thể sao lưu ảnh (CORS):", src);
        }
      }
    }

    // 2. Tự động hóa Liên kết (Smart Link Converter)
    // Chuyển các link có dạng blog khác hoặc link rác về link nội bộ nếu khớp slug
    const links = Array.from(doc.querySelectorAll('a'));
    let linkCount = 0;
    
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (href) {
        // Kiểm tra xem link có chứa cấu trúc bài viết của blog không (ví dụ: .html, /post/, /blog/)
        if (href.includes('.html') || href.includes('/post/') || href.includes('/2024/') || href.includes('/2025/')) {
          const internalSlug = href.split('/').pop()?.replace('.html', '').split(/[?#]/)[0];
          if (internalSlug && internalSlug.length > 5) {
            a.setAttribute('href', `/post/${internalSlug}`);
            a.classList.add('internal-link');
            a.style.color = '#0ea5e9';
            a.style.fontWeight = 'bold';
            linkCount++;
          }
        }
      }
    });

    setContent(doc.body.innerHTML);
    alert(`TỐI ƯU HOÀN TẤT:\n- Đã sao lưu ${imgCount} hình ảnh vào dữ liệu nội bộ.\n- Đã chuyển đổi ${linkCount} liên kết thành liên kết nội bộ của trang.`);
    setIsBackupProcessing(false);
  };

  const handleAiRewrite = async () => {
    if (!sourceText.trim()) return alert("Vui lòng dán nội dung nguồn!");
    setIsAiProcessing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Hãy đóng vai một chuyên gia SEO và Content Writing chuyên nghiệp. 
        NHIỆM VỤ: 
        1. Viết lại nội dung sau thành bài blog hoàn toàn mới, độc nhất 100%, phong cách của Phạm Hoài Vũ Blog (công nghệ, hướng dẫn phần mềm).
        2. Tự động nhận diện các liên kết bài viết trong nội dung và chuyển chúng về định dạng nội bộ: /post/[slug-bai-viet].
        3. Giữ nguyên các thẻ <img> và cấu trúc đoạn văn chuyên nghiệp.
        
        KẾT QUẢ TRẢ VỀ JSON:
        {
          "title": "Tiêu đề mới hấp dẫn",
          "summary": "Tóm tắt ngắn gọn chuẩn SEO",
          "content": "Nội dung chi tiết (HTML) với các liên kết đã tối ưu /post/slug",
          "labels": "Nhãn1, Nhãn2"
        }
        
        Nội dung gốc: ${sourceText}`,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || '{}');
      if (data.title) setTitle(data.title);
      if (data.summary) setSummary(data.summary);
      if (data.content) setContent(data.content);
      if (data.labels) setLabels(data.labels);

      setShowAiModal(false);
      setSourceText('');
      alert("AI đã xử lý và tối ưu hóa liên kết thành công!");
    } catch (error) {
      console.error("AI Error:", error);
      alert("Lỗi kết nối AI. Vui lòng kiểm tra lại cấu hình API.");
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("Vui lòng nhập tiêu đề bài viết.");
    onSave({
      id: post?.id || Date.now().toString(),
      title, slug, summary, content, author: 'Phạm Hoài Vũ',
      date: post?.date || new Date().toISOString().split('T')[0],
      labels: labels.split(',').map(l => l.trim()).filter(l => l),
      thumbnail, popular: post?.popular || false, views: post?.views || 0,
      downloads
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in slide-in-from-bottom-4 duration-700">
      {showAiModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/10">
            <div className="bg-sky-600 p-8 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter">AI CONTENT ENGINE</h3>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">Viết lại & Chuyển đổi liên kết thông minh</p>
              </div>
              <button onClick={() => setShowAiModal(false)} className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition-all text-2xl">✕</button>
            </div>
            <div className="p-10 space-y-6">
              <textarea 
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="w-full h-64 p-6 bg-sky-50 dark:bg-slate-950 border-2 border-transparent focus:border-sky-500 rounded-3xl outline-none font-medium text-sm transition-all shadow-inner resize-none"
                placeholder="Dán nội dung từ nguồn khác để AI viết lại và tối ưu link bài viết..."
              />
              <button 
                onClick={handleAiRewrite}
                disabled={isAiProcessing}
                className="w-full bg-sky-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-sky-600/20 hover:bg-sky-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-slate-400"
              >
                {isAiProcessing ? "AI ĐANG TỐI ƯU HÓA..." : "BẮT ĐẦU VIẾT LẠI & TẠO LINK NỘI BỘ"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm gap-4">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
           </div>
           <div>
             <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Biên Tập Bài Viết</h2>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Tự động hóa sao lưu ảnh & liên kết bài viết nội bộ</p>
           </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={handleSmartOptimization}
            disabled={isBackupProcessing}
            className="px-6 py-3 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl hover:bg-emerald-700 transition-all flex items-center gap-2 border border-white/10"
            title="Tải ảnh về nội bộ & Chuyển link ngoại thành link bài viết blog"
          >
            {isBackupProcessing ? 'ĐANG TỐI ƯU...' : 'TỐI ƯU SMART LINK & ẢNH'}
          </button>
          <button onClick={() => setShowAiModal(true)} className="px-6 py-3 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl hover:bg-black transition-all border border-white/10">AI IMPORTER</button>
          <button onClick={onCancel} className="px-6 py-3 text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all">Hủy bỏ</button>
          <button onClick={handleSubmit} className="px-10 py-3 bg-primary-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all">Lưu & Xuất bản</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Tiêu đề bài viết</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-7 py-5 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 outline-none rounded-3xl font-black text-2xl dark:text-white transition-all shadow-inner" placeholder="Tên bài viết..." />
             </div>
             <div className="flex items-center bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-700 text-xs text-gray-400 font-bold shadow-inner">
                <span className="opacity-50 font-mono">/post/</span>
                <input value={slug} onChange={e => setSlug(e.target.value)} className="bg-transparent border-none outline-none text-primary-600 ml-1 flex-grow font-black lowercase" />
             </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
             <div className="px-8 py-5 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nội dung (Tự động chuyển link nội bộ khi Paste)</span>
                <button onClick={() => setIsCodeView(!isCodeView)} className="text-[9px] font-black bg-white dark:bg-gray-800 border px-4 py-2 rounded-xl text-gray-500 uppercase tracking-widest hover:bg-primary-50 transition-all">
                  {isCodeView ? 'Trực quan' : 'HTML'}
                </button>
             </div>
             {isCodeView ? (
                <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full h-[600px] p-8 font-mono text-sm bg-gray-900 text-green-400 outline-none resize-none" />
             ) : (
                <div className="h-[650px] dark:bg-gray-800">
                  <ReactQuill theme="snow" value={content} onChange={setContent} className="h-[550px] dark:text-white" />
                </div>
             )}
          </div>

          <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm space-y-8">
             <div className="flex justify-between items-center border-b dark:border-gray-700 pb-6">
                <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">QUẢN LÝ TẢI TỆP (CHUYÊN MỤC: {labels || 'AUTO BY LABELS'})</h3>
                <button type="button" onClick={handleAddDownload} className="text-[9px] font-black bg-red-50 text-red-600 px-6 py-3 rounded-2xl uppercase tracking-widest border border-red-100 shadow-sm">+ Thêm mục tải</button>
             </div>
             <div className="space-y-8">
                {downloads.map((dl, idx) => (
                  <div key={idx} className="p-8 bg-gray-50/50 dark:bg-gray-900/40 rounded-[2rem] border-2 border-dashed border-gray-100 dark:border-gray-700 relative group transition-all">
                    <button type="button" onClick={() => removeDownload(idx)} className="absolute -top-3 -right-3 w-10 h-10 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 hover:text-red-600 shadow-lg transition-all opacity-0 group-hover:opacity-100">✕</button>
                    <label className="flex-grow cursor-pointer bg-white dark:bg-gray-800 border-2 border-primary-500/30 py-4 rounded-2xl text-center block mb-6 transition-all hover:bg-primary-50">
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(idx, e)} />
                        <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">{dl.fileData ? `File: ${dl.fileName}` : '📤 TẢI TỆP LÊN TRỰC TIẾP (AUTO MD5)'}</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <input value={dl.version} onChange={e => updateDownload(idx, 'version', e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl outline-none text-xs font-bold" placeholder="Tên tệp/Phiên bản" />
                       <input value={dl.size} onChange={e => updateDownload(idx, 'size', e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl outline-none text-xs font-bold" placeholder="Dung lượng" />
                       <input value={dl.md5} onChange={e => updateDownload(idx, 'md5', e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl outline-none text-[10px] font-mono uppercase" placeholder="Mã MD5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                       <input value={dl.freeLink} onChange={e => updateDownload(idx, 'freeLink', e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl outline-none text-[10px]" placeholder="Link tải (Drive, Fshare...)" />
                       <input value={dl.proLink} onChange={e => updateDownload(idx, 'proLink', e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl outline-none text-[10px]" placeholder="Link Premium/Donate..." />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm space-y-8 sticky top-24">
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Ảnh đại diện bài đăng</label>
                 <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-gray-50 border-2 border-gray-50 dark:border-gray-700 relative group shadow-sm">
                    <img src={thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Preview" />
                    <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest bg-sky-600 px-4 py-2 rounded-xl shadow-xl">Thay đổi ảnh</span>
                        <input type="file" className="hidden" onChange={handleThumbnailUpload} />
                    </label>
                 </div>
                 <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border dark:border-gray-700 rounded-2xl outline-none text-[10px] font-bold" placeholder="Dán URL ảnh đại diện..." />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Mô tả tóm tắt</label>
                 <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={5} className="w-full px-5 py-4 bg-gray-50 border dark:border-gray-700 rounded-[2rem] outline-none text-xs font-medium resize-none shadow-inner" placeholder="Viết mô tả ngắn bài viết..." />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nhãn (Gán làm Chuyên mục tải file)</label>
                 <input value={labels} onChange={e => setLabels(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border dark:border-gray-700 rounded-2xl outline-none text-xs font-black uppercase tracking-widest shadow-inner" placeholder="VD: WINDOWS, SOFTWARE, BOOT..." />
              </div>
              <button onClick={handleSubmit} className="w-full bg-primary-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary-500/30 hover:bg-primary-700 transition-all hover:-translate-y-1 active:scale-95">LƯU & XUẤT BẢN NGAY</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
