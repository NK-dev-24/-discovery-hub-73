import { AVN, Genre, Platform, Status } from "@/types/avn";

// Fuse.js for fuzzy searching
import Fuse from "fuse.js";

// Type definitions for search
type SearchCategory = 'genre' | 'platform' | 'status' | 'pricing';
type SearchTerm = {
  category: SearchCategory;
  value: string;
  isExact: boolean;
};

interface CacheEntry {
  results: AVN[];
  timestamp: number;
  dataVersion: string; // For cache invalidation on data changes
}

const searchCache = new Map<string, CacheEntry>();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
const MAX_LEVENSHTEIN_DISTANCE = 2;
const MIN_WORD_LENGTH_FOR_FUZZY = 4;

// Enhanced known terms with common variations and typos
const KNOWN_TERMS = {
  pricing: new Set(['free', 'paid', 'free-to-play', 'f2p']),
  status: new Set(['completed', 'ongoing', 'hiatus', 'planned', 'dropped', 'complete', 'finished']),
  platform: new Set(['windows', 'mac', 'linux', 'android', 'ios', 'web', 'mobile', 'pc']),
  genre: new Set<string>()
} as const;

// Common word pairs that should be kept together
const COMMON_PHRASES = new Map([
  ['visual novel', 'genre'],
  ['role playing', 'genre'],
  ['action adventure', 'genre'],
  ['free to play', 'pricing'],
]);

// Common typos and their corrections
const COMMON_TYPOS = new Map([
  ['fandasy', 'fantasy'],
  ['fantacy', 'fantasy'],
  ['romanc', 'romance'],
  ['andriod', 'android'],
  ['complited', 'completed'],
  ['compleet', 'completed'],
  ['windos', 'windows'],
  ['linx', 'linux'],
]);

// Common language patterns
const CONNECTING_WORDS = new Set([
  'and', 'or', 'with', 'for', 'on', 'in', 
  'that', 'which', 'is', 'are', 'the', 'a', 'an'
]);

// Dynamic threshold calculation based on query length and result count
const calculateSearchThreshold = (
  queryLength: number,
  currentResults: number,
  totalItems: number
): number => {
  // Base threshold adjustments
  if (currentResults === 0) {
    return Math.min(0.7, 0.4 + (queryLength * 0.05)); // Gradually increase threshold for longer queries
  }
  
  // If we have too few results relative to dataset size
  if (currentResults < Math.min(3, totalItems * 0.1)) {
    return 0.5;
  }
  
  // Default threshold for good result sets
  return 0.4;
};

// Enhanced tokenization with phrase detection
const tokenizeQuery = (query: string): Set<string> => {
  const normalized = query.toLowerCase().trim();
  const tokens = new Set<string>();
  const words = normalized.split(/\s+/);
  
  // Check for phrases first
  for (let i = 0; i < words.length - 1; i++) {
    const possiblePhrase = `${words[i]} ${words[i + 1]}`;
    if (COMMON_PHRASES.has(possiblePhrase)) {
      tokens.add(possiblePhrase);
      words[i] = '';
      words[i + 1] = '';
    }
  }
  
  // Add remaining words
  words
    .filter(word => word && !CONNECTING_WORDS.has(word))
    .forEach(word => {
      // Check for typos
      const corrected = COMMON_TYPOS.get(word) || word;
      tokens.add(corrected);
    });
  
  return tokens;
};

// Enhanced query parsing with phrase detection
const parseSearchQuery = (query: string): { terms: SearchTerm[], freeText: string[] } => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const terms: SearchTerm[] = [];
  const freeText: string[] = [];
  
  for (let i = 0; i < words.length; i++) {
    // Skip connecting words
    if (CONNECTING_WORDS.has(words[i])) continue;
    
    // Check for two-word phrases
    if (i < words.length - 1) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      const phraseCategory = COMMON_PHRASES.get(phrase);
      
      if (phraseCategory) {
        terms.push({
          category: phraseCategory as SearchCategory,
          value: phrase,
          isExact: true
        });
        i++; // Skip next word as it's part of the phrase
        continue;
      }
    }
    
    // Check single word
    let word = words[i];
    // Check for typos
    word = COMMON_TYPOS.get(word) || word;
    
    let matched = false;
    
    // Check against known terms
    for (const [category, values] of Object.entries(KNOWN_TERMS)) {
      if (values.has(word)) {
        terms.push({
          category: category as SearchCategory,
          value: word,
          isExact: true
        });
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      freeText.push(word);
    }
  }
  
  return { terms, freeText };
};

// Generate a simple hash for data version tracking
const getDataVersion = (avns: AVN[]): string => {
  return avns.map(avn => avn.id).join(',');
};

