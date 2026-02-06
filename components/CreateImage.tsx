
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Template {
  name: string;
  width: number;
  height: number;
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
}

const TEMPLATES: Template[] = [
  { name: 'Logo (1:1)', width: 500, height: 500, aspectRatio: "1:1" },
  { name: 'Avatar (1:1)', width: 400, height: 400, aspectRatio: "1:1" },
  { name: 'FB Cover (Personal)', width: 820, height: 312, aspectRatio: "16:9" },
  { name: 'FB Cover (Fanpage)', width: 1200, height: 675, aspectRatio: "16:9" },
  { name: 'YouTube Banner', width: 2560, height: 1440, aspectRatio: "16:9" },
  { name: 'YouTube Thumbnail', width: 1280, height: 720, aspectRatio: "16:9" },
  { name: 'Wallpaper PC', width: 1920, height: 1080, aspectRatio: "16:9" },
  { name: 'Wallpaper Mobile', width: 1080, height: 1920, aspectRatio: "9:16" },
];

const CreateImage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0]);
  const [artStyle, setArtStyle] = useState('Cinematic, Hyper-realistic, 8k');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiImageBase64, setAiImageBase64] = useState<string | null>(null);

  const [mainText, setMainText] = useState('PHẠM HOÀI VŨ');
  const [subText, setSubText] = useState('CREATIVE DESIGN');
  const [textColor, setTextColor] = useState('#00eaff');
  const [fontSize, setFontSize] = useState(60);
  const [textYOffset, setTextYOffset] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAIImage = async () => {
    if (!prompt) return alert("Vui lòng nhập mô tả ảnh!");
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const fullPrompt = `${prompt}, ${artStyle}, masterpiece, professional composition, high details.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: fullPrompt }] },
        config: {
          imageConfig: { aspectRatio: selectedTemplate.aspectRatio },
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setAiImageBase64(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("Lỗi kết nối AI. Vui lòng kiểm tra API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = selectedTemplate.width;
    canvas.height = selectedTemplate.height;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (aiImageBase64) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          drawUI(ctx);
        };
        img.src = aiImageBase64;
      } else {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1e293b';
        ctx.textAlign = 'center';
        ctx.font = 'bold 20px Inter';
        ctx.fillText("PREVIEW AREA", canvas.width / 2, canvas.height / 2);
        drawUI(ctx);
      }
    };

    const drawUI = (ctx: CanvasRenderingContext2D) => {
      ctx.save();
      // Main Text
      ctx.textAlign = 'center';
      ctx.fillStyle = textColor;
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.font = `italic 900 ${fontSize}px Inter`;
      ctx.fillText(mainText, canvas.width / 2, (canvas.height / 2) + textYOffset);

      // Sub Text
      ctx.font = `bold ${fontSize * 0.4}px Inter`;
      ctx.fillStyle = 'white';
      ctx.globalAlpha = 0.8;
      ctx.fillText(subText, canvas.width / 2, (canvas.height / 2) + (fontSize * 0.7) + textYOffset);
      
      // Mandatory Watermark
      ctx.globalAlpha = 0.5;
      ctx.textAlign = 'right';
      ctx.font = 'bold 12px Inter';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('phamhoaivu.vercel.app', canvas.width - 20, canvas.height - 20);
      ctx.restore();
    };

    render();
  }, [aiImageBase64, mainText, subText, textColor, fontSize, textYOffset, selectedTemplate]);

  const download = () => {
    const link = document.createElement('a');
    link.download = `phv-design-${Date.now()}.png`;
    link.href = canvasRef.current?.toDataURL('image/png') || '';
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-700">
      {/* Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Phạm Hoài Vũ AI Design</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">1. Chọn Template</label>
              <select 
                onChange={(e) => setSelectedTemplate(TEMPLATES.find(t => t.name === e.target.value) || TEMPLATES[0])}
                className="w-full mt-2 bg-slate-950 border border-white/10 rounded-xl p-4 text-xs font-bold text-slate-300 outline-none focus:border-cyan-500"
              >
                {TEMPLATES.map(t => <option key={t.name} value={t.name}>{t.name} - {t.width}x{t.height}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">2. Mô tả ý tưởng</label>
              <textarea 
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Ví dụ: Một chiến binh cyber rực rỡ dưới mưa..."
                className="w-full mt-2 bg-slate-950 border border-white/10 rounded-xl p-4 text-xs font-medium text-white outline-none focus:border-cyan-500 h-24 resize-none shadow-inner"
              />
            </div>

            <button 
              onClick={generateAIImage}
              disabled={isGenerating}
              className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${isGenerating ? 'bg-slate-800' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl shadow-cyan-600/20'}`}
            >
              {isGenerating ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'BẮT ĐẦU TẠO ẢNH'}
            </button>
          </div>

          <div className="pt-6 border-t border-white/5 space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">3. Tùy chỉnh văn bản</label>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" value={mainText} onChange={e => setMainText(e.target.value)} className="bg-slate-950 border border-white/10 rounded-xl p-3 text-[10px] font-bold outline-none" placeholder="Tên chính" />
              <input type="text" value={subText} onChange={e => setSubText(e.target.value)} className="bg-slate-950 border border-white/10 rounded-xl p-3 text-[10px] font-bold outline-none" placeholder="Slogan" />
            </div>
            <div className="flex gap-3">
              <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-12 h-10 rounded-xl bg-slate-950 border border-white/10 cursor-pointer" />
              <input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="flex-grow bg-slate-950 border border-white/10 rounded-xl p-3 text-[10px] font-bold outline-none" />
            </div>
          </div>

          <button onClick={download} className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/5 transition-all flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            XUẤT ẢNH PNG
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:col-span-8 flex items-center justify-center bg-slate-950 rounded-[3rem] p-8 border border-white/5 min-h-[600px] overflow-hidden relative group">
        <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative shadow-2xl rounded-2xl overflow-hidden max-w-full">
           <canvas ref={canvasRef} className="max-w-full h-auto" />
        </div>
        <div className="absolute bottom-6 text-[10px] font-black text-slate-700 tracking-[0.5em] uppercase">Pham Hoai Vu Studio - Quality Verified</div>
      </div>
    </div>
  );
};

export default CreateImage;
