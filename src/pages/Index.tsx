import { useState, useEffect, Suspense, useCallback, useMemo } from "react";
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
import "@/styles/animations.css";

function useRotatingPlaceholder() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Search for 'fantasy RPG'",
    "Try 'space adventure'",
    "Find 'romance visual novel'",
    "Discover 'mystery games'"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return placeholders[placeholderIndex];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const { toast } = useToast();

  // Get featured AVNs before filtering
  const featuredAVNs = useMemo(() => 
    avns.filter(avn => avn.featured).slice(0, 3)
  , []);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % 3);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
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
        
        <main className="flex-1">
          <section className="relative w-full min-h-[30vh] md:min-h-[35vh] flex items-center justify-center cyber-gradient overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 bg-[url('/images/cyber-bg.webp')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            
            {/* Main content */}
            <div className="w-full md:container md:max-w-7xl mx-auto px-0 md:px-4 py-4 md:py-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6 items-center px-3 md:px-0">
                {/* Left column - Content */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h1 className="leading-tight">
                      <span className="block text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-foreground/90 text-shadow-sm">
                        Discover Your Next
                      </span>
                      <span className="block text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight heading-gradient text-shadow-lg mt-1">
                        AVN Adventure
                      </span>
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground/80 max-w-xl fade-in font-light">
                      Enter a world of immersive storytelling
                    </p>
                  </div>

                  {/* Search and filters section */}
                  <div className={cn(
                    "space-y-3 w-full fade-in",
                    isScrolled ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                  )}>
                    <div className="relative group">
                      <div className="relative flex items-center search-glow rounded-lg overflow-hidden">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-pulse-subtle" />
                        <Input
                          type="search"
                          placeholder={useRotatingPlaceholder()}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full h-12 pl-12 pr-28 text-base shadow-lg 
                                   bg-background/90 backdrop-blur-md border-primary/20
                                   focus:bg-background/95 focus:border-primary/40
                                   transition-all duration-300 ease-in-out"
                          aria-label="Search AVNs"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 
                                         px-6 h-9 bg-primary hover:bg-primary/90
                                         text-primary-foreground font-medium
                                         transition-all duration-300 rounded
                                         hover:shadow-lg active:transform active:scale-95">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column - Featured AVNs */}
                <div className="relative w-full md:w-[300px] h-[180px] md:h-[220px] overflow-hidden rounded-lg featured-card">
                  <div 
                    className="absolute inset-0 flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                  >
                    {featuredAVNs.map((avn, index) => (
                      <div
                        key={avn.id}
                        className="relative w-full flex-none cursor-pointer"
                        onClick={() => window.location.href = `/avn/${avn.id}`}
                      >
                        <div className="relative h-full overflow-hidden group">
                          <img
                            src={avn.image || '/placeholder-avn.webp'}
                            alt={avn.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-3 w-full">
                            <h3 className="text-base font-semibold text-foreground/90 truncate text-shadow-sm">{avn.title}</h3>
                            <p className="text-sm text-muted-foreground/80 truncate">{avn.developer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Navigation dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1.5">
                    {featuredAVNs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          index === activeSlide 
                            ? "w-4 bg-primary shadow-lg" 
                            : "w-1.5 bg-muted-foreground/30 hover:bg-primary/40"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
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

          <div className="w-full md:container md:max-w-screen-2xl mx-auto px-2 md:px-4 py-8 md:py-12">
            <Suspense fallback={<LoadingState />}>
              {isLoading ? (
                <LoadingState />
              ) : (
                <div className="space-y-12">

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold px-2 md:px-0">Find your next AVN</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-6">
                      {filteredAVNs.length > 0 ? (
                        filteredAVNs.map((avn) => (
                          <div key={avn.id} className="px-2 md:px-0">
                            <AVNCard avn={avn} />
                          </div>
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