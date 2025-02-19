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
        <section className="relative w-full min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)`
            }}
          />
          
          <div className="container max-w-4xl mx-auto px-4 py-12 space-y-6 relative z-10">
            <div className="text-center space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90">
                Discover Your Next AVN Adventure
              </h1>
              <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
                Explore our curated collection of Adult Visual Novels. Find your perfect story.
              </p>
            </div>
            
            <div className={cn(
              "transition-all duration-300 max-w-2xl mx-auto",
              isScrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"
            )}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 group-hover:-inset-0.5 opacity-75" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-white/80 transition-colors duration-200" />
                  <Input
                    type="search"
                    placeholder="Search AVNs by title, genre, or developer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 text-base rounded-lg shadow-lg transition-all duration-200 
                             bg-white/10 backdrop-blur-md border-white/10
                             focus:bg-white/15 focus:border-white/20 focus:ring-2 focus:ring-purple-500/20
                             text-white placeholder:text-white/40"
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
            {filteredAVNs.map((avn) => (
              <AVNCard key={avn.id} avn={avn} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
