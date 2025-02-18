
import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { AVNCard } from "@/components/AVNCard";
import { AVNDetail } from "@/components/AVNDetail";
import { avns, genres } from "@/data/avns";
import { AVN, Genre } from "@/types/avn";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedAVN, setSelectedAVN] = useState<AVN | null>(null);

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
      <Header viewMode={viewMode} onViewModeChange={setViewMode} />
      
      <main className="flex-1 py-8">
        <div className="container space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Discover Amazing AVNs
            </h2>
            <p className="text-muted-foreground max-w-3xl">
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
              <h3 className="text-xl font-semibold">Featured AVNs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAVNs.map((avn) => (
                  <AVNCard
                    key={avn.id}
                    avn={avn}
                    onClick={() => setSelectedAVN(avn)}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">All AVNs</h3>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAVNs.map((avn) => (
                <AVNCard
                  key={avn.id}
                  avn={avn}
                  onClick={() => setSelectedAVN(avn)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {selectedAVN && (
        <AVNDetail
          avn={selectedAVN}
          open={!!selectedAVN}
          onOpenChange={(open) => !open && setSelectedAVN(null)}
        />
      )}
    </div>
  );
};

export default Index;
