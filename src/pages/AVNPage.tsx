
import { useParams } from "react-router-dom";
import { avns } from "@/data/avns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AVNPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const avn = avns.find(a => a.id === id);
  
  if (!avn) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">AVN Not Found</h1>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Button>
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
          <Button 
            onClick={() => navigate("/")} 
            variant="outline"
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Button>

          <div className="space-y-8">
            <div className="relative aspect-[21/9] rounded-lg overflow-hidden">
              <img
                src={avn.image}
                alt={`Cover image for ${avn.title}`}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{avn.title}</h1>
                  <p className="text-xl text-muted-foreground">
                    by {avn.developer}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Synopsis</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {avn.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {avn.genre.map((g) => (
                      <Badge key={g} variant="secondary" className="text-base">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-card rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-6 w-6 fill-primary text-primary" />
                    <span className="text-2xl font-bold">{avn.rating}</span>
                    <span className="text-muted-foreground">
                      ({avn.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="space-y-3">
                    {avn.website && (
                      <Button className="w-full" asChild>
                        <a
                          href={avn.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {avn.support && (
                      <Button variant="outline" className="w-full" asChild>
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
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <Badge variant="secondary" className="bg-primary/20">
                      Featured Title
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
