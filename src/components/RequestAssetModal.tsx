import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Clock, UploadCloud, MessageSquare } from 'lucide-react';
import { AssetRequest, UserSubmittedAsset } from '../types';
import confetti from 'canvas-confetti';

interface RequestAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted: (req: AssetRequest) => void;
  onAssetSubmitted: (asset: UserSubmittedAsset) => void;
  existingRequests: AssetRequest[];
}

export const RequestAssetModal: React.FC<RequestAssetModalProps> = ({
  isOpen,
  onClose,
  onRequestSubmitted,
  onAssetSubmitted,
  existingRequests,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'request' | 'submit' | 'board'>('request');

  // Request form state
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqTitle, setReqTitle] = useState('');
  const [reqCategory, setReqCategory] = useState('LUTs & Color');
  const [reqSoftware, setReqSoftware] = useState('Premiere Pro');
  const [reqDesc, setReqDesc] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Submit asset link form state
  const [subName, setSubName] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [subCategory, setSubCategory] = useState('LUTs & Color');
  const [subLink, setSubLink] = useState('');
  const [subDesc, setSubDesc] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle.trim()) return;

    const newRequest: AssetRequest = {
      id: `req-${Date.now()}`,
      name: reqName.trim() || 'Anonymous Editor',
      email: reqEmail.trim(),
      assetTitle: reqTitle.trim(),
      category: reqCategory,
      softwareTarget: reqSoftware,
      description: reqDesc.trim(),
      status: 'Received',
      timestamp: Date.now(),
    };

    onRequestSubmitted(newRequest);
    setSubmittedSuccess(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSubmittedSuccess(false);
      setReqTitle('');
      setReqDesc('');
      setMode('board');
    }, 1800);
  };

  const handleAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim() || !subLink.trim()) return;

    const newSubmitted: UserSubmittedAsset = {
      id: `sub-${Date.now()}`,
      title: subTitle.trim(),
      creatorName: subName.trim() || 'Community Creator',
      category: subCategory,
      link: subLink.trim(),
      fileType: 'Curated Link',
      description: subDesc.trim(),
      timestamp: Date.now(),
    };

    onAssetSubmitted(newSubmitted);
    setSubSuccess(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSubSuccess(false);
      setSubTitle('');
      setSubLink('');
      setSubDesc('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0f1118] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Vignesh Space Creator Request Hub
              </h2>
              <p className="text-xs text-slate-400">
                Can't find a specific preset, SFX pack, or plugin? Let Vignesh curate it.
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

        {/* Mode Selector */}
        <div className="p-3 bg-slate-900/50 border-b border-white/5 flex items-center gap-2">
          <button
            onClick={() => setMode('request')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'request'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            Request New Asset
          </button>
          <button
            onClick={() => setMode('submit')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'submit'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            Submit an Asset Link
          </button>
          <button
            onClick={() => setMode('board')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'board'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            Requests Queue ({existingRequests.length})
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {mode === 'request' && (
            <div>
              {submittedSuccess ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Request Dispatched to Vignesh!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    We've added your request to our curation board. When verified, the link will be added to the vault.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Asset Name or Pack You Need *
                    </label>
                    <input
                      type="text"
                      required
                      value={reqTitle}
                      onChange={(e) => setReqTitle(e.target.value)}
                      placeholder="e.g., Davinci Resolve 3D Camera Shake or Film Halation Plugin"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Category
                      </label>
                      <select
                        value={reqCategory}
                        onChange={(e) => setReqCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option>LUTs & Color</option>
                        <option>Sound Effects (SFX)</option>
                        <option>Overlays & Textures</option>
                        <option>Transitions & Presets</option>
                        <option>MOGRTs & Titles</option>
                        <option>3D & VFX</option>
                        <option>Project Files</option>
                        <option>Fonts</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Target Software
                      </label>
                      <select
                        value={reqSoftware}
                        onChange={(e) => setReqSoftware(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option>Premiere Pro</option>
                        <option>After Effects</option>
                        <option>DaVinci Resolve</option>
                        <option>CapCut</option>
                        <option>Final Cut Pro</option>
                        <option>Photoshop</option>
                        <option>Blender</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Details / Reference (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={reqDesc}
                      onChange={(e) => setReqDesc(e.target.value)}
                      placeholder="Describe what kind of vibe, video link, or creator style you're trying to replicate..."
                      className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Editor Handle / Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={reqName}
                        onChange={(e) => setReqName(e.target.value)}
                        placeholder="e.g., Alex / @visualbyalex"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email for Notification (Optional)
                      </label>
                      <input
                        type="email"
                        value={reqEmail}
                        onChange={(e) => setReqEmail(e.target.value)}
                        placeholder="editor@gmail.com"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Asset Request to Vignesh</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {mode === 'submit' && (
            <div>
              {subSuccess ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Asset Link Received!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Thanks for sharing your link with the Vignesh Space community! It will be reviewed for virus safety and listed in the vault.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAssetSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Asset Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                      placeholder="e.g., 20 Free Film Mattes & Borders Pack"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Direct Download Link (Google Drive / Mega / Dropbox) *
                    </label>
                    <input
                      type="url"
                      required
                      value={subLink}
                      onChange={(e) => setSubLink(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/..."
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Category
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option>LUTs & Color</option>
                        <option>Sound Effects (SFX)</option>
                        <option>Overlays & Textures</option>
                        <option>Transitions & Presets</option>
                        <option>MOGRTs & Titles</option>
                        <option>3D & VFX</option>
                        <option>Project Files</option>
                        <option>Fonts</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Creator Credit / Name
                      </label>
                      <input
                        type="text"
                        value={subName}
                        onChange={(e) => setSubName(e.target.value)}
                        placeholder="e.g., Vignesh / Studio FX"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Short Description / What's inside
                    </label>
                    <textarea
                      rows={2}
                      value={subDesc}
                      onChange={(e) => setSubDesc(e.target.value)}
                      placeholder="File formats (.cube, .wav, 4K ProRes) and software compatibility..."
                      className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-extrabold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Submit Asset Link for Verification</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {mode === 'board' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Recent Community Requests:</span>
                <span className="font-mono text-[11px] text-cyan-400">Live Status Tracker</span>
              </div>

              {existingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {req.assetTitle}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      req.status === 'Added to Vault'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : req.status === 'Reviewing'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-violet-500/20 text-violet-300 border-violet-500/40'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                    <span>{req.category}</span>
                    <span>•</span>
                    <span>Target: {req.softwareTarget}</span>
                    <span>•</span>
                    <span>By {req.name}</span>
                  </div>
                  {req.description && (
                    <p className="text-xs text-slate-400 italic">
                      "{req.description}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
