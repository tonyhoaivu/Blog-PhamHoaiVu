
import React, { useState, useRef, useEffect } from 'react';

type DesignTemplate = 
  | 'Block-3D' 
  | 'Blue-Archive' 
  | 'Creative-Blob' 
  | 'Mascot-Brand' 
  | 'Cyber-Neon' 
  | 'Modern-ID';

const CreateImage: React.FC<{ initialType?: string }> = ({ initialType = 'Tạo Logo' }) => {
  const [type, setType] = useState(initialType);
  const [template, setTemplate] = useState<DesignTemplate>('Block-3D');
  const [mainText, setMainText] = useState('TAD');
  const [subText, setSubText] = useState('TẠO ẢNH ĐẸP');
  const [tagline, setTagline] = useState('tonyhoaivu.unaux.com');
  const [primaryColor, setPrimaryColor] = useState('#00ffd1');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [iconType, setIconType] = useState('Block-A');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fix: Made the 6th parameter (color2) optional in the type definition to resolve "Expected 6 arguments, but got 5" errors.
  const icons: Record<string, (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color1: string, color2?: string) => void> = {
    'Block-A': (ctx, x, y, size, c1, c2) => {
      ctx.save();
      ctx.translate(x, y);
      // Outer Ring
      ctx.beginPath(); ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 4; ctx.stroke();
      
      // Stylized 'A'
      ctx.beginPath();
      ctx.moveTo(0, -size/2); ctx.lineTo(size/2, size/2); ctx.lineTo(-size/2, size/2); ctx.closePath();
      const grad = ctx.createLinearGradient(0, -size/2, 0, size/2);
      grad.addColorStop(0, c1); grad.addColorStop(1, c2 || c1);
      ctx.fillStyle = grad; ctx.fill();
      
      ctx.strokeStyle = 'white'; ctx.lineWidth = 4; ctx.stroke();
      // Slash effect
      ctx.beginPath(); ctx.moveTo(-size/3, 0); ctx.lineTo(size/3, 0); ctx.stroke();
      ctx.restore();
    },
    'Mascot-User': (ctx, x, y, size, c1) => {
      ctx.save();
      ctx.translate(x, y);
      // Circle Back
      ctx.beginPath(); ctx.arc(0, 0, size/2, 0, Math.PI * 2);
      ctx.fillStyle = c1 + '33'; ctx.fill();
      ctx.strokeStyle = c1; ctx.lineWidth = 5; ctx.stroke();
      // Head
      ctx.beginPath(); ctx.arc(0, -size/8, size/4, 0, Math.PI * 2);
      ctx.fillStyle = 'white'; ctx.fill(); ctx.stroke();
      // Body
      ctx.beginPath(); ctx.ellipse(0, size/4, size/2.5, size/4, 0, 0, Math.PI * 2);
      ctx.fillStyle = c1; ctx.fill();
      ctx.restore();
    },
    'Blob-Star': (ctx, x, y, size, c1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = c1;
      for (let i = 0; i < 5; i++) {
        ctx.rotate(Math.PI / 2.5);
        ctx.beginPath(); ctx.ellipse(size/4, 0, size/4, size/8, 0, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
    'Archive-Halo': (ctx, x, y, size, c1) => {
       ctx.save();
       ctx.translate(x, y);
       ctx.rotate(-Math.PI/10);
       ctx.beginPath(); ctx.ellipse(0, 0, size/2, size/6, 0, 0, Math.PI * 2);
       ctx.strokeStyle = c1; ctx.lineWidth = 3; ctx.stroke();
       ctx.beginPath(); ctx.moveTo(-size/4, 0); ctx.lineTo(size/4, 0); ctx.stroke();
       ctx.restore();
    }
  };

  const drawMultiStrokeText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, style: DesignTemplate) => {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';

    if (style === 'Block-3D') {
      ctx.font = `italic 900 ${fontSize}px "Inter"`;
      // Dark offset shadow
      ctx.fillStyle = '#1e293b';
      ctx.fillText(text, x + 5, y + 5);
      // Dark thick border
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = fontSize * 0.25; ctx.strokeText(text, x, y);
      // Mid light border
      ctx.strokeStyle = primaryColor; ctx.lineWidth = fontSize * 0.15; ctx.strokeText(text, x, y);
      // White inner stroke
      ctx.strokeStyle = 'white'; ctx.lineWidth = fontSize * 0.05; ctx.strokeText(text, x, y);
      // Main Fill
      const grad = ctx.createLinearGradient(x, y - fontSize/2, x, y + fontSize/2);
      grad.addColorStop(0, primaryColor); grad.addColorStop(1, secondaryColor);
      ctx.fillStyle = grad;
      ctx.fillText(text, x, y);
    } 
    else if (style === 'Creative-Blob') {
      ctx.font = `900 ${fontSize}px "Inter"`;
      ctx.strokeStyle = 'white'; ctx.lineWidth = fontSize * 0.2; ctx.strokeText(text, x, y);
      ctx.fillStyle = primaryColor; ctx.fillText(text, x, y);
    }
    else if (style === 'Blue-Archive') {
      ctx.font = `italic 900 ${fontSize}px "Inter"`;
      ctx.fillStyle = '#0a1d37';
      ctx.fillText(text, x, y);
      ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.strokeText(text, x, y);
    }
    else {
      ctx.font = `black ${fontSize}px "Inter"`;
      ctx.fillStyle = 'white'; ctx.fillText(text, x, y);
    }
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set Dimensions
    if (type === 'Ảnh Bìa') { canvas.width = 1200; canvas.height = 460; }
    else if (type === 'Tạo Logo' || type === 'Tạo Ảnh Avatar') { canvas.width = 1000; canvas.height = 1000; }
    else { canvas.width = 1920; canvas.height = 1080; }

    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // 1. Background Logic
    ctx.clearRect(0, 0, width, height);
    if (template === 'Block-3D') {
      ctx.fillStyle = '#0a0a0c'; ctx.fillRect(0, 0, width, height);
      // Grid effect
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1;
      for(let i=0; i<width; i+=40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke(); }
      for(let j=0; j<height; j+=40) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(width, j); ctx.stroke(); }
    } else if (template === 'Blue-Archive') {
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#f1f5f9'; ctx.beginPath(); ctx.arc(centerX, centerY, width/1.5, 0, Math.PI*2); ctx.fill();
    } else if (template === 'Creative-Blob') {
       ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, height);
       const blobColors = [primaryColor, secondaryColor, '#ff6b6b', '#ffd93d'];
       blobColors.forEach((c, i) => {
          ctx.save(); ctx.globalAlpha = 0.3; ctx.fillStyle = c;
          ctx.beginPath(); ctx.arc(centerX + (i-1.5)*180, centerY + Math.sin(i)*50, 250, 0, Math.PI*2); ctx.fill();
          ctx.restore();
       });
    } else {
      ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, width, height);
    }

    // 2. Composition Logic
    if (template === 'Block-3D') {
      // Fix: Ensured 6 arguments are passed correctly in line 168 (matches defined optional type).
      icons[iconType](ctx, centerX, centerY - height * 0.2, height * 0.4, primaryColor, secondaryColor);
      drawMultiStrokeText(ctx, mainText, centerX, centerY + height * 0.1, width * 0.15, template);
      drawMultiStrokeText(ctx, subText, centerX, centerY + height * 0.25, width * 0.08, template);
      
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = `bold ${width * 0.025}px "Inter"`;
      ctx.textAlign = 'center'; ctx.fillText(tagline, centerX, centerY + height * 0.38);
    } 
    else if (template === 'Blue-Archive') {
      // Fix: Provided 5 arguments, now valid because the 6th parameter is optional.
      icons['Archive-Halo'](ctx, centerX + width * 0.1, centerY - height * 0.1, width * 0.25, '#3b82f6');
      drawMultiStrokeText(ctx, mainText + ' ' + subText, centerX, centerY, width * 0.1, template);
      ctx.fillStyle = '#64748b'; ctx.font = `italic 600 ${width * 0.02}px "Inter"`;
      ctx.textAlign = 'center'; ctx.fillText(tagline, centerX, centerY + height * 0.1);
    }
    else if (template === 'Mascot-Brand') {
      // Fix: Provided 5 arguments, now valid because the 6th parameter is optional.
      icons['Mascot-User'](ctx, width * 0.25, centerY, height * 0.5, primaryColor);
      ctx.textAlign = 'left';
      drawMultiStrokeText(ctx, mainText, width * 0.45, centerY - 20, width * 0.1, 'Minimal-Pro' as any);
      ctx.fillStyle = primaryColor; ctx.font = `900 ${width * 0.03}px "Inter"`;
      ctx.fillText(tagline, width * 0.45, centerY + 60);
    }
    else if (template === 'Creative-Blob') {
       // Floating elements
       // Fix: Provided 5 arguments, now valid because the 6th parameter is optional.
       icons['Blob-Star'](ctx, width * 0.2, height * 0.2, 100, secondaryColor);
       drawMultiStrokeText(ctx, mainText + subText, centerX, centerY, width * 0.12, template);
       ctx.fillStyle = '#334155'; ctx.font = `bold ${width * 0.03}px "Inter"`;
       ctx.textAlign = 'center'; ctx.fillText(tagline, centerX, centerY + height * 0.15);
    }

  }, [type, template, mainText, subText, tagline, primaryColor, secondaryColor, iconType]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `phv-design-${Date.now()}.png`;
    link.href = canvasRef.current?.toDataURL('image/png') || '';
    link.click();
  };

  const templates: { id: DesignTemplate; name: string; color: string }[] = [
    { id: 'Block-3D', name: 'Logo Block 3D', color: 'bg-cyan-500' },
    { id: 'Blue-Archive', name: 'Blue Archive', color: 'bg-blue-400' },
    { id: 'Creative-Blob', name: 'Giải Trí / Blob', color: 'bg-pink-400' },
    { id: 'Mascot-Brand', name: 'Logo Mascot', color: 'bg-orange-500' },
    { id: 'Cyber-Neon', name: 'Cyberpunk Neon', color: 'bg-purple-600' },
    { id: 'Modern-ID', name: 'Ảnh Thẻ / CV', color: 'bg-gray-300' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-white dark:bg-gray-800 rounded-[3.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col lg:flex-row min-h-[850px]">
        
        {/* Sidebar Controls */}
        <div className="lg:w-[440px] bg-gray-50 dark:bg-gray-900/80 p-8 border-r dark:border-gray-700 space-y-8 overflow-y-auto scrollbar-hide">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-primary-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-xl shadow-primary-500/20">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
             </div>
             <div>
                <h2 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tighter leading-none">Design Engine</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Hệ thống tạo ảnh chuyên nghiệp</p>
             </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">1. Chuyên mục</label>
            <div className="grid grid-cols-2 gap-2">
              {['Tạo Logo', 'Ảnh Bìa', 'Tạo Ảnh Avatar', 'Ảnh Nền'].map(t => (
                <button 
                  key={t} onClick={() => setType(t)}
                  className={`px-4 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border ${type === t ? 'bg-primary-600 border-primary-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400 hover:border-primary-500'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">2. Mẫu thiết kế</label>
             <div className="grid grid-cols-2 gap-3">
                {templates.map(tmp => (
                  <button 
                    key={tmp.id} onClick={() => setTemplate(tmp.id)}
                    className={`relative p-3 rounded-2xl border-2 transition-all group flex flex-col items-center ${template === tmp.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' : 'border-transparent bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'}`}
                  >
                    <div className={`w-full aspect-[16/10] rounded-xl mb-2 ${tmp.color} shadow-lg relative overflow-hidden`}>
                       <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${template === tmp.id ? 'text-primary-600' : 'text-gray-400'}`}>{tmp.name}</span>
                  </button>
                ))}
             </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">3. Nội dung văn bản</label>
            <div className="space-y-3">
              <input 
                type="text" value={mainText} onChange={e => setMainText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white dark:bg-gray-800 border dark:border-gray-700 text-xs font-black uppercase dark:text-white outline-none focus:border-primary-500 shadow-inner"
                placeholder="NHẬP TÊN VIẾT TẮT..."
              />
              <input 
                type="text" value={subText} onChange={e => setSubText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white dark:bg-gray-800 border dark:border-gray-700 text-xs font-black uppercase dark:text-white outline-none focus:border-primary-500 shadow-inner"
                placeholder="NHẬP TÊN ĐẦY ĐỦ..."
              />
              <input 
                type="text" value={tagline} onChange={e => setTagline(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white dark:bg-gray-800 border dark:border-gray-700 text-[10px] font-bold dark:text-gray-400 outline-none focus:border-primary-500 shadow-inner"
                placeholder="URL HOẶC TAGLINE..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Màu Gradient 1</label>
                <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-full h-14 rounded-2xl cursor-pointer border-4 border-white dark:border-gray-800 shadow-lg" />
             </div>
             <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Màu Gradient 2</label>
                <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="w-full h-14 rounded-2xl cursor-pointer border-4 border-white dark:border-gray-800 shadow-lg" />
             </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={handleDownload}
              className="w-full bg-primary-600 text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary-500/30 hover:bg-primary-700 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              XUẤT ẢNH (PNG)
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-grow p-8 lg:p-16 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950">
           <div className="w-full max-w-5xl bg-white dark:bg-gray-800 p-8 lg:p-12 rounded-[4.5rem] shadow-2xl border dark:border-gray-700 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                 <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div className="relative z-10 bg-slate-200 dark:bg-slate-900 rounded-[2.5rem] p-1.5 overflow-hidden shadow-inner flex items-center justify-center">
                 <canvas ref={canvasRef} className="max-w-full h-auto rounded-[2rem] shadow-2xl transition-transform duration-1000 group-hover:scale-[1.01]" />
              </div>
           </div>

           <div className="mt-12 flex flex-wrap justify-center gap-12 text-center">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kích thước xuất</p>
                 <p className="text-sm font-black dark:text-white">{canvasRef.current?.width} x {canvasRef.current?.height} PX</p>
              </div>
              <div className="space-y-1 border-x dark:border-gray-800 px-12">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phong cách</p>
                 <p className="text-sm font-black dark:text-white uppercase tracking-tighter">{template.replace('-', ' ')}</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Định dạng file</p>
                 <p className="text-sm font-black dark:text-white">Hi-Res Lossless</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CreateImage;
