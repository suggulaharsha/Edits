import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Bookmark, 
  Play, 
  Square, 
  Star, 
  ExternalLink, 
  Sparkles, 
  FileCode,
  HardDrive,
  Edit3,
  Trash2
} from 'lucide-react';
import { Asset } from '../types';
import { playSfxSound } from '../utils/audioSynthesizer';

interface AssetCardProps {
  asset: Asset;
  isSaved: boolean;
  isAdmin?: boolean;
  onToggleSave: (assetId: string) => void;
  onSelectAsset: (asset: Asset) => void;
  onCopyLink: (link: string, title: string) => void;
  onEditAsset?: (asset: Asset) => void;
  onDeleteAsset?: (assetId: string, title: string) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  isSaved,
  isAdmin = false,
  onToggleSave,
  onSelectAsset,
  onCopyLink,
  onEditAsset,
  onDeleteAsset,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedRecently, setCopiedRecently] = useState(false);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (asset.sfxSoundType) {
      setIsPlayingAudio(true);
      playSfxSound(asset.sfxSoundType);
      setTimeout(() => setIsPlayingAudio(false), 900);
    }
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyLink(asset.directUrl, asset.title);
    setCopiedRecently(true);
    setTimeout(() => setCopiedRecently(false), 2000);
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(asset.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEditAsset) onEditAsset(asset);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteAsset && confirm(`Are you sure you want to remove "${asset.title}" from Vignesh Space?`)) {
      onDeleteAsset(asset.id, asset.title);
    }
  };

  return (
    <div 
      onClick={() => onSelectAsset(asset)}
      className="glass-card group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-violet-950/40"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={asset.thumbnail}
          alt={asset.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase bg-slate-900/85 text-white backdrop-blur-md border border-white/10">
            {asset.categoryLabel}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Admin Controls */}
            {isAdmin && (
              <div className="flex items-center gap-1 bg-black/80 p-1 rounded-lg border border-cyan-500/40">
                <button
                  onClick={handleEdit}
                  title="Edit Asset"
                  className="p-1 hover:text-cyan-300 text-slate-300 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleDelete}
                  title="Delete Asset"
                  className="p-1 hover:text-rose-400 text-slate-300 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Quick Audio Play Button for SFX */}
            {asset.category === 'sfx' && (
              <button
                onClick={handlePlayAudio}
                title="Audition Sound Effect"
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition-all shadow-lg ${
                  isPlayingAudio 
                    ? 'bg-pink-500 text-white scale-110' 
                    : 'bg-slate-900/80 hover:bg-pink-600 text-pink-300 hover:text-white backdrop-blur-md border border-pink-500/30'
                }`}
              >
                <Play className={`w-3 h-3 fill-current ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                <span className="text-[10px]">{isPlayingAudio ? 'Playing...' : 'Audition'}</span>
              </button>
            )}

            {/* Bookmark button */}
            <button
              onClick={handleSaveToggle}
              title={isSaved ? 'Remove from Bag' : 'Save to My Bag'}
              className={`p-1.5 rounded-md backdrop-blur-md border transition-all ${
                isSaved 
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold' 
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border-white/10 hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Thumbnail Overlay Tags */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
          <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
            <HardDrive className="w-3 h-3 text-cyan-400" />
            {asset.fileSize}
          </span>
          <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm text-amber-300 font-sans font-semibold flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-300" />
            {asset.rating}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Tagline */}
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
            {asset.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {asset.tagline}
          </p>

          {/* Software Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {asset.software.slice(0, 3).map((sw) => (
              <span
                key={sw}
                className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/5 text-slate-300 border border-white/5"
              >
                {sw}
              </span>
            ))}
            {asset.software.length > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/5">
                +{asset.software.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          
          {/* Downloads Info */}
          <div className="text-[11px] font-mono text-slate-400">
            <span className="text-slate-200 font-semibold">{asset.downloadsCount.toLocaleString()}</span> downloads
          </div>

          {/* Action Buttons: Copy Link & Download Direct */}
          <div className="flex items-center gap-1.5">
            {/* Quick Copy Link */}
            <button
              onClick={handleCopyLink}
              title="Copy Direct Download Link"
              className={`p-2 rounded-lg text-xs font-semibold transition-all border ${
                copiedRecently 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
              }`}
            >
              {copiedRecently ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {/* Direct Link Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectAsset(asset);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-violet-600/20 transition-transform active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get Links</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
