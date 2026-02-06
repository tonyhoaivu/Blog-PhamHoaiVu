
import React, { useState, useEffect } from 'react';
import { DownloadInfo } from '../types';

interface DownloadSectionProps {
  download: DownloadInfo;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ download }) => {
  const [countdown, setCountdown] = useState<number>(0);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && activeLink) {
      window.open(activeLink, '_blank');
      setActiveLink(null);
    }
    return () => clearInterval(timer);
  }, [countdown, activeLink]);

  const handleDownload = (link: string) => {
    setCountdown(15);
    setActiveLink(link);
    const area = document.getElementById('download-area');
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
    <div id="download-area" className="max-w-4xl mx-auto my-12 overflow-hidden bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border border-gray-100 dark:border-gray-700 glass-card">
      <div className="bg-primary-600 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Khu vực tải file an toàn
        </h2>
        <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase">Phạm Hoài Vũ Verified</span>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Specs Table */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700">
              <table className="w-full text-sm text-left">
                <tbody>
                  <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
                    <td className="px-4 py-3 font-bold text-gray-500 uppercase text-[10px]">Phiên bản</td>
                    <td className="px-4 py-3 font-black text-primary-600">{download.version || 'Premium'}</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-bold text-gray-500 uppercase text-[10px]">Dung lượng</td>
                    <td className="px-4 py-3 font-bold dark:text-gray-200">{download.size || 'N/A'}</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
                    <td className="px-4 py-3 font-bold text-gray-500 uppercase text-[10px]">Định dạng</td>
                    <td className="px-4 py-3 font-bold dark:text-gray-200">ISO / ZIP / EXE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Checksum area */}
            <div className="space-y-2">
              <div 
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => copyToClipboard(download.md5, 'md5')}
              >
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Mã MD5</p>
                  <p className="text-xs font-mono dark:text-gray-300 truncate max-w-[200px]">{download.md5}</p>
                </div>
                <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {copied === 'md5' ? 'ĐÃ COPY' : 'SAO CHÉP'}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons Area */}
          <div className="flex flex-col justify-center h-full space-y-4">
            {countdown > 0 ? (
              <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900/50 p-10 rounded-3xl text-center border-2 border-primary-100 dark:border-primary-900/20">
                <div className="relative z-10">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Đang tạo liên kết an toàn</p>
                  <div className="text-6xl font-black text-primary-600 mb-2">{countdown}</div>
                  <p className="text-[10px] font-bold text-gray-400">Vui lòng đợi trong giây lát...</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-primary-600 transition-all duration-1000" style={{ width: `${(countdown/15) * 100}%` }}></div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => handleDownload(download.freeLink)}
                  className="group relative btn-gradient-glow flex items-center justify-center gap-3 bg-red-600 text-white font-black py-5 rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-500/30 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  TẢI FILE FREE
                </button>
                <button 
                  onClick={() => window.open(download.proLink, '_blank')}
                  className="flex items-center justify-center gap-3 bg-blue-700 text-white font-black py-5 rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-500/30 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  MUA BẢN PRO (ỦNG HỘ)
                </button>
              </>
            )}
            <div className="flex items-center justify-center gap-2 text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
               <span className="text-[10px] font-bold uppercase tracking-widest">Đã quét Virus bởi VirusTotal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;