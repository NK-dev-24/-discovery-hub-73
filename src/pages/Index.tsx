import { useState, useEffect, Suspense, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterBar } from "@/components/FilterBar";
import { AVNCard } from "@/components/AVNCard";
import { LoadingState } from "@/components/LoadingState";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { avns, genres } from "@/data/avns";
import { Genre } from "@/types/avn";
import { Helmet } from "react-helmet";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import debounce from "lodash/debounce";
import { Analytics } from "@vercel/analytics/react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setDebouncedSearchTerm(term);
      if (term.length > 0) {
        console.log("Search tracked:", term);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredAVNs = avns.filter((avn) => {
    try {
      const matchesSearch =
        debouncedSearchTerm === "" ||
        avn.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        avn.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        avn.developer.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesGenres =
        selectedGenres.length === 0 ||
        selectedGenres.every((genre) => avn.genre.includes(genre));

      return matchesSearch && matchesGenres;
    } catch (error) {
      console.error("Error filtering AVNs:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem filtering the results."
      });
      return false;
    }
  });

  const handleGenreToggle = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
    console.log("Genre toggled:", genre);
  };

  const featuredAVNs = filteredAVNs.filter(avn => avn.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Analytics />
      <Helmet>
        <title>AVN Directory - Visual Novel Directory</title>
        <meta name="description" content="Explore our curated collection of visual novels." />
        <meta property="og:title" content="AVN Directory - Visual Novel Directory" />
        <meta property="og:description" content="Explore our curated collection of visual novels." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <ErrorBoundary>
        <Header />
        
        <main className="flex-1 container py-8">
          <section className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center cyber-gradient overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-6 md:space-y-8 relative z-10">
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground neon-text">
                  Discover Your Next AVN Adventure
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Enter a world of immersive storytelling and unforgettable characters
                </p>
              </div>
              
              <div className={cn(
                "transition-all duration-300 max-w-2xl mx-auto transform",
                isScrolled ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              )}>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-xl opacity-75 blur group-hover:opacity-100 transition duration-300" />
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search AVNs by title, genre, or developer..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 text-base rounded-lg shadow-lg 
                               bg-background/80 backdrop-blur-md border-muted/50
                               focus:bg-background/90 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      aria-label="Search AVNs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
            availableGenres={genres}
            isSticky={isScrolled}
            showSearch={isScrolled}
          />

          <div className="container max-w-screen-2xl mx-auto px-4 py-8 md:py-12">
            <Suspense fallback={<LoadingState />}>
              {isLoading ? (
                <LoadingState />
              ) : (
                <div className="space-y-12">

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Find your next AVN</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                      {filteredAVNs.length > 0 ? (
                        filteredAVNs.map((avn) => (
                          <AVNCard key={avn.id} avn={avn} />
                        ))
                      ) : (
                        <div className="col-span-full text-center py-12">
                          <p className="text-xl text-muted-foreground">
                            No AVNs found matching your criteria
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              )}
            </Suspense>
          </div>
        </main>
        
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default Index;
