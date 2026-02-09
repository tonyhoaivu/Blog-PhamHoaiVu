
import React, { useState, useEffect } from 'react';
import { DownloadInfo, SiteConfig } from '../types';
import AdSlot from './AdSlot';

interface DownloadSectionProps {
  download: DownloadInfo;
  config?: SiteConfig;
  postLabels?: string[]; // Thêm prop để nhận nhãn từ bài viết
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ download, config, postLabels }) => {
  const [countdown, setCountdown] = useState<number>(0);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isDirectFile, setIsDirectFile] = useState<boolean>(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && activeLink) {
      if (isDirectFile && download.fileData) {
        const link = document.createElement('a');
        link.href = download.fileData;
        link.download = download.fileName || 'phamhoaivu-file.bin';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(activeLink, '_blank');
      }
      setActiveLink(null);
      setIsDirectFile(false);
    }
    return () => clearInterval(timer);
  }, [countdown, activeLink, isDirectFile, download]);

  const handleDownload = (link: string, direct: boolean = false) => {
    if (!link && !direct) return;
    setCountdown(10);
    setActiveLink(link);
    setIsDirectFile(direct);
    
    const area = document.getElementById(`dl-area-${download.md5}`);
    if (area) {
      window.scrollTo({ top: area.offsetTop - 100, behavior: 'smooth' });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getSourceInfo = (url: string) => {
    if (!url) return { name: 'Máy chủ nội bộ', icon: '🚀', color: '#0ea5e9' };
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('drive.google.com')) return { name: 'Google Drive', icon: '📂', color: '#34A853' };
    if (lowerUrl.includes('fshare.vn')) return { name: 'Fshare.vn', icon: '🔴', color: '#E11D48' };
    if (lowerUrl.includes('gofile.io')) return { name: 'Gofile.io', icon: '📁', color: '#FACC15' };
    if (lowerUrl.includes('mega.nz')) return { name: 'Mega.nz', icon: 'Ⓜ️', color: '#D92424' };
    if (lowerUrl.includes('mediafire.com')) return { name: 'MediaFire', icon: '🔥', color: '#007FFF' };
    return { name: 'Liên kết VIP', icon: '🔗', color: '#64748B' };
  };

  const source = getSourceInfo(download.freeLink);
  // Ưu tiên hiển thị Nhãn bài viết làm Chuyên mục
  const displayCategory = postLabels && postLabels.length > 0 ? postLabels.join(' / ') : (download.version || 'Phần mềm');

  return (
    <div id={`dl-area-${download.md5}`} className="max-w-4xl mx-auto my-12 overflow-hidden bg-white shadow-2xl rounded-[3rem] border border-sky-100 glass-card animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-sky-600 px-8 py-6 flex items-center justify-between">
        <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          DANH SÁCH TỆP TIN TẢI XUỐNG
        </h2>
        <span className="bg-white/20 text-white text-[10px] font-black px-4 py-2 rounded-2xl uppercase tracking-widest border border-white/30 backdrop-blur-sm">DMCA PROTECTED</span>
      </div>

      <div className="p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2.5rem] border-2 border-sky-50 shadow-inner bg-sky-50/20">
              <table className="w-full text-sm text-left">
                <tbody>
                  <tr className="border-b border-sky-100 bg-sky-100/30">
                    <td className="px-6 py-5 font-black text-slate-400 uppercase text-[10px] tracking-widest">Chuyên mục / Tên</td>
                    <td className="px-6 py-5 font-black text-sky-600 uppercase text-xs">{displayCategory}</td>
                  </tr>
                  <tr className="border-b border-sky-100">
                    <td className="px-6 py-5 font-black text-slate-400 uppercase text-[10px] tracking-widest">Nguồn tải tệp</td>
                    <td className="px-6 py-5 font-black flex items-center gap-2" style={{ color: source.color }}>
                      <span className="text-2xl">{source.icon}</span>
                      <span className="uppercase text-xs tracking-tighter">{source.name}</span>
                    </td>
                  </tr>
                  <tr className="bg-sky-100/30">
                    <td className="px-6 py-5 font-black text-slate-400 uppercase text-[10px] tracking-widest">Dung lượng</td>
                    <td className="px-6 py-5 font-black text-slate-700">{download.size || 'Auto Detect'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div 
              className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 cursor-pointer hover:bg-sky-50 hover:border-sky-300 transition-all group"
              onClick={() => copyToClipboard(download.md5, 'md5')}
            >
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Checksum MD5 (Click để copy)</p>
                <p className="text-xs font-mono text-slate-600 truncate font-bold uppercase">{download.md5}</p>
              </div>
              <span className="flex-shrink-0 text-[10px] font-black text-sky-600 bg-white border border-sky-200 px-4 py-2 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm ml-4">
                {copied === 'md5' ? 'ĐÃ COPY' : 'SAO CHÉP'}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center h-full space-y-6">
            {countdown > 0 ? (
              <div className="relative overflow-hidden bg-sky-50 p-12 rounded-[3rem] text-center border-2 border-sky-100 shadow-inner animate-pulse">
                <div className="relative z-10">
                  <p className="text-xs font-black text-sky-500 uppercase tracking-[0.2em] mb-4">Đang bảo mật link tải {source.name}...</p>
                  <div className="text-8xl font-black text-sky-600 mb-4 transform-gpu">
                    {countdown}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 italic uppercase tracking-widest">Hệ thống đang kiểm tra tệp tin</p>
                </div>
                <div 
                  className="absolute bottom-0 left-0 h-2 bg-sky-600 transition-all duration-1000 ease-linear" 
                  style={{ width: `${(countdown / 10) * 100}%` }}
                ></div>
              </div>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={() => handleDownload(download.fileData ? 'direct' : download.freeLink, !!download.fileData)}
                  className="w-full group relative flex flex-col items-center justify-center gap-1 bg-sky-600 text-white font-black py-7 rounded-[2.5rem] hover:bg-sky-700 transition-all shadow-2xl shadow-sky-600/30 active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{source.icon}</span>
                    <span className="text-sm uppercase tracking-[0.2em]">TẢI XUỐNG NGAY</span>
                  </div>
                  <span className="text-[9px] opacity-70 font-bold uppercase tracking-widest">Link an toàn từ {source.name}</span>
                </button>
                
                {download.proLink && (
                  <button 
                    onClick={() => window.open(download.proLink, '_blank')}
                    className="w-full group flex items-center justify-center gap-4 bg-emerald-600 text-white font-black py-5 rounded-[2rem] hover:bg-emerald-700 transition-all shadow-lg active:scale-95 border-b-4 border-emerald-800"
                  >
                    <span className="text-[11px] uppercase tracking-widest">DOWNLOAD PREMIUM / DONATE</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sky-50 text-center">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-4">SPONSORED LINKS</p>
             <AdSlot rawHtml={config?.adsBelowContent} />
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
