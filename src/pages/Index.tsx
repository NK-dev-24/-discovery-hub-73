
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { AVNCard } from "@/components/AVNCard";
import { avns, genres } from "@/data/avns";
import { Genre } from "@/types/avn";
import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
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
        <div className={cn(
          "relative w-full transition-all duration-300 ease-in-out",
          "bg-gradient-to-br from-background via-purple-50/10 to-background",
          "before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-5",
          isScrolled ? "h-0 opacity-0" : "h-[50vh] opacity-100"
        )}>
          <div className="container h-full flex flex-col items-center justify-center text-center space-y-8 py-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
              Discover Amazing AVNs
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg md:text-xl animate-fade-in delay-100">
              Explore our curated collection of Adult Visual Novels. Find your next favorite story.
            </p>
          </div>
        </div>

        <div className={cn(
          "w-full transition-all duration-300 ease-in-out",
          isScrolled ? "sticky top-16 bg-background/95 backdrop-blur z-40 shadow-sm" : ""
        )}>
          <div className="container py-6">
            <SearchAndFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
              availableGenres={genres}
              isSticky={isScrolled}
            />
          </div>
        </div>

        <div className="container space-y-12 py-8">
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
