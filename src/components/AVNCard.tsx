
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
    <Link to={`/avn/${avn.id}`} className="block w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card className="group relative overflow-hidden bg-gradient-to-br from-background to-background/95 dark:from-background/80 dark:to-background border border-border/50 hover:border-primary/50 transition-all duration-300 rounded-2xl h-full">
          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 blur-xl" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative aspect-[16/9] overflow-hidden">
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
                <div className="absolute top-3 right-3 z-20">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="relative overflow-hidden bg-white/90 dark:bg-black/30 backdrop-blur-md border-0 shadow-sm px-2.5 py-1 rounded-full"
                    >
                      <span className="relative z-10 flex items-center gap-1.5 text-primary font-medium text-xs">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </Badge>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="relative z-20 p-4 space-y-3 flex-grow flex flex-col">
              <div className="space-y-2 flex-grow">
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {avn.title}
                </h3>
                <p className="text-sm text-muted-foreground/80 line-clamp-2">
                  {avn.description}
                </p>
              </div>

              {/* Custom Button */}
              <Button className="w-full h-10 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground border-0 shadow-md hover:shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 rounded-xl">
                <span className="flex items-center gap-2 font-semibold">
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
