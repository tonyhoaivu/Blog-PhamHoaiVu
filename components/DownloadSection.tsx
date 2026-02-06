
import React, { useState, useEffect } from 'react';
import { DownloadInfo, SiteConfig } from '../types';
import AdSlot from './AdSlot';

interface DownloadSectionProps {
  download: DownloadInfo;
  config?: SiteConfig;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ download, config }) => {
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

  return (
    <div id={`dl-area-${download.md5}`} className="max-w-4xl mx-auto my-8 overflow-hidden bg-white shadow-2xl rounded-[3rem] border border-sky-100 glass-card">
      <div className="bg-sky-600 px-8 py-5 flex items-center justify-between">
        <h2 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Khu vực tải tệp an toàn
        </h2>
        <span className="bg-white/20 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border border-white/30 backdrop-blur-sm">Đã xác thực bởi PHV</span>
      </div>

      <div className="p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] border-2 border-sky-50 shadow-inner bg-sky-50/20">
              <table className="w-full text-sm text-left">
                <tbody>
                  <tr className="border-b border-sky-100 bg-sky-100/30">
                    <td className="px-6 py-4 font-black text-slate-400 uppercase text-[10px] tracking-widest">Phiên bản / Tên</td>
                    <td className="px-6 py-4 font-black text-sky-600">{download.version || 'Premium'}</td>
                  </tr>
                  <tr className="border-b border-sky-100">
                    <td className="px-6 py-4 font-black text-slate-400 uppercase text-[10px] tracking-widest">Dung lượng</td>
                    <td className="px-6 py-4 font-black text-slate-700">{download.size || 'N/A'}</td>
                  </tr>
                  <tr className="bg-sky-100/30">
                    <td className="px-6 py-4 font-black text-slate-400 uppercase text-[10px] tracking-widest">Nguồn tệp</td>
                    <td className="px-6 py-4 font-black text-slate-700">{download.fileData ? 'Server Local' : 'External Link'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div 
              className="flex items-center justify-between p-5 bg-sky-50/50 rounded-2xl border-2 border-dashed border-sky-200 cursor-pointer hover:bg-sky-100 transition-all group"
              onClick={() => copyToClipboard(download.md5, 'md5')}
            >
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1">Mã Kiểm Tra (MD5)</p>
                <p className="text-xs font-mono text-slate-600 truncate font-bold">{download.md5}</p>
              </div>
              <span className="flex-shrink-0 text-[10px] font-black text-sky-600 bg-white border border-sky-200 px-3 py-1.5 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm ml-4">
                {copied === 'md5' ? 'ĐÃ COPY' : 'SAO CHÉP'}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center h-full space-y-6">
            {countdown > 0 ? (
              <div className="relative overflow-hidden bg-sky-50 p-12 rounded-[2.5rem] text-center border-2 border-sky-100 shadow-inner">
                <div className="relative z-10">
                  <p className="text-xs font-black text-sky-500 uppercase tracking-[0.2em] mb-4">Đang chuẩn bị link tải...</p>
                  <div className="text-7xl font-black text-sky-600 mb-4 animate-bounce transform-gpu">
                    {countdown}s
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 italic uppercase tracking-widest">Hệ thống đang kiểm tra an toàn tệp</p>
                </div>
                <div 
                  className="absolute bottom-0 left-0 h-1.5 bg-sky-600 transition-all duration-1000 ease-linear" 
                  style={{ width: `${(countdown / 10) * 100}%` }}
                ></div>
              </div>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={() => handleDownload(download.fileData ? 'direct' : download.freeLink, !!download.fileData)}
                  className="w-full group relative flex items-center justify-center gap-4 bg-sky-600 text-white font-black py-6 rounded-[2rem] hover:bg-sky-700 transition-all shadow-xl shadow-sky-600/30 active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-sm uppercase tracking-widest">TẢI TỆP MIỄN PHÍ</span>
                </button>
                <div className="pt-2 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                    Vui lòng chờ 10 giây để hệ thống tạo liên kết tải xuống an toàn.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-center gap-3 text-slate-400 pt-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">An toàn 100% - Bảo mật tệp tin</span>
            </div>
          </div>
        </div>

        {config?.adsBelowContent && (
          <div className="mt-8 pt-8 border-t border-sky-50">
            <AdSlot rawHtml={config.adsBelowContent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadSection;
