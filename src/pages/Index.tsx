
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

  const featuredAVNs = filteredAVNs.filter((avn) => avn.featured);

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
        <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-orange-50 to-purple-50">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
          <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-8 relative z-10">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Discover Your Next AVN Adventure
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                Explore our curated collection of Adult Visual Novels. Find your perfect story.
              </p>
            </div>
            
            <div className={cn(
              "transition-all duration-300",
              isScrolled ? "opacity-0" : "opacity-100"
            )}>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search AVNs by title, genre, or developer..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 text-lg rounded-xl shadow-sm transition-all duration-200 
                           focus:shadow-md focus:scale-[1.01] bg-white/80 backdrop-blur"
                />
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

        <div className="container py-12 space-y-12">
          {featuredAVNs.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Featured AVNs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAVNs.map((avn) => (
                  <AVNCard key={avn.id} avn={avn} />
                ))}
              </div>
            </section>
          )}

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">All AVNs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAVNs.map((avn) => (
                <AVNCard key={avn.id} avn={avn} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
