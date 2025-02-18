
import { Genre } from "@/types/avn";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search } from "lucide-react";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenres: Genre[];
  onGenreToggle: (genre: Genre) => void;
  availableGenres: Genre[];
}

export const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  selectedGenres,
  onGenreToggle,
  availableGenres,
}: SearchAndFilterProps) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search AVNs by title, genre, or developer..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-14 pl-12 pr-4 text-lg rounded-xl shadow-sm transition-all duration-200 focus:shadow-md focus:scale-[1.01] bg-white/80 backdrop-blur"
        />
      </div>
      
      <div className="overflow-x-auto -mx-2 px-2 pb-2">
        <div className="flex gap-2 flex-nowrap">
          {availableGenres.map((genre) => (
            <Badge
              key={genre}
              variant={selectedGenres.includes(genre) ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap py-1.5 px-4 text-sm transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-primary/90 shadow-sm"
              onClick={() => onGenreToggle(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
