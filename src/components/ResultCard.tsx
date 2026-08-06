import * as React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Share2, Bookmark, BookmarkCheck, BookOpen } from 'lucide-react';
import type { ScriptureEntry } from '../types/scripture';
import { highlightText } from '../utils/highlight';
import { formatCitation, copyToClipboard, getEntryShareUrl } from '../utils/share';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { QuranVerseText } from './QuranVerseText';
import { getJuzForVerse } from '../utils/juzMapper';

interface ResultCardProps {
  entry: ScriptureEntry;
  searchQuery: string;
  exactPhrase: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onTopicClick?: (topic: string) => void;
  onReadContext?: (entry: ScriptureEntry) => void;
}

export const ResultCard = React.memo(function ResultCard({
  entry,
  searchQuery,
  exactPhrase,
  isBookmarked,
  onToggleBookmark,
  onTopicClick,
  onReadContext,
}: ResultCardProps) {
  const [copiedText, setCopiedText] = React.useState(false);
  const [copiedCitation, setCopiedCitation] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);

  const handleCopyText = async () => {
    const success = await copyToClipboard(entry.text);
    if (success) {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  const handleCopyCitation = async () => {
    const success = await copyToClipboard(formatCitation(entry));
    if (success) {
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2000);
    }
  };

  const handleShareLink = async () => {
    const shareUrl = getEntryShareUrl(entry.id);
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Format details for the heading
  const locationDetails = [];
  if (entry.book && entry.book !== entry.collection) {
    locationDetails.push(entry.book);
  }
  if (entry.chapter) {
    locationDetails.push(`Chapter/Surah ${entry.chapter}`);
  }
  if (entry.verse) {
    locationDetails.push(`Verse ${entry.verse}`);
  }
  if (entry.hadithNumber) {
    locationDetails.push(`Hadith ${entry.hadithNumber}`);
  }

  const headingDetails = locationDetails.join(' • ');

  // Get highlighted text using safe HTML helper
  const highlightedHtml = React.useMemo(() => {
    return highlightText(entry.text, searchQuery, exactPhrase);
  }, [entry.text, searchQuery, exactPhrase]);

  // Accent variant based on collection (e.g. green for Quran/Hadith, Gold/Amber for Bible)
  const isIslamic = entry.collection.toLowerCase().includes('quran') || 
                    entry.collection.toLowerCase().includes('bukhari') || 
                    entry.collection.toLowerCase().includes('muslim') || 
                    entry.collection.toLowerCase().includes('tirmidhi') || 
                    entry.collection.toLowerCase().includes('dawud') || 
                    entry.collection.toLowerCase().includes('nasa') || 
                    entry.collection.toLowerCase().includes('majah');

  const badgeVariant = isIslamic ? 'accent' : 'gold';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="glass-card gold-glow p-6 rounded-2xl flex flex-col justify-between h-full group border-l-3 border-l-gold-500/30 hover:border-l-gold-500"
    >
      <div>
        {/* Header containing Collection Name, Citation and Bookmark status */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={badgeVariant}>
              {entry.collection}
            </Badge>
            {entry.collection.toLowerCase() === 'quran' && (
              <Badge variant="gold">
                Juz {getJuzForVerse(entry.chapter, entry.verse || 1)}
              </Badge>
            )}
            <span className="text-[13px] font-bold text-slate-900 dark:text-gold-100 font-display uppercase tracking-wider">
              {entry.reference}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleBookmark(entry.id)}
            className="h-8 w-8 text-slate-400 hover:text-slate-900 dark:hover:text-gold-400 cursor-pointer"
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Verse'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4.5 w-4.5 text-gold-500" />
            ) : (
              <Bookmark className="h-4.5 w-4.5" />
            )}
          </Button>
        </div>

        {/* Location info */}
        <div className="text-xs text-slate-400 dark:text-slate-500 font-medium font-display mb-4">
          {headingDetails}
        </div>

        {/* Entry Text with highlighted search keywords */}
        {entry.collection.toLowerCase() === 'quran' ? (
          <div className="mb-5">
            <QuranVerseText entry={entry} highlightedHtml={highlightedHtml} />
          </div>
        ) : (
          <div 
            className="text-base text-slate-800 dark:text-stone-300 leading-relaxed font-serif font-normal mb-5 whitespace-pre-line text-left border-l-2 border-gold-500/30 pl-4 py-1"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        )}
      </div>

      {/* Footer containing action buttons and tags */}
      <div className="flex flex-col gap-4 mt-auto">
        {/* Tag chips */}
        {entry.topics && entry.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {entry.topics.map((topic, i) => (
              <button
                key={i}
                onClick={() => onTopicClick && onTopicClick(topic)}
                className="text-[10px] font-semibold font-display tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-slate-800/80 dark:hover:bg-amber-950/40 dark:hover:text-amber-300 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              >
                #{topic}
              </button>
            ))}
          </div>
        )}

        {/* Interactive Actions bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/60 pt-3">
          {/* Translator info */}
          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            {entry.translator && `Tr: ${entry.translator}`}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {onReadContext && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReadContext(entry)}
                className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 flex gap-1.5 items-center cursor-pointer font-semibold"
                title={entry.collection === 'Quran' ? 'Read full Surah' : 'Read full Book chapter'}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="text-xs">
                  {entry.collection === 'Quran' ? 'Read Surah' : 'View Context'}
                </span>
              </Button>
            )}

            {onReadContext && (
              <span className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:inline" />
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyText}
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex gap-1.5 items-center cursor-pointer"
              title="Copy scripture text"
            >
              {copiedText ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  <span className="text-xs">Copied Text</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="text-xs">Copy Text</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyCitation}
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex gap-1.5 items-center cursor-pointer"
              title="Copy formatted citation"
            >
              {copiedCitation ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  <span className="text-xs">Copied Cit.</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="text-xs">Copy Citation</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareLink}
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex gap-1.5 items-center cursor-pointer"
              title="Copy share link"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  <span className="text-xs">Copied Link</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="text-xs">Share</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
