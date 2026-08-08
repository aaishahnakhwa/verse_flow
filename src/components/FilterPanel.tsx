import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import type { CollectionConfig } from '../types/scripture';
import { JUZ_RANGES, getSurahsForJuz } from '../utils/juzMapper';

interface FilterPanelProps {
  collections: CollectionConfig[];
  loadedCollectionIds: Set<string>;
  loadingCollections: string[]; // collection IDs currently fetching
  onToggleCollection: (id: string) => void;
  onSelectAllCollections: (enable: boolean) => void; // bulk toggle helper
  selectedBook: string;
  onBookChange: (book: string) => void;
  availableHadithBooks: string[]; // books list excluding Quran
  availableSurahs: string[]; // all 114 Quran Surahs
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  availableTopics: string[]; // topics list based on active collections
  selectedChapter: string;
  onChapterChange: (chapter: string) => void;
  selectedJuz: string;
  onJuzChange: (juz: string) => void;
  isOpen: boolean;
}

export function FilterPanel({
  collections,
  loadedCollectionIds,
  loadingCollections,
  onToggleCollection,
  onSelectAllCollections,
  selectedBook,
  onBookChange,
  availableHadithBooks,
  availableSurahs,
  selectedTopic,
  onTopicChange,
  availableTopics,
  selectedChapter,
  onChapterChange,
  selectedJuz,
  onJuzChange,
  isOpen,
}: FilterPanelProps) {
  const isQuranActive = loadedCollectionIds.has('quran');
  const isHadithActive = availableHadithBooks.length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto mt-2 z-10">
      {/* Expandable panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="glass p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 space-y-4 mb-4">
              {/* Collections Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Scripture Libraries
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectAllCollections(true)}
                      className="text-[9px] font-bold font-display text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 uppercase tracking-wider cursor-pointer"
                    >
                      Select All
                    </button>
                    <span className="text-slate-300 dark:text-slate-700 text-[9px] font-bold select-none">•</span>
                    <button
                      type="button"
                      onClick={() => onSelectAllCollections(false)}
                      className="text-[9px] font-bold font-display text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 uppercase tracking-wider cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {collections.map((col) => {
                    const isLoaded = loadedCollectionIds.has(col.id);
                    const isLoading = loadingCollections.includes(col.id);
                    const isChecked = col.enabled;

                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => onToggleCollection(col.id)}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold font-display border cursor-pointer transition-all duration-200 ${
                          isChecked
                            ? 'bg-gold-50 text-gold-900 border-gold-300 dark:bg-gold-950/30 dark:text-gold-200 dark:border-gold-500/30'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800/80 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        {isLoading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-gold-600 dark:text-gold-400" />
                        ) : isChecked ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <span className="h-3.5 w-3.5 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                        )}
                        <span>{col.name}</span>
                        {!isLoaded && !isLoading && (
                          <span className="text-[9px] px-1 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-sm scale-90">
                            lazy
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Book, Topic, and Chapter inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {/* 1. Juz Select (Quran only) */}
                {isQuranActive && (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="juz-select"
                      className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1"
                    >
                      Filter by Juz
                    </label>
                    <div className="relative">
                      <select
                        id="juz-select"
                        value={selectedJuz}
                        onChange={(e) => onJuzChange(e.target.value)}
                        className="w-full h-10 px-3 pr-10 rounded-xl bg-white dark:bg-[#201b13] border border-stone-200/80 dark:border-gold-500/20 text-sm text-slate-700 dark:text-stone-300 focus:outline-hidden focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 appearance-none cursor-pointer"
                      >
                        <option value="">All Ajza (30 Juz)</option>
                        {JUZ_RANGES.map((j) => (
                          <option key={j.juzNum} value={j.juzNum.toString()}>
                            Juz {j.juzNum} ({j.juzName} — {j.arabicName})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-4.5 w-4.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* 2. Surah Select (Quran only, grouped Juz-wise) */}
                {isQuranActive && (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="surah-select"
                      className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1"
                    >
                      Filter by Surah
                    </label>
                    <div className="relative">
                      <select
                        id="surah-select"
                        value={availableSurahs.includes(selectedBook) ? selectedBook : ''}
                        onChange={(e) => onBookChange(e.target.value)}
                        className="w-full h-10 px-3 pr-10 rounded-xl bg-white dark:bg-[#201b13] border border-stone-200/80 dark:border-gold-500/20 text-sm text-slate-700 dark:text-stone-300 focus:outline-hidden focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 appearance-none cursor-pointer"
                      >
                        <option value="">All Surahs (114)</option>
                        {JUZ_RANGES.map((j) => {
                          const surahsInJuz = getSurahsForJuz(j.juzNum, availableSurahs);
                          if (surahsInJuz.length === 0) return null;
                          return (
                            <optgroup key={j.juzNum} label={`Juz ${j.juzNum} (${j.juzName})`}>
                              {surahsInJuz.map((surah) => (
                                <option key={surah} value={surah}>
                                  {surah}
                                </option>
                              ))}
                            </optgroup>
                          );
                        })}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-4.5 w-4.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* 3. Book Select (Hadith Books only - does NOT include Surahs!) */}
                {isHadithActive && (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="book-select"
                      className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1"
                    >
                      Filter by Book
                    </label>
                    <div className="relative">
                      <select
                        id="book-select"
                        value={availableHadithBooks.includes(selectedBook) ? selectedBook : ''}
                        onChange={(e) => onBookChange(e.target.value)}
                        className="w-full h-10 px-3 pr-10 rounded-xl bg-white dark:bg-[#201b13] border border-stone-200/80 dark:border-gold-500/20 text-sm text-slate-700 dark:text-stone-300 focus:outline-hidden focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 appearance-none cursor-pointer"
                      >
                        <option value="">All Books ({availableHadithBooks.length})</option>
                        {availableHadithBooks.map((book) => (
                          <option key={book} value={book}>
                            {book}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-4.5 w-4.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* 4. Topic Select */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="topic-select"
                    className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1"
                  >
                    Filter by Topic
                  </label>
                  <div className="relative">
                    <select
                      id="topic-select"
                      value={selectedTopic}
                      onChange={(e) => onTopicChange(e.target.value)}
                      disabled={availableTopics.length === 0}
                      className="w-full h-10 px-3 pr-10 rounded-xl bg-white dark:bg-[#201b13] border border-stone-200/80 dark:border-gold-500/20 text-sm text-slate-700 dark:text-stone-300 focus:outline-hidden focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 disabled:opacity-50 appearance-none cursor-pointer"
                    >
                      <option value="">All Topics ({availableTopics.length})</option>
                      {availableTopics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4.5 w-4.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* 5. Chapter / Verse Select */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="chapter-input"
                    className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1"
                  >
                    {isQuranActive && !isHadithActive ? 'Ayah / Verse #' : isHadithActive && !isQuranActive ? 'Hadith Number' : 'Chapter / Ayah / Hadith #'}
                  </label>
                  <input
                    id="chapter-input"
                    type="number"
                    min="1"
                    placeholder="Number..."
                    value={selectedChapter}
                    onChange={(e) => onChapterChange(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-[#201b13] border border-stone-200/80 dark:border-gold-500/20 text-sm text-slate-700 dark:text-stone-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
