
import { Button } from "./ui/button";
import { LayoutGrid, List } from "lucide-react";

interface HeaderProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const Header = ({ viewMode, onViewModeChange }: HeaderProps) => {
  return (
    <header className="border-b">
      <div className="container py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">AVN Directory</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewModeChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
