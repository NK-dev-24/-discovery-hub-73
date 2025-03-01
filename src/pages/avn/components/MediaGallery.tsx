import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { Image as ImageIcon, X, Maximize2, ChevronLeft, ChevronRight, Youtube, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaType = 'image' | 'video' | 'youtube';

interface MediaItem {
  type: MediaType;
  url: string;
  thumbnail?: string;
  title?: string;
}

interface MediaGalleryProps {
  media: MediaItem[];
}

export const MediaGallery = ({ media }: MediaGalleryProps) => {
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
  const lastTapTimeRef = useRef(0);

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
