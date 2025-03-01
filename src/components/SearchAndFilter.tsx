
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/FilterBar";
import { X } from "lucide-react";
import { Genre } from "@/types/avn";
import { genres } from "@/data/avns";

interface SearchAndFilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGenres: Genre[];
  onGenreToggle: (genre: Genre) => void;
  // Add missing props
  selectedPlatforms: Platform[];
  onPlatformToggle: (platform: Platform) => void;
  selectedStatus: Status[];
  onStatusToggle: (status: Status) => void;
  selectedPricing: ("free" | "paid")[];
  onPricingToggle: (pricing: "free" | "paid") => void;
  totalResults: number;
  onClearFilters: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const SearchAndFilter = ({
  isOpen,
  onClose,
  selectedGenres,
  onGenreToggle,
  selectedPlatforms,
  onPlatformToggle,
  selectedStatus,
  onStatusToggle,
  selectedPricing,
  onPricingToggle,
  totalResults,
  onClearFilters,
  searchQuery,
  onSearchChange,
}: SearchAndFilterProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter AVNs</DialogTitle>
          <DialogDescription>
            Select genres to filter the available AVNs. You can select multiple genres.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <FilterBar
            selectedGenres={selectedGenres}
            onGenreToggle={onGenreToggle}
            selectedPlatforms={selectedPlatforms}
            onPlatformToggle={onPlatformToggle}
            selectedStatus={selectedStatus}
            onStatusToggle={onStatusToggle}
            selectedPricing={selectedPricing}
            onPricingToggle={onPricingToggle}
            availableGenres={genres}
            totalResults={totalResults}
            onClearFilters={onClearFilters}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            className="flex-col gap-2"
          />
        </div>
        <Button
          variant="ghost"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

