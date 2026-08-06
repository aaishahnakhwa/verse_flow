import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, Sparkles, Copy, Check, BookOpen, AlertCircle } from 'lucide-react';
import { COUNSELING_REGISTRY, findBestProfile, type CounselingProfile } from '../search/counselRegistry';
import type { SearchEngine } from '../search/searchEngine';
import type { ScriptureEntry } from '../types/scripture';
import { ResultCard } from './ResultCard';

interface CounselModeProps {
  searchEngine: SearchEngine;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onReadContext: (entry: ScriptureEntry) => void;
}

export function CounselMode({
  searchEngine,
  bookmarks,
  onToggleBookmark,
  onReadContext,
}: CounselModeProps) {
  const [userInput, setUserInput] = React.useState('');
  const [activeProfile, setActiveProfile] = React.useState<CounselingProfile | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  // Automatically search and resolve scripture entries when a profile is selected
  const matchingVerses = React.useMemo(() => {
    if (!activeProfile) return [];

    const resolved: ScriptureEntry[] = [];
    activeProfile.matchingVerses.forEach(ref => {
      const [chapStr, verStr] = ref.split(':');
      if (chapStr && verStr) {
        const chap = parseInt(chapStr, 10);
        const ver = parseInt(verStr, 10);
        
        // Search inside Quran collection for the matching chapter
        const results = searchEngine.searchCollections({
          query: '',
          book: 'Quran',
          chapter: chap,
        });

        // Find the specific verse
        const match = results.find(doc => doc.verse === ver);
        if (match) {
          resolved.push(match);
        }
      }
    });

    return resolved;
  }, [activeProfile, searchEngine]);

  const matchingHadiths = React.useMemo(() => {
    if (!activeProfile) return [];

    const resolved: ScriptureEntry[] = [];
    activeProfile.matchingHadiths.forEach(id => {
      const match = searchEngine.getEntryById(id);
      if (match) {
        resolved.push(match);
      }
    });

    return resolved;
  }, [activeProfile, searchEngine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsSearching(true);
    // Simulate a brief, satisfying counselor "contemplation" delay
    setTimeout(() => {
      const match = findBestProfile(userInput);
      setActiveProfile(match);
      setIsSearching(false);
    }, 450);
  };

  const handleChipClick = (chipText: string) => {
    setUserInput(chipText);
    setIsSearching(true);
    setTimeout(() => {
      const match = findBestProfile(chipText);
      setActiveProfile(match);
      setIsSearching(false);
    }, 400);
  };

  const handleCopyDua = (duaText: string, translation: string, ref: string) => {
    const textToCopy = `"${duaText}"\n\nTransliteration: ${activeProfile?.recommendedDua.transliteration}\n\nTranslation: ${translation}\n\nReference: ${ref}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 z-10 relative">
      
      {/* Hero Welcome Panel */}
      <div className="text-center space-y-3.5 max-w-2xl mx-auto py-4">
        <div className="inline-flex h-11 w-11 rounded-full bg-gold-500/10 dark:bg-gold-500/10 items-center justify-center text-gold-600 dark:text-gold-500 mb-2 shadow-xs shadow-gold-500/5">
          <Heart className="h-5.5 w-5.5 fill-current" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight brand-name-glow">
          Spiritual Counsel
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-400 font-semibold leading-relaxed">
          Share what is weighing on your heart today, and retrieve comforting advice, prayers, and references from the Quran and Sunnah.
        </p>
      </div>

      {/* Interactive Counsel Input Form */}
      <div className="glass p-6 rounded-2xl border border-stone-200/50 dark:border-gold-500/10 shadow-lg space-y-4">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Describe your struggle (e.g., 'I am worried about my exams', 'loss of a loved one')..."
            className="w-full h-14 pl-12 pr-28 rounded-2xl bg-white dark:bg-[#161a22] border border-stone-200/80 dark:border-gold-500/20 text-base text-slate-900 dark:text-gold-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-gold-500/20 dark:focus:ring-gold-500/20 focus:border-gold-500 dark:focus:border-gold-500 transition-all shadow-md shadow-gold-500/2"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-3.5 px-4 h-8 text-[11px] font-bold font-display uppercase tracking-wider bg-gold-500 text-[#11141a] rounded-xl hover:bg-gold-600 active:scale-95 transition-all cursor-pointer shadow-sm shadow-gold-500/10 flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSearching ? 'Thinking...' : 'Seek'}
          </button>
        </form>

        {/* Quick select search chips */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            Or select a common challenge
          </span>
          <div className="flex flex-wrap gap-2">
            {COUNSELING_REGISTRY.map(profile => (
              <button
                key={profile.id}
                type="button"
                onClick={() => handleChipClick(Object.keys(profile.keywords)[0])}
                className="text-[11px] font-bold font-display px-3 py-1.5 rounded-xl bg-white hover:bg-gold-50 dark:bg-[#201b13] dark:hover:bg-gold-950/20 text-slate-700 dark:text-slate-300 border border-stone-200/60 dark:border-gold-500/10 hover:border-gold-500/30 dark:hover:border-gold-500/30 transition-all cursor-pointer shadow-xs"
              >
                <span>{profile.emoji} {profile.categoryName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Counseling matches details wrapper */}
      <AnimatePresence mode="wait">
        {activeProfile && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Counselor message advice card */}
            <div className="glass-card p-6 rounded-2xl border-l-4 border-l-gold-500/80 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-gold-600 dark:text-gold-500">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <h3 className="text-base font-bold font-display uppercase tracking-wider leading-none">
                  Counsel: {activeProfile.categoryName}
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-medium">
                {activeProfile.counselText}
              </p>
            </div>

            {/* Recommended Du'a card block */}
            <div className="glass-card p-6 rounded-2xl border border-stone-200/60 dark:border-gold-500/15 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-gold-500/10 pb-3">
                <span className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Recommended Supplication (Du’a)
                </span>
                <button
                  onClick={() => handleCopyDua(activeProfile.recommendedDua.arabic, activeProfile.recommendedDua.english, activeProfile.recommendedDua.reference)}
                  className="h-8 px-3 rounded-lg border border-stone-200 dark:border-gold-500/20 text-[10px] font-bold font-display uppercase tracking-wider text-slate-500 dark:text-gold-400 hover:bg-gold-50 dark:hover:bg-gold-950/20 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Du’a</span>
                    </>
                  )}
                </button>
              </div>

              {/* Calligraphy-styled Arabic frame */}
              <div className="text-center py-4 bg-gold-50/20 dark:bg-gold-950/5 rounded-xl border border-gold-500/5 px-4 space-y-4">
                <p className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-gold-100 leading-loose tracking-wide">
                  {activeProfile.recommendedDua.arabic}
                </p>
                <p className="text-xs font-serif-italic text-slate-500 dark:text-slate-400 px-6 leading-relaxed max-w-2xl mx-auto">
                  "{activeProfile.recommendedDua.transliteration}"
                </p>
              </div>

              <div className="space-y-1.5 text-left px-2">
                <span className="text-[10px] font-bold font-display uppercase tracking-wider text-gold-600 dark:text-gold-500">
                  Translation & Reference
                </span>
                <p className="text-xs text-slate-600 dark:text-stone-300 leading-relaxed font-semibold">
                  {activeProfile.recommendedDua.english}
                </p>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-display block pt-1 font-bold">
                  — {activeProfile.recommendedDua.reference}
                </span>
              </div>
            </div>

            {/* Matching Scriptures Deck list */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1 border-b border-stone-200/50 dark:border-gold-500/10 pb-2">
                <BookOpen className="h-4 w-4 text-gold-600 dark:text-gold-500" />
                <h4 className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Relevant Quranic Verses ({matchingVerses.length})
                </h4>
              </div>

              {matchingVerses.length > 0 ? (
                <div className="grid grid-cols-1 gap-5">
                  {matchingVerses.map(entry => (
                    <ResultCard
                      key={entry.id}
                      entry={entry}
                      searchQuery=""
                      exactPhrase={false}
                      isBookmarked={bookmarks.includes(entry.id)}
                      onToggleBookmark={onToggleBookmark}
                      onReadContext={onReadContext}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-medium">
                    The scripture references for this profile are currently loading. Ensure the Quran library is enabled in filter settings.
                  </span>
                </div>
              )}
            </div>

            {/* Matching Hadiths Deck list */}
            {matchingHadiths.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1 border-b border-stone-200/50 dark:border-gold-500/10 pb-2">
                  <Sparkles className="h-4 w-4 text-gold-600 dark:text-gold-500" />
                  <h4 className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Relevant Hadiths ({matchingHadiths.length})
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {matchingHadiths.map(entry => (
                    <ResultCard
                      key={entry.id}
                      entry={entry}
                      searchQuery=""
                      exactPhrase={false}
                      isBookmarked={bookmarks.includes(entry.id)}
                      onToggleBookmark={onToggleBookmark}
                      onReadContext={onReadContext}
                    />
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
