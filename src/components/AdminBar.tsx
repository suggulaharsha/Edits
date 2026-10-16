import React, { useRef } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Download, 
  Upload, 
  LogOut, 
  Sparkles, 
  Settings2,
  CheckCircle2
} from 'lucide-react';
import { Asset } from '../types';

interface AdminBarProps {
  onOpenAddModal: () => void;
  onLogout: () => void;
  onExportJson: () => void;
  onImportJson: (assets: Asset[]) => void;
  totalAssetsCount: number;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  onOpenAddModal,
  onLogout,
  onExportJson,
  onImportJson,
  totalAssetsCount,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportJson(parsed);
        } else {
          alert('Invalid JSON file format. Must be an array of assets.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-violet-950/80 border-b border-cyan-500/30 px-4 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left: Status info */}
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-black">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <div>
            <span className="font-extrabold text-cyan-300 tracking-wide uppercase font-mono">
              Vignesh Space // Creator Admin Mode
            </span>
            <span className="text-slate-400 font-mono ml-2 hidden md:inline">
              ({totalAssetsCount} active vault assets)
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Add Asset Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add New Asset</span>
          </button>

          {/* Backup Catalog JSON */}
          <button
            onClick={onExportJson}
            title="Download full catalog backup"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            <Download className="w-3 h-3 text-cyan-400" />
            <span>Export JSON</span>
          </button>

          {/* Restore Catalog JSON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Restore catalog from JSON file"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            <Upload className="w-3 h-3 text-violet-400" />
            <span>Import JSON</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          {/* Exit Admin Mode */}
          <button
            onClick={onLogout}
            title="Lock creator privileges"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Lock Admin</span>
          </button>

        </div>

      </div>
    </div>
  );
};
