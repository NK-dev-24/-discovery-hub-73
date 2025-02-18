
import { Genre } from "@/types/avn";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

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
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search AVNs..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full max-w-xl"
      />
      <div className="flex flex-wrap gap-2">
        {availableGenres.map((genre) => (
          <Badge
            key={genre}
            variant={selectedGenres.includes(genre) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => onGenreToggle(genre)}
          >
            {genre}
          </Badge>
        ))}
      </div>
    </div>
  );
};