// Optimized Levenshtein distance with early exit
const levenshteinDistance = (a: string, b: string): number => {
  // Early exit for empty strings
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  // Early exit if strings are too different in length
  if (Math.abs(a.length - b.length) > MAX_LEVENSHTEIN_DISTANCE) {
    return MAX_LEVENSHTEIN_DISTANCE + 1;
  }

  // Use smaller array for memory efficiency
  const row = Array(a.length + 1).fill(0);
  for (let i = 0; i <= a.length; i++) row[i] = i;
  
  let prev;
  let temp;
  
  for (let j = 1; j <= b.length; j++) {
    prev = row[0];
    row[0] = j;
    
    for (let i = 1; i <= a.length; i++) {
      temp = row[i];
      row[i] = Math.min(
        row[i - 1] + 1,
        row[i] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      prev = temp;
      
      // Early exit if we can't get a better result
      if (row[i] > MAX_LEVENSHTEIN_DISTANCE) {
        return MAX_LEVENSHTEIN_DISTANCE + 1;
      }
    }
  }
  
  return row[a.length];
};

// Optimized field score calculation with exact term matching
const calculateFieldScore = (
  field: string[],
  normalizedTokens: Set<string>,
  weight: number,
  exactMatchBonus: number = 0.5,
  isExactField: boolean = false
): number => {
  const normalizedField = new Set(field.map(f => f.toLowerCase()));
  let score = 0;

  for (const token of normalizedTokens) {
    // For exact fields (like pricing, status), only allow exact matches
    if (isExactField) {
      if (normalizedField.has(token)) {
        score += weight + exactMatchBonus;
      }
      continue;
    }

    // Regular fuzzy matching for non-exact fields
    if (token.length < MIN_WORD_LENGTH_FOR_FUZZY) {
      if (normalizedField.has(token)) {
        score += weight + exactMatchBonus;
      }
      continue;
    }

    let bestMatch = 0;
    for (const fieldValue of normalizedField) {
      if (fieldValue === token) {
        bestMatch = weight + exactMatchBonus;
        break;
      }
      if (fieldValue.includes(token)) {
        bestMatch = Math.max(bestMatch, weight * 0.8);
        continue;
      }
      const distance = levenshteinDistance(fieldValue, token);
      if (distance <= MAX_LEVENSHTEIN_DISTANCE) {
        const fuzzyScore = weight * (1 - distance / (MAX_LEVENSHTEIN_DISTANCE + 1));
        bestMatch = Math.max(bestMatch, fuzzyScore);
      }
    }
    score += bestMatch;
  }

  return score;
};

// Enhanced score calculation with exact term matching
const calculateScore = (
  avn: AVN,
  tokens: Set<string>,
  searchTerms: SearchTerm[],
  weights = {
    title: 2.0,
    description: 0.8,
    developer: 1.2,
    genre: 1.5,
    platform: 1.0,
    status: 0.7,
    pricing: 2.0
  }
): number | null => {
  // First check all exact terms match
  for (const term of searchTerms) {
    switch (term.category) {
      case 'pricing':
        if (avn.price !== term.value) return null;
        break;
      case 'platform':
        if (!avn.platforms.some(p => p.toLowerCase() === term.value)) return null;
        break;
      case 'status':
        if (avn.status.toLowerCase() !== term.value) return null;
        break;
      case 'genre':
        if (!avn.genre.some(g => g.toLowerCase() === term.value)) return null;
        break;
    }
  }

  // Calculate score for remaining free text
  return (
    calculateFieldScore([avn.title], tokens, weights.title, 1.0) +
    calculateFieldScore([avn.description], tokens, weights.description) +
    calculateFieldScore([avn.developer], tokens, weights.developer) +
    calculateFieldScore(avn.genre, tokens, weights.genre) +
    calculateFieldScore(avn.platforms, tokens, weights.platform) +
    calculateFieldScore([avn.status], tokens, weights.status, 0.5, true) +
    calculateFieldScore([avn.price], tokens, weights.pricing, 1.0, true)
  );
};

// Initialize genre terms
export const initializeGenreTerms = (genres: Genre[]) => {
  genres.forEach(genre => KNOWN_TERMS.genre.add(genre.toLowerCase()));
};

// Main search function with enhanced fuzzy search
export const searchAVNs = (
  avns: AVN[],
  query: string,
): AVN[] => {
  if (!query.trim()) return avns;

  const cacheKey = query.toLowerCase().trim();
  const dataVersion = getDataVersion(avns);
  const cached = searchCache.get(cacheKey);
  
  if (cached && 
      cached.dataVersion === dataVersion && 
      Date.now() - cached.timestamp < CACHE_EXPIRY) {
    return cached.results;
  }

  // Parse query into structured terms and free text
  const { terms, freeText } = parseSearchQuery(query);
  const freeTextTokens = new Set(freeText);

  // First pass: Apply exact filters and calculate scores
  const results = avns
    .map(avn => ({
      avn,
      score: calculateScore(avn, freeTextTokens, terms)
    }))
    .filter((result): result is { avn: AVN; score: number } => result.score !== null)
    .sort((a, b) => b.score - a.score)
    .map(result => result.avn);

  // Dynamic threshold for fuzzy search
  if (freeText.length > 0) {
    const threshold = calculateSearchThreshold(
      freeText.join(' ').length,
      results.length,
      avns.length
    );

    const fuseOptions = {
      keys: [
        { name: 'title', weight: 2.0 },
        { name: 'description', weight: 0.8 },
        { name: 'developer', weight: 1.2 }
      ],
      includeScore: true,
      threshold,
      ignoreLocation: true,
      useExtendedSearch: true,
      minMatchCharLength: Math.min(4, Math.max(2, Math.floor(freeText.join(' ').length * 0.3)))
    };

    const fuse = new Fuse(avns, fuseOptions);
    const fuseResults = fuse.search(freeText.join(' '))
      .filter(result => !results.find(r => r.id === result.item.id))
      .map(result => result.item);
    
    results.push(...fuseResults);
  }

  // Cache results
  searchCache.set(cacheKey, {
    results,
    timestamp: Date.now(),
    dataVersion
  });

  // Cleanup old cache entries
  for (const [key, entry] of searchCache.entries()) {
    if (Date.now() - entry.timestamp > CACHE_EXPIRY || 
        entry.dataVersion !== dataVersion) {
      searchCache.delete(key);
    }
  }

  return results;
}; 