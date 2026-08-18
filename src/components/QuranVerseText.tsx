import * as React from 'react';
import { Loader2, AlertCircle, BookOpen } from 'lucide-react';
import type { ScriptureEntry } from '../types/scripture';
import { QURAN_ARABIC_DATA } from '../search/quranArabicData';
import { transliterateUrduToRoman } from '../utils/transliterate';

interface QuranVerseTextProps {
  entry: ScriptureEntry;
  isActive?: boolean;
  highlightedHtml?: string;
  preloadedAr?: string;
  preloadedTr?: string;
  preloadedRo?: string;
  preloadedTj?: string;
}

import { formatTajweedTransliteration, cleanTajweedMarkup } from '../utils/tajweed';
import type { QuranWord } from '../utils/tajweed';

export function QuranVerseText({
  entry,
  highlightedHtml,
  isActive,
  preloadedAr,
  preloadedTr,
  preloadedRo,
  preloadedTj,
}: QuranVerseTextProps) {
  const [onlineData, setOnlineData] = React.useState<{ ar: string; tr: string; ro?: string; tj?: string } | null>(null);
  const [error, setError] = React.useState(false);

  const [tafsirText, setTafsirText] = React.useState<string | null>(null);
  const [tafsirHinglish, setTafsirHinglish] = React.useState<string | null>(null);
  const [isLoadingTafsir, setIsLoadingTafsir] = React.useState(false);
  const [tafsirError, setTafsirError] = React.useState(false);

  const [showTajweed, setShowTajweed] = React.useState(false);

  const isQuran = entry.collection.toLowerCase() === 'quran';
  const quranKey = isQuran ? `${entry.chapter}:${entry.verse}` : '';
  const localData = isQuran ? QURAN_ARABIC_DATA[quranKey] : null;

  // If preloaded or local static fallback exists, use it. Otherwise, use dynamically fetched online state.
  const arText = (preloadedAr ? cleanTajweedMarkup(preloadedAr) : '') || onlineData?.ar || localData?.ar;
  const trText = preloadedTr || onlineData?.tr || localData?.tr;
  const roText = preloadedRo || onlineData?.ro;
  const tjText = preloadedTj || onlineData?.tj;

  const handleToggleTajweed = async () => {
    if (!isQuran) return;
    if (showTajweed) {
      setShowTajweed(false);
      return;
    }

    if (tjText) {
      setShowTajweed(true);
      return;
    }

    // Fetch Tajweed transliteration on demand if not pre-fetched
    try {
      const tjRes = await fetch(`https://api.quran.com/api/v4/verses/by_key/${quranKey}?words=true`);
      if (tjRes.ok) {
        const tjJson = await tjRes.json();
        const words: QuranWord[] = tjJson?.verse?.words || [];
        const translitWords = words
          .filter((w: QuranWord) => w.char_type_name === 'word')
          .map((w: QuranWord) => w.transliteration?.text || '');
        const tjVal = formatTajweedTransliteration(translitWords);
        
        setOnlineData(prev => ({
          ar: prev?.ar || arText || '',
          tr: prev?.tr || trText || '',
          ro: prev?.ro || roText || '',
          tj: tjVal
        }));
        setShowTajweed(true);
      }
    } catch (err) {
      console.error('Failed to load Tajweed transliteration on demand:', err);
    }
  };

  // Automatically fetch online Tajweed data (Arabic & transliterations) in the background on mount
  React.useEffect(() => {
    if (!isQuran) return;
    if (preloadedAr && preloadedTr && preloadedTj) {
      // Already fully preloaded (like in Reader Mode chapter load)
      return;
    }

    let active = true;
    const autoFetchDetails = async () => {
      try {
        const [arRes, roRes, tjRes] = await Promise.all([
          fetch(`https://api.quran.com/api/v4/quran/verses/uthmani_tajweed?verse_key=${quranKey}`),
          fetch(`https://api.quran.com/api/v4/quran/translations/831?verse_key=${quranKey}`),
          fetch(`https://api.quran.com/api/v4/verses/by_key/${quranKey}?words=true`)
        ]);

        if (!active) return;

        let arVal = '';
        let roVal = '';
        let tjVal = '';

        if (arRes.ok) {
          const arJson = await arRes.json();
          const rawAr = arJson.verses?.[0]?.text_uthmani_tajweed || '';
          arVal = cleanTajweedMarkup(rawAr);
        }

        if (roRes.ok) {
          const roJson = await roRes.json();
          roVal = roJson.translations?.[0]?.text?.replace(/<[^>]*>/g, '') || '';
        }

        if (tjRes.ok) {
          const tjJson = await tjRes.json();
          const words = tjJson.verse?.words || [];
          const translitWords = words
            .filter((w: QuranWord) => w.char_type_name === 'word')
            .map((w: QuranWord) => w.transliteration?.text || '');
          tjVal = formatTajweedTransliteration(translitWords);
        }

        if (active && (arVal || roVal || tjVal)) {
          setOnlineData({
            ar: arVal,
            tr: localData?.tr || '',
            ro: roVal,
            tj: tjVal
          });
        }
      } catch (err) {
        console.error('Failed to auto-fetch Quran verse details in background:', err);
        if (active) {
          setError(true);
        }
      }
    };

    autoFetchDetails();

    return () => {
      active = false;
    };
  }, [quranKey, preloadedAr, preloadedTr, preloadedTj, localData, isQuran]);

  const handleLoadTafsir = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tafsirText || tafsirHinglish || isLoadingTafsir) return;

    setIsLoadingTafsir(true);
    setTafsirError(false);
    try {
      // Fetch English (817) and Urdu (818) Tafsirs concurrently
      const [enRes, urRes] = await Promise.all([
        fetch(`https://api.quran.com/api/v4/tafsirs/817/by_ayah/${quranKey}`),
        fetch(`https://api.quran.com/api/v4/tafsirs/818/by_ayah/${quranKey}`)
      ]);

      let enVal = '';
      let urVal = '';

      if (enRes.ok) {
        const enJson = await enRes.json();
        enVal = enJson.tafsir?.text || '';
      }
      if (urRes.ok) {
        const urJson = await urRes.json();
        urVal = urJson.tafsir?.text || '';
      }

      // Fallback: If Tazkirul Quran is empty/null, fetch Tafsir Ibn Kathir (169 / 160)
      if (!enVal || !urVal) {
        const [enFbRes, urFbRes] = await Promise.all([
          !enVal ? fetch(`https://api.quran.com/api/v4/tafsirs/169/by_ayah/${quranKey}`) : Promise.resolve(null),
          !urVal ? fetch(`https://api.quran.com/api/v4/tafsirs/160/by_ayah/${quranKey}`) : Promise.resolve(null)
        ]);

        if (enFbRes && enFbRes.ok) {
          const enFbJson = await enFbRes.json();
          enVal = enFbJson.tafsir?.text || enVal;
        }
        if (urFbRes && urFbRes.ok) {
          const urFbJson = await urFbRes.json();
          urVal = urFbJson.tafsir?.text || urVal;
        }
      }

      let enParagraphText = '';
      let roParagraphText = '';

      if (enVal) {
        const enMatch = enVal.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
        if (enMatch) {
          enParagraphText = enMatch[1].replace(/<[^>]*>/g, '').trim();
        } else {
          enParagraphText = enVal.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        }
        if (enParagraphText.length < 50) {
          enParagraphText = enVal.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        }
      }

      if (urVal) {
        const urMatch = urVal.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
        let urParagraphText = '';
        if (urMatch) {
          urParagraphText = urMatch[1].replace(/<[^>]*>/g, '').trim();
        } else {
          urParagraphText = urVal.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        }
        if (urParagraphText.length < 30) {
          urParagraphText = urVal.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        }
        // Transliterate the Urdu paragraph to Roman Urdu (Hinglish)
        roParagraphText = transliterateUrduToRoman(urParagraphText);
      }

      if (enParagraphText || roParagraphText) {
        setTafsirText(enParagraphText || null);
        setTafsirHinglish(roParagraphText || null);
      } else {
        throw new Error('No Tafsir text in responses');
      }
    } catch (err) {
      console.error('Failed to load Tafsirs:', err);
      setTafsirError(true);
    } finally {
      setIsLoadingTafsir(false);
    }
  };

  if (!isQuran) {
    return (
      <div className="text-base text-slate-800 dark:text-stone-300 leading-relaxed font-serif font-normal text-left">
        {entry.text}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Arabic Script display */}
      {arText && (
        <p
          className="text-right text-2xl sm:text-3xl font-serif text-slate-900 dark:text-gold-100 leading-loose tracking-wide font-normal select-all mt-2 select-text cursor-text tajweed-container"
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: arText }}
        />
      )}

      {/* English Transliteration display */}
      {trText && (
        <div className="space-y-2 mt-1.5 pl-4 border-l border-slate-300 dark:border-gold-500/15 text-left leading-relaxed">
          <div>
            <span className="text-[9px] uppercase tracking-wider font-bold opacity-60 block text-slate-400 dark:text-slate-500">
              Standard Transliteration
            </span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="text-xs font-serif-italic text-slate-500 dark:text-slate-400 select-text cursor-text">
                {trText}
              </p>
              {!tjText && (
                <button
                  type="button"
                  onClick={handleToggleTajweed}
                  className="text-[9px] font-bold font-display uppercase tracking-wider text-gold-600 dark:text-gold-500 hover:underline cursor-pointer no-print shrink-0"
                >
                  (Load Tajweed Translit)
                </button>
              )}
            </div>
          </div>

          {tjText && (
            <div className="mt-1.5 animate-in fade-in duration-200">
              <span className="text-[9px] uppercase tracking-wider font-bold opacity-60 block text-slate-400 dark:text-slate-500">
                Tajweed Transliteration (Phonetic Recitation)
              </span>
              <p className="text-xs font-serif-italic text-slate-500 dark:text-slate-400 select-text cursor-text">
                {tjText}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Main English Translation (with highlight support if provided) */}
      {highlightedHtml ? (
        <div
          className={`text-base leading-relaxed text-slate-800 dark:text-stone-300 font-serif font-normal border-l-2 border-gold-500/30 pl-4 py-1 text-left select-text cursor-text ${
            isActive ? 'font-semibold text-slate-950 dark:text-gold-100' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <p
          className={`text-base leading-relaxed text-slate-800 dark:text-stone-300 font-serif border-l-2 border-gold-500/30 pl-4 py-1 text-left select-text cursor-text ${
            isActive ? 'font-semibold text-slate-950 dark:text-gold-100' : 'font-normal'
          }`}
        >
          {entry.text}
        </p>
      )}

      {/* Hinglish/Roman Urdu Translation display */}
      {roText && (
        <div className="text-left text-xs font-semibold text-amber-700 dark:text-gold-400 pl-4 border-l border-amber-500/20 leading-relaxed select-text cursor-text mt-2.5 animate-in fade-in duration-200">
          <span className="text-[9px] uppercase tracking-wider font-bold opacity-75 mr-1 block text-slate-400 dark:text-slate-500">
            Hinglish Translation
          </span>
          {roText}
        </div>
      )}

      {/* Tafsir Context Explanation display */}
      {(tafsirText || tafsirHinglish) && (
        <div className="text-left text-xs space-y-4 mt-3 bg-stone-50/50 dark:bg-gold-950/5 p-4 rounded-xl border border-gold-500/10 print-tafsir-container">
          {tafsirText && (
            <div className="pl-4 border-l border-gold-500/20 space-y-1 select-text">
              <span className="text-[9px] uppercase tracking-wider font-bold text-gold-600 dark:text-gold-500 block">
                English Explanation
              </span>
              <p className="leading-relaxed font-sans text-slate-700 dark:text-stone-300">
                {tafsirText}
              </p>
            </div>
          )}

          {tafsirHinglish && (
            <div className="pl-4 border-l border-amber-500/20 space-y-1 select-text">
              <span className="text-[9px] uppercase tracking-wider font-bold text-amber-700 dark:text-gold-400 block">
                Hinglish Explanation
              </span>
              <p className="leading-relaxed font-sans text-amber-900/90 dark:text-gold-200/90">
                {tafsirHinglish}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Progressive loading buttons */}
      <div className="pt-2 flex flex-wrap items-center gap-3 no-print">

        {!(tafsirText || tafsirHinglish) ? (
          <button
            type="button"
            onClick={handleLoadTafsir}
            disabled={isLoadingTafsir}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold-500/20 bg-gold-500/5 hover:bg-gold-500/15 text-[10px] font-bold font-display uppercase tracking-wider text-gold-600 dark:text-gold-400 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoadingTafsir ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin text-gold-500" />
                <span>Loading Tafsir...</span>
              </>
            ) : (
              <>
                <BookOpen className="h-3 w-3" />
                <span>Show Tafsir (Explanation)</span>
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setTafsirText(null);
              setTafsirHinglish(null);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-500/10 hover:bg-red-500/5 text-[9px] font-bold font-display uppercase tracking-widest text-red-500 transition-colors cursor-pointer"
          >
            <span>Hide Tafsir</span>
          </button>
        )}

        {error && (
          <span className="inline-flex items-center gap-1 text-[10px] text-red-500 font-medium">
            <AlertCircle className="h-3.5 w-3.5" />
            Failed to load script (offline).
          </span>
        )}

        {tafsirError && (
          <span className="inline-flex items-center gap-1 text-[10px] text-red-500 font-medium">
            <AlertCircle className="h-3.5 w-3.5" />
            Failed to load Tafsir (offline).
          </span>
        )}
      </div>
    </div>
  );
}
