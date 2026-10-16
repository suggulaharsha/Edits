import React from 'react';
import { Layers, ShieldCheck, Heart, Sparkles, ExternalLink, ArrowUp } from 'lucide-react';
import { ASSET_CATEGORIES } from '../data/assets';
import { AssetCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: AssetCategory) => void;
  onOpenRequest: () => void;
  onOpenSoundboard: () => void;
  onOpenShortcuts: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenRequest,
  onOpenSoundboard,
  onOpenShortcuts,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#08090d] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 shadow-md">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                vignesh space
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              The premier curated editing vault. Providing direct, high-speed download links to cinematic LUTs, viral sound effects, 4K overlays, kinetic MOGRTs, and project files.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Virus-Checked & Direct</span>
            </div>
          </div>

          {/* Quick Category Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Assets Categories
            </h4>
            <ul className="space-y-2">
              {ASSET_CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id as AssetCategory);
                      scrollToTop();
                    }}
                    className="hover:text-cyan-300 transition-colors"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Creator Hub */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Creator Arsenal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenSoundboard}
                  className="hover:text-pink-300 transition-colors text-left"
                >
                  SFX Audition Soundboard
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenShortcuts}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  NLE Speed Shortcuts Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRequest}
                  className="hover:text-violet-300 transition-colors text-left"
                >
                  Request Editing Asset
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRequest}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  Submit an Asset Link
                </button>
              </li>
            </ul>
          </div>

          {/* Host & Mirror Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Speed Mirror Network
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              All links are stored across distributed high-speed cloud drives: Google Drive, Mega.nz, and MediaFire with zero link shorteners or captchas.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1 text-[11px] font-mono">
              <span className="text-cyan-400 block">• Google Drive: Max ISP Speed</span>
              <span className="text-violet-400 block">• Mega.nz: Global CDN</span>
              <span className="text-amber-400 block">• Direct Cloud: SSL Encrypted</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-300">vignesh space</strong>. Built for editors & creators.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs transition-colors border border-white/5"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
