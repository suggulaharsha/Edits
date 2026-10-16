import React, { useState } from 'react';
import { X, Keyboard, Search } from 'lucide-react';
import { EDITING_SHORTCUTS } from '../data/assets';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeSoftwareIndex, setActiveSoftwareIndex] = useState(0);
  const [filterQuery, setFilterQuery] = useState('');

  const currentSoftware = EDITING_SHORTCUTS[activeSoftwareIndex];
  const filteredShortcuts = currentSoftware.shortcuts.filter(s => 
    s.label.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.keys.some(k => k.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0f1118] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                NLE Video Editing Speed Shortcuts
              </h2>
              <p className="text-xs text-slate-400">
                Master rapid cutting, keyframe animation & ripple trimming
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

        {/* Software Selector Tabs */}
        <div className="p-4 bg-slate-900/50 border-b border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {EDITING_SHORTCUTS.map((item, idx) => (
              <button
                key={item.software}
                onClick={() => setActiveSoftwareIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeSoftwareIndex === idx
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {item.software}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search shortcut..."
              className="pl-8 pr-3 py-1.5 bg-slate-950/80 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-full sm:w-48"
            />
          </div>
        </div>

        {/* Shortcuts List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5">
          {filteredShortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-colors gap-3"
            >
              <span className="text-xs sm:text-sm text-slate-200 font-medium">
                {sc.label}
              </span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {sc.keys.map((k, kIdx) => (
                  <span
                    key={kIdx}
                    className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-xs font-bold shadow-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {filteredShortcuts.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-400">
              No shortcuts found matching "{filterQuery}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
