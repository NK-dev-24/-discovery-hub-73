import { useParams } from "react-router-dom";
import { avns } from "@/data/avns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

export default function AVNPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
        {/* Open Graph tags for better social sharing */}
        <meta property="og:title" content={`${avn.title} - AVN Directory`} />
        <meta property="og:description" content={avn.description} />
        {avn.image && <meta property="og:image" content={avn.image} />}
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="mb-8 hover:neon-shadow transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Directory
            </Button>

            <div className="space-y-8">
              <motion.div 
                className="relative aspect-[21/9] rounded-lg overflow-hidden group neon-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-50 z-10" />
                <motion.img
                  src={avn.image}
                  alt={`Cover image for ${avn.title}`}
                  className="object-cover w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                {avn.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge
                      variant="secondary"
                      className="relative overflow-hidden bg-black/30 backdrop-blur-md border border-primary/50 px-3 py-1.5"
                    >
                      <span className="relative z-10 flex items-center gap-2 text-primary-foreground">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/40 to-purple-500/40"
                        animate={{ x: ["0%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </Badge>
                  </div>
                )}
              </motion.div>

              <div className="grid gap-8 md:grid-cols-3">
                <motion.div 
                  className="md:col-span-2 space-y-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div>
                    <h1 className="text-4xl font-bold mb-3 text-gradient">{avn.title}</h1>
                    <p className="text-xl text-muted-foreground">
                      by {avn.developer}
                    </p>
                  </div>

                  <div className="space-y-4 neon-glow p-6 rounded-lg bg-card/50">
                    <h2 className="text-2xl font-semibold text-foreground">Synopsis</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {avn.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-foreground">Genres</h2>
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
                  <div className="p-6 bg-card rounded-lg neon-border">
                    <div className="flex items-center gap-2 mb-6">
                      <Star className="h-6 w-6 fill-primary text-primary" />
                      <span className="text-2xl font-bold text-foreground">{avn.rating}</span>
                      <span className="text-muted-foreground">
                        ({avn.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="space-y-3">
                      {avn.website && (
                        <Button className="w-full hover:neon-shadow transition-all duration-300 pulse-glow" asChild>
                          <a
                            href={avn.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Enter the Story
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {avn.support && (
                        <Button variant="outline" className="w-full hover:neon-shadow transition-all duration-300" asChild>
                          <a
                            href={avn.support}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Support Developer
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {avn.featured && (
                    <div className="p-6 rounded-lg neon-border bg-primary/5">
                      <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured Title
                      </Badge>
                      <p className="mt-3 text-sm text-muted-foreground">
                        This title has been hand-picked by our curators for its exceptional quality and storytelling.
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
