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
  Image as ImageIcon,
  CheckCircle,
  Activity,
  Pause,
  CalendarClock,
  XCircle,
  DollarSign,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Youtube
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Status, Platform, Distribution } from "@/types/avn";
// Platform Icons
import { FaWindows, FaApple, FaLinux, FaAndroid, FaMobile, FaGlobe } from "react-icons/fa";
// Distribution Icons
import { FaSteam, FaItchIo } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { generateMetaTags, generateSchemaData } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";

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
        return "bg-emerald-500/90 border-emerald-400";
      case "Ongoing":
        return "bg-blue-500/90 border-blue-400";
      case "Hiatus":
        return "bg-amber-500/90 border-amber-400";
      case "Planned":
        return "bg-violet-500/90 border-violet-400";
      case "Dropped":
        return "bg-rose-500/90 border-rose-400";
      default:
        return "bg-gray-500/90 border-gray-400";
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-3 w-3" />;
      case "Ongoing":
        return <Activity className="h-3 w-3" />;
      case "Hiatus":
        return <Pause className="h-3 w-3" />;
      case "Planned":
        return <CalendarClock className="h-3 w-3" />;
      case "Dropped":
        return <XCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)} text-white shadow-sm backdrop-blur-sm`}>
      {getStatusIcon(status)}
      <span>{status}</span>
    </div>
  );
};

// Unified Badge component for consistent styling
const AVNBadge = ({ 
  children, 
  variant = "default",
  className = ""
}: { 
  children: React.ReactNode, 
  variant?: "primary" | "success" | "warning" | "info" | "default",
  className?: string
}) => {
  const variantStyles = {
    primary: "bg-primary/85 text-primary-foreground border-primary/70",
    success: "bg-emerald-500/85 text-white border-emerald-400/70",
    warning: "bg-amber-500/85 text-white border-amber-400/70",
    info: "bg-blue-500/85 text-white border-blue-400/70",
    default: "bg-secondary/85 text-secondary-foreground border-secondary/70"
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shadow-sm backdrop-blur-sm ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Media Gallery Types
type MediaType = 'image' | 'video' | 'youtube';

interface MediaItem {
  type: MediaType;
  url: string;
  thumbnail?: string;
  title?: string;
}

// Media Gallery Component
const MediaGallery = ({ media }: { media: MediaItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [zoomState, setZoomState] = useState({ scale: 1, position: { x: 0, y: 0 } });
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragX = useMotionValue(0);
  const controls = useAnimation();

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'Escape') setIsFullscreen(false);
        if (e.key === 'ArrowLeft') setActiveIndex((prev) => Math.max(0, prev - 1));
        if (e.key === 'ArrowRight') setActiveIndex((prev) => Math.min(media.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, media.length]);

  // Handle media loading
  const handleMediaLoad = () => {
    setIsLoading(false);
    setLoadError(null);
  };

  const handleMediaError = (errorMessage: string) => {
    setIsLoading(false);
    setLoadError(errorMessage);
  };

  // Reset loading state when active index changes
  useEffect(() => {
    setIsLoading(true);
  }, [activeIndex]);

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    dragX.set(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    
    // Only prevent default if we're swiping horizontally significantly
    if (Math.abs(deltaX) > 10) {
      e.preventDefault();
      dragX.set(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current) return;
    
    const dragDistance = dragX.get();
    
    if (Math.abs(dragDistance) > 50) {
      if (dragDistance > 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (dragDistance < 0 && activeIndex < media.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }
    
    controls.start({ x: 0 });
    touchStartRef.current = null;
    dragX.set(0);
  };

  // Double tap to zoom
  const lastTapTimeRef = useRef(0);
  const handleDoubleTap = (e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTapTimeRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      if (zoomState.scale === 1) {
        let x = 0, y = 0;
        
        if ('touches' in e) {
          // Touch event
          const touch = e.touches[0];
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          x = touch.clientX - rect.left;
          y = touch.clientY - rect.top;
        } else {
          // Mouse event
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
        }
        
        setZoomState({
          scale: 2,
          position: { x, y }
        });
      } else {
        setZoomState({
          scale: 1,
          position: { x: 0, y: 0 }
        });
      }
    }
    
    lastTapTimeRef.current = now;
  };

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.querySelector(`[data-index="${activeIndex}"]`);
      if (activeThumb) {
        activeThumb.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }
    }
  }, [activeIndex]);

  // Preload adjacent media
  useEffect(() => {
    const preloadMedia = (index: number) => {
      if (index < 0 || index >= media.length) return;
      const item = media[index];
      
      if (item.type === 'image') {
        const img = new Image();
        img.src = item.url;
      }
    };

    // Preload next and previous
    preloadMedia(activeIndex + 1);
    preloadMedia(activeIndex - 1);
  }, [activeIndex, media]);

  // Extract YouTube ID from URL
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  // Render media content
  const renderMedia = (item: MediaItem) => {
    if (item.type === 'image') {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
          )}
          
          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
              <div className="text-sm text-red-500">{loadError}</div>
            </div>
          )}
          
          <img 
            src={item.url} 
            alt={item.title || 'Screenshot'} 
            className={cn(
              "max-w-full max-h-full object-contain transition-transform duration-300",
              zoomState.scale > 1 && "cursor-zoom-out"
            )}
            style={{
              transform: `scale(${zoomState.scale}) translate(${zoomState.position.x}px, ${zoomState.position.y}px)`
            }}
            loading="lazy"
            onLoad={handleMediaLoad}
            onError={() => handleMediaError('Failed to load image')}
          />
        </div>
      );
    }
    
    if (item.type === 'video') {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
          )}
          
          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
              <div className="text-sm text-red-500">{loadError}</div>
            </div>
          )}
          
          <video 
            src={item.url} 
            controls 
            className="max-w-full max-h-full object-contain"
            poster={item.thumbnail}
            preload="metadata"
            onLoadedData={handleMediaLoad}
            onError={() => handleMediaError('Failed to load video')}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    
    if (item.type === 'youtube') {
      const youtubeId = getYoutubeId(item.url);
      
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
          )}
          
          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
              <div className="text-sm text-red-500">{loadError}</div>
            </div>
          )}
          
          {youtubeId && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
              title={item.title || 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
              onLoad={handleMediaLoad}
              onError={() => handleMediaError('Failed to load YouTube video')}
            />
          )}
        </div>
      );
    }
    
    return null;
  };

  // Render thumbnail
  const renderThumbnail = (item: MediaItem) => {
    if (item.type === 'image') {
      return (
        <img 
          src={item.url} 
          alt={item.title || ''} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      );
    }
    
    if (item.type === 'video') {
      return (
        <div className="relative w-full h-full">
          <img 
            src={item.thumbnail || item.url} 
            alt={item.title || ''} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play className="w-5 h-5 text-white" />
          </div>
        </div>
      );
    }
    
    if (item.type === 'youtube') {
      const youtubeId = getYoutubeId(item.url);
      
      return (
        <div className="relative w-full h-full">
          <img 
            src={youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : item.thumbnail || ''} 
            alt={item.title || ''} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Youtube className="w-5 h-5 text-white" />
          </div>
        </div>
      );
    }
    
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <ImageIcon className="w-5 h-5 text-muted-foreground" />
      </div>
    );
  };

  if (!media.length) return null;

  return (
    <div className="w-full">
      {/* Gallery Container */}
      <div 
        ref={galleryRef}
        className={cn(
          "relative overflow-hidden bg-black/5 backdrop-blur-sm rounded-lg",
          isFullscreen ? "fixed inset-0 z-50 p-4 bg-black/90" : "w-full aspect-video"
        )}
      >
        {/* Media Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 0.3 }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            style={{ x: dragX }}
            className="w-full h-full flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onDoubleClick={handleDoubleTap}
          >
            {renderMedia(media[activeIndex])}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className={cn(
          "absolute inset-x-0 top-0 flex items-center justify-between p-4",
          "opacity-0 hover:opacity-100 transition-opacity duration-300",
          isFullscreen && "opacity-100"
        )}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium bg-black/50 text-white px-2 py-1 rounded-md backdrop-blur-sm">
              {activeIndex + 1} / {media.length}
            </span>
          </div>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <X className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Arrow Navigation - Hidden on Mobile */}
        <div className="hidden md:flex absolute inset-y-0 left-0 items-center">
          <button
            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            className="p-2 m-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
            disabled={activeIndex === 0}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:flex absolute inset-y-0 right-0 items-center">
          <button
            onClick={() => setActiveIndex((prev) => Math.min(media.length - 1, prev + 1))}
            className="p-2 m-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
            disabled={activeIndex === media.length - 1}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div 
        ref={thumbnailsRef}
        className={cn(
          "mt-4 flex gap-2 overflow-x-auto pb-2 snap-x",
          isFullscreen ? "fixed bottom-0 inset-x-0 p-4 bg-black/50 backdrop-blur-sm justify-center" : ""
        )}
      >
        {media.map((item, index) => (
          <button
            key={index}
            data-index={index}
            className={cn(
              "flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden transition-all duration-200 snap-start",
              activeIndex === index 
                ? "ring-2 ring-primary shadow-md scale-105" 
                : "ring-1 ring-white/10 opacity-70 hover:opacity-100"
            )}
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${item.title || `media item ${index + 1}`}`}
          >
            {renderThumbnail(item)}
          </button>
        ))}
      </div>
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

  // Example media items - in a real app, this would come from your data source
  const avnMedia: MediaItem[] = avn ? [
    // Start with the main image
    { 
      type: 'image', 
      url: avn.image || 'https://placehold.co/1280x720?text=No+Image+Available', 
      title: avn.title 
    },
    // Add screenshots if available - safely access with optional chaining
    ...((avn as any).screenshots || []).map((url: string) => ({ 
      type: 'image' as MediaType, 
      url,
      title: 'Screenshot'
    })),
    // Add videos if available - safely access with optional chaining
    ...((avn as any).videos || []).map((url: string) => ({ 
      type: 'video' as MediaType, 
      url,
      thumbnail: avn.image || 'https://placehold.co/1280x720?text=Video+Thumbnail',
      title: 'Video'
    })),
    // Add YouTube videos if available - safely access with optional chaining
    ...((avn as any).youtubeVideos || []).map((url: string) => ({ 
      type: 'youtube' as MediaType, 
      url,
      title: 'YouTube Video'
    }))
  ] : [];

  // For demo purposes, add some example media if none exists
  if (avnMedia.length <= 1) {
    // Only the cover image exists, add some demo media for testing
    avnMedia.push(
      { 
        type: 'image', 
        url: 'https://placehold.co/1280x720?text=Screenshot+1', 
        title: 'Screenshot 1' 
      },
      { 
        type: 'image', 
        url: 'https://placehold.co/1280x720?text=Screenshot+2', 
        title: 'Screenshot 2' 
      },
      { 
        type: 'youtube', 
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
        title: 'Game Trailer' 
      }
    );
  }

  // Generate SEO data
  const seoData = generateMetaTags({
    title: avn.title,
    description: avn.description,
    image: avn.image,
    url: window.location.href,
    type: 'article'
  });

  // Generate schema data
  const schemaData = generateSchemaData(avn);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        {seoData.meta.map((meta, index) => (
          <meta key={index} {...meta} />
        ))}
        {seoData.link.map((link, index) => (
          <link key={index} {...link} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container p-0 md:py-8 md:px-4">
          {/* Breadcrumb Navigation */}
          <div className="px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: avn.title, href: `/avn/${avn.id}` },
                ]}
              />
            </motion.div>
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
            </motion.div>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* Hero Section - Complete Mobile Redesign */}
            <motion.div 
              className="relative md:rounded-lg overflow-hidden group neon-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Mobile-First Cover Layout */}
              <div className="relative">
                {/* Mobile Cover Image */}
                <div className="block md:hidden">
                  <div className="relative aspect-[4/3] w-full">
                    <motion.img
                      src={avn.image}
                      alt={`Cover image for ${avn.title}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>
                </div>

                {/* Desktop Cover Image */}
                <div className="hidden md:block relative aspect-[21/9]">
                  <motion.img
                    src={avn.image}
                    alt={`Cover image for ${avn.title}`}
                    className="object-cover w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-50" />
                </div>
                
                {/* Badge Container with improved visibility */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                  {/* Featured Badge */}
                  {avn.featured && (
                    <AVNBadge variant="primary" className="animate-pulse-subtle">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </AVNBadge>
                  )}
                  
                  {/* Status Badge */}
                  {avn.status && (
                    <StatusPill status={avn.status} />
                  )}
                </div>

                {/* Pricing Badge */}
                <div className="absolute top-4 right-4 z-20">
                  {avn.price === "free" ? (
                    <AVNBadge variant="success">
                      <CheckCircle className="h-4 w-4" />
                      <span>Free</span>
                    </AVNBadge>
                  ) : (
                    <AVNBadge variant="warning">
                      <DollarSign className="h-4 w-4" />
                      <span>Paid</span>
                    </AVNBadge>
                  )}
                </div>

                {/* Title Section - Mobile Optimized */}
                <div className="px-4 py-6 md:absolute md:bottom-0 md:left-0 md:right-0 md:p-6 md:bg-gradient-to-t md:from-background md:to-transparent">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h1 className="text-3xl md:text-4xl font-bold text-gradient">{avn.title}</h1>
                    
                    {/* Developer & Meta Info */}
                    <div className="space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
                      <p className="text-lg md:text-xl text-muted-foreground">
                        by {avn.developer}
                      </p>
                      
                      {/* Version & Date */}
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

                      {/* Platform Icons */}
                      {avn.platforms && avn.platforms.length > 0 && (
                        <div className="flex items-center gap-2">
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

            {/* Content Grid */}
            <div className="px-4 md:px-0">
              <div className="grid gap-6 md:gap-8 md:grid-cols-3">
                {/* Main Content */}
                <motion.div 
                  className="md:col-span-2 space-y-6 md:space-y-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {/* Media Gallery - New Section */}
                  {avnMedia.length > 0 && (
                    <div className="space-y-4 bg-card/50 p-4 md:p-6 rounded-lg">
                      <h2 className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-primary" />
                        Media Gallery
                      </h2>
                      <div className="w-full max-w-full overflow-hidden">
                        <MediaGallery media={avnMedia} />
                      </div>
                    </div>
                  )}

                  {/* Synopsis */}
                  <div className="space-y-4 neon-glow p-4 md:p-6 rounded-lg bg-card/50">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">Synopsis</h2>
                    <div className="relative">
                      <p className={cn(
                        "text-base md:text-lg text-muted-foreground leading-relaxed",
                        !isDescriptionExpanded &&
