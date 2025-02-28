import { Link } from "react-router-dom";
import { Twitter, Heart, MessageSquare, Shield, AlertTriangle, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background/95 backdrop-blur-sm" itemScope itemType="http://schema.org/WPFooter">
      {/* Age Verification Banner */}
      <div className="w-full bg-primary/10 py-2">
        <div className="container flex items-center justify-center gap-2 text-sm">
          <AlertTriangle className="h-4 w-4 text-primary" />
          <span className="font-semibold">18+ Only. Adult Content.</span>
          <Link to="/age-verification" className="underline hover:text-primary">Age Verification Required</Link>
        </div>
      </div>

      <div className="container py-8 space-y-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* About Section */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-3">About AVN Directory</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted source for discovering, tracking, and enjoying Adult Visual Novels. We curate the best AVN experiences while maintaining strict content standards and user safety.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="https://twitter.com/avndirectory" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="https://discord.gg/avndirectory" target="_blank" rel="noopener noreferrer" aria-label="Join our Discord Community">
                  <MessageSquare className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Browse Section */}
          <div>
            <h3 className="font-semibold mb-3">Browse AVNs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse All Games
                </Link>
              </li>
              <li>
                <Link to="/top-rated" className="text-muted-foreground hover:text-foreground transition-colors">
                  Top Rated AVNs
                </Link>
              </li>
              <li>
                <Link to="/new-releases" className="text-muted-foreground hover:text-foreground transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/upcoming" className="text-muted-foreground hover:text-foreground transition-colors">
                  Upcoming Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/content-guidelines" className="text-muted-foreground hover:text-foreground transition-colors">
                  Content Guidelines
                </Link>
              </li>
              <li>
                <Link to="/developer-hub" className="text-muted-foreground hover:text-foreground transition-colors">
                  Developer Hub
                </Link>
              </li>
              <li>
                <Link to="/submit-game" className="text-muted-foreground hover:text-foreground transition-colors">
                  Submit Your AVN
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h3 className="font-semibold mb-3">Legal & Safety</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/dmca" className="text-muted-foreground hover:text-foreground transition-colors">
                  DMCA Policy
                </Link>
              </li>
              <li>
                <Link to="/content-moderation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Content Moderation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        {/* Trust Signals & Compliance */}
        <div className="flex flex-wrap justify-center gap-4 py-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>RTA Labeled</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span>Content Moderated</span>
          </div>
          <Link to="/compliance" className="hover:text-foreground transition-colors">
            Compliance Information
          </Link>
        </div>

        <Separator />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1 mb-2 sm:mb-0">
            Made with <Heart className="h-4 w-4 text-primary" /> by the AVN Directory Team
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-right">
            <span className="font-semibold">Adult Content - 18+ Only</span>
            <span>&copy; {currentYear} AVN Directory. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
