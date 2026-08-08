import * as React from 'react';
import { ChevronRight, ChevronDown, BookOpen } from 'lucide-react';
import type { CollectionConfig } from '../types/scripture';
import { cn } from '../utils/cn';
import { JUZ_RANGES, getSurahsForJuz, getJuzForVerse } from '../utils/juzMapper';

interface SidebarNavProps {
  collections: CollectionConfig[];
  loadedCollectionIds: Set<string>;
  selectedBook: string;
  selectedChapter: string;
  onBookSelect: (book: string, collectionId: string) => void;
  onChapterSelect: (chapter: string) => void;
  getBooksForCollection: (collectionName: string) => string[];
  getChaptersForBook: (bookName: string) => number[];
  onClearFilters: () => void;
}

export function SidebarNav({
  collections,
  loadedCollectionIds,
  selectedBook,
  selectedChapter,
  onBookSelect,
  onChapterSelect,
  getBooksForCollection,
  getChaptersForBook,
  onClearFilters,
}: SidebarNavProps) {
  // Track which collections are expanded in the accordion
  const [expandedCollections, setExpandedCollections] = React.useState<Record<string, boolean>>({});
  const [prevSelectedBook, setPrevSelectedBook] = React.useState(selectedBook);
  const [quranBrowseMode, setQuranBrowseMode] = React.useState<'surah' | 'juz'>('surah');
  const [expandedJuzs, setExpandedJuzs] = React.useState<Record<number, boolean>>({});

  // Sync expanded state when selectedBook changes programmatically (e.g. on deep-link load)
  if (selectedBook !== prevSelectedBook) {
    setPrevSelectedBook(selectedBook);
    if (selectedBook) {
      const parentCol = collections.find(c => {
        const books = getBooksForCollection(c.name);
        return books.includes(selectedBook);
      });
      if (parentCol) {
        setExpandedCollections(prev => ({ ...prev, [parentCol.id]: true }));
      }
    }
  }

  const toggleExpand = (colId: string) => {
    setExpandedCollections(prev => ({ ...prev, [colId]: !prev[colId] }));
  };

  const toggleExpandJuz = (juzNum: number) => {
    setExpandedJuzs(prev => ({ ...prev, [juzNum]: !prev[juzNum] }));
  };

  return (
    <div className="w-full space-y-4">
      {/* Sidebar header */}
      <div className="space-y-1.5 px-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Browse Concordance
          </span>
          {(selectedBook || selectedChapter) && (
            <button
              onClick={onClearFilters}
              className="text-[10px] font-bold font-display text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 uppercase tracking-wide cursor-pointer animate-in fade-in"
            >
              Clear Browse
            </button>
          )}
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-normal">
          Select a book (e.g. Quran or Hadith collections) or Juz to browse chapters and verses.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-1.5 max-h-[calc(100vh-240px)] overflow-y-auto pr-1 select-none no-scrollbar">
        {collections.map((col) => {
          const isLoaded = loadedCollectionIds.has(col.id);
          const isExpanded = !!expandedCollections[col.id];
          
          // Get books for this collection (only if loaded)
          const books = isLoaded ? getBooksForCollection(col.name) : [];
          const hasActiveBook = books.includes(selectedBook);

          return (
            <div
              key={col.id}
              className={cn(
                "rounded-xl border transition-all duration-200",
                hasActiveBook 
                  ? "border-gold-500/20 bg-gold-50/5 dark:border-gold-500/10 dark:bg-gold-950/5"
                  : "border-transparent"
              )}
            >
              {/* Collection Row Header */}
              <button
                type="button"
                onClick={() => isLoaded && toggleExpand(col.id)}
                disabled={!isLoaded}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm font-semibold font-display text-left transition-colors rounded-xl",
                  isLoaded 
                    ? "text-slate-700 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:bg-slate-800/40 cursor-pointer" 
                    : "text-slate-400 dark:text-slate-600 cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className={cn("h-4 w-4 shrink-0", isLoaded ? "text-gold-600 dark:text-gold-500" : "text-slate-300 dark:text-slate-700")} />
                  <span className="truncate">{col.name}</span>
                </div>
                {isLoaded ? (
                  isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )
                ) : (
                  <span className="text-[9px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded-sm">
                    lazy
                  </span>
                )}
              </button>

              {/* Books List Accordion Content */}
              {isExpanded && isLoaded && (
                <div className="px-2.5 pb-2 pt-1 border-t border-slate-100 dark:border-slate-800/30 space-y-1.5 mt-1 animate-in fade-in duration-200">
                  {col.id === 'quran' && (
                    <div className="flex bg-stone-100 dark:bg-stone-900/60 p-0.5 rounded-lg mb-2.5 no-print">
                      <button
                        type="button"
                        onClick={() => setQuranBrowseMode('surah')}
                        className={cn(
                          "flex-1 text-[10px] font-bold font-display uppercase tracking-wider py-1 rounded-md transition-all cursor-pointer",
                          quranBrowseMode === 'surah'
                            ? "bg-white dark:bg-[#201b13] text-gold-600 dark:text-gold-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                        )}
                      >
                        By Surah
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuranBrowseMode('juz')}
                        className={cn(
                          "flex-1 text-[10px] font-bold font-display uppercase tracking-wider py-1 rounded-md transition-all cursor-pointer",
                          quranBrowseMode === 'juz'
                            ? "bg-white dark:bg-[#201b13] text-gold-600 dark:text-gold-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                        )}
                      >
                        By Juz
                      </button>
                    </div>
                  )}

                  {col.id === 'quran' && quranBrowseMode === 'juz' ? (
                    /* Browse By Juz view list */
                    <div className="space-y-1 max-h-[300px] overflow-y-auto pr-0.5 no-scrollbar">
                      {JUZ_RANGES.map((juz) => {
                        const isJuzExpanded = !!expandedJuzs[juz.juzNum];
                        const juzSurahs = getSurahsForJuz(juz.juzNum, books);

                        return (
                          <div key={juz.juzNum} className="space-y-1">
                            <button
                              type="button"
                              onClick={() => toggleExpandJuz(juz.juzNum)}
                              className={cn(
                                "w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-bold rounded-lg text-left transition-colors cursor-pointer border border-transparent",
                                isJuzExpanded
                                  ? "bg-gold-500/10 border-gold-500/20 text-gold-600 dark:text-gold-400"
                                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-gold-950/25"
                              )}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="font-display text-[9px] bg-gold-500/15 dark:bg-gold-500/10 px-1.5 py-0.5 rounded text-gold-700 dark:text-gold-400 font-extrabold">
                                  Juz {juz.juzNum}
                                </span>
                                <span className="truncate">{juz.juzName}</span>
                              </div>
                              <span className="font-serif text-xs text-slate-400 dark:text-slate-500" dir="rtl">
                                {juz.arabicName}
                              </span>
                            </button>

                            {isJuzExpanded && (
                              <div className="pl-3.5 space-y-1.5 py-1 border-l border-gold-500/10 ml-3.5 animate-in slide-in-from-top-1 duration-150">
                                {juzSurahs.map((surahName) => {
                                  const isSurahSelected = selectedBook === surahName;
                                  const surahChapters = isSurahSelected ? getChaptersForBook(surahName) : [];
                                  const surahNumber = books.indexOf(surahName) + 1;
                                  const filteredChapters = surahChapters.filter(verseNum => getJuzForVerse(surahNumber, verseNum) === juz.juzNum);

                                  return (
                                    <div key={surahName} className="space-y-1.5">
                                      <button
                                        type="button"
                                        onClick={() => onBookSelect(surahName, col.id)}
                                        className={cn(
                                          "w-full flex items-center gap-2 px-2.5 py-1.5 text-[10px] font-semibold rounded-md text-left transition-colors cursor-pointer",
                                          isSurahSelected
                                            ? "bg-gold-500 text-slate-950 font-bold shadow-xs"
                                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/40 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-gold-950/15"
                                        )}
                                      >
                                        <span className="truncate">{surahName}</span>
                                      </button>

                                      {isSurahSelected && filteredChapters.length > 0 && (
                                        <div className="pl-2.5 pr-1 py-1 animate-in slide-in-from-top-1 duration-150">
                                          <div className="grid grid-cols-4 gap-1 max-h-[110px] overflow-y-auto no-scrollbar pr-0.5">
                                            {filteredChapters.map((chapNum) => {
                                              const isChapSelected = selectedChapter === chapNum.toString();
                                              return (
                                                <button
                                                  key={chapNum}
                                                  type="button"
                                                  onClick={() => onChapterSelect(isChapSelected ? '' : chapNum.toString())}
                                                  className={cn(
                                                    "h-5.5 text-[9px] font-bold rounded flex items-center justify-center border transition-all cursor-pointer",
                                                    isChapSelected
                                                      ? "bg-amber-500 border-amber-500 text-white shadow-xs font-bold"
                                                      : "border-slate-200/50 dark:border-slate-800/30 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850"
                                                  )}
                                                >
                                                  {chapNum}
                                                </button>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : books.length === 0 ? (
                    <span className="text-xs text-slate-400 dark:text-slate-500 block px-6 py-1 italic">
                      No books found
                    </span>
                  ) : (
                    books.map((book) => {
                      const isBookSelected = selectedBook === book;
                      const bookChapters = isBookSelected ? getChaptersForBook(book) : [];

                      return (
                        <div key={book} className="space-y-1.5">
                          <button
                            type="button"
                            onClick={() => onBookSelect(book, col.id)}
                            className={cn(
                              "w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg text-left transition-colors cursor-pointer",
                              isBookSelected
                                ? "bg-gold-500 text-slate-950 font-bold shadow-xs"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-gold-950/20"
                            )}
                          >
                            <span className="truncate">{book}</span>
                          </button>

                          {/* Chapter Grid when Book is Selected */}
                          {isBookSelected && bookChapters.length > 0 && (
                            <div className="pl-3 pr-1 py-1.5 animate-in slide-in-from-top-1 duration-150">
                              <span className="text-[9px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
                                {col.id === 'quran' ? 'Ayahs' : 'Chapters'}
                              </span>
                              <div className="grid grid-cols-5 gap-1 max-h-[140px] overflow-y-auto no-scrollbar pr-0.5">
                                {bookChapters.map((chapNum) => {
                                  const isChapSelected = selectedChapter === chapNum.toString();
                                  return (
                                    <button
                                      key={chapNum}
                                      type="button"
                                      onClick={() => onChapterSelect(isChapSelected ? '' : chapNum.toString())}
                                      className={cn(
                                        "h-6 text-[10px] font-semibold rounded-md flex items-center justify-center border transition-all cursor-pointer",
                                        isChapSelected
                                          ? "bg-amber-500 border-amber-500 text-white shadow-xs font-bold"
                                          : "border-slate-200/60 dark:border-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                                      )}
                                    >
                                      {chapNum}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
