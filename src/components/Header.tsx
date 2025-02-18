
import { Button } from "./ui/button";
import { Gamepad2, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <Gamepad2 className="h-6 w-6" />
            <span>AVN Directory</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild>
              <Link to="/submit">Submit AVN</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/swipe">
                <Heart className="mr-2 h-4 w-4" />
                Swipe
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
