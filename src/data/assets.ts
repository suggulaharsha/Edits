import { Asset } from '../types';

export const ASSET_CATEGORIES = [
  { id: 'all', label: 'All Vault Assets', count: '180+' },
  { id: 'luts', label: 'LUTs & Color Grades', count: '32' },
  { id: 'sfx', label: 'Sound Effects (SFX)', count: '45' },
  { id: 'overlays', label: 'Overlays & Textures', count: '28' },
  { id: 'transitions', label: 'Transitions & Presets', count: '24' },
  { id: 'titles', label: 'MOGRTs & Kinetic Titles', count: '20' },
  { id: '3d-vfx', label: '3D Elements & VFX', count: '16' },
  { id: 'project-files', label: 'Project Files (.prproj/.aep)', count: '12' },
  { id: 'fonts', label: 'Creator Display Fonts', count: '14' },
] as const;

export const SOFTWARE_OPTIONS = [
  'Premiere Pro',
  'After Effects',
  'DaVinci Resolve',
  'CapCut',
  'Final Cut Pro',
  'Photoshop',
  'Blender',
] as const;

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'lut-cinematic-teal-orange',
    title: 'Cinematic Teal & Orange Master 2025',
    slug: 'cinematic-teal-orange-master-2025',
    tagline: 'Hollywood blockbuster Hollywood skin tone & teal shadow grading',
    description: 'The definitive color grade pack calibrated for Rec.709, Sony S-Log3, Canon C-Log, and iPhone ProRes Log. Preserves natural melanin and skin tones while punching complementary teal shadows and cinematic film density.',
    category: 'luts',
    categoryLabel: 'LUTs & Color',
    software: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro', 'CapCut'],
    fileFormat: '.CUBE (33x33x33 & 65x65x65)',
    fileSize: '48 MB',
    itemsCount: '16 LUT Variations',
    resolution: '4K / 8K Cinema Ready',
    downloadsCount: 38420,
    rating: 4.96,
    reviewsCount: 428,
    license: 'Free Commercial & Personal Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    featured: true,
    trending: true,
    tags: ['LUT', 'Color Grading', 'Hollywood', 'Teal Orange', 'Cinematic', 'S-Log3', 'Rec709'],
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    accentColor: '#06b6d4',
    previewType: 'lut_compare',
    lutPreview: {
      beforeImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      description: 'Side-by-side contrast & color saturation lift with preserved skin tones.'
    },
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-space-cinematic-teal-orange-pack', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-teal-orange-2025', speed: 'Ultra Fast' },
      { name: 'MediaFire', url: 'https://www.mediafire.com/folder/vignesh_cinematic_luts_2025', speed: 'Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-space-cinematic-teal-orange-pack',
    installInstructions: [
      {
        software: 'Premiere Pro',
        steps: [
          'Open Premiere Pro and go to the Lumetri Color panel.',
          'In the Creative tab, click the Look dropdown and choose "Browse...".',
          'Select any .cube file from this pack or copy them to Premiere Pro\'s LUTs/Creative folder.'
        ]
      },
      {
        software: 'DaVinci Resolve',
        steps: [
          'Go to Project Settings (bottom right cog icon) -> Color Management.',
          'Click "Open LUT Folder" and paste the unpacked folder.',
          'Click "Update Lists" and right click your clip node to apply!'
        ]
      },
      {
        software: 'CapCut (Desktop / Mobile)',
        steps: [
          'Go to the Adjust tab -> LUT button.',
          'Click Import, navigate to your extracted .cube files, and set intensity between 60%-85%.'
        ]
      }
    ]
  },
  {
    id: 'sfx-viral-whooshes-impacts',
    title: 'Ultimate Viral Whooshes & Cinematic Impacts Vol. 3',
    slug: 'ultimate-viral-whooshes-impacts-vol-3',
    tagline: '120+ Studio mastered 24-bit WAV swishes, whip zooms, and deep sub-booms',
    description: 'The exact sound library used across high-retention YouTube tech videos, travel reels, and Netflix-style teasers. Mastered with zero clipping, wide stereo imaging, and deep 30Hz sub rumble.',
    category: 'sfx',
    categoryLabel: 'Sound Effects (SFX)',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Final Cut Pro'],
    fileFormat: '24-bit 48kHz WAV + MP3',
    fileSize: '210 MB',
    itemsCount: '128 Audio Files',
    downloadsCount: 52190,
    rating: 4.98,
    reviewsCount: 712,
    license: 'Royalty-Free Commercial Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    featured: true,
    trending: true,
    tags: ['SFX', 'Whoosh', 'Impact', 'Transition Sound', 'Sub Bass', 'Cinema', 'Sound Design'],
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    accentColor: '#ec4899',
    previewType: 'audio',
    sfxSoundType: 'whoosh',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-viral-whooshes-vol3', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-whooshes-impacts-sfx', speed: 'Ultra Fast' },
      { name: 'Direct Fast Link', url: 'https://vignesh-space.storage.assets/whooshes-vol3.zip', speed: 'Ultra Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-viral-whooshes-vol3',
    installInstructions: [
      {
        software: 'Universal Audio Placement',
        steps: [
          'Unzip the archive to your persistent Editing Assets drive.',
          'Import into your project or link to Premiere Pro\'s Essential Sound or DaVinci Fairlight sound library.',
          'Align the apex (highest peak) of the whoosh with the cut point between two clips for maximum impact.'
        ]
      }
    ]
  },
  {
    id: 'overlay-4k-film-grain-prores',
    title: '4K Kodak 16mm & 35mm Real Film Grain Overlays',
    slug: '4k-kodak-film-grain-overlays',
    tagline: 'Scanned from actual vintage celluloid film stocks in ProRes 422 60FPS',
    description: 'Give digital sensor footage the timeless organic grit of 16mm Kodak 500T and 35mm 250D. Seamlessly loops with no jitter artifacts. Simply set blend mode to "Overlay" or "Soft Light" in your NLE timeline.',
    category: 'overlays',
    categoryLabel: 'Overlays & Textures',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Final Cut Pro', 'Photoshop'],
    fileFormat: 'Apple ProRes 422 HQ / MP4 (Alpha ready)',
    fileSize: '1.4 GB',
    itemsCount: '12 Seamless Loops',
    resolution: '3840 x 2160 (4K UHD 60FPS)',
    downloadsCount: 41200,
    rating: 4.94,
    reviewsCount: 395,
    license: 'Free Commercial Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    featured: true,
    tags: ['Film Grain', '16mm', '35mm', 'Vintage', 'Overlay', 'ProRes', 'Textures'],
    thumbnail: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80',
    accentColor: '#eab308',
    previewType: 'motion_preview',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-4k-film-grain-pack', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-film-grain-4k-prores', speed: 'Ultra Fast' },
      { name: 'MediaFire', url: 'https://www.mediafire.com/folder/vignesh_grain_master', speed: 'Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-4k-film-grain-pack',
    installInstructions: [
      {
        software: 'Any Video Editor',
        steps: [
          'Drag the grain clip onto the video track directly above your edited clips.',
          'Change the Blend Mode (Composite Mode) to "Overlay" or "Soft Light".',
          'Adjust Opacity between 40% and 75% depending on desired vintage subtlety.'
        ]
      }
    ]
  },
  {
    id: 'titles-kinetic-captions-mogrt',
    title: 'Kinetic Dynamic Subtitles & Titles Pack (MOGRT)',
    slug: 'kinetic-dynamic-subtitles-titles-mogrt',
    tagline: 'Viral Ali Abdaal & Hormozi style auto-resizing kinetic captions',
    description: 'Transform talking head footage into hyper-engaging viral shorts and reels. Features animated highlight boxes, emojis, pop-in word tracking, bounce physics, and full color customization inside the Essential Graphics panel.',
    category: 'titles',
    categoryLabel: 'MOGRTs & Titles',
    software: ['Premiere Pro', 'After Effects'],
    fileFormat: '.MOGRT & .AEP',
    fileSize: '85 MB',
    itemsCount: '25 Customizable MOGRTs',
    resolution: 'Vertical 9:16 (1080x1920) & 16:9 4K',
    downloadsCount: 46780,
    rating: 4.95,
    reviewsCount: 588,
    license: 'Free Commercial Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    featured: true,
    trending: true,
    tags: ['MOGRT', 'Captions', 'Subtitles', 'Kinetic Typography', 'Reels', 'TikTok', 'Shorts'],
    thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
    accentColor: '#a855f7',
    previewType: 'image',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-kinetic-captions-mogrt', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-kinetic-titles-pack', speed: 'Ultra Fast' },
      { name: 'Direct Fast Link', url: 'https://vignesh-space.storage.assets/kinetic-mogrt.zip', speed: 'Ultra Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-kinetic-captions-mogrt',
    installInstructions: [
      {
        software: 'Premiere Pro',
        steps: [
          'Open Essential Graphics panel (Window -> Essential Graphics).',
          'Click the small "+" icon at bottom right of the panel or choose "Install Motion Graphics Template".',
          'Drag the template straight onto your timeline above your video track and edit text!'
        ]
      }
    ]
  },
  {
    id: 'transitions-smooth-whip-zoom',
    title: 'Hyper-Smooth Whip Pan, Roll & Glitch Presets',
    slug: 'smooth-whip-pan-zoom-presets',
    tagline: 'Drag-and-drop adjustment layer transitions with optical motion blur',
    description: 'Over 40 responsive drag-and-drop transitions engineered for seamless narrative flow. Includes whip pan left/right, crash zooms, camera roll spins, digital glitch tears, and RGB displacement bursts.',
    category: 'transitions',
    categoryLabel: 'Transitions & Presets',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    fileFormat: '.prfpset & .drx PowerGrades',
    fileSize: '35 MB',
    itemsCount: '42 Presets',
    downloadsCount: 33900,
    rating: 4.91,
    reviewsCount: 310,
    license: 'Free Commercial & Personal Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    tags: ['Transitions', 'Whip Pan', 'Zoom', 'Glitch', 'Premiere Presets', 'DaVinci'],
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    accentColor: '#3b82f6',
    previewType: 'motion_preview',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-smooth-transitions-presets', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-whip-zoom-transitions', speed: 'Ultra Fast' },
      { name: 'MediaFire', url: 'https://www.mediafire.com/folder/vignesh_transitions', speed: 'Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-smooth-transitions-presets',
    installInstructions: [
      {
        software: 'Premiere Pro',
        steps: [
          'Go to the Effects panel -> right-click "Presets" folder -> select "Import Presets...".',
          'Choose the .prfpset file.',
          'Create an Adjustment Layer, slice it 10 frames centered on your cut, and drop the preset on it!'
        ]
      }
    ]
  },
  {
    id: 'sfx-viral-cash-foley-ui',
    title: 'Content Creator Foley, Tech UI Clicks & Cash Chimes',
    slug: 'creator-foley-tech-clicks-cash-sfx',
    tagline: 'Clean mechanical mouse clicks, keyboard clacks, camera shutters & money bells',
    description: 'Crisp tactile Foley for tutorials, software screen recordings, finance reels, and motion design callouts. Clean high frequencies with zero background hiss or room echo.',
    category: 'sfx',
    categoryLabel: 'Sound Effects (SFX)',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Final Cut Pro'],
    fileFormat: '24-bit 96kHz Lossless WAV',
    fileSize: '160 MB',
    itemsCount: '95 Sounds',
    downloadsCount: 29800,
    rating: 4.93,
    reviewsCount: 240,
    license: 'Royalty-Free Commercial Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    tags: ['SFX', 'Cash Chime', 'Mouse Click', 'Mechanical Keyboard', 'Camera Shutter', 'UI Sounds'],
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    accentColor: '#10b981',
    previewType: 'audio',
    sfxSoundType: 'cash',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-creator-foley-ui-sfx', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-cash-ui-sfx-pack', speed: 'Ultra Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-creator-foley-ui-sfx',
    installInstructions: [
      {
        software: 'Any Timeline',
        steps: [
          'Import the WAV folder.',
          'Snap the click sound exactly on the frame where your cursor clicks or on-screen card appears.',
          'Lower gain by -6dB to blend naturally into background music.'
        ]
      }
    ]
  },
  {
    id: '3d-vfx-y2k-chrome-elements',
    title: '3D Chrome Liquid & Metallic Y2K Elements Pack',
    slug: '3d-chrome-liquid-metallic-y2k-pack',
    tagline: 'High-res transparent PNGs, 3D OBJ models and spinning iridescent chrome loops',
    description: 'Essential assets for modern music videos, brutalist graphic design, futuristic reels, and fashion brand edits. High-gloss specular reflections with rendered alpha transparency.',
    category: '3d-vfx',
    categoryLabel: '3D Elements & VFX',
    software: ['After Effects', 'Blender', 'Photoshop', 'Premiere Pro'],
    fileFormat: '4K Alpha PNG + .OBJ + ProRes 4444',
    fileSize: '820 MB',
    itemsCount: '65 Assets (Still & Animated)',
    resolution: '4000 x 4000 Transparent Alpha',
    downloadsCount: 24350,
    rating: 4.89,
    reviewsCount: 192,
    license: 'Free Commercial Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    tags: ['3D', 'Chrome', 'Liquid Metal', 'Y2K', 'VFX', 'Blender', 'Alpha PNG'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8b5cf6',
    previewType: 'image',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-3d-chrome-y2k-elements', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-chrome-3d-pack', speed: 'Ultra Fast' },
      { name: 'MediaFire', url: 'https://www.mediafire.com/folder/vignesh_3d_chrome', speed: 'Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-3d-chrome-y2k-elements',
    installInstructions: [
      {
        software: 'After Effects / Premiere Pro',
        steps: [
          'Import the folder of PNG or ProRes 4444 clips directly.',
          'They already have transparent alpha backgrounds—simply place above your subject!',
          'Add a "Glow" or "Deep Glow" effect to boost metallic reflections.'
        ]
      }
    ]
  },
  {
    id: 'lut-cyberpunk-tokyo-neon',
    title: 'Cyberpunk 2077 & Tokyo Neon Street LUTs',
    slug: 'cyberpunk-tokyo-neon-street-luts',
    tagline: 'Deep crushed blacks, electric magenta highlights and rich cyan night atmosphere',
    description: 'Designed specifically for low-light night videography, city walks, neon signs, and gaming montages. Suppresses digital noise in shadows while enhancing vivid neon sign luminance.',
    category: 'luts',
    categoryLabel: 'LUTs & Color',
    software: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Photoshop'],
    fileFormat: '.CUBE',
    fileSize: '32 MB',
    itemsCount: '10 LUT Styles',
    resolution: 'All Resolutions',
    downloadsCount: 31200,
    rating: 4.93,
    reviewsCount: 265,
    license: 'Free Commercial & Personal Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    tags: ['Cyberpunk', 'Neon', 'Tokyo', 'Night', 'Color LUT', 'Gaming', 'Moody'],
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    accentColor: '#f43f5e',
    previewType: 'lut_compare',
    lutPreview: {
      beforeImage: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
      description: 'Enhances neon magenta and cyan contrast while keeping shadow noise invisible.'
    },
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-cyberpunk-neon-luts', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-cyberpunk-luts', speed: 'Ultra Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-cyberpunk-neon-luts',
    installInstructions: [
      {
        software: 'Premiere Pro',
        steps: [
          'Apply via Lumetri Color -> Creative Look.',
          'For best results, adjust Exposure and White Balance in the Basic Correction tab first.'
        ]
      }
    ]
  },
  {
    id: 'overlay-crt-vhs-glitch-retro',
    title: 'Retro CRT Scanlines, VHS Glitch & Tape Noise 4K',
    slug: 'retro-crt-vhs-glitch-tape-noise-4k',
    tagline: 'Authentic 90s camcorder artifacts, magnetic tape tracking errors and CRT phosphorus lines',
    description: 'Captured through real analog tube televisions and vintage VHS players. Includes chromatic aberration split maps, RGB phosphors, rewind wipes, and static grain.',
    category: 'overlays',
    categoryLabel: 'Overlays & Textures',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut'],
    fileFormat: 'ProRes 422 60FPS / MP4',
    fileSize: '950 MB',
    itemsCount: '18 Video Loops',
    resolution: '4K Ultra HD & 1080p',
    downloadsCount: 27500,
    rating: 4.91,
    reviewsCount: 220,
    license: 'Free Commercial Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    tags: ['VHS', 'CRT', 'Retro', 'Glitch', '90s', 'Analog', 'Tape Grain'],
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0ea5e9',
    previewType: 'motion_preview',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-crt-vhs-overlays', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-crt-vhs-4k', speed: 'Ultra Fast' },
      { name: 'MediaFire', url: 'https://www.mediafire.com/folder/vignesh_vhs_overlays', speed: 'Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-crt-vhs-overlays',
    installInstructions: [
      {
        software: 'Any Timeline',
        steps: [
          'Place CRT overlay video above your clip.',
          'Set Blend Mode to "Screen" (to keep glow and remove black) or "Overlay".'
        ]
      }
    ]
  },
  {
    id: 'project-viral-talking-head-reel',
    title: 'Viral Talking Head Reel Master Project (.prproj)',
    slug: 'viral-talking-head-reel-master-project',
    tagline: 'Complete production timeline with auto-zooms, sound design tracks & color pipeline',
    description: 'The exact timeline setup used for 10M+ view Instagram reels and TikToks. Pre-configured with markers for cadence cuts, sound design stems (whooshes, risers, pops), adjustment layers, and color grades.',
    category: 'project-files',
    categoryLabel: 'Project Files (.prproj/.aep)',
    software: ['Premiere Pro'],
    fileFormat: '.prproj (Premiere 2023, 2024, 2025+ compatible)',
    fileSize: '140 MB',
    itemsCount: '1 Full Project + Assets Stems',
    resolution: '1080 x 1920 9:16 Vertical',
    downloadsCount: 35600,
    rating: 4.97,
    reviewsCount: 489,
    license: 'Free for Personal & Commercial Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    featured: true,
    trending: true,
    tags: ['Premiere Pro', 'Project File', 'Reels', 'Shorts', 'Talking Head', 'Workflow'],
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    accentColor: '#6366f1',
    previewType: 'image',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-viral-reel-prproj-file', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-talking-head-project', speed: 'Ultra Fast' },
      { name: 'Direct Fast Link', url: 'https://vignesh-space.storage.assets/talking-head-master.zip', speed: 'Ultra Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-viral-reel-prproj-file',
    installInstructions: [
      {
        software: 'Premiere Pro',
        steps: [
          'Extract the ZIP archive and open "Viral_Reel_Master_Vignesh.prproj".',
          'Replace the placeholder "YOUR_RAW_A_ROLL" video clip in the bin with your camera footage.',
          'The adjustment layers, zooms, and sound effects will align automatically with your speech markers!'
        ]
      }
    ]
  },
  {
    id: 'fonts-creator-display-bundle',
    title: 'Creator YouTube & Thumbnail Display Fonts Bundle',
    slug: 'creator-thumbnail-display-fonts-bundle',
    tagline: '14 Bold, ultra-legible, high-CTR headline fonts with full commercial licenses',
    description: 'Stop guessing which font grabs attention on mobile feeds. This curated pack includes heavy brutalist grotesque, bold condensed geometric, Y2K modern display, and dynamic serif typefaces tested for maximum readability at tiny thumbnail scale.',
    category: 'fonts',
    categoryLabel: 'Creator Display Fonts',
    software: ['Photoshop', 'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut'],
    fileFormat: '.OTF / .TTF / .WOFF2',
    fileSize: '42 MB',
    itemsCount: '14 Premium Font Families (48 Weights)',
    downloadsCount: 39100,
    rating: 4.96,
    reviewsCount: 512,
    license: '100% Free Commercial Font Licenses',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    featured: true,
    tags: ['Fonts', 'Thumbnails', 'Typography', 'Bold', 'YouTube', 'Photoshop', 'Brutalist'],
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    accentColor: '#f97316',
    previewType: 'image',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-display-fonts-bundle', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-fonts-bundle', speed: 'Ultra Fast' },
      { name: 'Direct Fast Link', url: 'https://vignesh-space.storage.assets/creator-fonts.zip', speed: 'Ultra Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-display-fonts-bundle',
    installInstructions: [
      {
        software: 'Windows / Mac Install',
        steps: [
          'Unzip the font bundle.',
          'On Windows: Select all .ttf / .otf files, right-click and click "Install for all users".',
          'On Mac: Double-click or open Font Book and drag the files in.',
          'Restart your editing software (Premiere/Photoshop) to immediately see the new fonts in your font list.'
        ]
      }
    ]
  },
  {
    id: 'sfx-anime-shonen-fight-impacts',
    title: 'Anime Shonen Energy Blasts, Sword Clangs & Hit Sparks',
    slug: 'anime-shonen-fight-impacts-sfx',
    tagline: 'High-octane anime sound design for gaming edits, AMVs, and hyper-dynamic shorts',
    description: 'The explosive sound effects behind Dragon Ball, Jujutsu Kaisen, and Demon Slayer fight sequences. Includes teleport swooshes, aura hums, katana unsheathes, lightning strikes, and seismic ground smashes.',
    category: 'sfx',
    categoryLabel: 'Sound Effects (SFX)',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut'],
    fileFormat: '24-bit 48kHz WAV',
    fileSize: '185 MB',
    itemsCount: '110 Sound Effects',
    downloadsCount: 36700,
    rating: 4.95,
    reviewsCount: 430,
    license: 'Royalty-Free Commercial Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    tags: ['Anime', 'SFX', 'AMV', 'Sword', 'Energy Blast', 'Impact', 'Gaming'],
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    accentColor: '#ef4444',
    previewType: 'audio',
    sfxSoundType: 'anime',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-anime-fight-sfx', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-anime-sfx-master', speed: 'Ultra Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-anime-fight-sfx',
    installInstructions: [
      {
        software: 'Universal Audio',
        steps: [
          'Unpack the ZIP file.',
          'Layer 2 or 3 sounds simultaneously (e.g. Sword clang + Sub boom + Whoosh) to construct a cinematic punch.'
        ]
      }
    ]
  },
  {
    id: '3d-vfx-real-fire-smoke-alpha',
    title: '4K Real Fire, Smoke & Explosion Stock VFX (Alpha)',
    slug: '4k-real-fire-smoke-explosion-vfx',
    tagline: 'Filmed on Phantom Flex 4K high-speed cameras with pre-keyed transparency',
    description: 'Zero rotoscoping needed. Drag and drop real slow-motion fireball blasts, muzzle flashes, floating sparks & embers, smoke plumes, and shockwaves directly onto your footage.',
    category: '3d-vfx',
    categoryLabel: '3D Elements & VFX',
    software: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro'],
    fileFormat: 'ProRes 4444 with Alpha / PNG Sequences',
    fileSize: '1.8 GB',
    itemsCount: '34 VFX Elements',
    resolution: '3840 x 2160 (4K 60FPS)',
    downloadsCount: 22800,
    rating: 4.92,
    reviewsCount: 180,
    license: 'Free Commercial Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    tags: ['VFX', 'Fire', 'Smoke', 'Explosion', 'Alpha Channel', 'After Effects', 'Stock Footage'],
    thumbnail: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    accentColor: '#f97316',
    previewType: 'image',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-4k-fire-smoke-vfx', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-fire-vfx-4k', speed: 'Ultra Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-4k-fire-smoke-vfx',
    installInstructions: [
      {
        software: 'Any Video Editor',
        steps: [
          'Import the ProRes 4444 clip.',
          'Drop directly onto your timeline over your scene. The alpha channel automatically renders the transparency.'
        ]
      }
    ]
  },
  {
    id: 'transitions-capcut-velocity-speedramp',
    title: 'CapCut & Alight Motion Velocity & Speed Ramp Presets',
    slug: 'capcut-velocity-speed-ramp-presets',
    tagline: 'Silky smooth slow-mo velocity curves and beat-synced flash shakes for mobile editors',
    description: 'Specifically crafted for mobile and desktop CapCut/Alight Motion creators. Pre-calculated speed curves (e.g. 10x speed-up into 0.2x slow motion) synced with optical flow interpolation.',
    category: 'transitions',
    categoryLabel: 'Transitions & Presets',
    software: ['CapCut', 'Alight Motion'],
    fileFormat: 'XML & QR Code Import Presets',
    fileSize: '18 MB',
    itemsCount: '28 Velocity Curves',
    downloadsCount: 48900,
    rating: 4.94,
    reviewsCount: 640,
    license: 'Free Commercial & Personal Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    featured: true,
    tags: ['CapCut', 'Velocity', 'Speed Ramp', 'Alight Motion', 'TikTok', 'Phone Editing'],
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    accentColor: '#06b6d4',
    previewType: 'motion_preview',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-capcut-velocity-presets', speed: 'Ultra Fast' },
      { name: 'MediaFire', url: 'https://www.mediafire.com/folder/vignesh_capcut_velocity', speed: 'Fast' },
      { name: 'Direct Fast Link', url: 'https://vignesh-space.storage.assets/capcut-velocity.zip', speed: 'Ultra Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-capcut-velocity-presets',
    installInstructions: [
      {
        software: 'CapCut',
        steps: [
          'Open CapCut and select your clip.',
          'Tap Speed -> Curve -> Custom.',
          'Apply the curve timing values shown in the included cheatsheet PDF or load the project template.'
        ]
      }
    ]
  },
  {
    id: 'project-cinematic-3d-title-aep',
    title: 'Cinematic 3D Parallax Title Sequence (.aep)',
    slug: 'cinematic-3d-parallax-title-aep',
    tagline: 'After Effects project file with true 3D camera depth of field and lens flares',
    description: 'No third-party plugins (no Element 3D or Optical Flares required). 100% native After Effects camera depth, dust particles, and cinematic text animation. Just double-click the "EDIT_TEXT" pre-comp.',
    category: 'project-files',
    categoryLabel: 'Project Files (.prproj/.aep)',
    software: ['After Effects'],
    fileFormat: '.AEP (CC 2021+)',
    fileSize: '115 MB',
    itemsCount: '1 Complete AE Project',
    resolution: '4K UHD (3840x2160)',
    downloadsCount: 21300,
    rating: 4.90,
    reviewsCount: 165,
    license: 'Free Commercial Use',
    curator: 'Vignesh Space Curated',
    updatedDate: 'Updated Oct 2026',
    tags: ['After Effects', 'Project File', '3D Titles', 'Parallax', 'Cinematic Opener', 'Trailer'],
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8b5cf6',
    previewType: 'image',
    downloadMirrors: [
      { name: 'Google Drive', url: 'https://drive.google.com/drive/folders/1vignesh-3d-titles-aep', speed: 'Ultra Fast' },
      { name: 'Mega.nz', url: 'https://mega.nz/folder/vignesh-3d-titles-aftereffects', speed: 'Ultra Fast' },
    ],
    directUrl: 'https://drive.google.com/drive/folders/1vignesh-3d-titles-aep',
    installInstructions: [
      {
        software: 'After Effects',
        steps: [
          'Open "Cinematic_3D_Titles_Vignesh.aep".',
          'Locate the folder labeled "01_REPLACE_TEXT_HERE" in the Project bin.',
          'Double-click the text layer and type your title—render out the Final Output comp!'
        ]
      }
    ]
  }
];

