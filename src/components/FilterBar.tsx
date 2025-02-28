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
import { Genre, Platform, Status } from "@/types/avn";

interface FilterBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedGenres: Genre[];
  onGenreToggle: (genre: Genre) => void;
  selectedPlatforms: Platform[];
  onPlatformToggle: (platform: Platform) => void;
  selectedStatus: Status[];
  onStatusToggle: (status: Status) => void;
  selectedPricing: ("free" | "paid")[];
  onPricingToggle: (pricing: "free" | "paid") => void;
  availableGenres?: Genre[];
  isSticky?: boolean;
  showSearch?: boolean;
  className?: string;
}

const filterCategories = [
  {
    label: "Pricing",
    options: ["free", "paid"] as const,
    type: "pricing" as const
  },
  {
    label: "Status",
    options: ["Completed", "Ongoing", "Hiatus", "Planned", "Dropped"] as const,
    type: "status" as const
  },
  {
    label: "Platform",
    options: ["Windows", "Mac", "Linux", "Android", "iOS", "Web"] as const,
    type: "platform" as const
  },
  {
    label: "Genres",
    options: [] as Genre[], // Placeholder for genres
    type: "genre" as const
  }
];

export const FilterBar = ({
  searchQuery = "",
  onSearchChange,
  selectedGenres,
  onGenreToggle,
  selectedPlatforms,
  onPlatformToggle,
  selectedStatus,
  onStatusToggle,
  selectedPricing,
  onPricingToggle,
  availableGenres = [],
  isSticky = false,
  showSearch = false,
  className,
}: FilterBarProps) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleFilterToggle = (type: string, value: string) => {
    switch (type) {
      case "pricing":
        onPricingToggle(value as "free" | "paid");
        break;
      case "status":
        onStatusToggle(value as Status);
        break;
      case "platform":
        onPlatformToggle(value as Platform);
        break;
      case "genre":
        onGenreToggle(value as Genre);
        break;
    }
  };

  const isOptionSelected = (type: string, option: string): boolean => {
    switch (type) {
      case "pricing":
        return selectedPricing.includes(option as "free" | "paid");
      case "status":
        return selectedStatus.includes(option as Status);
      case "platform":
        return selectedPlatforms.includes(option as Platform);
      case "genre":
        return selectedGenres.includes(option as Genre);
      default:
        return false;
    }
  };

  return (
    <div className={cn(
      "w-full transition-all duration-300 ease-in-out bg-background/95 backdrop-blur z-40",
      isSticky ? "sticky top-[41px] border-b shadow-sm" : "",
      className
    )}>
      <div className="container">
        <div className="flex items-center gap-3 h-12 overflow-x-auto hide-scrollbar">
          {/* Search Input - Only Visible when Sticky */}
          {isSticky && (
            <div className="relative flex-shrink-0 w-64">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search AVNs..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-sm bg-muted/50 border-0 rounded-md
                          focus:ring-1 focus:ring-primary/20 focus:bg-muted/70"
              />
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {filterCategories.map((category) => {
              const isActive = category.type === "pricing" ? selectedPricing.length > 0 :
                               category.type === "status" ? selectedStatus.length > 0 :
                               category.type === "platform" ? selectedPlatforms.length > 0 :
                               category.type === "genre" ? selectedGenres.length > 0 : false;

              return (
                <DropdownMenu key={category.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50",
                        isActive ? "text-primary" : ""
                      )}
                    >
                      {category.label}
                      <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {category.type === "genre" ? (
                      availableGenres.map((genre) => (
                        <DropdownMenuItem key={genre} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre)}
                            onChange={() => onGenreToggle(genre)}
                            className="mr-2"
                          />
                          {genre}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      category.options.map((option) => (
                        <DropdownMenuItem key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isOptionSelected(category.type, option)}
                            onChange={() => handleFilterToggle(category.type, option)}
                            className="mr-2"
                          />
                          {option}
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden ml-auto">
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 px-3 text-sm font-medium"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
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
                        {category.type === "genre" ? (
                          availableGenres.map((genre) => (
                            <Badge
                              key={genre}
                              variant={selectedGenres.includes(genre) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => onGenreToggle(genre)}
                            >
                              {genre}
                            </Badge>
                          ))
                        ) : (
                          category.options.map((option) => (
                            <Badge
                              key={option}
                              variant={isOptionSelected(category.type, option) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => handleFilterToggle(category.type, option)}
                            >
                              {option}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};
