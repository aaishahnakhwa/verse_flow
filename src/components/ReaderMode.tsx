import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ChevronRight, Copy, Check, Download, Loader2 } from 'lucide-react';
import type { ScriptureEntry } from '../types/scripture';
import { copyToClipboard } from '../utils/share';
import { cn } from '../utils/cn';
import { QuranVerseText } from './QuranVerseText';
import { QURAN_ARABIC_DATA } from '../search/quranArabicData';

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

  const [chapterData, setChapterData] = React.useState<Record<string, { ar: string; tr: string; ro: string }>>({});
  const [isLoadingExtra, setIsLoadingExtra] = React.useState(false);
  const [extraError, setExtraError] = React.useState(false);

  const [surahInfo, setSurahInfo] = React.useState<{ short_text: string; text: string } | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = React.useState(false);
  const [isInfoExpanded, setIsInfoExpanded] = React.useState(false);

  const fetchChapterExtra = React.useCallback(async (chapterNum: number) => {
    Promise.resolve().then(() => {
      setIsLoadingExtra(true);
      setExtraError(false);
    });
    try {
      // 1. Fetch Uthmani Arabic script for the entire Surah
      const arRes = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${chapterNum}`);
      if (!arRes.ok) throw new Error('Arabic fetch failed');
      const arJson = await arRes.json();

      // 2. Fetch English transliterations (translation ID 57) for the entire Surah
      const trRes = await fetch(`https://api.quran.com/api/v4/quran/translations/57?chapter_number=${chapterNum}`);
      if (!trRes.ok) throw new Error('Transliteration fetch failed');
      const trJson = await trRes.json();

      // 3. Fetch Roman Urdu (Hinglish) translations (translation ID 831) for the entire Surah
      let roJson = { translations: [] };
      try {
        const roRes = await fetch(`https://api.quran.com/api/v4/quran/translations/831?chapter_number=${chapterNum}`);
        if (roRes.ok) {
          roJson = await roRes.json();
        }
      } catch (err) {
        console.error('Failed to load Roman Urdu chapter translations:', err);
      }

      const dataMap: Record<string, { ar: string; tr: string; ro: string }> = {};

      arJson.verses?.forEach((v: { verse_key: string; text_uthmani: string }) => {
        dataMap[v.verse_key] = { ar: v.text_uthmani, tr: '', ro: '' };
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

      roJson.translations?.forEach((t: { text: string }, idx: number) => {
        const arVerse = arJson.verses?.[idx];
        if (arVerse) {
          const key = arVerse.verse_key;
          if (dataMap[key]) {
            dataMap[key].ro = t.text.replace(/<[^>]*>/g, ''); // strip HTML tags
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
  }, []);

  const fetchSurahInfo = React.useCallback(async (chapterNum: number) => {
    Promise.resolve().then(() => {
      setIsLoadingInfo(true);
    });
    try {
      const res = await fetch(`https://api.quran.com/api/v4/chapters/${chapterNum}/info`);
      if (res.ok) {
        const json = await res.json();
        if (json.chapter_info) {
          setSurahInfo(json.chapter_info);
        }
      }
    } catch (err) {
      console.error('Failed to load Surah info:', err);
    } finally {
      setIsLoadingInfo(false);
    }
  }, []);

  // Pre-load Arabic script, English transliterations & Roman Urdu (Hinglish) for the entire Quran chapter on-demand
  React.useEffect(() => {
    if (!isOpen || !activeEntry || activeEntry.collection.toLowerCase() !== 'quran') {
      Promise.resolve().then(() => {
        setChapterData({});
        setSurahInfo(null);
      });
      return;
    }

    const chapterNum = activeEntry.chapter;
    Promise.resolve().then(() => {
      fetchChapterExtra(chapterNum);
      fetchSurahInfo(chapterNum);
    });
  }, [isOpen, activeEntry, fetchChapterExtra, fetchSurahInfo]);

  const handleClose = () => {
    setIsInfoExpanded(false);
    onClose();
  };

  const handleCopy = async (entry: ScriptureEntry) => {
    const citation = `"${entry.text}" — ${entry.reference}`;
    const success = await copyToClipboard(citation);
    if (success) {
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDownloadHTML = () => {
    if (!activeEntry) return;

    const bookName = activeEntry.book;
    const chapterNum = activeEntry.chapter;
    const title = isQuran 
      ? `Surah ${bookName} — Chapter ${chapterNum}` 
      : `${bookName} — Chapter ${chapterNum}`;

    // Compile the list of verses
    const versesHtml = contextEntries.map((entry) => {
      const quranKey = `${entry.chapter}:${entry.verse}`;
      const localData = QURAN_ARABIC_DATA[quranKey];
      
      // Get the loaded Arabic, Transliteration, and Hinglish Translation
      const ar = chapterData?.[quranKey]?.ar || localData?.ar || '';
      const tr = chapterData?.[quranKey]?.tr || localData?.tr || '';
      const ro = chapterData?.[quranKey]?.ro || '';
      const en = entry.text;

      return `
      <div class="verse-item">
        <div class="verse-meta">
          Verse ${entry.verse}
        </div>
        ${ar ? `<p class="verse-arabic">${ar}</p>` : ''}
        ${tr ? `<p class="verse-translit">${tr}</p>` : ''}
        <p class="verse-translation">${en}</p>
        ${ro ? `<p class="verse-hinglish"><span class="hinglish-label">Hinglish:</span> ${ro}</p>` : ''}
      </div>
      `;
    }).join('');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cinzel:wght@700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #fcfbf7;
      color: #1e293b;
      margin: 0;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border: 1px solid #e2e8f0;
      border-top: 6px solid #dca523;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px double #e2e8f0;
      padding-bottom: 20px;
    }
    .header h1 {
      font-family: 'Cinzel', serif;
      font-size: 24px;
      color: #9e6414;
      margin: 0 0 8px 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .header p {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #64748b;
      margin: 0;
      font-weight: 600;
    }
    .commentary-box {
      background: #fbfbfb;
      border-left: 3px solid #dca523;
      padding: 16px 20px;
      margin-bottom: 30px;
      border-radius: 4px;
      font-size: 13px;
      color: #475569;
    }
    .commentary-box h3 {
      margin: 0 0 6px 0;
      color: #9e6414;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .verse-item {
      border-bottom: 1px solid #f1f5f9;
      padding: 24px 0;
    }
    .verse-item:last-child {
      border-bottom: none;
    }
    .verse-meta {
      font-size: 10px;
      font-weight: 700;
      color: #9e6414;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    .verse-arabic {
      font-family: 'Amiri', serif;
      font-size: 28px;
      text-align: right;
      direction: rtl;
      margin: 0 0 16px 0;
      line-height: 2;
      color: #0f172a;
    }
    .verse-translit {
      font-style: italic;
      color: #64748b;
      font-size: 13px;
      margin: 0 0 10px 0;
    }
    .verse-translation {
      font-size: 15px;
      color: #1e293b;
      margin: 0 0 10px 0;
      font-family: Georgia, serif;
    }
    .verse-hinglish {
      font-size: 13.5px;
      color: #b45309;
      margin: 0;
    }
    .hinglish-label {
      font-size: 9px;
      text-transform: uppercase;
      font-weight: 700;
      color: #b45309;
      margin-right: 5px;
    }
    .btn-print {
      display: block;
      width: 100%;
      max-width: 250px;
      margin: 40px auto 0 auto;
      padding: 12px 20px;
      background: #9e6414;
      color: white;
      text-align: center;
      border-radius: 8px;
      text-decoration: none;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      border: none;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(158, 100, 20, 0.2);
      transition: background 0.2s;
    }
    .btn-print:hover {
      background: #84520f;
    }
    @media print {
      body {
        background-color: white;
        padding: 0;
      }
      .container {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      .btn-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${title}</h1>
      <p>VerseFlow Reference Library</p>
    </div>
    
    ${isQuran && surahInfo ? `
    <div class="commentary-box">
      <h3>Surah Context & Commentary</h3>
      <div>${surahInfo.short_text}</div>
    </div>
    ` : ''}
    
    <div class="verses-list">
      ${versesHtml}
    </div>
    
    <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const formattedFilename = `${bookName.replace(/\s+/g, '_')}_Chapter_${chapterNum}.html`;
    link.href = url;
    link.setAttribute('download', formattedFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
            onClick={handleClose}
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
                  <button
                    type="button"
                    onClick={() => activeEntry && fetchChapterExtra(activeEntry.chapter)}
                    className="text-[10px] text-red-500 hover:text-red-600 font-bold font-display uppercase tracking-wider mr-2 underline cursor-pointer border-none bg-transparent"
                    title="Retry syncing translations"
                  >
                    Sync Failed (Retry)
                  </button>
                )}
                <button
                  onClick={handleDownloadHTML}
                  disabled={isLoadingExtra}
                  className="h-9 px-3.5 rounded-xl flex items-center gap-1.5 border border-stone-200/50 dark:border-gold-500/20 hover:bg-stone-100 dark:hover:bg-gold-950/20 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-gold-400 font-display text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                  title={isLoadingExtra ? "Syncing scripture translations..." : "Download Chapter as Offline Study Sheet"}
                >
                  {isLoadingExtra ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-gold-500" />
                      <span>Syncing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleClose}
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

              {/* Surah Context Banner */}
              {isQuran && (surahInfo || isLoadingInfo) && (
                <div className="glass p-5 rounded-2xl border border-gold-500/10 bg-gold-500/2 text-left mb-6 space-y-3 print-surah-banner">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold font-display uppercase tracking-widest text-gold-600 dark:text-gold-500">
                        📖 Surah Context & Commentary (Tafhim)
                      </span>
                      {isLoadingInfo && (
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                      className="text-[10px] font-bold font-display text-gold-600 dark:text-gold-400 hover:text-gold-700 uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent no-print"
                    >
                      {isInfoExpanded ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  
                  {surahInfo && (
                    <div className="space-y-2.5">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                        {surahInfo.short_text}
                      </p>
                      
                      <div 
                        className={`text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-4 pt-3 border-t border-gold-500/10 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin select-text surah-info-html no-print ${isInfoExpanded ? "block" : "hidden"}`}
                        dangerouslySetInnerHTML={{ __html: surahInfo.text }}
                      />
                    </div>
                  )}
                </div>
              )}

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
                          preloadedRo={chapterData[`${item.chapter}:${item.verse}`]?.ro}
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
