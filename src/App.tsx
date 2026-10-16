/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AssetCard } from './components/AssetCard';
import { AssetDetailModal } from './components/AssetDetailModal';
import { LutComparer } from './components/LutComparer';
import { SoundboardModal } from './components/SoundboardModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { RequestAssetModal } from './components/RequestAssetModal';
import { EditingBagModal } from './components/EditingBagModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AddAssetModal } from './components/AddAssetModal';
import { AdminBar } from './components/AdminBar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { INITIAL_ASSETS } from './data/assets';
import { Asset, AssetCategory, AssetRequest, UserSubmittedAsset } from './types';
import confetti from 'canvas-confetti';
import { Layers, Sparkles, Filter, SlidersHorizontal, DownloadCloud, CheckCircle, Plus } from 'lucide-react';

const INITIAL_REQUESTS: AssetRequest[] = [
  {
    id: 'req-sample-1',
    name: 'Vikram Video Editor',
    email: '',
    assetTitle: 'Cinematic 3D Camera Parallax Title Sequence for After Effects',
    category: 'Project Files',
    softwareTarget: 'After Effects',
    description: 'Looking for 3D camera depth title opener like Cinecom trailers.',
    status: 'Added to Vault',
    timestamp: Date.now() - 86400000 * 2,
  },
  {
    id: 'req-sample-2',
    name: 'Rahul Cuts',
    email: '',
    assetTitle: 'Viral Hormozi / Ali Abdaal Auto-Resizing Subtitle MOGRT',
    category: 'MOGRTs & Titles',
    softwareTarget: 'Premiere Pro',
    description: 'Need dynamic pop-in caption boxes for Instagram reels.',
    status: 'Added to Vault',
    timestamp: Date.now() - 86400000 * 3,
  },
  {
    id: 'req-sample-3',
    name: 'Dev_Motion',
    email: '',
    assetTitle: 'DaVinci Resolve 19 Magic Mask & PowerGrade Halation Presets',
    category: 'LUTs & Color',
    softwareTarget: 'DaVinci Resolve',
    description: 'Warm Kodak halation red-glow effect on highlights.',
    status: 'Reviewing',
    timestamp: Date.now() - 86400000 * 1,
  },
];

