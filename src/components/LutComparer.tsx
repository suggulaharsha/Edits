import React, { useState } from 'react';
import { X, Sparkles, Sliders, ArrowRight, Download, Eye } from 'lucide-react';
import { Asset } from '../types';

interface LutComparerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset: (asset: Asset) => void;
  allAssets: Asset[];
}

const COMPARISON_SCENES = [
  {
    id: 'teal-orange',
    name: 'Teal & Orange Blockbuster',
    tag: 'Hollywood Film',
    before: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    lutAssetId: 'lut-cinematic-teal-orange',
    desc: 'Deep warm skin tones with rich complementary cyan-teal shadows.'
  },
  {
    id: 'cyberpunk-neon',
    name: 'Tokyo Neon & Cyberpunk',
    tag: 'Night & Low Light',
    before: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    lutAssetId: 'lut-cyberpunk-tokyo-neon',
    desc: 'Boosts neon magenta and electric cyan highlights while crushing shadow noise.'
  },
  {
    id: 'vintage-kodak',
    name: 'Kodak 2383 35mm Celluloid',
    tag: 'Vintage Emulation',
    before: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    lutAssetId: 'lut-cinematic-teal-orange',
    desc: 'Soft highlight rolloff with authentic 35mm print film contrast curves.'
  }
];

export const LutComparer: React.FC<LutComparerProps> = ({
  isOpen,
  onClose,
  onSelectAsset,
  allAssets
}) => {
  if (!isOpen) return null;

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const scene = COMPARISON_SCENES[activeSceneIndex];
  const linkedAsset = allAssets.find(a => a.id === scene.lutAssetId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0f1118] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Interactive Color Grading Split Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Inspect raw un-graded camera flat footage vs Vignesh Space calibrated LUTs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scene Selector Tabs */}
        <div className="p-4 bg-slate-900/50 border-b border-white/5 flex items-center gap-2 overflow-x-auto">
          {COMPARISON_SCENES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveSceneIndex(idx);
                setSliderPosition(50);
              }}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSceneIndex === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              <span>{s.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                activeSceneIndex === idx ? 'bg-slate-950/20 text-slate-950' : 'bg-white/10 text-slate-400'
              }`}>
                {s.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Split Viewer */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl select-none group">
            {/* Graded Layer (Base) */}
            <img
              src={scene.after}
              alt="Graded Result"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/90 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg">
              Graded // Vignesh LUT
            </div>

            {/* Flat Log Layer (Clipped by slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={scene.before}
                alt="Flat Raw Log"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%', minWidth: '100%' }}
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-lg">
                Raw Log Flat
              </div>
            </div>

            {/* Split Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,1)] flex items-center justify-center -ml-0.5 cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center text-xs font-black ring-4 ring-black/40">
                ↔
              </div>
            </div>

            {/* Slider input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/80 backdrop-blur-md rounded-full text-xs text-slate-200 font-mono pointer-events-none">
              Drag left or right to compare
            </div>
          </div>

          {/* Description & Action */}
          <div className="mt-5 p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-bold text-sm mb-1">{scene.name}</h4>
              <p className="text-xs text-slate-400">{scene.desc}</p>
            </div>

            {linkedAsset && (
              <button
                onClick={() => {
                  onClose();
                  onSelectAsset(linkedAsset);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-violet-600/30 whitespace-nowrap"
              >
                <span>Download This LUT (.CUBE)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
