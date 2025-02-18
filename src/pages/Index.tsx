
import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { AVNCard } from "@/components/AVNCard";
import { avns, genres } from "@/data/avns";
import { Genre } from "@/types/avn";
import { Helmet } from "react-helmet";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

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

      <Header viewMode={viewMode} onViewModeChange={setViewMode} />
      
      <main className="flex-1 py-8">
        <div className="container space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Discover Amazing AVNs
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg">
              Explore our curated collection of Adult Visual Novels. Use the search and filters 
              below to find your next favorite story.
            </p>
          </div>

          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
            availableGenres={genres}
          />

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
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAVNs.map((avn) => (
                <AVNCard key={avn.id} avn={avn} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
