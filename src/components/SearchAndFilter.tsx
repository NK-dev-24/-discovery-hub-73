
import { Genre } from "@/types/avn";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenres: Genre[];
  onGenreToggle: (genre: Genre) => void;
  availableGenres: Genre[];
  isSticky?: boolean;
}

export const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  selectedGenres,
  onGenreToggle,
  availableGenres,
  isSticky = false,
}: SearchAndFilterProps) => {
  return (
    <div className={cn(
      "space-y-4 transition-all duration-300",
      isSticky ? "max-w-2xl mx-auto" : ""
    )}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search AVNs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn(
            "w-full pl-9 transition-all duration-300 ease-in-out",
            "focus:ring-2 focus:ring-primary/20 focus:scale-[1.02]",
            isSticky ? "h-9 text-sm" : "h-12 text-lg"
          )}
        />
      </div>
      
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex flex-nowrap gap-2 min-w-full">
          {availableGenres.map((genre) => (
            <Badge
              key={genre}
              variant={selectedGenres.includes(genre) ? "default" : "outline"}
              className={cn(
                "cursor-pointer whitespace-nowrap transition-all duration-200",
                "hover:bg-primary/90 hover:scale-105 active:scale-95",
                isSticky ? "text-xs py-0.5" : "text-sm py-1"
              )}
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
