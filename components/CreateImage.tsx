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
      // Sửa lỗi TS2339 bằng cách ép kiểu an toàn cho import.meta
      const meta = import.meta as any;
      const apiKey = meta.env?.VITE_API_KEY || "YOUR_API_KEY_HERE";
      
      const ai = new GoogleGenAI(apiKey);
      const fullPrompt = `${prompt}, ${artStyle}, masterpiece, professional composition, high details.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: { parts: [{ text: fullPrompt }] },
        config: {
          imageConfig: { aspectRatio: selectedTemplate.aspectRatio },
        },
      });

      // Sửa lỗi TS18048 an toàn tuyệt đối
      const candidates = response.candidates;
      if (candidates && candidates.length > 0) {
        const parts = candidates[0].content?.parts;
        if (parts) {
          for (const part of parts) {
            if (part.inlineData) {
              setAiImageBase64(`data:image/png;base64,${part.inlineData.data}`);
              break;
            }
          }
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
        img.crossOrigin = "anonymous";
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
      ctx.textAlign = 'center';
      ctx.fillStyle = textColor;
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.font = `italic 900 ${fontSize}px Inter`;
      ctx.fillText(mainText, canvas.width / 2, (canvas.height / 2) + textYOffset);

      ctx.font = `bold ${fontSize * 0.4}px Inter`;
      ctx.fillStyle = 'white';
      ctx.globalAlpha = 0.8;
      ctx.fillText(subText, canvas.width / 2, (canvas.height / 2) + (fontSize * 0.7) + textYOffset);
      
      // Watermark bảo mật
      ctx.globalAlpha = 0.5;
      ctx.textAlign = 'right';
      ctx.font = 'bold 12px Inter';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('tonyhoaivu.unaux.com', canvas.width - 20, canvas.height - 20);
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-4">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-900 border border-white/5 rounded-[2rem] p-6 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white">
              <i className="fas fa-magic"></i>
            </div>
            <h2 className="text-lg font-black uppercase text-white">PHV AI Design</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">1. Chọn Template</label>
              <select 
                onChange={(e) => setSelectedTemplate(TEMPLATES.find(t => t.name === e.target.value) || TEMPLATES[0])}
                className="w-full mt-2 bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-orange-500"
              >
                {TEMPLATES.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">2. Ý tưởng ảnh</label>
              <textarea 
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Mô tả hình ảnh bạn muốn tạo..."
                className="w-full mt-2 bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white h-24 resize-none focus:border-orange-500"
              />
            </div>

            <button 
              onClick={generateAIImage}
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-xs uppercase transition-all ${isGenerating ? 'bg-slate-800 text-slate-500' : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20'}`}
            >
              {isGenerating ? 'ĐANG TẠO...' : 'BẮT ĐẦU TẠO'}
            </button>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <input type="text" value={mainText} onChange={e => setMainText(e.target.value)} className="bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white" placeholder="Tên" />
              <input type="text" value={subText} onChange={e => setSubText(e.target.value)} className="bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white" placeholder="Slogan" />
            </div>
          </div>

          <button onClick={download} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-[10px] border border-white/5 text-white">
            XUẤT ẢNH PNG
          </button>
        </div>
      </div>

      <div className="lg:col-span-8 flex flex-col items-center justify-center bg-slate-950 rounded-[2rem] p-6 border border-white/5 relative min-h-[500px]">
        <div className="relative shadow-2xl rounded-lg overflow-hidden border border-white/10">
           <canvas ref={canvasRef} className="max-w-full h-auto shadow-2xl" />
        </div>
        <p className="mt-4 text-[10px] text-slate-600 uppercase tracking-widest">© Pham Hoai Vu - AI Studio Preview</p>
      </div>
    </div>
  );
};

export default CreateImage;