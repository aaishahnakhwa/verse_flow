import MiniSearch from 'minisearch';
import type { ScriptureEntry, CollectionConfig } from '../types/scripture';
import { getSynonymsForQuery } from './thesaurus';

export class SearchEngine {
  private miniSearch: MiniSearch<ScriptureEntry>;
  private documents: Map<string, ScriptureEntry> = new Map();
  private collectionsConfig: CollectionConfig[] = [];
  private loadedCollectionIds: Set<string> = new Set();
  private onStatusChangeCallbacks: (() => void)[] = [];
  private isLoading = false;
  private isInitialized = false;

  constructor() {
    this.miniSearch = new MiniSearch({
      fields: ['text', 'reference', 'topics', 'keywords', 'book', 'collection'],
      storeFields: [
        'id', 'collection', 'book', 'chapter', 'verse', 'hadithNumber',
        'reference', 'title', 'text', 'topics', 'keywords', 'language', 'translator'
      ],
      searchOptions: {
        prefix: true,
        fuzzy: 0.15, // Typo tolerance
        boost: {
          reference: 4,
          topics: 3,
          keywords: 3,
          book: 2,
          collection: 1.5,
          text: 1
        }
      }
    });
  }

  // Load config.json and then fetch all enabled collections in the background
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    this.isLoading = true;
    this.notifyChange();