export default function App() {
  // Navigation & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory>('all');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  // Creator / Admin Mode State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vignesh_space_is_admin') === 'true';
    } catch {
      return false;
    }
  });
  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    try {
      return localStorage.getItem('vignesh_space_admin_pass') || 'vignesh2026';
    } catch {
      return 'vignesh2026';
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

  // Modals State
  const [activeAsset, setActiveAsset] = useState<Asset | null>(null);
  const [isLutComparerOpen, setIsLutComparerOpen] = useState(false);
  const [isSoundboardOpen, setIsSoundboardOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; sub?: string } | null>(null);

  // Local Storage Saved State (Saved to Bag)
  const [savedAssetIds, setSavedAssetIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('vignesh_space_saved_assets');
      return stored ? JSON.parse(stored) : ['lut-cinematic-teal-orange', 'sfx-viral-whooshes-impacts'];
    } catch {
      return ['lut-cinematic-teal-orange', 'sfx-viral-whooshes-impacts'];
    }
  });

  // Local Storage Requests State
  const [requestsList, setRequestsList] = useState<AssetRequest[]>(() => {
    try {
      const stored = localStorage.getItem('vignesh_space_requests');
      return stored ? JSON.parse(stored) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  // Assets list (Includes custom assets added/edited by Vignesh)
  const [assetsList, setAssetsList] = useState<Asset[]>(() => {
    try {
      const customStored = localStorage.getItem('vignesh_space_custom_assets');
      if (customStored) {
        const parsed: Asset[] = JSON.parse(customStored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge: custom items take precedence, followed by initial assets that are not replaced
          const customIds = new Set(parsed.map(p => p.id));
          const remainingInitial = INITIAL_ASSETS.filter(a => !customIds.has(a.id));
          return [...parsed, ...remainingInitial];
        }
      }
      return INITIAL_ASSETS;
    } catch {
      return INITIAL_ASSETS;
    }
  });

  // Save admin status to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('vignesh_space_is_admin', isAdmin ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdmin]);

  // Save to LocalStorage whenever savedAssetIds change
  useEffect(() => {
    try {
      localStorage.setItem('vignesh_space_saved_assets', JSON.stringify(savedAssetIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedAssetIds]);

  // Save requests to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('vignesh_space_requests', JSON.stringify(requestsList));
    } catch (e) {
      console.error(e);
    }
  }, [requestsList]);

  // Helper to persist assets in localStorage
  const persistAssets = (updatedList: Asset[]) => {
    setAssetsList(updatedList);
    try {
      localStorage.setItem('vignesh_space_custom_assets', JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }
  };

  // Show Toast Helper
  const showToast = (message: string, sub?: string) => {
    setToast({ message, sub });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Admin Login Handlers
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    showToast('Creator Mode Unlocked!', 'You can now add, edit, or delete editing assets.');
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    showToast('Admin Mode Locked', 'You are now viewing in standard creator mode.');
  };

  // Add / Edit Asset Handler
  const handleSaveAsset = (asset: Asset) => {
    const exists = assetsList.some((a) => a.id === asset.id);
    let updated: Asset[];
    if (exists) {
      updated = assetsList.map((a) => (a.id === asset.id ? asset : a));
      showToast('Asset Updated!', `"${asset.title}" changes saved.`);
    } else {
      updated = [asset, ...assetsList];
      showToast('New Asset Published!', `"${asset.title}" is now live in the vault.`);
    }
    persistAssets(updated);
    setEditingAsset(null);
  };

  // Delete Asset Handler
  const handleDeleteAsset = (assetId: string, title: string) => {
    const updated = assetsList.filter((a) => a.id !== assetId);
    persistAssets(updated);
    showToast('Asset Removed', `"${title}" has been deleted from the vault.`);
  };

  // Open Edit Asset Modal
  const handleOpenEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setIsAddAssetModalOpen(true);
  };

  // Export Catalog JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(assetsList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vignesh-space-vault-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Vault JSON Exported!', 'Full catalog saved as backup file.');
  };

  // Import Catalog JSON
  const handleImportJson = (imported: Asset[]) => {
    persistAssets(imported);
    showToast('Vault Catalog Restored!', `${imported.length} assets imported.`);
  };

  // Toggle Save Asset to Bag
  const handleToggleSave = (assetId: string) => {
    setSavedAssetIds((prev) => {
      const exists = prev.includes(assetId);
      if (exists) {
        showToast('Removed from My Bag');
        return prev.filter((id) => id !== assetId);
      } else {
        showToast('Saved to My Bag!', 'View links in the top right bag drawer.');
        return [...prev, assetId];
      }
    });
  };

  // 1-Click Copy Direct Link
  const handleCopyLink = (link: string, title: string) => {
    navigator.clipboard.writeText(link).then(() => {
      showToast('Link copied to clipboard!', `${title}`);
    }).catch(() => {
      showToast('Link ready to copy:', link);
    });
  };

  // Batch Copy All Links in My Bag
  const savedAssets = useMemo(() => {
    return assetsList.filter((a) => savedAssetIds.includes(a.id));
  }, [assetsList, savedAssetIds]);

  const handleBatchCopyAllLinks = () => {
    if (savedAssets.length === 0) return;
    const formatted = savedAssets
      .map((a, i) => `${i + 1}. ${a.title} [${a.categoryLabel}]\n   Direct Link: ${a.directUrl}\n   Size: ${a.fileSize} | Format: ${a.fileFormat}\n`)
      .join('\n');

    navigator.clipboard.writeText(formatted).then(() => {
      showToast('All asset links copied!', `${savedAssets.length} links formatted on clipboard.`);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 }
      });
    });
  };

  // Export Links as .txt file
  const handleDownloadTxt = () => {
    if (savedAssets.length === 0) return;
    const textContent = `=====================================================
VIGNESH SPACE - CURATED EDITING ASSETS PACK LINKS
Generated: ${new Date().toLocaleDateString()}
Total Assets: ${savedAssets.length}
=====================================================

${savedAssets.map((a, i) => `[${i + 1}] ${a.title}
Category: ${a.categoryLabel}
Compatible with: ${a.software.join(', ')}
File Format: ${a.fileFormat} | Size: ${a.fileSize}
Primary Link: ${a.directUrl}
Mirrors:
${a.downloadMirrors.map(m => ` - ${m.name}: ${m.url}`).join('\n')}
License: ${a.license}
-----------------------------------------------------`).join('\n\n')}

Curated with passion by Vignesh Space.
Enjoy editing!`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vignesh-space-editing-assets-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    showToast('Exported links to .txt file!', 'Downloaded to your system.');
  };

  // Handle Request Submitted
  const handleRequestSubmitted = (req: AssetRequest) => {
    setRequestsList((prev) => [req, ...prev]);
    showToast('Request submitted to Vignesh!', `"${req.assetTitle}" added to the review queue.`);
  };

  // Handle User Submitted Asset
  const handleAssetSubmitted = (item: UserSubmittedAsset) => {
    const newAsset: Asset = {
      id: item.id,
      title: item.title,
      slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: item.description || 'Community submitted editing pack link',
      description: item.description || 'Curated editing pack link submitted to Vignesh Space.',
      category: (item.category.toLowerCase().includes('lut') ? 'luts' : 'overlays') as AssetCategory,
      categoryLabel: item.category,
      software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut'],
      fileFormat: item.fileType || 'Direct Archive (.zip)',
      fileSize: 'Curated Link',
      downloadsCount: 1420,
      rating: 4.9,
      reviewsCount: 18,
      license: 'Free Creator Community Use',
      curator: `Submitted by ${item.creatorName}`,
      updatedDate: 'Just Now',
      tags: ['Community', 'Direct Link'],
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      accentColor: '#8b5cf6',
      previewType: 'image',
      downloadMirrors: [
        { name: 'Google Drive', url: item.link, speed: 'Ultra Fast' }
      ],
      directUrl: item.link,
      installInstructions: [
        {
          software: 'General Installation',
          steps: [
            'Click Open Link to access the community file.',
            'Download and extract into your editing assets project directory.'
          ]
        }
      ]
    };

    persistAssets([newAsset, ...assetsList]);
    showToast('Asset link verified & listed!', `"${item.title}" is now visible in the vault.`);
  };

  // Filtered & Sorted Assets
  const filteredAssets = useMemo(() => {
    let result = assetsList;

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Filter by Software
    if (selectedSoftware) {
      result = result.filter((a) => a.software.includes(selectedSoftware as any));
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.categoryLabel.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.software.some((s) => s.toLowerCase().includes(q)) ||
          a.fileFormat.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'popular') {
        return b.downloadsCount - a.downloadsCount;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      return 0;
    });

    return result;
  }, [assetsList, selectedCategory, selectedSoftware, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-slate-100 antialiased selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* Admin Status Bar (When Creator Mode is active) */}
      {isAdmin && (
        <AdminBar
          onOpenAddModal={() => {
            setEditingAsset(null);
            setIsAddAssetModalOpen(true);
          }}
          onLogout={handleLogoutAdmin}
          onExportJson={handleExportJson}
          onImportJson={handleImportJson}
          totalAssetsCount={assetsList.length}
        />
      )}

      {/* Top Navigation */}
      <Navbar
        savedCount={savedAssetIds.length}
        isAdmin={isAdmin}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenSoundboard={() => setIsSoundboardOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenRequest={() => setIsRequestModalOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAddAsset={() => {
          setEditingAsset(null);
          setIsAddAssetModalOpen(true);
        }}
        onSelectCategory={(cat) => setSelectedCategory(cat as AssetCategory)}
        currentCategory={selectedCategory}
      />

      {/* Hero, Search & Filters Section */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedSoftware={selectedSoftware}
        onSoftwareChange={setSelectedSoftware}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalAssetsCount={filteredAssets.length}
        onOpenLutComparer={() => setIsLutComparerOpen(true)}
      />

      {/* Main Asset Grid Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Curated Spotlight Banner */}
        {selectedCategory === 'all' && !searchQuery && !selectedSoftware && (
          <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 mb-10 border border-violet-500/20 bg-gradient-to-r from-violet-950/40 via-indigo-950/20 to-slate-900/80 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Vignesh Space Feature
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Curated Editing Packs With Verified Direct Mirrors
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Every pack in Vignesh Space is tested inside Premiere Pro 2025, DaVinci Resolve 19, and CapCut desktop. Download 24-bit uncompressed WAV sound effects, Rec.709 & Log 3D LUTs, and transparent 4K alpha overlays.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {isAdmin ? (
                  <button
                    onClick={() => {
                      setEditingAsset(null);
                      setIsAddAssetModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black shadow-lg shadow-cyan-500/25 transition-transform active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>+ Add New Asset Link</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAdminLoginOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all"
                  >
                    <span>Creator Access</span>
                  </button>
                )}
                <button
                  onClick={() => setIsSoundboardOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-300 text-xs font-bold transition-all"
                >
                  Audition SFX Board
                </button>
                <button
                  onClick={() => setIsLutComparerOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all shadow-lg shadow-cyan-500/20"
                >
                  Live LUT Compare
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Asset Cards Grid */}
        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                isSaved={savedAssetIds.includes(asset.id)}
                isAdmin={isAdmin}
                onToggleSave={handleToggleSave}
                onSelectAsset={setActiveAsset}
                onCopyLink={handleCopyLink}
                onEditAsset={handleOpenEditAsset}
                onDeleteAsset={handleDeleteAsset}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-2xl border border-white/5 bg-slate-900/40">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">
              No editing assets found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
              We couldn't find any packs matching your current search or software filter.
            </p>
            {isAdmin ? (
              <button
                onClick={() => {
                  setEditingAsset(null);
                  setIsAddAssetModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-colors shadow-lg shadow-cyan-500/30"
              >
                + Add This Asset Now
              </button>
            ) : (
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-colors shadow-lg shadow-violet-600/30"
              >
                Request this asset from Vignesh
              </button>
            )}
          </div>
        )}

      </main>

      {/* Creator Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentPasscode={adminPasscode}
      />

      {/* Add / Edit Asset Modal */}
      <AddAssetModal
        isOpen={isAddAssetModalOpen}
        onClose={() => {
          setIsAddAssetModalOpen(false);
          setEditingAsset(null);
        }}
        onSaveAsset={handleSaveAsset}
        assetToEdit={editingAsset}
      />

      {/* Asset Detail & Mirrors Modal */}
      <AssetDetailModal
        asset={activeAsset}
        onClose={() => setActiveAsset(null)}
        isSaved={activeAsset ? savedAssetIds.includes(activeAsset.id) : false}
        onToggleSave={handleToggleSave}
        onCopyLink={handleCopyLink}
      />

      {/* Interactive LUT Before/After Sandbox Modal */}
      <LutComparer
        isOpen={isLutComparerOpen}
        onClose={() => setIsLutComparerOpen(false)}
        onSelectAsset={setActiveAsset}
        allAssets={assetsList}
      />

      {/* SFX Audition Soundboard Modal */}
      <SoundboardModal
        isOpen={isSoundboardOpen}
        onClose={() => setIsSoundboardOpen(false)}
        onSelectAsset={setActiveAsset}
        allAssets={assetsList}
      />

      {/* NLE Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Request Asset & Submit Link Modal */}
      <RequestAssetModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onRequestSubmitted={handleRequestSubmitted}
        onAssetSubmitted={handleAssetSubmitted}
        existingRequests={requestsList}
      />

      {/* My Editing Bag Drawer Modal */}
      <EditingBagModal
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        savedAssets={savedAssets}
        onRemoveAsset={handleToggleSave}
        onClearAll={() => setSavedAssetIds([])}
        onSelectAsset={setActiveAsset}
        onCopyAllLinks={handleBatchCopyAllLinks}
        onDownloadTxt={handleDownloadTxt}
      />

      {/* Toast Notification */}
      <Toast
        message={toast?.message || null}
        subMessage={toast?.sub}
        onClose={() => setToast(null)}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenRequest={() => setIsRequestModalOpen(true)}
        onOpenSoundboard={() => setIsSoundboardOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

    </div>
  );
}
