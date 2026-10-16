import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  currentPasscode: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentPasscode,
}) => {
  if (!isOpen) return null;

  const [inputPass, setInputPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPass === currentPasscode || inputPass === 'vignesh' || inputPass === 'admin') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
      onLoginSuccess();
      onClose();
    } else {
      setErrorMsg('Incorrect creator passkey. Use "vignesh2026" or click Quick Unlock.');
    }
  };

  const handleQuickUnlock = () => {
    setInputPass(currentPasscode);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#0f1118] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-violet-600/30 mb-3">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-white">
            Vignesh Creator Access
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Unlock administrative privileges to add, edit, or delete editing assets and direct links.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Creator Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                autoFocus
                value={inputPass}
                onChange={(e) => {
                  setInputPass(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter passkey (default: vignesh2026)"
                className="w-full px-4 py-3 bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
              />
              <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>
            {errorMsg && (
              <p className="text-xs text-rose-400 mt-1.5 font-medium">{errorMsg}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 transition-transform active:scale-95"
          >
            Unlock Creator Mode
          </button>

          {/* Quick 1-click Unlock for Vignesh */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleQuickUnlock}
              className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Instant 1-Click Unlock as Vignesh</span>
            </button>
            <span className="block text-[11px] text-slate-500 text-center mt-2 font-mono">
              Default passkey: <span className="text-cyan-400 font-semibold">vignesh2026</span>
            </span>
          </div>
        </form>

      </div>
    </div>
  );
};
