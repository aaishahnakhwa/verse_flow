export interface ScriptureEntry {
  id: string;             // Unique identifier (e.g., "quran_2_153", "bukhari_75")
  collection: string;     // Collection display name (e.g., "Quran", "Sahih al-Bukhari")
  book: string;           // Book or Surah name (e.g., "Al-Baqarah", "Book of Knowledge", "Genesis")
  chapter: number;        // Chapter number (Surah, Hadith book, Bible chapter)
  verse?: number;         // Verse number (for Quran, Bible, etc.)
  hadithNumber?: number;  // Hadith number (for Hadith collections)
  reference: string;      // Standard citation string (e.g., "Quran 2:153", "Sahih al-Bukhari 75", "Genesis 1:1")
  title?: string;         // Optional title/heading of the verse or hadith
  text: string;           // The actual text content
  topics: string[];       // Associated topics/themes (e.g., ["patience", "faith", "knowledge"])
  keywords: string[];     // Alternative terms/spellings/transliterations for search
  language?: string;      // Language of the text (e.g., "en", "ar")
  translator?: string;    // Translator of the text (e.g., "Clear Quran", "Muhsin Khan", "WEB")
}

export interface CollectionConfig {
  id: string;             // Lowercase short name (e.g., "quran", "bukhari", "bible")
  name: string;           // Display name (e.g., "Quran", "Sahih al-Bukhari")
  enabled: boolean;       // Whether to load this collection by default
  dataPath: string;       // Path to JSON file relative to application root
  language: string;       // Language code (e.g., "en")
  translator: string;    // Translator name (e.g., "Muhsin Khan")
  description?: string;   // Optional description of the collection
  entryCount?: number;    // Number of entries in this collection (for UI display)
}

export interface AppConfig {
  collections: CollectionConfig[];
}
