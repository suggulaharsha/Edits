import React from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  CheckCircle2, 
  SlidersHorizontal, 
  DownloadCloud, 
  Zap, 
  ShieldCheck, 
  Filter
} from 'lucide-react';
import { ASSET_CATEGORIES, SOFTWARE_OPTIONS } from '../data/assets';
import { AssetCategory, SoftwareTool } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: AssetCategory;
  onCategoryChange: (cat: AssetCategory) => void;
  selectedSoftware: string;
  onSoftwareChange: (sw: string) => void;
  sortBy: 'popular' | 'rating' | 'newest';
  onSortChange: (sort: 'popular' | 'rating' | 'newest') => void;
  totalAssetsCount: number;
  onOpenLutComparer: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSoftware,
  onSoftwareChange,
  sortBy,
  onSortChange,
  totalAssetsCount,
  onOpenLutComparer,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 border-b border-white/5">
      {/* Background ambient neon glow lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Curator Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>VIGNESH SPACE // CURATED EDITING ARCHIVE</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              100% Verified Safe Links
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Zero Adfly / Instant Downloads
            </span>
          </div>
        </div>

        {/* Main Title & Tagline */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
            Direct Links To High-Impact{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Editing Assets.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Welcome to <span className="text-cyan-300 font-semibold">vignesh space</span>. No dead links, no ad-shorteners, and no subscription traps. Download hand-tested cinematic LUTs, punchy viral sound effects, 4K film textures, and project templates for Premiere Pro, After Effects, DaVinci Resolve, and CapCut.
          </p>
        </div>

        {/* Interactive Highlight Bar: Feature Links & LUT Previewer button */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={onOpenLutComparer}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all shadow-lg shadow-cyan-500/10 group"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>Open Interactive LUT Split Visualizer</span>
            <span className="text-[10px] bg-cyan-400/20 text-cyan-200 px-1.5 py-0.5 rounded font-mono">
              Live Before/After
            </span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-3 py-2 rounded-xl">
            <span className="font-semibold text-slate-200">Mirrors available:</span>
            <span className="text-violet-300">Google Drive</span>
            <span>•</span>
            <span className="text-cyan-300">Mega.nz</span>
            <span>•</span>
            <span className="text-amber-300">MediaFire</span>
          </div>
        </div>

        {/* Global Search & Filters Bar */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search LUTs, Whooshes, Film Grain, CapCut velocity, MOGRTs, Fonts..."
                className="w-full pl-12 pr-10 py-3.5 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Software Filter Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-auto min-w-[170px]">
                <select
                  value={selectedSoftware}
                  onChange={(e) => onSoftwareChange(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-3.5 bg-slate-950/70 border border-white/10 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="">All Software Tools</option>
                  {SOFTWARE_OPTIONS.map((sw) => (
                    <option key={sw} value={sw}>{sw}</option>
                  ))}
                </select>
                <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Sort By Dropdown */}
              <div className="relative w-full sm:w-auto min-w-[160px]">
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value as 'popular' | 'rating' | 'newest')}
                  className="w-full appearance-none pl-4 pr-10 py-3.5 bg-slate-950/70 border border-white/10 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="popular">Most Downloaded</option>
                  <option value="rating">Highest Rated (4.9+)</option>
                  <option value="newest">Recently Updated</option>
                </select>
                <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Quick Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-2 border-t border-white/5 scrollbar-none pb-1">
            <span className="text-xs text-slate-400 font-mono flex-shrink-0 pr-1">Category:</span>
            {ASSET_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id as AssetCategory)}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <p>
            Showing <span className="text-white font-bold">{totalAssetsCount}</span> verified asset packs
            {selectedSoftware && <span> for <span className="text-cyan-400 font-semibold">{selectedSoftware}</span></span>}
            {searchQuery && <span> matching "<span className="text-violet-300 font-semibold">{searchQuery}</span>"</span>}
          </p>
          {(searchQuery || selectedSoftware || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                onSearchChange('');
                onSoftwareChange('');
                onCategoryChange('all');
              }}
              className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              Reset all filters
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
