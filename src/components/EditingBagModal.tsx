import React from 'react';
import { 
  X, 
  Trash2, 
  Copy, 
  Download, 
  ExternalLink, 
  HardDrive, 
  Check, 
  FileText,
  Bookmark
} from 'lucide-react';
import { Asset } from '../types';
import confetti from 'canvas-confetti';

interface EditingBagModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedAssets: Asset[];
  onRemoveAsset: (id: string) => void;
  onClearAll: () => void;
  onSelectAsset: (asset: Asset) => void;
  onCopyAllLinks: () => void;
  onDownloadTxt: () => void;
}

export const EditingBagModal: React.FC<EditingBagModalProps> = ({
  isOpen,
  onClose,
  savedAssets,
  onRemoveAsset,
  onClearAll,
  onSelectAsset,
  onCopyAllLinks,
  onDownloadTxt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0f1118] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                My Editing Vault Bag ({savedAssets.length})
              </h2>
              <p className="text-xs text-slate-400">
                Bookmarked assets ready for batch download & link export
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedAssets.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Clear all saved assets"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3">
          {savedAssets.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Your bag is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Click the bookmark icon on any asset card in Vignesh Space to save links here for quick bulk export!
              </p>
            </div>
          ) : (
            savedAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 hover:border-violet-500/30 transition-all group"
              >
                <div 
                  onClick={() => {
                    onClose();
                    onSelectAsset(asset);
                  }}
                  className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                >
                  <img
                    src={asset.thumbnail}
                    alt={asset.title}
                    className="w-14 h-10 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 truncate">
                      {asset.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {asset.categoryLabel} • {asset.fileSize} • {asset.fileFormat}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <a
                    href={asset.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold flex items-center gap-1"
                    title="Open direct link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onRemoveAsset(asset.id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Remove from bag"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {savedAssets.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              {savedAssets.length} asset{savedAssets.length > 1 ? 's' : ''} saved
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onCopyAllLinks}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all border border-white/10"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All Links</span>
              </button>

              <button
                onClick={onDownloadTxt}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-violet-600/30 transition-transform active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export Links (.txt)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
