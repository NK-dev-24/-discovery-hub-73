import { AVN, Genre } from "@/types/avn";

export const avns: AVN[] = [
  {
    id: "1",
    title: "Stellar Choices",
    description: "A sci-fi adventure where your choices shape the fate of an interstellar colony. Navigate complex relationships and uncover dark secrets aboard the colony ship. As the newly appointed Chief of Operations, you must balance maintaining the ship's systems, managing crew relationships, and investigating mysterious occurrences that threaten the mission's success. Every decision you make will impact not only your personal relationships but the survival of thousands of colonists sleeping in cryostasis. Will you prioritize the mission, pursue romance, or try to have it all?",
    genre: ["Sci-Fi", "Romance", "Mystery"],
    developer: "Nova Interactive",
    website: "https://example.com/stellar-choices",
    support: "https://ko-fi.com/nova-interactive",
    rating: 4.8,
    reviewCount: 256,
    featured: true,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    status: "Ongoing",
    version: "0.8.5",
    lastUpdated: "2024-03-15",
    platforms: ["Windows", "Mac", "Android"],
    distribution: [
      {
        platform: "Steam",
        url: "https://store.steampowered.com/stellar-choices"
      },
      {
        platform: "Itch.io",
        url: "https://nova-interactive.itch.io/stellar-choices"
      }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    ],
    price: "paid",
    earlyAccess: true
  },
  {
    id: "2",
    title: "Mystic Academy",
    description: "Discover your magical abilities at an elite school for supernatural beings. Form alliances, master spells, and maybe find love along the way. As a new student with a mysterious past, you'll need to navigate complex social hierarchies, master your unique magical abilities, and uncover the truth about your heritage. The academy holds many secrets, and not all of them are meant to be discovered. Your choices in classes, social events, and magical duels will shape your destiny and the future of the magical world.",
    genre: ["Fantasy", "Romance"],
    developer: "Enchanted Studios",
    website: "https://example.com/mystic-academy",
    support: "https://patreon.com/enchanted-studios",
    rating: 4.6,
    reviewCount: 189,
    featured: true,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    status: "Completed",
    version: "1.2.0",
    lastUpdated: "2024-02-28",
    platforms: ["Windows", "Mac", "iOS", "Android"],
    distribution: [
      {
        platform: "Steam",
        url: "https://store.steampowered.com/mystic-academy"
      },
      {
        platform: "Itch.io",
        url: "https://enchanted-studios.itch.io/mystic-academy"
      }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9",
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70",
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f"
    ],
    price: "paid",
    earlyAccess: false
  },
  {
    id: "3",
    title: "Neon Hearts",
    description: "In a cyberpunk metropolis, navigate corporate intrigue and passionate romances. Your choices will determine the future of both your heart and the city. As a rising star in the underground hacking scene, you've caught the attention of both powerful corporations and dangerous crime syndicates. Balance your growing influence with personal relationships, all while trying to uncover a conspiracy that could reshape the entire city. Every hack, every conversation, and every romance could be the key to survival or downfall.",
    genre: ["Sci-Fi", "Romance", "Drama"],
    developer: "Digital Dreams",
    website: "https://example.com/neon-hearts",
    rating: 4.5,
    reviewCount: 145,
    featured: false,
    image: "https://i.ytimg.com/vi/-IjJHYzTa5k/maxresdefault.jpg",
    status: "Ongoing",
    version: "0.6.2",
    lastUpdated: "2024-03-10",
    platforms: ["Windows", "Linux", "Web"],
    distribution: [
      {
        platform: "Itch.io",
        url: "https://digital-dreams.itch.io/neon-hearts"
      },
      {
        platform: "Custom",
        url: "https://neonhearts.game"
      }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb",
      "https://images.unsplash.com/photo-1542751371-6533d324f6b3"
    ],
    price: "free",
    earlyAccess: true
  },
  {
    id: "4",
    title: "Shadow Manor",
    description: "Unravel the mysteries of an ancient mansion while avoiding supernatural threats. Who can you trust when everyone has secrets? As the new caretaker of Shadow Manor, you've inherited more than just a crumbling estate. Each room holds dark secrets, and the mansion's inhabitants - both living and otherwise - have their own agendas. Your investigation into the manor's history will reveal family curses, forbidden love, and ancient rituals. But be careful - some secrets are better left buried.",
    genre: ["Horror", "Mystery"],
    developer: "Darklight Games",
    website: "https://example.com/shadow-manor",
    support: "https://buymeacoffee.com/darklight",
    rating: 4.7,
    reviewCount: 203,
    featured: true,
    image: "https://img.itch.zone/aW1nLzE4OTkxODkwLnBuZw==/original/%2FqXjL9.png",
    status: "Hiatus",
    version: "0.9.1",
    lastUpdated: "2024-01-15",
    platforms: ["Windows", "Mac"],
    distribution: [
      {
        platform: "Steam",
        url: "https://store.steampowered.com/shadow-manor"
      }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1505409859467-3a796fd5798e",
      "https://images.unsplash.com/photo-1507196476240-088916fabc57",
      "https://images.unsplash.com/photo-1499744937866-d7e566a20a61"
    ],
    price: "paid",
    earlyAccess: true
  },
  {
    id: "5",
    title: "Love & Laughter",
    description: "A lighthearted romantic comedy about finding love in unexpected places. Navigate hilarious situations and charming characters. As a struggling comedian trying to make it big in the city, you'll juggle your budding career with an increasingly complicated love life. From awkward blind dates to comedy club mishaps, every choice leads to new adventures and potential romance. With multiple love interests, each with their own dreams and quirks, who will end up being your perfect match?",
    genre: ["Romance", "Comedy"],
    developer: "Heart Studio",
    website: "https://example.com/love-and-laughter",
    rating: 4.4,
    reviewCount: 167,
    featured: false,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    status: "Planned",
    version: "0.1.0",
    lastUpdated: "2024-03-01",
    platforms: ["Windows", "Mac", "Web"],
    distribution: [
      {
        platform: "Itch.io",
        url: "https://heart-studio.itch.io/love-and-laughter"
      }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1517242027094-631f8c218a0f",
      "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f",
      "https://images.unsplash.com/photo-1508511267-5a04ee04ca95"
    ],
    price: "free",
    earlyAccess: false
  }
];

export const genres: Genre[] = ["Fantasy", "Romance", "Sci-Fi", "Mystery", "Horror", "Comedy", "Drama"];
