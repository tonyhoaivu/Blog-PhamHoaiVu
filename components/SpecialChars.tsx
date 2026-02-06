
import React, { useState } from 'react';

const SpecialChars: React.FC = () => {
  const [text, setText] = useState('');
  const styles = [
    (t: string) => `꧁༺${t}༻꧂`,
    (t: string) => `★彡[${t}]彡★`,
    (t: string) => `﹃${t}﹄`,
    (t: string) => `【${t}】`,
    (t: string) => `(◡‿◡✿) ${t} (◡‿◡✿)`,
    (t: string) => `☠️ ${t} ☠️`,
    (t: string) => `『${t}』`,
    (t: string) => `⫷ ${t} ⫸`,
    (t: string) => `°°°·.°·..·°¯°·._.· ${t} ·._.·°¯°·.·° .·°°°`,
    (t: string) => `(¯\`·.¸¸.·´¯\`·.¸¸.-> ${t} <-.¸¸.·´¯\`·.¸¸.·´¯)`,
    (t: string) => `•?((¯°·._.· ${t} ·._.·°¯))؟•`,
    (t: string) => `—(••÷[ ${t} ]÷••)—`,
  ];

  const copyToClipboard = (val: string) => {
    navigator.clipboard.writeText(val);
    alert('Đã copy: ' + val);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter mb-2">
            ✨ Ký Tự Đặc Biệt
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tạo tên game, nghệ thuật chữ chuyên nghiệp</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              autoFocus
              type="text"
              placeholder="Nhập tên hoặc nội dung cần tạo..."
              className="w-full p-6 bg-gray-50 dark:bg-gray-900 border-2 border-primary-100 dark:border-primary-900 rounded-3xl focus:border-primary-500 outline-none transition-all text-xl font-bold dark:text-white shadow-inner"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text && (
              <button 
                onClick={() => setText('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 font-bold"
              >
                XÓA
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {text ? styles.map((style, i) => {
              const result = style(text);
              return (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition group">
                  <span className="font-bold text-gray-700 dark:text-gray-200 truncate pr-4">{result}</span>
                  <button 
                    onClick={() => copyToClipboard(result)}
                    className="bg-primary-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-700 active:scale-95 transition-all shadow-md"
                  >
                    COPY
                  </button>
                </div>
              );
            }) : (
              <div className="col-span-full py-20 text-center opacity-20 flex flex-col items-center">
                 <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                 <p className="text-sm font-black uppercase tracking-[0.3em]">Vui lòng nhập chữ để bắt đầu</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialChars;
