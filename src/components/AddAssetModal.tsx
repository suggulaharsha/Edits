import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Sparkles, 
  HardDrive, 
  Layers, 
  Check, 
  ShieldCheck,
  Eye
} from 'lucide-react';
import { Asset, AssetCategory, DownloadMirror, SoftwareTool } from '../types';
import { ASSET_CATEGORIES, SOFTWARE_OPTIONS } from '../data/assets';
import confetti from 'canvas-confetti';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAsset: (asset: Asset) => void;
  assetToEdit?: Asset | null;
}

const PRESET_THUMBNAILS = [
  { label: 'Cinematic Blue/Teal', url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cyberpunk Neon', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Film Grain / Vintage', url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sound / Waveform', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80' },
  { label: '3D Chrome Liquid', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
  { label: 'Kinetic Captions', url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80' },
  { label: 'Speed Ramp / Camera', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fire / Explosion VFX', url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80' },
];

export const AddAssetModal: React.FC<AddAssetModalProps> = ({
  isOpen,
  onClose,
  onSaveAsset,
  assetToEdit,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(assetToEdit);

  // Form Fields
  const [title, setTitle] = useState(assetToEdit?.title || '');
  const [tagline, setTagline] = useState(assetToEdit?.tagline || '');
  const [description, setDescription] = useState(assetToEdit?.description || '');
  const [category, setCategory] = useState<AssetCategory>(assetToEdit?.category || 'luts');
  const [software, setSoftware] = useState<SoftwareTool[]>(
    assetToEdit?.software || ['Premiere Pro', 'DaVinci Resolve', 'CapCut']
  );
  const [fileFormat, setFileFormat] = useState(assetToEdit?.fileFormat || '.CUBE 3D LUT');
  const [fileSize, setFileSize] = useState(assetToEdit?.fileSize || '65 MB');
  const [itemsCount, setItemsCount] = useState(assetToEdit?.itemsCount || '12 Items');
  const [resolution, setResolution] = useState(assetToEdit?.resolution || '4K UHD');
  const [license, setLicense] = useState(assetToEdit?.license || 'Free Commercial & Personal Use');
  const [thumbnail, setThumbnail] = useState(
    assetToEdit?.thumbnail || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'
  );

  // Direct Links & Mirrors
  const [primaryUrl, setPrimaryUrl] = useState(assetToEdit?.directUrl || '');
  const [mirror2Url, setMirror2Url] = useState(assetToEdit?.downloadMirrors[1]?.url || '');
  const [mirror3Url, setMirror3Url] = useState(assetToEdit?.downloadMirrors[2]?.url || '');

  // SFX and LUT specifics
  const [sfxType, setSfxType] = useState<'whoosh' | 'impact' | 'cash' | 'glitch' | 'subdrop' | 'camera' | 'click' | 'anime'>(
    assetToEdit?.sfxSoundType || 'whoosh'
  );
  const [beforeImage, setBeforeImage] = useState(
    assetToEdit?.lutPreview?.beforeImage || 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80'
  );
  const [afterImage, setAfterImage] = useState(
    assetToEdit?.lutPreview?.afterImage || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  );

  // Badges
  const [featured, setFeatured] = useState<boolean>(Boolean(assetToEdit?.featured));
  const [trending, setTrending] = useState<boolean>(assetToEdit?.trending !== undefined ? assetToEdit.trending : true);
  const [isNew, setIsNew] = useState<boolean>(assetToEdit?.isNew !== undefined ? assetToEdit.isNew : true);

  // Install steps
  const [installStepsText, setInstallStepsText] = useState(
    assetToEdit?.installInstructions[0]?.steps.join('\n') ||
    '1. Download the archive from the direct link.\n2. Extract the files to your video assets folder.\n3. Import directly into your timeline or presets panel.'
  );

  const toggleSoftware = (sw: SoftwareTool) => {
    setSoftware((prev) => 
      prev.includes(sw) ? prev.filter((s) => s !== sw) : [...prev, sw]
    );
  };

  const inferMirrorName = (url: string, index: number): 'Google Drive' | 'Mega.nz' | 'MediaFire' | 'Direct Fast Link' | 'Dropbox' => {
    const low = url.toLowerCase();
    if (low.includes('drive.google.com')) return 'Google Drive';
    if (low.includes('mega.nz')) return 'Mega.nz';
    if (low.includes('mediafire.com')) return 'MediaFire';
    if (low.includes('dropbox.com')) return 'Dropbox';
    return index === 0 ? 'Google Drive' : 'Direct Fast Link';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !primaryUrl.trim()) return;

    const selectedCatObj = ASSET_CATEGORIES.find((c) => c.id === category);

    // Build mirrors
    const mirrors: DownloadMirror[] = [
      {
        name: inferMirrorName(primaryUrl, 0),
        url: primaryUrl.trim(),
        speed: 'Ultra Fast',
      }
    ];

    if (mirror2Url.trim()) {
      mirrors.push({
        name: inferMirrorName(mirror2Url, 1),
        url: mirror2Url.trim(),
        speed: 'Ultra Fast',
      });
    }

    if (mirror3Url.trim()) {
      mirrors.push({
        name: inferMirrorName(mirror3Url, 2),
        url: mirror3Url.trim(),
        speed: 'Fast',
      });
    }

    const stepsArray = installStepsText
      .split('\n')
      .map((s) => s.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter((s) => s.length > 0);

    const assetData: Asset = {
      id: assetToEdit?.id || `asset-${Date.now()}`,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: tagline.trim() || `${title} curated for professional editors`,
      description: description.trim() || tagline.trim(),
      category: category,
      categoryLabel: selectedCatObj ? selectedCatObj.label : 'Editing Vault',
      software: software.length > 0 ? software : ['Premiere Pro', 'DaVinci Resolve'],
      fileFormat: fileFormat.trim(),
      fileSize: fileSize.trim(),
      itemsCount: itemsCount.trim(),
      resolution: resolution.trim(),
      downloadsCount: assetToEdit?.downloadsCount || Math.floor(Math.random() * 8000) + 1200,
      rating: assetToEdit?.rating || 4.95,
      reviewsCount: assetToEdit?.reviewsCount || 42,
      license: license.trim(),
      curator: 'Curated by Vignesh',
      updatedDate: 'Added Just Now',
      featured,
      trending,
      isNew,
      tags: [category, ...software, 'Vignesh Space'],
      thumbnail: thumbnail.trim(),
      accentColor: '#06b6d4',
      previewType: category === 'luts' ? 'lut_compare' : category === 'sfx' ? 'audio' : 'image',
      sfxSoundType: category === 'sfx' ? sfxType : undefined,
      lutPreview: category === 'luts' ? {
        beforeImage: beforeImage.trim(),
        afterImage: afterImage.trim(),
        description: 'Vignesh Space Color Grade Preview'
      } : undefined,
      downloadMirrors: mirrors,
      directUrl: primaryUrl.trim(),
      installInstructions: [
        {
          software: software[0] || 'General Installation',
          steps: stepsArray.length > 0 ? stepsArray : [
            'Download and unpack the ZIP file.',
            'Apply into your editing software timeline.'
          ]
        }
      ]
    };

    onSaveAsset(assetData);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0f1118] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20">
              <Plus className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {isEditing ? 'Edit Asset in Vault' : 'Add New Editing Asset Link'}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-mono">
                  Vignesh Studio
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Publish direct download links for your editing community
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
              <span>01 // Asset Information</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Asset Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Hollywood 35mm Film Grain & Halation Overlays"
                className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Short Tagline / Hook *
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g., Real Kodak 500T 4K scan in ProRes 422 60FPS"
                className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AssetCategory)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="luts">LUTs & Color Grades</option>
                  <option value="sfx">Sound Effects (SFX)</option>
                  <option value="overlays">Overlays & Textures</option>
                  <option value="transitions">Transitions & Presets</option>
                  <option value="titles">MOGRTs & Kinetic Titles</option>
                  <option value="3d-vfx">3D Elements & VFX</option>
                  <option value="project-files">Project Files (.prproj/.aep)</option>
                  <option value="fonts">Creator Display Fonts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  File Format *
                </label>
                <input
                  type="text"
                  required
                  value={fileFormat}
                  onChange={(e) => setFileFormat(e.target.value)}
                  placeholder="e.g., .CUBE / .WAV 24-bit / .MOGRT"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Give details about how to use, color profiles, sample rates, etc."
                className="w-full px-3.5 py-2 bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Section 2: Download Mirrors */}
          <div className="space-y-4 pt-3 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
              <span>02 // Direct Download Links (Mirrors)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Direct Download Link (Google Drive / Mega / Dropbox) *
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={primaryUrl}
                  onChange={(e) => setPrimaryUrl(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 font-mono"
                />
                <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Backup Mirror 2 (Mega / MediaFire - Optional)
                </label>
                <input
                  type="url"
                  value={mirror2Url}
                  onChange={(e) => setMirror2Url(e.target.value)}
                  placeholder="https://mega.nz/folder/..."
                  className="w-full px-3.5 py-2 bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Backup Mirror 3 (Direct Link - Optional)
                </label>
                <input
                  type="url"
                  value={mirror3Url}
                  onChange={(e) => setMirror3Url(e.target.value)}
                  placeholder="https://mediafire.com/folder/..."
                  className="w-full px-3.5 py-2 bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Software Compatibility */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              03 // Compatible Software (Select All That Apply)
            </h3>
            <div className="flex flex-wrap gap-2">
              {SOFTWARE_OPTIONS.map((sw) => {
                const isSelected = software.includes(sw);
                return (
                  <button
                    type="button"
                    key={sw}
                    onClick={() => toggleSoftware(sw)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    <span>{sw}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Specs & Thumbnail */}
          <div className="space-y-4 pt-3 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              04 // File Specs & Cover Artwork
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  File Size *
                </label>
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  placeholder="e.g. 140 MB"
                  className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Items Count
                </label>
                <input
                  type="text"
                  value={itemsCount}
                  onChange={(e) => setItemsCount(e.target.value)}
                  placeholder="e.g. 24 LUTs"
                  className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Resolution / Quality
                </label>
                <input
                  type="text"
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  placeholder="e.g. 4K UHD 60FPS"
                  className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 font-mono mb-2"
              />

              {/* 1-Click Preset Cover Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">Quick presets:</span>
                {PRESET_THUMBNAILS.map((p) => (
                  <button
                    type="button"
                    key={p.label}
                    onClick={() => setThumbnail(p.url)}
                    className="flex-shrink-0 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] text-slate-300 border border-white/5"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Preview Types */}
            {category === 'sfx' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Sound Effect Preview Sound Type
                </label>
                <select
                  value={sfxType}
                  onChange={(e) => setSfxType(e.target.value as any)}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="whoosh">Whoosh (Transition swish)</option>
                  <option value="impact">Impact (Deep sub boom punch)</option>
                  <option value="cash">Cash (Ka-ching money chime)</option>
                  <option value="glitch">Glitch (Digital static burst)</option>
                  <option value="subdrop">Sub Drop (Low 30Hz bass sweep)</option>
                  <option value="camera">Camera (SLR Shutter click)</option>
                  <option value="click">Click (Tactile mouse click)</option>
                  <option value="anime">Anime (Shonen sword spark ping)</option>
                </select>
              </div>
            )}

            {category === 'luts' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Before Image (Flat Log)
                  </label>
                  <input
                    type="url"
                    value={beforeImage}
                    onChange={(e) => setBeforeImage(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-white/10 rounded-lg text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    After Image (Color Graded)
                  </label>
                  <input
                    type="url"
                    value={afterImage}
                    onChange={(e) => setAfterImage(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-white/10 rounded-lg text-white text-xs font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Install Instructions */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              05 // Step-by-Step Installation Instructions
            </h3>
            <textarea
              rows={3}
              value={installStepsText}
              onChange={(e) => setInstallStepsText(e.target.value)}
              placeholder="Enter one step per line..."
              className="w-full px-3.5 py-2 bg-slate-900 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          {/* Section 6: Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/10 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded border-white/20 text-cyan-500 focus:ring-0"
              />
              <span>Mark as Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
              <input
                type="checkbox"
                checked={trending}
                onChange={(e) => setTrending(e.target.checked)}
                className="rounded border-white/20 text-cyan-500 focus:ring-0"
              />
              <span>Mark as Trending</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="rounded border-white/20 text-cyan-500 focus:ring-0"
              />
              <span>Mark as New</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black shadow-lg shadow-cyan-500/20 transition-transform active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Publish Asset to Vault'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
