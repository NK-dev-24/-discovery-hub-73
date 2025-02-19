import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Genre } from "@/types/avn";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenres: Genre[];
  onGenreToggle: (genre: Genre) => void;
  availableGenres: Genre[];
  isSticky?: boolean;
  showSearch?: boolean;
}

const filterCategories = [
  { label: "Most Popular", options: ["Today", "This Week", "This Month", "All Time"] },
  { label: "New", options: ["Last 24h", "This Week", "This Month"] },
  { label: "Categories", options: ["Story-rich", "Action", "Dating Sim", "RPG"] },
  { label: "Platform", options: ["Windows", "Mac", "Linux", "Android"] },
  { label: "Pricing", options: ["Free", "Paid", "Early Access"] },
];

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedGenres,
  onGenreToggle,
  availableGenres,
  isSticky = false,
  showSearch = false,
}: FilterBarProps) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const FilterOptions = () => (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="flex items-center gap-2 flex-nowrap min-w-0">
        {filterCategories.map((category) => (
          <DropdownMenu key={category.label}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-1 whitespace-nowrap bg-white/80 backdrop-blur flex-shrink-0"
              >
                {category.label}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {category.options.map((option) => (
                <DropdownMenuItem key={option}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      
        <div className="h-full border-l mx-2 flex-shrink-0" />
      
        {availableGenres.map((genre) => (
          <Badge
            key={genre}
            variant={selectedGenres.includes(genre) ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap py-1.5 px-4 text-sm transition-all duration-200 
                     hover:scale-105 active:scale-95 hover:bg-primary/90 shadow-sm bg-white/80 backdrop-blur flex-shrink-0"
            onClick={() => onGenreToggle(genre)}
          >
            {genre}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <div className={cn(
      "w-full transition-all duration-300 ease-in-out py-4 bg-background/95 backdrop-blur z-40",
      isSticky ? "sticky top-16 shadow-sm" : ""
    )}>
      <div className="container px-4 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {showSearch && (
            <div className="relative flex-shrink-0 w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search AVNs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 h-10"
              />
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden md:block flex-grow overflow-hidden">
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="flex items-center gap-2 flex-nowrap pb-2">
                {filterCategories.map((category) => (
                  <DropdownMenu key={category.label}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-1 whitespace-nowrap bg-white/80 backdrop-blur flex-shrink-0"
                      >
                        {category.label}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {category.options.map((option) => (
                        <DropdownMenuItem key={option}>
                          {option}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              
                <div className="h-full border-l mx-2 flex-shrink-0" />
              
                {availableGenres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={selectedGenres.includes(genre) ? "default" : "outline"}
                    className="cursor-pointer whitespace-nowrap py-1.5 px-4 text-sm transition-all duration-200 
                             hover:scale-105 active:scale-95 hover:bg-primary/90 shadow-sm bg-white/80 backdrop-blur flex-shrink-0"
                    onClick={() => onGenreToggle(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden w-full">
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-4">
                  {filterCategories.map((category) => (
                    <div key={category.label} className="space-y-2">
                      <h3 className="font-medium">{category.label}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.options.map((option) => (
                          <Badge
                            key={option}
                            variant="outline"
                            className="cursor-pointer"
                          >
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="space-y-2">
                    <h3 className="font-medium">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableGenres.map((genre) => (
                        <Badge
                          key={genre}
                          variant={selectedGenres.includes(genre) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => onGenreToggle(genre)}
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};
