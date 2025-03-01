import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { avns } from "@/data/avns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ArrowLeft, Sparkles, Calendar, ChevronDown, ChevronUp, DollarSign, CheckCircle, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { generateMetaTags, generateSchemaData } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MediaGallery } from "./avn/components/MediaGallery";
import { StatusPill } from "./avn/components/StatusPill";
import { PlatformIcon, DistributionIcon } from "./avn/components/PlatformIcons";
import { AVNBadge } from "./avn/components/AVNBadge";
import { cn } from "@/lib/utils";
import { MediaItem, MediaType } from "@/types/avn";

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

  const avnMedia: MediaItem[] = avn ? [
    { 
      type: 'image', 
      url: avn.image || 'https://placehold.co/1280x720?text=No+Image+Available', 
      title: avn.title 
    },
    ...((avn as any).screenshots || []).map((url: string) => ({ 
      type: 'image' as MediaType, 
      url,
      title: 'Screenshot'
    })),
    ...((avn as any).videos || []).map((url: string) => ({ 
      type: 'video' as MediaType, 
      url,
      thumbnail: avn.image || 'https://placehold.co/1280x720?text=Video+Thumbnail',
      title: 'Video'
    })),
    ...((avn as any).youtubeVideos || []).map((url: string) => ({ 
      type: 'youtube' as MediaType, 
      url,
      title: 'YouTube Video'
    }))
  ] : [];

  if (avnMedia.length <= 1) {
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

  const seoData = generateMetaTags({
    title: avn.title,
    description: avn.description,
    image: avn.image,
    url: window.location.href,
    type: 'article'
  });

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
            <motion.div 
              className="relative md:rounded-lg overflow-hidden group neon-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
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
                
                <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                  {avn.featured && (
                    <AVNBadge variant="primary" className="animate-pulse-subtle">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </AVNBadge>
                  )}
                  {avn.status && (
                    <StatusPill status={avn.status} />
                  )}
                </div>

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

                <div className="px-4 py-6 md:absolute md:bottom-0 md:left-0 md:right-0 md:p-6 md:bg-gradient-to-t md:from-background md:to-transparent">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h1 className="text-3xl md:text-4xl font-bold text-gradient">{avn.title}</h1>
                    
                    <div className="space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
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

            <div className="px-4 md:px-0">
              <div className="grid gap-6 md:gap-8 md:grid-cols-3">
                <motion.div 
                  className="md:col-span-2 space-y-6 md:space-y-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
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

                  <div className="space-y-4 neon-glow p-4 md:p-6 rounded-lg bg-card/50">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">Synopsis</h2>
                    <div className="relative">
                      <p className={cn(
                        "text-base md:text-lg text-muted-foreground leading-relaxed",
                        !isDescriptionExpanded &&
                        "line-clamp-5"
                      )}>
                        {avn.description}
                      </p>
                      {avn.description.length > 300 && (
                        <button
                          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-card to-transparent py-2 text-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                          {isDescriptionExpanded ? (
                            <>
                              Show Less
                              <ChevronUp className="inline-block w-4 h-4 ml-1 mb-0.5" />
                            </>
                          ) : (
                            <>
                              Show More
                              <ChevronDown className="inline-block w-4 h-4 ml-1 mb-0.5" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 neon-glow p-4 md:p-6 rounded-lg bg-card/50">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">Additional Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {avn.genre && avn.genre.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-muted-foreground mb-2">Genre</h3>
                          <div className="flex flex-wrap gap-2">
                            {avn.genre.map((genre) => (
                              <Badge key={genre} variant="secondary">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {avn.platforms && avn.platforms.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-muted-foreground mb-2">Platforms</h3>
                          <div className="flex flex-wrap gap-2">
                            {avn.platforms.map((platform) => (
                              <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                                <PlatformIcon platform={platform} />
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {avn.distributions && avn.distributions.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-muted-foreground mb-2">Distributions</h3>
                          <div className="flex flex-wrap gap-2">
                            {avn.distributions.map((distro) => (
                              <a key={distro.platform} href={distro.url} target="_blank" rel="noopener noreferrer">
                                <Badge variant="outline" className="flex items-center gap-1 hover:neon-shadow transition-all duration-300">
                                  <DistributionIcon platform={distro.platform} />
                                  {distro.platform}
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </Badge>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {avn.tags && avn.tags.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-muted-foreground mb-2">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {avn.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="md:col-span-1 space-y-6 md:space-y-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="space-y-4 neon-glow p-4 md:p-6 rounded-lg bg-card/50">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Rating
                    </h2>
                    <div className="text-4xl font-bold text-foreground">
                      {avn.rating}
                    </div>
                    <p className="text-muted-foreground">
                      Based on {avn.reviewCount} reviews
                    </p>
                    <Button className="w-full hover:neon-shadow transition-all duration-300">
                      Write a Review
                    </Button>
                  </div>

                  <div className="space-y-4 neon-glow p-4 md:p-6 rounded-lg bg-card/50">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">External Links</h2>
                    <div className="space-y-2">
                      {avn.externalLinks && avn.externalLinks.length > 0 && (
                        avn.externalLinks.map((link) => (
                          <Button
                            key={link.label}
                            asChild
                            variant="outline"
                            className="w-full justify-start hover:neon-shadow transition-all duration-300"
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2">
                              {link.label}
                              <ExternalLink className="h-4 w-4 ml-auto" />
                            </a>
                          </Button>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
