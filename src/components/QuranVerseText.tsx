import * as React from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import type { ScriptureEntry } from '../types/scripture';
import { QURAN_ARABIC_DATA } from '../search/quranArabicData';

interface QuranVerseTextProps {
  entry: ScriptureEntry;
  highlightedHtml?: string;
  isActive?: boolean;
  preloadedAr?: string;
  preloadedTr?: string;
}

export function QuranVerseText({
  entry,
  highlightedHtml,
  isActive,
  preloadedAr,
  preloadedTr,
}: QuranVerseTextProps) {
  const [onlineData, setOnlineData] = React.useState<{ ar: string; tr: string } | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const quranKey = `${entry.chapter}:${entry.verse}`;
  const localData = QURAN_ARABIC_DATA[quranKey];

  // If preloaded or local static fallback exists, use it. Otherwise, use dynamically fetched online state.
  const arText = preloadedAr || localData?.ar || onlineData?.ar;
  const trText = preloadedTr || localData?.tr || onlineData?.tr;

  const handleLoadArabic = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (arText || isLoading) return;

    setIsLoading(true);
    setError(false);
    try {
      // 1. Fetch Uthmani Arabic script from the official Quran API
      const arRes = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=${quranKey}`);
      if (!arRes.ok) throw new Error('Arabic fetch failed');
      const arJson = await arRes.json();
      const arVal = arJson.verses?.[0]?.text_uthmani;

      // 2. Fetch English transliteration (translation resource 57)
      const trRes = await fetch(`https://api.quran.com/api/v4/quran/translations/57?verse_key=${quranKey}`);
      if (!trRes.ok) throw new Error('Transliteration fetch failed');
      const trJson = await trRes.json();
      const trVal = trJson.translations?.[0]?.text?.replace(/<[^>]*>/g, ''); // strip inline HTML formatting tags

      if (arVal && trVal) {
        setOnlineData({ ar: arVal, tr: trVal });
      } else {
        throw new Error('Incomplete data response');
      }
    } catch (err) {
      console.error('Failed to load Quran script details:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Arabic Script display */}
      {arText && (
        <p
          className="text-right text-2xl sm:text-3xl font-serif text-slate-900 dark:text-gold-100 leading-loose tracking-wide font-normal select-all mt-2 select-text cursor-text"
          dir="rtl"
        >
          {arText}
        </p>
      )}

      {/* English Transliteration display */}
      {trText && (
        <p className="text-left text-xs font-serif-italic text-slate-500 dark:text-slate-400 pl-4 border-l border-slate-300 dark:border-gold-500/15 leading-relaxed select-text cursor-text">
          {trText}
        </p>
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

      {/* Progressive loading button if no Arabic/transliteration is loaded */}
      {!arText && (
        <div className="pt-1 flex flex-wrap items-center gap-3">
          <button
            onClick={handleLoadArabic}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold-500/20 bg-gold-500/5 hover:bg-gold-500/15 text-[10px] font-bold font-display uppercase tracking-wider text-gold-600 dark:text-gold-400 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin text-gold-500" />
                <span>Loading script...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3" />
                <span>Show Arabic & Transliteration</span>
              </>
            )}
          </button>

          {error && (
            <span className="inline-flex items-center gap-1 text-[10px] text-red-500 font-medium">
              <AlertCircle className="h-3.5 w-3.5" />
              Failed to load (offline). Check connection.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
