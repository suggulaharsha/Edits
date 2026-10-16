import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Play, 
  Sparkles, 
  Wind, 
  DollarSign, 
  Radio, 
  Camera, 
  MousePointer, 
  Zap, 
  Music,
  ExternalLink
} from 'lucide-react';
import { SFX_SOUNDBOARD_ITEMS } from '../data/assets';
import { playSfxSound } from '../utils/audioSynthesizer';
import { Asset } from '../types';

interface SoundboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset: (asset: Asset) => void;
  allAssets: Asset[];
}

export const SoundboardModal: React.FC<SoundboardModalProps> = ({
  isOpen,
  onClose,
  onSelectAsset,
  allAssets
}) => {
  if (!isOpen) return null;

  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const handlePlayPad = (id: string, type: 'whoosh' | 'impact' | 'cash' | 'glitch' | 'subdrop' | 'camera' | 'click' | 'anime') => {
    setActivePlayingId(id);
    playSfxSound(type);
    setTimeout(() => {
      setActivePlayingId(null);
    }, 700);
  };

  const sfxPacks = allAssets.filter(a => a.category === 'sfx');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0f1118] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Vignesh Space SFX Audition Soundboard
              </h2>
              <p className="text-xs text-slate-400">
                Click any pad to audition viral video editing sound effects instantly
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

        {/* Sound Pads Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {SFX_SOUNDBOARD_ITEMS.map((item) => {
              const isPlaying = activePlayingId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePlayPad(item.id, item.type)}
                  className={`group relative p-4 rounded-2xl border text-left flex flex-col justify-between h-32 transition-all duration-200 active:scale-95 ${
                    isPlaying
                      ? 'bg-pink-600/30 border-pink-500 shadow-xl shadow-pink-500/30 scale-102 ring-2 ring-pink-400'
                      : 'bg-slate-900/70 hover:bg-slate-800/80 border-white/10 hover:border-pink-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-white/5 group-hover:bg-pink-500/20 text-pink-400 transition-colors">
                      <Play className={`w-4 h-4 fill-current ${isPlaying ? 'animate-bounce' : ''}`} />
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      .WAV 24b
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-pink-300 transition-colors">
                      {item.label}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Links to Full SFX Packs */}
          <div className="pt-4 border-t border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-pink-400" />
              Download Full Curated SFX Packs (Direct Links):
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sfxPacks.map((pack) => (
                <div
                  key={pack.id}
                  onClick={() => {
                    onClose();
                    onSelectAsset(pack);
                  }}
                  className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-pink-500/30 flex items-center justify-between gap-3 cursor-pointer group transition-all"
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white group-hover:text-pink-300 truncate">
                      {pack.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {pack.fileSize} • {pack.itemsCount || 'Master Pack'}
                    </span>
                  </div>
                  <span className="text-xs text-pink-400 font-semibold flex items-center gap-1 whitespace-nowrap">
                    <span>View Links</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
