export type Genre = 
  | "Fantasy" 
  | "Romance" 
  | "Sci-Fi" 
  | "Mystery" 
  | "Horror" 
  | "Comedy" 
  | "Drama";

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
};
