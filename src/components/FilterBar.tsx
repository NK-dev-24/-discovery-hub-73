import { useState, useEffect } from "react";
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
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedGenres: Genre[];
  onGenreToggle: (genre: Genre) => void;
  availableGenres?: Genre[];
  isSticky?: boolean;
  showSearch?: boolean;
  className?: string;
}

const filterCategories = [
  { label: "Most Popular", options: ["Today", "This Week", "This Month", "All Time"] },
  { label: "New", options: ["Last 24h", "This Week", "This Month"] },
  { label: "Categories", options: ["Story-rich", "Action", "Dating Sim", "RPG", "Adventure", "Visual Novel"] },
  { label: "Platform", options: ["Windows", "Mac", "Linux", "Android"] },
  { label: "Pricing", options: ["Free", "Paid", "Early Access"] },
  { label: "Status", options: ["Completed", "In Development", "On Hold"] }
];

export const FilterBar = ({
  searchQuery = "",
  onSearchChange,
  selectedGenres,
  onGenreToggle,
  availableGenres = [],
  isSticky = false,
  showSearch = false,
  className,
}: FilterBarProps) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

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
            {filterCategories.map((category) => (
              <DropdownMenu key={category.label}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-sm font-medium text-muted-foreground 
                             hover:text-foreground hover:bg-muted/50"
                  >
                    {category.label}
                    <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {category.options.map((option) => (
                    <DropdownMenuItem key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(option as Genre)}
                        onChange={() => onGenreToggle(option as Genre)}
                        className="mr-2"
                      />
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            <div className="h-4 border-l mx-1" />

            {/* Genres Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-sm font-medium text-muted-foreground 
                           hover:text-foreground hover:bg-muted/50"
                >
                  Genres
                  <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {availableGenres.map((genre) => (
                  <DropdownMenuItem key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => onGenreToggle(genre)}
                      className="mr-2"
                    />
                    {genre}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
                        {category.options.map((option) => (
                          <Badge
                            key={option}
                            variant="outline"
                            className="cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedGenres.includes(option as Genre)}
                              onChange={() => onGenreToggle(option as Genre)}
                              className="mr-2"
                            />
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="space-y-2">
                    <h3 className="font-medium">Genres</h3>
                    <div className="flex flex-col gap-2">
                      {availableGenres.map((genre) => (
                        <div key={genre} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre)}
                            onChange={() => onGenreToggle(genre)}
                            className="mr-2"
                          />
                          {genre}
                        </div>
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