    try {
      const response = await fetch('data/config.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.statusText}`);
      }
      const data = await response.json();
      this.collectionsConfig = data.collections;
      this.isInitialized = true; // Mark as initialized so the landing page mounts instantly

      // Fetch and index enabled collections asynchronously in the background
      const enabledCollections = this.collectionsConfig.filter(c => c.enabled);
      
      // Trigger background loads in parallel without blocking main initial setup
      Promise.all(
        enabledCollections.map(async (col) => {
          try {
            await this.loadCollection(col.id);
          } catch (err) {
            console.error(`Failed to lazy-load collection ${col.id} on startup:`, err);
          }
        })
      ).finally(() => {
        this.isLoading = false;
        this.notifyChange();
      });

    } catch (error) {
      console.error('Failed to initialize search engine:', error);
      this.isLoading = false;
      this.notifyChange();
    }
  }

  getCollections(): CollectionConfig[] {
    return this.collectionsConfig;
  }

  isCollectionLoaded(id: string): boolean {
    return this.loadedCollectionIds.has(id);
  }

  getLoadedCollectionsCount(): number {
    return this.loadedCollectionIds.size;
  }

  getIsLoading(): boolean {
    return this.isLoading;
  }

  subscribe(callback: () => void): () => void {
    this.onStatusChangeCallbacks.push(callback);
    return () => {
      this.onStatusChangeCallbacks = this.onStatusChangeCallbacks.filter(cb => cb !== callback);
    };
  }

  private notifyChange() {
    this.onStatusChangeCallbacks.forEach(cb => cb());
  }

  // Toggle a collection on or off
  async toggleCollection(id: string): Promise<void> {
    const config = this.collectionsConfig.find(c => c.id === id);
    if (!config) return;

    if (config.enabled) {
      // Toggle off
      config.enabled = false;
      this.notifyChange();
    } else {
      // Toggle on
      config.enabled = true;
      if (!this.loadedCollectionIds.has(id)) {
        this.isLoading = true;
        this.notifyChange();
        try {
          await this.loadCollection(id);
        } catch (error) {
          console.error(`Failed to lazy-load collection ${id}:`, error);
          config.enabled = false; // rollback
        } finally {
          this.isLoading = false;
          this.notifyChange();
        }
      } else {
        this.notifyChange();
      }
    }
  }

  private async loadCollection(id: string): Promise<void> {
    if (this.loadedCollectionIds.has(id)) return;

    const config = this.collectionsConfig.find(c => c.id === id);
    if (!config) return;

    const response = await fetch(config.dataPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${id}: ${response.statusText}`);
    }
    const entries: ScriptureEntry[] = await response.json();

    // Cache the entries in documents
    entries.forEach(entry => {
      this.documents.set(entry.id, entry);
    });

    // Add to MiniSearch index
    this.miniSearch.addAll(entries);
    this.loadedCollectionIds.add(id);
  }

  // Get all unique topics from loaded & enabled collections
  getAllTopics(): string[] {
    const topicsSet = new Set<string>();
    this.documents.forEach(doc => {
      const colConfig = this.collectionsConfig.find(c => c.name === doc.collection);
      if (colConfig?.enabled && doc.topics) {
        doc.topics.forEach(t => topicsSet.add(t));
      }
    });
    return Array.from(topicsSet).sort();
  }

  // Get all unique books from a given collection name
  getBooksForCollection(collectionName: string): string[] {
    const booksSet = new Set<string>();
    const bookToChapter = new Map<string, number>();

    this.documents.forEach(doc => {
      if (doc.collection === collectionName) {
        booksSet.add(doc.book);
        if (!bookToChapter.has(doc.book)) {
          bookToChapter.set(doc.book, doc.chapter);
        }
      }
    });

    const booksArray = Array.from(booksSet);
    
    // For Quran, sort numerically by chapter number. For other collections, sort alphabetically.
    if (collectionName.toLowerCase() === 'quran') {
      return booksArray.sort((a, b) => {
        const chapA = bookToChapter.get(a) || 999;
        const chapB = bookToChapter.get(b) || 999;
        return chapA - chapB;
      });
    }

    return booksArray.sort();
  }

  // Get all unique chapters for a given book name
  getChaptersForBook(bookName: string): number[] {
    const chaptersSet = new Set<number>();
    this.documents.forEach(doc => {
      if (doc.book.toLowerCase() === bookName.toLowerCase()) {
        chaptersSet.add(doc.chapter);
      }
    });
    return Array.from(chaptersSet).sort((a, b) => a - b);
  }

  // Get a specific entry by ID
  getEntryById(id: string): ScriptureEntry | undefined {
    return this.documents.get(id);
  }

  // Reusable search function across all enabled collections
  searchCollections(options: {
    query: string;
    collections?: string[]; // Filter by collection IDs
    book?: string;
    topic?: string;
    chapter?: number;
    exactPhrase?: boolean;
  }): ScriptureEntry[] {
    const { query, collections, book, topic, chapter, exactPhrase } = options;

    // Get names of currently enabled collections (optionally filtered by explicit collections parameter)
    const activeCollectionNames = this.collectionsConfig
      .filter(c => c.enabled && (!collections || collections.includes(c.id)))
      .map(c => c.name);

    if (activeCollectionNames.length === 0) return [];

    let results: ScriptureEntry[];

    if (query && query.trim().length > 0) {
      const trimmedQuery = query.trim();
      
      const searchOptions = {
        filter: (result: Record<string, unknown>) => 
          activeCollectionNames.includes(result.collection as string),
        combineWith: exactPhrase ? ('AND' as const) : undefined,
      };

      const matches = this.miniSearch.search(trimmedQuery, searchOptions);
      results = matches.map(match => this.documents.get(match.id)).filter(Boolean) as ScriptureEntry[];

      if (exactPhrase) {
        // Enforce rigid substring containment filter (case-insensitive) for strict phrase matching
        const lowerQuery = trimmedQuery.toLowerCase();
        results = results.filter(doc => 
          doc.text.toLowerCase().includes(lowerQuery) ||
          doc.reference.toLowerCase().includes(lowerQuery) ||
          doc.book.toLowerCase().includes(lowerQuery) ||
          doc.topics.some(t => t.toLowerCase().includes(lowerQuery)) ||
          doc.keywords.some(k => k.toLowerCase().includes(lowerQuery))
        );
      } else {
        // Expand search with synonyms from the thesaurus
        const synonyms = getSynonymsForQuery(trimmedQuery);
        if (synonyms.length > 0) {
          const synonymQueryString = synonyms.join(' ');
          const synonymMatches = this.miniSearch.search(synonymQueryString, searchOptions);
          const synonymResults = synonymMatches
            .map(match => this.documents.get(match.id))
            .filter(Boolean) as ScriptureEntry[];

          // Merge: append synonym results that aren't already in the exact results
          const exactIds = new Set(results.map(r => r.id));
          synonymResults.forEach(synDoc => {
            if (!exactIds.has(synDoc.id)) {
              results.push(synDoc);
            }
          });
        }
      }
    } else {
      // Empty query: fetch all loaded documents under the enabled collections
      results = Array.from(this.documents.values()).filter(doc => 
        activeCollectionNames.includes(doc.collection)
      );
    }

    // Apply additional filters
    if (book) {
      results = results.filter(doc => doc.book.toLowerCase() === book.toLowerCase());
    }
    if (topic) {
      results = results.filter(doc => doc.topics.some(t => t.toLowerCase() === topic.toLowerCase()));
    }
    if (chapter !== undefined && !isNaN(chapter)) {
      results = results.filter(doc => doc.chapter === chapter);
    }

    return results;
  }
}

export const searchEngine = new SearchEngine();
export default searchEngine;
