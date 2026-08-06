import * as React from 'react';
import { Bookmark, Search, Trash2 } from 'lucide-react';
import type { ScriptureEntry } from '../types/scripture';
import { ResultCard } from './ResultCard';
import { Button } from './ui/Button';

interface BookmarkViewProps {
  bookmarks: string[]; // array of bookmarked IDs
  onToggleBookmark: (id: string) => void;
  getEntryById: (id: string) => ScriptureEntry | undefined;
  onTopicClick?: (topic: string) => void;
  onGoToSearch: () => void;
  onReadContext?: (entry: ScriptureEntry) => void;
}

export function BookmarkView({
  bookmarks,
  onToggleBookmark,
  getEntryById,
  onTopicClick,
  onGoToSearch,
  onReadContext,
}: BookmarkViewProps) {
  const [filterQuery, setFilterQuery] = React.useState('');

  // Map IDs to entry items and filter out non-existent ones
  const bookmarkedEntries = React.useMemo(() => {
    return bookmarks
      .map((id) => getEntryById(id))
      .filter((entry): entry is ScriptureEntry => !!entry);
  }, [bookmarks, getEntryById]);

  // Filter bookmarked entries based on local query
  const filteredEntries = React.useMemo(() => {
    if (!filterQuery.trim()) return bookmarkedEntries;
    const lowerQuery = filterQuery.toLowerCase().trim();
    return bookmarkedEntries.filter(
      (entry) =>
        entry.text.toLowerCase().includes(lowerQuery) ||
        entry.reference.toLowerCase().includes(lowerQuery) ||
        entry.book.toLowerCase().includes(lowerQuery) ||
        entry.topics.some((t) => t.toLowerCase().includes(lowerQuery)) ||
        entry.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
    );
  }, [bookmarkedEntries, filterQuery]);

  const handleClearAllBookmarks = () => {
    if (window.confirm('Are you sure you want to clear all your bookmarks?')) {
      bookmarks.forEach((id) => onToggleBookmark(id));
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
        <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center mb-5 text-slate-400 dark:text-slate-500">
          <Bookmark className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-semibold font-serif text-slate-900 dark:text-white mb-2">
          No Bookmarks Yet
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Keep track of important scriptures or hadiths by clicking the bookmark icon on any search result.
        </p>
        <Button onClick={onGoToSearch} variant="accent" className="cursor-pointer">
          Browse Scripture Library
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Bookmarks bar actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-4">
        <div>
          <h2 className="text-xl font-semibold font-serif text-slate-900 dark:text-white">
            Saved Bookmarks ({bookmarks.length})
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium font-display mt-0.5">
            Your saved verses are stored locally in this browser.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Inner Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search saved bookmarks..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="h-9.5 pl-9 pr-4 rounded-xl bg-white dark:bg-[#201b13] border border-stone-200/80 dark:border-gold-500/20 text-xs text-slate-900 dark:text-gold-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 w-52 md:w-64"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAllBookmarks}
            className="text-red-500 border-red-200 dark:border-red-950 hover:bg-red-50 dark:hover:bg-red-950/20 h-9.5 flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear All</span>
          </Button>
        </div>
      </div>

      {/* Bookmarks items */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No bookmarks match your search query: "{filterQuery}"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEntries.map((entry) => (
            <ResultCard
              key={entry.id}
              entry={entry}
              searchQuery={filterQuery}
              exactPhrase={false}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
              onTopicClick={onTopicClick}
              onReadContext={onReadContext}
            />
          ))}
        </div>
      )}
    </div>
  );
}
