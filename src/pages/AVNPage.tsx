import { useParams } from "react-router-dom";
import { avns } from "@/data/avns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Star, 
  ArrowLeft, 
  Sparkles,
  Calendar,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Status, Platform, Distribution } from "@/types/avn";
// Platform Icons
import { FaWindows, FaApple, FaLinux, FaAndroid, FaMobile, FaGlobe } from "react-icons/fa";
// Distribution Icons
import { FaSteam, FaItchIo } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  const iconClass = "h-4 w-4";
  switch (platform) {
    case "Windows":
      return <FaWindows className={iconClass} />;
    case "Mac":
      return <FaApple className={iconClass} />;
    case "Linux":
      return <FaLinux className={iconClass} />;
    case "Android":
      return <FaAndroid className={iconClass} />;
    case "iOS":
      return <FaMobile className={iconClass} />;
    case "Web":
      return <FaGlobe className={iconClass} />;
    default:
      return null;
  }
};

const DistributionIcon = ({ platform, className }: { platform: Distribution["platform"], className?: string }) => {
  const iconClass = className || "h-4 w-4";
  switch (platform) {
    case "Steam":
      return <FaSteam className={iconClass} />;
    case "Itch.io":
      return <FaItchIo className={iconClass} />;
    case "Custom":
      return <SiEpicgames className={iconClass} />;
    case "Other":
      return <ExternalLink className={iconClass} />;
    default:
      return null;
  }
};

const StatusPill = ({ status }: { status: Status }) => {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "Ongoing":
        return "bg-blue-500";
      case "Hiatus":
        return "bg-orange-500";
      case "Planned":
        return "bg-purple-500";
      case "Dropped":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`flex items-center space-x-2 bg-gray-800 rounded-full p-2 text-white`}> 
      <div className={`h-3 w-3 rounded-full ${getStatusColor(status)} animate-pulse`} />
      <span>{status}</span>
    </div>
  );
};

export default function AVNPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  const avn = avns.find(a => a.id === id);
  
  if (!avn) {
    return (
      <div className="container py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-6 text-foreground neon-text">AVN Not Found</h1>
          <Button 
            onClick={() => navigate("/")} 
            variant="outline" 
            className="hover:neon-shadow transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${avn.title} - AVN Directory`}</title>
        <meta name="description" content={avn.description} />
        <meta property="og:title" content={`${avn.title} - AVN Directory`} />
        <meta property="og:description" content={avn.description} />
        {avn.image && <meta property="og:image" content={avn.image} />}
        {/* Remove preload for external resources */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container py-4 md:py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="mb-4 md:mb-8 hover:neon-shadow transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Directory
            </Button>

            <div className="space-y-6 md:space-y-8">
              {/* Hero Section - Improved Mobile Layout */}
              <motion.div 
                className="relative rounded-lg overflow-hidden group neon-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Mobile-optimized aspect ratio */}
                <div className="relative aspect-[16/9] md:aspect-[21/9]">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-50 z-10" />
                  <motion.img
                    src={avn.image}
                    alt={`Cover image for ${avn.title}`}
                    className="object-cover w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Status Badge - Adjusted for mobile */}
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 z-20 flex flex-wrap items-center gap-2">
                    {avn.featured && (
                      <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {avn.status && (
                      <StatusPill status={avn.status} />
                    )}
                  </div>

                  {/* Title Overlay - Mobile Optimized */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background to-transparent z-20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="space-y-2 md:space-y-3"
                    >
                      <h1 className="text-2xl md:text-4xl font-bold text-gradient break-words">{avn.title}</h1>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                        <p className="text-lg md:text-xl text-muted-foreground">
                          by {avn.developer}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          {avn.version && (
                            <Badge variant="outline" className="text-sm bg-black/30 backdrop-blur-sm">
                              v{avn.version}
                            </Badge>
                          )}
                          {avn.lastUpdated && (
                            <Badge variant="outline" className="text-sm flex items-center gap-1 bg-black/30 backdrop-blur-sm">
                              <Calendar className="h-3 w-3" />
                              {new Date(avn.lastUpdated).toLocaleDateString()}
                            </Badge>
                          )}
                        </div>
                        {avn.platforms && avn.platforms.length > 0 && (
                          <div className="flex items-center gap-1">
                            {avn.platforms.map((platform) => (
                              <span key={platform} className="text-muted-foreground/80">
                                <PlatformIcon platform={platform} />
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-6 md:gap-8 md:grid-cols-3">
                <motion.div 
                  className="md:col-span-2 space-y-6 md:space-y-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {/* Synopsis */}
                  <div className="space-y-4 neon-glow p-4 md:p-6 rounded-lg bg-card/50">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">Synopsis</h2>
                    <div className="relative">
                      <p className={cn(
                        "text-base md:text-lg text-muted-foreground leading-relaxed",
                        !isDescriptionExpanded && "line-clamp-3"
                      )}>
                        {avn.description}
                      </p>
                      {avn.description.length > 150 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                          className="mt-2 text-primary hover:text-primary/80"
                        >
                          {isDescriptionExpanded ? (
                            <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
                          ) : (
                            <>Read More <ChevronDown className="ml-1 h-4 w-4" /></>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">Genres</h2>
                    <div className="flex flex-wrap gap-2">
                      {avn.genre.map((g) => (
                        <Badge 
                          key={g} 
                          variant="secondary" 
                          className="text-base bg-primary/10 hover:bg-primary/20 transition-colors"
                        >
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="p-4 md:p-6 bg-card rounded-lg neon-border">
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <span className="text-xl md:text-2xl font-bold text-foreground">Actions</span>
                    </div>

                    <div className="space-y-3">
                      {/* Desktop Actions */}
                      <div className="hidden md:block space-y-3">
                        <Button 
                          className="w-full hover:neon-shadow transition-all duration-300 pulse-glow" 
                          asChild
                        >
                          <a
                            href={avn.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Play Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full hover:neon-shadow transition-all duration-300" 
                          asChild
                        >
                          <a 
                            href={avn.support}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Support Developer
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {avn.featured && (
                    <div className="p-4 md:p-6 rounded-lg neon-border bg-primary/5">
                      <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured Title
                      </Badge>
                      <p className="mt-3 text-sm text-muted-foreground">
                        This title has been hand-picked by our curators for its exceptional quality and storytelling.
                      </p>
                    </div>
                  )}

                  <div className="p-4 md:p-6 bg-card rounded-lg neon-border shadow-lg">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">Available On</h2>
                    <div className="flex flex-wrap gap-4 md:gap-6 mt-4">
                      {avn.distribution.map((dist) => (
                        <div key={dist.platform} className="flex items-center">
                          <DistributionIcon platform={dist.platform} className="h-6 w-6 md:h-8 md:w-8" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Sticky Action Buttons */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border/40 space-y-2">
          <Button 
            className="w-full hover:neon-shadow transition-all duration-300 pulse-glow" 
            asChild
          >
            <a
              href={avn.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Play Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="w-full hover:neon-shadow transition-all duration-300" 
            asChild
          >
            <a 
              href={avn.support}
              target="_blank"
              rel="noopener noreferrer"
            >
              Support Developer
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
