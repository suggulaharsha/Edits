import React from 'react';
import { CheckCircle2, Copy, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  subMessage?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, subMessage, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 bg-slate-900/95 border border-cyan-500/30 text-white rounded-2xl shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300 max-w-sm">
      <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
        <CheckCircle2 className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h5 className="text-xs font-bold text-white leading-tight">
          {message}
        </h5>
        {subMessage && (
          <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
            {subMessage}
          </p>
        )}
      </div>

      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
