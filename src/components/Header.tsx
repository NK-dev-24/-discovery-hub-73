import { Button } from "./ui/button";
import { Gamepad2, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container py-2.5">
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            aria-label="AVN Directory Home"
          >
            <Gamepad2 className="h-6 w-6 text-primary transition-colors group-hover:text-primary/90" />
            <span className="hidden md:block text-lg font-semibold tracking-tight">
              AVN Directory
            </span>
          </Link>

          <div className="flex items-center">
            <Button 
              asChild
              size="sm"
              className="bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary 
                         flex items-center gap-1.5 px-3 h-8 rounded-lg
                         transition-all duration-200 hover:shadow-sm"
            >
              <Link to="/submit">
                <PenLine className="h-3.5 w-3.5" />
                <span className="font-medium text-sm">Submit</span>
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