export const EDITING_SHORTCUTS = [
  {
    software: 'Premiere Pro',
    category: 'Timeline & Cuts',
    shortcuts: [
      { keys: ['C'], label: 'Razor Tool (Cut clip)' },
      { keys: ['V'], label: 'Selection Tool' },
      { keys: ['Q'], label: 'Ripple Trim Previous (Delete head)' },
      { keys: ['W'], label: 'Ripple Trim Next (Delete tail)' },
      { keys: ['Ctrl / Cmd', 'K'], label: 'Add Edit at playhead' },
      { keys: ['Shift', 'Del'], label: 'Ripple Delete gap/clip' },
      { keys: ['Alt / Option', 'Drag'], label: 'Duplicate clip on timeline' },
      { keys: ['L'], label: 'Shuttle Play (Press multiple times to speed up)' },
      { keys: ['J'], label: 'Shuttle Reverse' },
      { keys: ['K'], label: 'Stop Playhead' },
      { keys: ['Ctrl / Cmd', 'M'], label: 'Export Media Queue' },
    ]
  },
  {
    software: 'After Effects',
    category: 'Keyframes & Layers',
    shortcuts: [
      { keys: ['U'], label: 'Show all animated properties with keyframes' },
      { keys: ['UU'], label: 'Show all modified properties' },
      { keys: ['P'], label: 'Reveal Position' },
      { keys: ['S'], label: 'Reveal Scale' },
      { keys: ['R'], label: 'Reveal Rotation' },
      { keys: ['T'], label: 'Reveal Opacity (Transparency)' },
      { keys: ['F9'], label: 'Easy Ease keyframes (Crucial for smooth motion!)' },
      { keys: ['Ctrl / Cmd', 'Shift', 'D'], label: 'Split Layer at playhead' },
      { keys: ['Alt / Option', '['], label: 'Trim Layer In point to playhead' },
      { keys: ['Alt / Option', ']'], label: 'Trim Layer Out point to playhead' },
      { keys: ['Ctrl / Cmd', 'Alt', 'Y'], label: 'Create new Adjustment Layer' },
    ]
  },
  {
    software: 'DaVinci Resolve',
    category: 'Color & Cut Page',
    shortcuts: [
      { keys: ['B'], label: 'Blade Tool (Cut)' },
      { keys: ['A'], label: 'Normal Edit Tool' },
      { keys: ['Shift', '['], label: 'Ripple Start to Playhead' },
      { keys: ['Shift', ']'], label: 'Ripple End to Playhead' },
      { keys: ['Alt / Option', 'S'], label: 'Add Serial Node in Color Page' },
      { keys: ['Alt / Option', 'P'], label: 'Add Parallel Node' },
      { keys: ['Shift', 'D'], label: 'Bypass all Color Grades (Compare Before/After)' },
      { keys: ['Ctrl / Cmd', 'Shift', 'W'], label: 'Split Screen Color Wipe' },
      { keys: ['Ctrl / Cmd', 'Z'], label: 'Undo Grade / Edit' },
      { keys: ['Spacebar'], label: 'Play / Pause' },
    ]
  },
  {
    software: 'CapCut (Desktop)',
    category: 'Fast Social Cuts',
    shortcuts: [
      { keys: ['B'], label: 'Split Clip at playhead' },
      { keys: ['Backspace / Del'], label: 'Delete selected clip' },
      { keys: ['Ctrl / Cmd', 'B'], label: 'Split audio/video' },
      { keys: ['Ctrl / Cmd', 'J'], label: 'Compound Clip (Group/Nest)' },
      { keys: ['Ctrl / Cmd', 'Shift', 'M'], label: 'Freeze Frame' },
      { keys: ['Shift', 'Z'], label: 'Fit timeline to screen' },
      { keys: ['Ctrl / Cmd', 'E'], label: 'Export video' },
    ]
  }
];

