export type AssetCategory = 
  | 'all'
  | 'luts'
  | 'sfx'
  | 'overlays'
  | 'transitions'
  | 'titles'
  | '3d-vfx'
  | 'project-files'
  | 'fonts';

export type SoftwareTool = 
  | 'Premiere Pro'
  | 'After Effects'
  | 'DaVinci Resolve'
  | 'CapCut'
  | 'Final Cut Pro'
  | 'Photoshop'
  | 'Blender'
  | 'Alight Motion';

export interface DownloadMirror {
  name: 'Google Drive' | 'Mega.nz' | 'MediaFire' | 'Direct Fast Link' | 'Dropbox';
  url: string;
  speed: 'Ultra Fast' | 'Fast' | 'Standard';
  icon?: string;
}

export interface Asset {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: AssetCategory;
  categoryLabel: string;
  software: SoftwareTool[];
  fileFormat: string;
  fileSize: string;
  itemsCount?: string;
  resolution?: string;
  downloadsCount: number;
  rating: number;
  reviewsCount: number;
  license: string;
  curator: string;
  updatedDate: string;
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  tags: string[];
  thumbnail: string;
  accentColor: string;
  previewType: 'image' | 'lut_compare' | 'audio' | 'motion_preview';
  sfxSoundType?: 'whoosh' | 'impact' | 'cash' | 'glitch' | 'subdrop' | 'camera' | 'click' | 'anime';
  lutPreview?: {
    beforeImage: string;
    afterImage: string;
    description: string;
  };
  downloadMirrors: DownloadMirror[];
  directUrl: string;
  installInstructions: {
    software: string;
    steps: string[];
  }[];
}

export interface AssetRequest {
  id: string;
  name: string;
  email: string;
  assetTitle: string;
  category: string;
  softwareTarget: string;
  description: string;
  status: 'Received' | 'Reviewing' | 'Added to Vault';
  timestamp: number;
}

export interface UserSubmittedAsset {
  id: string;
  title: string;
  creatorName: string;
  category: string;
  link: string;
  fileType: string;
  description: string;
  timestamp: number;
}
