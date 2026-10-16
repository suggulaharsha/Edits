import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Bookmark, 
  Star, 
  HardDrive, 
  ShieldCheck, 
  Clock, 
  Play, 
  Share2, 
  Layers, 
  Sliders, 
  FileCheck2, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Asset } from '../types';
import { playSfxSound } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface AssetDetailModalProps {
  asset: Asset | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCopyLink: (link: string, title: string) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  isSaved,
  onToggleSave,
  onCopyLink,
}) => {
  if (!asset) return null;

  const [copiedLinkIndex, setCopiedLinkIndex] = useState<number | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'mirrors' | 'install'>('mirrors');
  const [selectedSoftwareTab, setSelectedSoftwareTab] = useState<number>(0);

  const handleCopyMirror = (url: string, index: number) => {
    onCopyLink(url, `${asset.title} (${asset.downloadMirrors[index]?.name || 'Mirror'})`);
    setCopiedLinkIndex(index);
    setTimeout(() => setCopiedLinkIndex(null), 2500);

    // subtle celebratory confetti burst
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#8b5cf6', '#a855f7']
    });
  };

  const handlePlayAudio = () => {
    if (asset.sfxSoundType) {
      setIsPlayingAudio(true);
      playSfxSound(asset.sfxSoundType);
      setTimeout(() => setIsPlayingAudio(false), 900);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0f1118] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
              {asset.categoryLabel}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              // Curated by Vignesh
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(asset.id)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                isSaved
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Title & Tagline */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
              {asset.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {asset.description}
            </p>
          </div>

          {/* Interactive Preview Panel */}
          {asset.previewType === 'lut_compare' && asset.lutPreview ? (
            <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video select-none group">
              {/* After image (Underneath) */}
              <img
                src={asset.lutPreview.afterImage}
                alt="Color Graded Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 px-2 py-1 bg-cyan-500/90 text-slate-950 text-[10px] font-extrabold uppercase rounded shadow">
                Graded (Vignesh LUT)
              </span>

              {/* Before image (Clipped by slider) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={asset.lutPreview.beforeImage}
                  alt="Raw Log Footage"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', height: '100%', minWidth: '100%' }}
                />
                <span className="absolute top-3 left-3 px-2 py-1 bg-black/80 text-slate-200 text-[10px] font-extrabold uppercase rounded shadow">
                  Raw Log Flat
                </span>
              </div>

              {/* Slider Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-ew-resize flex items-center justify-center -ml-0.5"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-7 h-7 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center text-[10px] font-bold">
                  ↔
                </div>
              </div>

              {/* Interactive Range Input overlay */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
              />

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full text-[11px] text-slate-300 font-mono pointer-events-none">
                Drag slider to inspect color grade
              </div>
            </div>
          ) : asset.category === 'sfx' ? (
            <div className="p-5 rounded-xl bg-gradient-to-r from-pink-950/30 via-purple-950/20 to-slate-900 border border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayAudio}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform shadow-xl ${
                    isPlayingAudio
                      ? 'bg-pink-500 text-white scale-105 animate-pulse'
                      : 'bg-pink-600 hover:bg-pink-500 text-white hover:scale-105'
                  }`}
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>
                <div>
                  <h4 className="text-white font-bold text-sm">Instant SFX Audio Audition</h4>
                  <p className="text-xs text-slate-400">
                    24-bit studio sound synthesized at zero latency
                  </p>
                </div>
              </div>

              {/* Animated Waveform Visualizer mockup */}
              <div className="flex items-center gap-1 h-10 px-4 py-2 bg-black/40 rounded-lg">
                {[12, 28, 45, 18, 55, 75, 40, 90, 60, 30, 80, 45, 20, 65, 35, 15].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: isPlayingAudio ? `${Math.min(100, h * 1.2)}%` : `${h * 0.4}%` }}
                    className={`w-1.5 rounded-full transition-all duration-150 ${
                      isPlayingAudio ? 'bg-pink-400' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden aspect-video border border-white/10">
              <img
                src={asset.thumbnail}
                alt={asset.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-white/90 font-mono">
                  Format: {asset.fileFormat} • Resolution: {asset.resolution || 'High Definition'}
                </span>
              </div>
            </div>
          )}

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-0.5">File Size</span>
              <span className="text-sm font-bold text-white flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                {asset.fileSize}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-0.5">Format</span>
              <span className="text-sm font-bold text-white truncate block">
                {asset.fileFormat.split(' ')[0]}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-0.5">Downloads</span>
              <span className="text-sm font-bold text-white">
                {asset.downloadsCount.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-0.5">License</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Free Use
              </span>
            </div>
          </div>

          {/* Compatible Software List */}
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">
              COMPATIBLE NLE SOFTWARE:
            </span>
            <div className="flex flex-wrap gap-2">
              {asset.software.map((sw) => (
                <span
                  key={sw}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
                >
                  {sw}
                </span>
              ))}
            </div>
          </div>

          {/* Tab Navigation: Download Links vs How to Install */}
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setActiveTab('mirrors')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'mirrors'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Direct Download Links ({asset.downloadMirrors.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('install')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'install'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>How to Install & Use</span>
              </button>
            </div>

            {/* TAB 1: Download Mirrors */}
            {activeTab === 'mirrors' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Choose any high-speed mirror:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> All links scanned & clean
                  </span>
                </div>

                {asset.downloadMirrors.map((mirror, index) => {
                  const isCopied = copiedLinkIndex === index;
                  return (
                    <div
                      key={mirror.name}
                      className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-violet-500/40 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{mirror.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                            {mirror.speed}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono truncate max-w-xs sm:max-w-md mt-0.5">
                          {mirror.url}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleCopyMirror(mirror.url, index)}
                          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                            isCopied
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
                        </button>

                        <a
                          href={mirror.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-transform active:scale-95 shadow-md shadow-cyan-500/20"
                        >
                          <span>Open Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 2: Installation Guide */}
            {activeTab === 'install' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
                  {asset.installInstructions.map((guide, idx) => (
                    <button
                      key={guide.software}
                      onClick={() => setSelectedSoftwareTab(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        selectedSoftwareTab === idx
                          ? 'bg-white/15 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {guide.software}
                    </button>
                  ))}
                </div>

                <div className="space-y-2.5">
                  {asset.installInstructions[selectedSoftwareTab]?.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-white/5 text-sm text-slate-200">
                      <span className="w-6 h-6 rounded-full bg-violet-600/30 text-violet-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-violet-500/40">
                        {i + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>License: <strong className="text-white">{asset.license}</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-colors"
          >
            Close Vault Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
