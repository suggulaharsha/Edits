import React from 'react';
import { 
  Sparkles, 
  Bookmark, 
  Volume2, 
  Command, 
  PlusCircle, 
  Layers, 
  ExternalLink,
  Keyboard,
  KeyRound,
  Plus,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  savedCount: number;
  isAdmin: boolean;
  onOpenBag: () => void;
  onOpenSoundboard: () => void;
  onOpenShortcuts: () => void;
  onOpenRequest: () => void;
  onOpenAdminLogin: () => void;
  onOpenAddAsset: () => void;
  onSelectCategory: (cat: string) => void;
  currentCategory: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  isAdmin,
  onOpenBag,
  onOpenSoundboard,
  onOpenShortcuts,
  onOpenRequest,
  onOpenAdminLogin,
  onOpenAddAsset,
  onSelectCategory,
  currentCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0b0c10]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 shadow-lg shadow-violet-600/30 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 text-white transform -rotate-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                vignesh space
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Assets Vault
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
              // Direct Links for Video & Motion Editors
            </p>
          </div>
        </div>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentCategory === 'all' 
                ? 'bg-white/10 text-white font-semibold' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            All Vault
          </button>
          <button
            onClick={() => onSelectCategory('luts')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentCategory === 'luts' 
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            LUTs
          </button>
          <button
            onClick={() => onSelectCategory('sfx')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentCategory === 'sfx' 
                ? 'bg-pink-500/20 text-pink-300 font-semibold' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            SFX
          </button>
          <button
            onClick={() => onSelectCategory('overlays')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentCategory === 'overlays' 
                ? 'bg-amber-500/20 text-amber-300 font-semibold' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Overlays
          </button>
          <button
            onClick={() => onSelectCategory('titles')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentCategory === 'titles' 
                ? 'bg-purple-500/20 text-purple-300 font-semibold' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            MOGRTs
          </button>
        </nav>

        {/* Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Creator / Admin Add Button OR Unlock Access Button */}
          {isAdmin ? (
            <button
              onClick={onOpenAddAsset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black shadow-lg shadow-cyan-500/25 transition-transform active:scale-95 animate-pulse"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add Asset</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              title="Creator Access (Add / Manage Assets)"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all hover:scale-102"
            >
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Creator Access</span>
            </button>
          )}

          {/* SFX Soundboard Button */}
          <button
            onClick={onOpenSoundboard}
            title="Instant SFX Audition Soundboard"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold transition-all hover:scale-102"
          >
            <Volume2 className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">SFX Board</span>
          </button>

          {/* Shortcuts Button */}
          <button
            onClick={onOpenShortcuts}
            title="NLE Keyboard Shortcuts Cheat Sheet"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs font-semibold transition-all hover:scale-102"
          >
            <Keyboard className="w-4 h-4 text-cyan-400" />
            <span>Shortcuts</span>
          </button>

          {/* Request Asset Button */}
          <button
            onClick={onOpenRequest}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-200 text-xs font-semibold transition-all hover:scale-102"
          >
            <PlusCircle className="w-4 h-4 text-violet-400" />
            <span>Request</span>
          </button>

          {/* Saved Bag Button */}
          <button
            onClick={onOpenBag}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-violet-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">My Bag</span>
            {savedCount > 0 ? (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-black text-[11px] animate-bounce">
                {savedCount}
              </span>
            ) : (
              <span className="text-violet-200 text-[11px]">0</span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
