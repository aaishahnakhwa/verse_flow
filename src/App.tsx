import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, BookOpen, AlertCircle, Compass, Bookmark, Filter, RotateCcw, ArrowLeft, ArrowRight } from 'lucide-react';

import type { ScriptureEntry } from './types/scripture';
import { searchEngine } from './search/searchEngine';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';
import { parseUrlParams, updateUrlParams } from './utils/share';
import { getJuzForVerse, getSurahsForJuz } from './utils/juzMapper';

import { Layout } from './components/Layout';
import { SearchBox } from './components/SearchBox';
import { FilterPanel } from './components/FilterPanel';
import { ResultCard } from './components/ResultCard';
import { AdvancedSearch } from './components/AdvancedSearch';
import { BookmarkView } from './components/BookmarkView';
import { ShortcutsHelp } from './components/ShortcutsHelp';
import { SidebarNav } from './components/SidebarNav';
import { ReaderMode } from './components/ReaderMode';
import { Button } from './components/ui/Button';
import { CounselMode } from './components/CounselMode';
import { ReferenceHub } from './components/ReferenceHub';
import { DashboardHome } from './components/DashboardHome';

const POPULAR_SEARCHES = ['patience', 'anxiety', 'depression', 'charity', '2:255', 'Moses', 'forgiveness', 'knowledge'];

