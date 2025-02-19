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
  // Determine tag based on AVN properties
  const getTag = () => {
    if (avn.featured) return "Featured";
    if (avn.isNew) return "New";
    return undefined;
  };

  return (
    <Link to={`/avn/${avn.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card className="group relative overflow-hidden border border-border/40 bg-gradient-to-br from-background/80 to-background">
          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 blur-xl" />
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden rounded-t-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-background z-10" />
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${avn.image})` }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Tag with New Animation Effect */}
              {getTag() && (
                <div className="absolute top-4 right-4 z-20">
                  <Badge
                    variant="secondary"
                    className="relative overflow-hidden bg-black/30 backdrop-blur-md border border-primary/50 px-3 py-1.5"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-primary-foreground">
                      <Sparkles className="w-3 h-3" />
                      {getTag()}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                    />
                  </Badge>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="relative z-20 p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {avn.title}
                </h3>
                <p className="text-sm text-muted-foreground/90 line-clamp-2">
                  {avn.description}
                </p>
              </div>

              {/* Custom Button */}
              <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300">
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
