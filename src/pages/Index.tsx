import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterBar } from "@/components/FilterBar";
import { AVNCard } from "@/components/AVNCard";
import { avns, genres } from "@/data/avns";
import { Genre } from "@/types/avn";
import { Helmet } from "react-helmet";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredAVNs = avns.filter((avn) => {
    const matchesSearch =
      searchQuery === "" ||
      avn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avn.developer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenres =
      selectedGenres.length === 0 ||
      selectedGenres.every((genre) => avn.genre.includes(genre));

    return matchesSearch && matchesGenres;
  });

  const handleGenreToggle = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>AVN Directory - Discover Amazing Visual Novels</title>
        <meta 
          name="description" 
          content="Explore our curated collection of Adult Visual Novels. Find your next favorite story across various genres including Fantasy, Romance, Sci-Fi, and more." 
        />
      </Helmet>

      <Header />
      
      <main className="flex-1">
        <section className="relative w-full min-h-[40vh] flex items-center justify-center cyber-gradient overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)`
            }}
          />
          
          <div className="container max-w-4xl mx-auto px-4 py-12 space-y-8 relative z-10">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground neon-text">
                Discover Your Next AVN Adventure
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                  <Input
                    type="search"
                    placeholder="Search AVNs by title, genre, or developer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 text-base rounded-lg shadow-lg transition-all duration-200 
                             bg-background/80 backdrop-blur-md border-muted/50
                             focus:bg-background/90 focus:border-primary focus:ring-2 focus:ring-primary/20
                             text-foreground placeholder:text-muted-foreground"
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

        <div className="container max-w-screen-2xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