export const SFX_SOUNDBOARD_ITEMS = [
  { id: 'sb-whoosh', label: 'Cinematic Whoosh', type: 'whoosh' as const, icon: 'Wind', desc: 'Whip transition swish' },
  { id: 'sb-impact', label: 'Sub Boom Impact', type: 'impact' as const, icon: 'Volume2', desc: 'Heavy cinematic punch' },
  { id: 'sb-cash', label: 'Cash Ka-Ching', type: 'cash' as const, icon: 'DollarSign', desc: 'Viral money chime' },
  { id: 'sb-subdrop', label: 'Deep Sub Drop', type: 'subdrop' as const, icon: 'Radio', desc: 'Low 30Hz bass sweep' },
  { id: 'sb-camera', label: 'Camera Shutter', type: 'camera' as const, icon: 'Camera', desc: 'Mechanical SLR click' },
  { id: 'sb-click', label: 'Mouse Click Foley', type: 'click' as const, icon: 'MousePointer', desc: 'Tactile UI click' },
  { id: 'sb-glitch', label: 'Digital Glitch', type: 'glitch' as const, icon: 'Zap', desc: 'Cyber static burst' },
  { id: 'sb-anime', label: 'Anime Spark Ping', type: 'anime' as const, icon: 'Sparkles', desc: 'Shonen battle ping' },
];
