
import { Link } from "react-router-dom";
import { Twitter, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur-sm">
      <div className="container py-12 md:py-16 space-y-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">About AVN Directory</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We're passionate about connecting players with exceptional Adult Visual Novels. 
              Our platform helps you discover, track, and engage with the best AVN experiences.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com/avndirectory" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse All Games
                </Link>
              </li>
              <li>
                <Link to="/top-rated" className="text-muted-foreground hover:text-foreground transition-colors">
                  Top Rated
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
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/developer-hub" className="text-muted-foreground hover:text-foreground transition-colors">
                  Developer Hub
                </Link>
              </li>
              <li>
                <Link to="/submit-game" className="text-muted-foreground hover:text-foreground transition-colors">
                  Submit Your Game
                </Link>
              </li>
              <li>
                <Link to="/advertising" className="text-muted-foreground hover:text-foreground transition-colors">
                  Advertising
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
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
            </ul>
          </div>
        </div>

        <Separator />

        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h3 className="font-semibold text-lg">Stay Updated</h3>
          <p className="text-muted-foreground text-sm">
            Subscribe to our newsletter for new releases, updates, and exclusive content.
          </p>
          <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border bg-background"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary" /> by the AVN Directory Team
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <p className="font-semibold">18+ Only. Adult Content.</p>
            <span>&copy; {new Date().getFullYear()} AVN Directory. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
