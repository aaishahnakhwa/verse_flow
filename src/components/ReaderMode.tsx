import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ChevronRight, Copy, Check, Printer } from 'lucide-react';
import type { ScriptureEntry } from '../types/scripture';
import { copyToClipboard } from '../utils/share';
import { cn } from '../utils/cn';
import { QuranVerseText } from './QuranVerseText';

interface ReaderModeProps {
  isOpen: boolean;
  onClose: () => void;
  activeEntry: ScriptureEntry | null;
  contextEntries: ScriptureEntry[];
}

export function ReaderMode({ isOpen, onClose, activeEntry, contextEntries }: ReaderModeProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const activeVerseRef = React.useRef<HTMLDivElement | null>(null);

  // Auto-scroll to center the active entry when modal opens
  React.useEffect(() => {
    if (isOpen && activeEntry) {
      // Give a tiny timeout for the DOM to render and anims to finish
      const timer = setTimeout(() => {
        if (activeVerseRef.current) {
          activeVerseRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeEntry]);

  const [chapterData, setChapterData] = React.useState<Record<string, { ar: string; tr: string }>>({});
  const [isLoadingExtra, setIsLoadingExtra] = React.useState(false);
  const [extraError, setExtraError] = React.useState(false);

  // Pre-load Arabic script & English transliterations for the entire Quran chapter on-demand
  React.useEffect(() => {
    if (!isOpen || !activeEntry || activeEntry.collection.toLowerCase() !== 'quran') {
      Promise.resolve().then(() => setChapterData({}));
      return;
    }

    const chapterNum = activeEntry.chapter;

    const fetchChapterExtra = async () => {
      setIsLoadingExtra(true);
      setExtraError(false);
      try {
        // 1. Fetch Uthmani Arabic script for the entire Surah
        const arRes = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${chapterNum}`);
        if (!arRes.ok) throw new Error('Arabic fetch failed');
        const arJson = await arRes.json();

        // 2. Fetch English transliterations (translation ID 57) for the entire Surah
        const trRes = await fetch(`https://api.quran.com/api/v4/quran/translations/57?chapter_number=${chapterNum}`);
        if (!trRes.ok) throw new Error('Transliteration fetch failed');
        const trJson = await trRes.json();

        const dataMap: Record<string, { ar: string; tr: string }> = {};

        arJson.verses?.forEach((v: { verse_key: string; text_uthmani: string }) => {
          dataMap[v.verse_key] = { ar: v.text_uthmani, tr: '' };
        });

        trJson.translations?.forEach((t: { text: string }, idx: number) => {
          const arVerse = arJson.verses?.[idx];
          if (arVerse) {
            const key = arVerse.verse_key;
            if (dataMap[key]) {
              dataMap[key].tr = t.text.replace(/<[^>]*>/g, ''); // strip HTML tags
            }
          }
        });

        setChapterData(dataMap);
      } catch (err) {
        console.error('Failed to load chapter extra data:', err);
        setExtraError(true);
      } finally {
        setIsLoadingExtra(false);
      }
    };

    fetchChapterExtra();
  }, [isOpen, activeEntry]);

  const handleCopy = async (entry: ScriptureEntry) => {
    const citation = `"${entry.text}" — ${entry.reference}`;
    const success = await copyToClipboard(citation);
    if (success) {
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  if (!activeEntry) return null;

  const isQuran = activeEntry.collection === 'Quran';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 print-modal-container">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0d0f12]/50 dark:bg-[#0d0f12]/80 backdrop-blur-xs cursor-pointer no-print"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl h-[85vh] bg-white dark:bg-[#201b13] rounded-2xl border border-stone-200/50 dark:border-gold-500/20 shadow-2xl flex flex-col overflow-hidden z-10 print-modal-content"
          >
            {/* Header section */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/50 dark:border-gold-500/10 bg-stone-50/50 dark:bg-[#15120d]/60">
              <div className="flex items-center gap-3 text-left">
                <div className="h-10 w-10 rounded-xl bg-gold-500/10 dark:bg-gold-500/10 flex items-center justify-center text-gold-600 dark:text-gold-500 shadow-xs shadow-gold-500/10">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-gold-500/75">
                    <span>{activeEntry.collection}</span>
                    <ChevronRight className="h-3 w-3" />
                    <span>{isQuran ? `Surah ${activeEntry.book}` : activeEntry.book}</span>
                  </div>
                  <h3 className="text-lg font-bold font-cinzel text-slate-900 dark:text-gold-100 leading-tight">
                    {isQuran ? `Surah ${activeEntry.book} (Chapter ${activeEntry.chapter})` : `${activeEntry.book} — Chapter ${activeEntry.chapter}`}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 no-print">
                {isLoadingExtra && (
                  <span className="text-[10px] text-gold-600 dark:text-gold-400 font-bold font-display uppercase tracking-wider animate-pulse mr-2 hidden sm:inline">
                    Syncing Arabic/Translit...
                  </span>
                )}
                {extraError && (
                  <span className="text-[10px] text-red-500 font-bold font-display uppercase tracking-wider mr-2 hidden sm:inline">
                    Offline Fallback Active
                  </span>
                )}
                <button
                  onClick={() => window.print()}
                  className="h-9 px-3.5 rounded-xl flex items-center gap-1.5 border border-stone-200/50 dark:border-gold-500/20 hover:bg-stone-100 dark:hover:bg-gold-950/20 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-gold-400 font-display text-xs font-bold transition-colors cursor-pointer"
                  title="Save Surah as PDF"
                >
                  <Printer className="h-4 w-4" />
                  <span>Save PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="h-9 w-9 rounded-xl flex items-center justify-center border border-stone-200/50 dark:border-gold-500/20 hover:bg-stone-100 dark:hover:bg-gold-950/20 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-gold-400 transition-colors cursor-pointer"
                  title="Close Reader"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Verses Scroller */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth select-text no-scrollbar print-verses-scroller">
              {/* Print-only calligraphic title header */}
              <div className="hidden print-header-block text-center border-b-2 border-slate-900 pb-4 mb-8">
                <h1 className="text-3xl font-cinzel font-bold text-slate-900 uppercase tracking-wider">
                  {activeEntry.collection}
                </h1>
                <p className="text-sm font-display font-bold text-slate-600 uppercase tracking-widest mt-1">
                  {isQuran ? `Surah ${activeEntry.book} — Chapter ${activeEntry.chapter}` : `${activeEntry.book} — Chapter ${activeEntry.chapter}`}
                </p>
                <span className="text-[10px] text-slate-400 font-display block mt-2">
                  Generated by VerseFlow Reference Library
                </span>
              </div>
              {contextEntries.map((item) => {
                const isActive = item.id === activeEntry.id;
                const itemVerseNum = item.verse ?? item.hadithNumber;

                return (
                  <div
                    key={item.id}
                    ref={isActive ? activeVerseRef : null}
                    className={cn(
                      "p-5 rounded-xl border transition-all duration-300 relative group text-left print-verse-item",
                      isActive
                        ? "border-gold-500 bg-gold-50/20 dark:border-gold-500/30 dark:bg-gold-950/10 shadow-xs ring-1 ring-gold-500/20"
                        : "border-stone-100 dark:border-gold-500/5 hover:border-stone-200 dark:hover:border-gold-500/10"
                    )}
                  >
                    {/* Verse actions corner overlay */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity no-print">
                      <button
                        onClick={() => handleCopy(item)}
                        className="h-7 w-7 rounded-lg flex items-center justify-center border border-stone-200/40 dark:border-gold-500/10 bg-white dark:bg-[#201b13] text-slate-400 hover:text-slate-700 dark:hover:text-gold-400 hover:shadow-xs transition-all cursor-pointer"
                        title="Copy Verse"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Verse text content */}
                    <div className="space-y-3.5 pr-8">
                      {/* Verse count label */}
                      <span className={cn(
                        "inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-[10px] font-bold font-display uppercase tracking-wider",
                        isActive
                          ? "bg-gold-500 text-slate-950"
                          : "bg-stone-50 text-slate-500 dark:bg-[#15120d] dark:text-stone-400 border dark:border-gold-500/5"
                      )}>
                        {isQuran ? `Ayah ${itemVerseNum}` : `Hadith ${itemVerseNum}`}
                      </span>

                      {/* Main text */}
                      {item.collection.toLowerCase() === 'quran' ? (
                        <QuranVerseText
                          entry={item}
                          isActive={isActive}
                          preloadedAr={chapterData[`${item.chapter}:${item.verse}`]?.ar}
                          preloadedTr={chapterData[`${item.chapter}:${item.verse}`]?.tr}
                        />
                      ) : (
                        <>
                          <p className={cn(
                            "text-base leading-relaxed text-slate-800 dark:text-stone-200 font-serif",
                            isActive ? "font-semibold" : "font-normal"
                          )}>
                            {item.text}
                          </p>

                          {item.translator && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                              Trans: {item.translator}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer status bar */}
            <div className="px-6 py-3 border-t border-stone-200/50 dark:border-gold-500/10 bg-stone-50/50 dark:bg-[#11141a]/60 text-xs text-slate-400 dark:text-slate-500 text-left flex justify-between items-center">
              <span>{contextEntries.length} total verses in this section</span>
              <span>Press ESC to exit reader</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
