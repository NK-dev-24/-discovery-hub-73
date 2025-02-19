
import { AVN } from "@/types/avn";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface AVNCardProps {
  avn: AVN;
}

export const AVNCard = ({ avn }: AVNCardProps) => {
  return (
    <Link to={`/avn/${avn.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card className="group relative overflow-hidden bg-gradient-to-br from-background to-background/95 dark:from-background/80 dark:to-background border border-border/50 hover:border-primary/50 transition-all duration-300">
          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 blur-xl" />
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden">
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent z-10" />

              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${avn.image})` }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Featured Badge */}
              {avn.featured && (
                <div className="absolute top-4 right-4 z-20">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="relative overflow-hidden bg-white/70 dark:bg-black/30 backdrop-blur-md border border-primary/20 shadow-sm px-3 py-1.5"
                    >
                      <span className="relative z-10 flex items-center gap-2 text-primary font-medium">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </Badge>
                  </motion.div>
                </div>
              )}

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pt-12 bg-gradient-to-t from-background via-background/95 to-transparent">
                <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {avn.title}
                </h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative z-20 p-6 pt-4 space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {avn.description}
              </p>

              {/* Custom Button */}
              <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground border-0 shadow-md hover:shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
                <span className="flex items-center gap-2">
                  Explore Now
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};