export default function App() {
  // 1. Local Storage persisted settings
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('bookmarks', []);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recentSearches', []);

  // 2. Search States
  const [query, setQuery] = React.useState('');
  const [exactPhrase, setExactPhrase] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState('');
  const [selectedTopic, setSelectedTopic] = React.useState('');
  const [selectedChapter, setSelectedChapter] = React.useState('');
  const [selectedJuz, setSelectedJuz] = React.useState('');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [scriptureCategory, setScriptureCategory] = React.useState<'quran' | 'hadith' | null>(null);
  
  // 3. View Management
  const [activeView, setActiveView] = React.useState<'dashboard' | 'search' | 'advanced' | 'bookmarks' | 'counsel' | 'reference'>('dashboard');
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);
  const [isMobileConcordanceOpen, setIsMobileConcordanceOpen] = React.useState(false);

  // 4. Index Loading states
  const [isEngineLoading, setIsEngineLoading] = React.useState(true);
  const [collections, setCollections] = React.useState(searchEngine.getCollections());
  const [loadedCollectionIds, setLoadedCollectionIds] = React.useState<Set<string>>(new Set());
  const [loadingCollections, setLoadingCollections] = React.useState<string[]>([]);

  // 5. Pagination Limit
  const [limit, setLimit] = React.useState(50);

  // 6. Reference initial tab manager
  const [referenceInitialTab, setReferenceInitialTab] = React.useState<'names' | 'prophets' | 'sahabas' | 'sahabiyat' | 'cosmology' | 'worship'>('names');

  const handleDashboardNavigate = (
    view: 'search' | 'advanced' | 'bookmarks' | 'counsel' | 'reference',
    tab?: 'names' | 'prophets' | 'sahabas' | 'sahabiyat' | 'cosmology' | 'worship'
  ) => {
    if (view === 'reference' && tab) {
      setReferenceInitialTab(tab);
    }
    if (view === 'search') {
      setScriptureCategory(null);
    }
    setActiveView(view);
  };

  const handleQuickSearch = (q: string) => {
    setQuery(q);
    setScriptureCategory('quran'); // Default to Quran context when searching from home searchbar
    setCollections(prev => prev.map(c => ({
      ...c,
      enabled: c.id === 'quran'
    })));
    setActiveView('search');
    setLimit(50);
  };

  // Apply debouncing to query to optimize indexing matches while typing
  const debouncedQuery = useDebounce(query, 200);

  // Wrapper handlers to update filters and reset pagination limit
  const handleQueryChange = (q: string) => {
    setQuery(q);
    setLimit(50);
  };

  const handleBookChange = (b: string) => {
    setSelectedBook(b);
    setLimit(50);
  };

  const handleTopicChange = (t: string) => {
    setSelectedTopic(t);
    setLimit(50);
  };

  const handleChapterChange = (c: string) => {
    setSelectedChapter(c);
    setLimit(50);
  };

  const handleJuzChange = (j: string) => {
    setSelectedJuz(j);
    setLimit(50);
  };

  // 6. Reader Mode States
  const [activeReaderEntry, setActiveReaderEntry] = React.useState<ScriptureEntry | null>(null);
  const [isReaderOpen, setIsReaderOpen] = React.useState(false);

  const handleOpenReader = (entry: ScriptureEntry) => {
    setActiveReaderEntry(entry);
    setIsReaderOpen(true);
  };

  // Derive all verses/hadiths for the active book/chapter in Reader Mode
  const contextEntries = React.useMemo(() => {
    if (!activeReaderEntry) return [];
    const colConfig = collections.find(c => c.name === activeReaderEntry.collection);
    if (!colConfig) return [];
    
    return searchEngine.searchCollections({
      query: '',
      collections: [colConfig.id],
      book: activeReaderEntry.book,
      chapter: activeReaderEntry.chapter,
    });
  }, [activeReaderEntry, collections]);

  // Sync theme with HTML document class
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Restore state from URL parameters on mount
  React.useEffect(() => {
    const runInit = async () => {
      // Subscribe to search engine status updates (for toggled lazy loads)
      const unsubscribe = searchEngine.subscribe(() => {
        setCollections([...searchEngine.getCollections()]);
        
        // Find which ids are loaded
        const loaded = new Set<string>();
        searchEngine.getCollections().forEach(c => {
          if (searchEngine.isCollectionLoaded(c.id)) {
            loaded.add(c.id);
          }
        });
        setLoadedCollectionIds(loaded);
        setIsEngineLoading(searchEngine.getIsLoading());
      });

      // Initialize the engine (loads config.json and fetches default enabled libraries)
      setIsEngineLoading(true);
      await searchEngine.initialize();
      setIsEngineLoading(false);

      // Parse and restore state from URL params
      const urlState = parseUrlParams();
      if (urlState.query !== undefined) setQuery(urlState.query);
      if (urlState.exactPhrase !== undefined) setExactPhrase(urlState.exactPhrase);
      if (urlState.book !== undefined) setSelectedBook(urlState.book);
      if (urlState.topic !== undefined) setSelectedTopic(urlState.topic);
      if (urlState.chapter !== undefined) setSelectedChapter(urlState.chapter);
      if (urlState.activeView !== undefined) setActiveView(urlState.activeView);

      if (urlState.collections) {
        // Update enabled states of collections
        const currentCollections = searchEngine.getCollections();
        for (const col of currentCollections) {
          const shouldEnable = urlState.collections.includes(col.id);
          if (col.enabled !== shouldEnable) {
            await searchEngine.toggleCollection(col.id);
          }
        }
      }

      return () => unsubscribe();
    };

    runInit();
  }, []);

  // Update URL parameters when search state changes
  React.useEffect(() => {
    if (isEngineLoading) return;
    const activeCollectionIds = collections.filter(c => c.enabled).map(c => c.id);
    
    updateUrlParams({
      query,
      collections: activeCollectionIds,
      book: selectedBook,
      topic: selectedTopic,
      chapter: selectedChapter,
      exactPhrase,
      activeView
    });
  }, [query, collections, selectedBook, selectedTopic, selectedChapter, exactPhrase, activeView, isEngineLoading]);

  // Derive search results on the fly from input state & loaded collections
  const searchResults = React.useMemo(() => {
    if (isEngineLoading) return [];

    // Access loadedCollectionIds size to trigger updates when a lazy load finishes
    if (loadedCollectionIds.size > -1) {
      const chapterNum = selectedChapter ? parseInt(selectedChapter, 10) : undefined;
      let results = searchEngine.searchCollections({
        query: debouncedQuery,
        book: selectedBook || undefined,
        topic: selectedTopic || undefined,
        chapter: chapterNum,
        exactPhrase,
      });

      // If a Juz is selected, filter Quran results to only include those in that Juz
      if (selectedJuz) {
        const juzNum = parseInt(selectedJuz, 10);
        results = results.filter(entry => {
          if (entry.collection.toLowerCase() !== 'quran') return false;
          const verseNum = entry.verse || 1;
          return getJuzForVerse(entry.chapter, verseNum) === juzNum;
        });
      }

      return results;
    }
    return [];
  }, [debouncedQuery, selectedBook, selectedTopic, selectedChapter, exactPhrase, isEngineLoading, loadedCollectionIds, selectedJuz]);

  // Fetch unique Books and Topics dynamically based on loaded data
  const availableHadithBooks = React.useMemo(() => {
    const books: string[] = [];
    collections.forEach((col) => {
      if (col.enabled && loadedCollectionIds.has(col.id) && col.id !== 'quran') {
        books.push(...searchEngine.getBooksForCollection(col.name));
      }
    });
    return Array.from(new Set(books)).sort();
  }, [collections, loadedCollectionIds]);

  const availableSurahs = React.useMemo(() => {
    if (!loadedCollectionIds.has('quran')) return [];
    return searchEngine.getBooksForCollection('Quran');
  }, [loadedCollectionIds]);

  const surahsInSelectedJuz = React.useMemo(() => {
    if (!selectedJuz || availableSurahs.length === 0) return [];
    const juzNum = parseInt(selectedJuz, 10);
    return getSurahsForJuz(juzNum, availableSurahs).map(surahName => {
      const chapterNum = availableSurahs.indexOf(surahName) + 1;
      return { name: surahName, chapter: chapterNum };
    });
  }, [selectedJuz, availableSurahs]);

  const availableBooks = React.useMemo(() => {
    return [...availableHadithBooks, ...availableSurahs].sort();
  }, [availableHadithBooks, availableSurahs]);

  const availableTopics = React.useMemo(() => {
    // Access loadedCollectionIds size to trigger updates when a lazy load finishes
    if (loadedCollectionIds.size > -1) {
      return searchEngine.getAllTopics();
    }
    return [];
  }, [loadedCollectionIds]);

  // Handler for adding items to recent search history
  const handleSearchSubmit = (submittedQuery: string) => {
    if (!submittedQuery.trim()) return;
    
    // Add to history, keeping unique top 10 items
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== submittedQuery.trim().toLowerCase());
      return [submittedQuery.trim(), ...filtered].slice(0, 10);
    });
  };

  const handleClearRecent = () => setRecentSearches([]);
  
  const handleRemoveRecentItem = (itemToRemove: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== itemToRemove));
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleToggleCollection = async (id: string) => {
    setLoadingCollections((prev) => [...prev, id]);
    try {
      await searchEngine.toggleCollection(id);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCollections((prev) => prev.filter((cid) => cid !== id));
    }
  };

  const handleClearFilters = async () => {
    setSelectedBook('');
    setSelectedTopic('');
    setSelectedChapter('');
    setSelectedJuz('');
    setExactPhrase(false);
    
    // Re-enable all libraries to reset query scope
    for (const col of collections) {
      if (!col.enabled) {
        await handleToggleCollection(col.id);
      }
    }
  };

  const handleSelectAllCollections = async (enable: boolean) => {
    for (const col of collections) {
      if (col.enabled !== enable) {
        await handleToggleCollection(col.id);
      }
    }
  };

  // Triggers search for suggestion terms
  const handleSuggestionClick = (term: string) => {
    setQuery(term);
    handleSearchSubmit(term);
    setActiveView('search');
  };

  const handleAdvancedSearch = (filters: {
    query: string;
    collections?: string[];
    book?: string;
    topic?: string;
    chapter?: number;
    exactPhrase?: boolean;
  }) => {
    setQuery(filters.query);
    setExactPhrase(!!filters.exactPhrase);
    setSelectedBook(filters.book || '');
    setSelectedTopic(filters.topic || '');
    setSelectedChapter(filters.chapter?.toString() || '');
    setActiveView('search');
    
    if (filters.query) {
      handleSearchSubmit(filters.query);
    }
  };

  const disabledCollectionsCount = collections.filter(c => !c.enabled).length;
  const isFilterActive = !!(selectedBook || selectedTopic || selectedChapter || exactPhrase || selectedJuz || disabledCollectionsCount > 0);

  return (
    <>
      <Layout
      theme={theme}
      onThemeToggle={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
      activeView={activeView}
      onViewChange={(view) => {
        setActiveView(view);
        // Clear filter options if navigating to general search
        if (view === 'search' && !query) {
          handleClearFilters();
        }
      }}
      onHelpClick={() => setIsHelpOpen(true)}
      bookmarksCount={bookmarks.length}
    >
      <AnimatePresence mode="wait">
        {isEngineLoading && searchResults.length === 0 ? (
          /* Central loading layout on startup */
          <motion.div
            key="initial-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center no-print"
          >
            <Loader2 className="h-10 w-10 text-emerald-600 dark:text-emerald-500 animate-spin mb-4" />
            <h3 className="text-lg font-bold font-display uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Initializing Reference Indices
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 max-w-sm">
              Loading static scriptures database and building client-side search engine...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full space-y-8 no-print"
          >
            {/* View 0: Home Dashboard View */}
            {activeView === 'dashboard' && (
              <DashboardHome
                onNavigate={handleDashboardNavigate}
                onQuickSearch={handleQuickSearch}
                bookmarksCount={bookmarks.length}
              />
            )}

            {/* View 1: Simple Search (Dashboard Home) */}
            {activeView === 'search' && (
              scriptureCategory === null ? (
                /* Sub-landing page to select library */
                <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
                  {/* Visual Header */}
                  <div className="text-center space-y-3 max-w-2xl mx-auto py-4">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight brand-name-glow">
                      Scripture Libraries
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                      Select a library to explore, browse by chapters, or search matching verses and traditions.
                    </p>
                  </div>

                  {/* Two large boxes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    
                    {/* Library 1: Quran */}
                    <div 
                      onClick={() => {
                        setScriptureCategory('quran');
                        setCollections(prev => prev.map(c => ({
                          ...c,
                          enabled: c.id === 'quran'
                        })));
                      }}
                      className="glass p-8 rounded-3xl border border-stone-200/60 dark:border-gold-500/10 hover:scale-[1.03] active:scale-[0.99] transition-all duration-200 group cursor-pointer text-left flex flex-col justify-between min-h-[220px] shadow-lg shadow-gold-500/2"
                    >
                      <div className="space-y-4">
                        <div className="h-12 w-12 rounded-2xl bg-gold-500/10 dark:bg-gold-500/10 flex items-center justify-center text-gold-600 dark:text-gold-400 shrink-0">
                          <BookOpen className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
                          The Holy Qur'an
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold font-sans">
                          Browse by Surah (Chapter) or Juz (Part). Explore translation, transliteration, and bookmark specific verses with deep-context reading.
                        </p>
                      </div>
                      <button
                        className="inline-flex items-center gap-1.5 text-xs font-bold font-display uppercase tracking-widest text-gold-600 group-hover:text-gold-700 dark:text-gold-500 dark:group-hover:text-gold-400 pt-6 mt-auto border-none bg-transparent"
                      >
                        <span>Open Qur'an Library</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                    {/* Library 2: Hadith & Reference */}
                    <div 
                      onClick={() => {
                        setScriptureCategory('hadith');
                        setCollections(prev => prev.map(c => ({
                          ...c,
                          enabled: c.id !== 'quran'
                        })));
                      }}
                      className="glass p-8 rounded-3xl border border-stone-200/60 dark:border-gold-500/10 hover:scale-[1.03] active:scale-[0.99] transition-all duration-200 group cursor-pointer text-left flex flex-col justify-between min-h-[220px] shadow-lg shadow-gold-500/2"
                    >
                      <div className="space-y-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                          <Compass className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
                          Hadiths & References
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold font-sans">
                          Explore prophetic traditions including Sahih al-Bukhari, Sahih Muslim, Riyad as-Salihin, and 40 Hadith Nawawi with chapter references.
                        </p>
                      </div>
                      <button
                        className="inline-flex items-center gap-1.5 text-xs font-bold font-display uppercase tracking-widest text-gold-600 group-hover:text-gold-700 dark:text-gold-500 dark:group-hover:text-gold-400 pt-6 mt-auto border-none bg-transparent"
                      >
                        <span>Open Hadith Collections</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>
                </div>
              ) : (
                /* Regular search concordance layout */
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start text-left">
                  
                  {/* Left Sidebar Concordance (Desktop Only) */}
                  <div className="lg:col-span-1 hidden lg:block sticky top-22 glass p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
                    <SidebarNav
                      collections={collections.filter(c => scriptureCategory === 'hadith' ? c.id !== 'quran' : c.id === 'quran')}
                    loadedCollectionIds={loadedCollectionIds}
                    selectedBook={selectedBook}
                    selectedChapter={selectedChapter}
                    onBookSelect={(book, colId) => {
                      setSelectedBook(book);
                      setSelectedChapter('');
                      setLimit(50);
                      const col = collections.find(c => c.id === colId);
                      if (col && !col.enabled) {
                        handleToggleCollection(colId);
                      }
                    }}
                    onChapterSelect={handleChapterChange}
                    getBooksForCollection={(colName) => searchEngine.getBooksForCollection(colName)}
                    getChaptersForBook={(bookName) => searchEngine.getChaptersForBook(bookName)}
                    onClearFilters={handleClearFilters}
                  />
                </div>

                {/* Right Main Search Area */}
                <div className="lg:col-span-3 space-y-6 w-full">
                  {/* Back to Libraries Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setScriptureCategory(null);
                      handleClearFilters();
                      setQuery('');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold font-display uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white cursor-pointer transition-colors border-none bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Libraries</span>
                  </button>
                  {/* Visual Header */}
                  <div className="text-center space-y-3.5 max-w-2xl mx-auto py-4">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight brand-name-glow">
                      VerseFlow
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-400 font-semibold leading-relaxed">
                      Search authentic scriptures and hadiths instantly in your browser. Operates 100% offline. No AI, LLMs or network queries.
                    </p>
                  </div>

                  {/* Search box & history */}
                  <div className="space-y-4">
                    <SearchBox
                      query={query}
                      onQueryChange={handleQueryChange}
                      onSearchSubmit={handleSearchSubmit}
                      recentSearches={recentSearches}
                      onClearRecent={handleClearRecent}
                      onRemoveRecentItem={handleRemoveRecentItem}
                      onHelpClick={() => setIsHelpOpen(true)}
                      autoFocus={activeView === 'search' && !query}
                    />

                    {/* Quran Juz Browse Grid */}
                    {scriptureCategory === 'quran' && !query && (
                      <div className="glass p-5 rounded-3xl border border-stone-200/50 dark:border-gold-500/10 space-y-3.5 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            📖 Browse by Juz (Quran Parts)
                          </span>
                          {selectedJuz && (
                            <button
                              type="button"
                              onClick={() => setSelectedJuz('')}
                              className="text-[9px] font-bold font-display text-red-500 uppercase tracking-wider hover:underline cursor-pointer border-none bg-transparent"
                            >
                              Clear Selection
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                          {Array.from({ length: 30 }, (_, i) => {
                            const juzNum = i + 1;
                            const isActive = selectedJuz === juzNum.toString();
                            return (
                              <button
                                key={juzNum}
                                type="button"
                                onClick={() => handleJuzChange(isActive ? '' : juzNum.toString())}
                                className={`h-9 rounded-xl text-xs font-bold font-display flex items-center justify-center transition-all cursor-pointer border ${
                                  isActive
                                    ? 'bg-gold-500 border-gold-500 text-[#11141a]'
                                    : 'bg-white dark:bg-[#161a22] border-stone-200/60 dark:border-gold-500/10 text-slate-600 dark:text-stone-300 hover:border-gold-500/40 hover:bg-gold-500/5'
                                }`}
                              >
                                {juzNum}
                              </button>
                            );
                          })}
                        </div>

                        {/* Surahs inside the selected Juz */}
                        {selectedJuz && surahsInSelectedJuz.length > 0 && (
                          <div className="pt-4 border-t border-stone-200/40 dark:border-gold-500/10 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                            <div className="flex items-center justify-between px-1">
                              <span className="text-[10px] font-bold font-display uppercase tracking-widest text-gold-600 dark:text-gold-400">
                                📜 Surahs in Juz {selectedJuz}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                              {surahsInSelectedJuz.map((surah) => {
                                const isSurahActive = selectedBook === surah.name;
                                return (
                                  <button
                                    key={surah.chapter}
                                    type="button"
                                    onClick={() => {
                                      const isActive = selectedBook === surah.name;
                                      setSelectedBook(isActive ? '' : surah.name);
                                      setLimit(50);
                                    }}
                                    className={`h-11 px-3.5 rounded-xl border transition-all flex items-center gap-2 cursor-pointer text-left group ${
                                      isSurahActive
                                        ? 'bg-gold-500 border-gold-500 text-[#11141a]'
                                        : 'bg-white/60 dark:bg-[#161a22]/60 border-stone-200/60 dark:border-gold-500/10 text-slate-700 dark:text-stone-300 hover:bg-gold-500/5 hover:border-gold-500/40'
                                    }`}
                                  >
                                    <span className={`h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors shrink-0 ${
                                      isSurahActive
                                        ? 'bg-[#11141a]/15 text-[#11141a]'
                                        : 'bg-stone-100 dark:bg-gold-500/10 text-slate-500 dark:text-gold-400 group-hover:bg-gold-500 group-hover:text-slate-950'
                                    }`}>
                                      {surah.chapter}
                                    </span>
                                    <span className={`text-xs font-bold truncate ${
                                      isSurahActive
                                        ? 'text-[#11141a]'
                                        : 'text-slate-700 dark:text-stone-300'
                                    }`}>
                                      {surah.name}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Controls Row (Filters & Mobile Browse) */}
                    <div className="flex flex-wrap items-center justify-center gap-3 no-print pt-1">
                      
                      {/* Mobile Browse Accordion Toggle */}
                      <button
                        type="button"
                        onClick={() => setIsMobileConcordanceOpen(!isMobileConcordanceOpen)}
                        className={`lg:hidden inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200/60 dark:border-gold-500/10 text-[10px] font-bold font-display uppercase tracking-widest transition-all cursor-pointer shadow-xs ${
                          isMobileConcordanceOpen
                            ? 'bg-gold-500/15 border-gold-500/20 text-gold-600 dark:text-gold-400'
                            : 'bg-white/60 dark:bg-slate-900/60 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Browse Index</span>
                        <span className="text-[9px] opacity-60">({isMobileConcordanceOpen ? 'Hide' : 'Show'})</span>
                      </button>

                      {/* Filter panel Toggle Button */}
                      <button
                        type="button"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200/60 dark:border-gold-500/10 text-[10px] font-bold font-display uppercase tracking-widest transition-all cursor-pointer shadow-xs ${
                          isFilterOpen
                            ? 'bg-gold-500/15 border-gold-500/20 text-gold-600 dark:text-gold-400'
                            : 'bg-white/60 dark:bg-slate-900/60 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                      >
                        <Filter className="h-3.5 w-3.5" />
                        <span>Refine Search</span>
                        {isFilterActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
                        )}
                      </button>

                      {/* Reset Filters Shortcut (If active) */}
                      {isFilterActive && (
                        <button
                          type="button"
                          onClick={handleClearFilters}
                          className="inline-flex items-center gap-1 text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer border-none bg-transparent"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>

                    {/* Mobile Browse Concordance Expandable Container */}
                    {isMobileConcordanceOpen && (
                      <div className="lg:hidden block no-print mt-2 glass p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 animate-in fade-in slide-in-from-top-1 duration-200">
                        <SidebarNav
                          collections={collections.filter(c => scriptureCategory === 'hadith' ? c.id !== 'quran' : c.id === 'quran')}
                          loadedCollectionIds={loadedCollectionIds}
                          selectedBook={selectedBook}
                          selectedChapter={selectedChapter}
                          onBookSelect={(book, colId) => {
                            setSelectedBook(book);
                            setSelectedChapter('');
                            setLimit(50);
                            const col = collections.find(c => c.id === colId);
                            if (col && !col.enabled) {
                              handleToggleCollection(colId);
                            }
                          }}
                          onChapterSelect={handleChapterChange}
                          getBooksForCollection={(colName) => searchEngine.getBooksForCollection(colName)}
                          getChaptersForBook={(bookName) => searchEngine.getChaptersForBook(bookName)}
                          onClearFilters={handleClearFilters}
                        />
                      </div>
                    )}

                    {/* Active Filters Chip Bar */}
                    {isFilterActive && (
                      <div className="flex flex-wrap items-center gap-2 p-2 bg-gold-500/5 dark:bg-gold-500/2.5 border border-gold-500/10 rounded-2xl max-w-2xl mx-auto text-left animate-in fade-in slide-in-from-top-1 duration-200 no-print">
                        <span className="text-[10px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-gold-500/60 pl-1.5">
                          Active Filters:
                        </span>

                        {/* Libraries scope chips */}
                        {collections.map(col => {
                          if (!col.enabled) return null;
                          return (
                            <span key={col.id} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold font-display text-emerald-700 dark:text-emerald-400">
                              <span>Lib: {col.name}</span>
                              <button 
                                onClick={() => handleToggleCollection(col.id)} 
                                className="hover:text-red-500 cursor-pointer text-[9px] font-bold"
                                title={`Disable ${col.name}`}
                              >
                                ✕
                              </button>
                            </span>
                          );
                        })}
                        
                        {selectedJuz && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/20 text-[10px] font-bold font-display text-gold-700 dark:text-gold-400">
                            <span>Juz {selectedJuz}</span>
                            <button 
                              onClick={() => setSelectedJuz('')} 
                              className="hover:text-red-500 cursor-pointer text-[9px] font-bold"
                              title="Remove Juz Filter"
                            >
                              ✕
                            </button>
                          </span>
                        )}

                        {selectedBook && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/20 text-[10px] font-bold font-display text-gold-700 dark:text-gold-400">
                            <span>{availableSurahs.includes(selectedBook) ? 'Surah: ' : 'Book: '}{selectedBook}</span>
                            <button 
                              onClick={() => setSelectedBook('')} 
                              className="hover:text-red-500 cursor-pointer text-[9px] font-bold"
                              title="Remove Selection"
                            >
                              ✕
                            </button>
                          </span>
                        )}

                        {selectedTopic && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/20 text-[10px] font-bold font-display text-gold-700 dark:text-gold-400">
                            <span>Topic: {selectedTopic}</span>
                            <button 
                              onClick={() => setSelectedTopic('')} 
                              className="hover:text-red-500 cursor-pointer text-[9px] font-bold"
                              title="Remove Topic Filter"
                            >
                              ✕
                            </button>
                          </span>
                        )}

                        {selectedChapter && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/20 text-[10px] font-bold font-display text-gold-700 dark:text-gold-400">
                            <span>Num: {selectedChapter}</span>
                            <button 
                              onClick={() => setSelectedChapter('')} 
                              className="hover:text-red-500 cursor-pointer text-[9px] font-bold"
                              title="Remove Number Filter"
                            >
                              ✕
                            </button>
                          </span>
                        )}

                        {exactPhrase && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/20 text-[10px] font-bold font-display text-gold-700 dark:text-gold-400">
                            <span>Exact Phrase</span>
                            <button 
                              onClick={() => setExactPhrase(false)} 
                              className="hover:text-red-500 cursor-pointer text-[9px] font-bold"
                              title="Disable Exact Match"
                            >
                              ✕
                            </button>
                          </span>
                        )}

                        <button
                          onClick={handleClearFilters}
                          className="ml-auto text-[9px] font-bold font-display text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 uppercase tracking-widest px-2 py-0.5 rounded hover:bg-red-500/5 cursor-pointer transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                    )}

                    {/* Filter panel drawer */}
                    <FilterPanel
                      isOpen={isFilterOpen}
                      collections={collections.filter(c => scriptureCategory === 'hadith' ? c.id !== 'quran' : c.id === 'quran')}
                      loadedCollectionIds={loadedCollectionIds}
                      loadingCollections={loadingCollections}
                      onToggleCollection={handleToggleCollection}
                      onSelectAllCollections={handleSelectAllCollections}
                      selectedBook={selectedBook}
                      onBookChange={handleBookChange}
                      availableHadithBooks={availableHadithBooks}
                      availableSurahs={availableSurahs}
                      selectedTopic={selectedTopic}
                      onTopicChange={handleTopicChange}
                      availableTopics={availableTopics}
                      selectedChapter={selectedChapter}
                      onChapterChange={handleChapterChange}
                      selectedJuz={selectedJuz}
                      onJuzChange={handleJuzChange}
                    />

                    {/* Suggestion Chips */}
                    {!query && !isFilterActive && (
                      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto pt-2">
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-bold font-display uppercase tracking-wider mr-1">
                          Try searching:
                        </span>
                        {POPULAR_SEARCHES.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleSuggestionClick(term)}
                            className="text-xs font-semibold font-display px-3 py-1 rounded-xl bg-white hover:bg-gold-50 dark:bg-slate-900/50 dark:hover:bg-gold-950/20 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/40 hover:border-gold-300 dark:hover:border-gold-500/20 transition-all cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Results Listing Section */}
                  <div className="pt-6">
                    {/* Results status banner */}
                    {query || isFilterActive ? (
                      <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-slate-100 dark:border-slate-800/60 text-left">
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-bold font-display uppercase tracking-wider">
                          Search Results ({searchResults.length})
                        </span>
                        {isEngineLoading && (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-gold-600 dark:text-gold-500">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>indexing...</span>
                          </span>
                        )}
                      </div>
                    ) : null}

                    {/* Grid layout for search matches */}
                    {searchResults.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                          {searchResults.slice(0, limit).map((entry) => (
                            <ResultCard
                              key={entry.id}
                              entry={entry}
                              searchQuery={debouncedQuery}
                              exactPhrase={exactPhrase}
                              isBookmarked={bookmarks.includes(entry.id)}
                              onToggleBookmark={handleToggleBookmark}
                              onTopicClick={(topic) => {
                                setSelectedTopic(topic);
                                setActiveView('search');
                              }}
                              onReadContext={handleOpenReader}
                            />
                          ))}
                        </div>
                        
                        {searchResults.length > limit && (
                          <div className="flex justify-center pt-8">
                            <Button
                              onClick={() => setLimit(prev => prev + 50)}
                              variant="secondary"
                              className="px-8 cursor-pointer font-display text-xs font-semibold uppercase tracking-wider h-11"
                            >
                              Load More Results ({searchResults.length - limit} remaining)
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (query || isFilterActive) && !isEngineLoading ? (
                      /* Zero Matches state */
                      <div className="flex flex-col items-center justify-center py-16 text-center max-w-sm mx-auto">
                        <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-4 text-slate-400">
                          <AlertCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold font-serif text-slate-900 dark:text-white">
                          No Matches Found
                        </h3>
                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 mb-5">
                          We couldn't find any entries matching "{query}" in the active library.
                        </p>
                        <div className="space-y-2">
                          {isFilterActive && (
                            <Button size="sm" variant="outline" onClick={handleClearFilters} className="w-full cursor-pointer">
                              Clear Active Filters
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-slate-500 hover:text-slate-800 cursor-pointer"
                            onClick={() => {
                              collections.forEach((c) => {
                                if (!c.enabled) handleToggleCollection(c.id);
                              });
                            }}
                          >
                            Enable All Collections
                          </Button>
                        </div>
                      </div>
                    ) : !query && !isFilterActive ? (
                      /* General browse information cards when empty */
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-4xl mx-auto pt-6">
                        <div className="glass p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
                          <BookOpen className="h-5 w-5 text-gold-500 mb-3" />
                          <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white mb-1.5">
                            Authentic Texts
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            VerseFlow only indexes verified collections, with structured Surah/Verse references, chapter labels, and accurate translations.
                          </p>
                        </div>
                        <div className="glass p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
                          <Compass className="h-5 w-5 text-gold-500 mb-3" />
                          <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white mb-1.5">
                            Advanced Filters
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            Target specific surahs, chapters, hadith registers, translators, or topics using the multi-parameter Advanced Search tab.
                          </p>
                        </div>
                        <div className="glass p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
                          <Bookmark className="h-5 w-5 text-gold-500 mb-3" />
                          <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white mb-1.5">
                            Bookmarks Cache
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            Bookmark entries to save them to your private library. Saved items are indexed and searchable offline in the Bookmarks view.
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          )}

            {/* View 2: Advanced Search View */}
            {activeView === 'advanced' && (
              <AdvancedSearch
                collections={collections}
                availableBooks={availableBooks}
                availableTopics={availableTopics}
                onSearch={handleAdvancedSearch}
                initialQuery={query}
                initialExact={exactPhrase}
              />
            )}

            {/* View 3: Bookmarks Manager View */}
             {activeView === 'bookmarks' && (
              <BookmarkView
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                getEntryById={(id) => searchEngine.getEntryById(id)}
                onTopicClick={(topic) => {
                  setSelectedTopic(topic);
                  setActiveView('search');
                }}
                onGoToSearch={() => setActiveView('search')}
                onReadContext={handleOpenReader}
              />
            )}

            {/* View 4: Spiritual Counsel Mode View */}
            {activeView === 'counsel' && (
              <CounselMode
                searchEngine={searchEngine}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onReadContext={handleOpenReader}
              />
            )}

            {/* View 5: Reference Guides Hub */}
            {activeView === 'reference' && (
              <ReferenceHub initialTab={referenceInitialTab} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>

    {/* Keyboard shortcuts menu modal */}
    <ShortcutsHelp open={isHelpOpen} onOpenChange={setIsHelpOpen} />

    {/* Scripture Reader context modal */}
    <ReaderMode
      isOpen={isReaderOpen}
      onClose={() => setIsReaderOpen(false)}
      activeEntry={activeReaderEntry}
      contextEntries={contextEntries}
    />
  </>
  );
}
