
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Site Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
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
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                  Submit your AVN
                </Link>
              </li>
              <li>
                <Link to="/genres" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse by Genre
                </Link>
              </li>
              <li>
                <a 
                  href="https://discord.gg/avndirectory" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Join our Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 space-y-4">
          <p className="text-lg text-center max-w-2xl mx-auto">
            On a mission to help you discover the best Adult Visual Novels and connect with their creators.
          </p>
          
          <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold">This site contains adult content. 18+ Only.</p>
            <p>&copy; {new Date().getFullYear()} AVN Directory. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
