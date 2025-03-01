export type Genre = 
  | "Fantasy" 
  | "Romance" 
  | "Sci-Fi" 
  | "Mystery" 
  | "Horror" 
  | "Comedy" 
  | "Drama";

export type Status = "Completed" | "Ongoing" | "Hiatus" | "Planned" | "Dropped";

export type Platform = "Windows" | "Mac" | "Linux" | "Android" | "iOS" | "Web";

export type Distribution = {
  platform: "Steam" | "Itch.io" | "Custom" | "Other";
  url: string;
};

export type MediaType = 'image' | 'video' | 'youtube';

export type MediaItem = {
  type: MediaType;
  url: string;
  title: string;
  thumbnail?: string;
};

export type AVN = {
  id: string;
  title: string;
  description: string;
  genre: Genre[];
  developer: string;
  website?: string;
  support?: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isNew?: boolean;
  image?: string;
  status: Status;
  platforms: Platform[];
  distribution: Distribution[];
  version?: string;
  lastUpdated?: string;
  screenshots?: string[];
  downloadUrl?: string;
  price: "free" | "paid";
  earlyAccess: boolean;
  tags?: string[];
  externalLinks?: Array<{
    label: string;
    url: string;
  }>;
};
