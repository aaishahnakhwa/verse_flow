import * as React from 'react';
import { Search, X, Clock, HelpCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface SearchBoxProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  recentSearches: string[];
  onClearRecent: () => void;
  onRemoveRecentItem: (item: string) => void;
  onHelpClick: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBox({
  query,
  onQueryChange,
  onSearchSubmit,
  recentSearches,
  onClearRecent,
  onRemoveRecentItem,
  onHelpClick,
  placeholder = "Search keywords, topics, or references (e.g., 'patience', '2:255', 'Moses')...",
  autoFocus = false,
}: SearchBoxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Focus input when "/" key is pressed
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        activeEl?.getAttribute('contenteditable') === 'true';

      if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }

      if (e.key === 'Escape' && isInputFocused) {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query.trim());
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleRecentClick = (search: string) => {
    onQueryChange(search);
    onSearchSubmit(search);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleClearInput = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto z-20">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full h-14 pl-12 pr-28 rounded-2xl bg-white dark:bg-[#201b13] border border-stone-200/80 dark:border-gold-500/20 text-base text-slate-900 dark:text-gold-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-gold-500/20 dark:focus:ring-gold-500/20 focus:border-gold-500 dark:focus:border-gold-500 transition-all shadow-md shadow-gold-500/2"
            aria-label="Search authentic scriptures and hadiths"
          />

          {/* Action indicator buttons inside the searchbar */}
          <div className="absolute right-3 flex items-center gap-1.5">
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClearInput}
                className="h-8 w-8 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg cursor-pointer"
                title="Clear query"
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onHelpClick}
              className="h-8 w-8 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg cursor-pointer"
              title="Keyboard shortcuts"
            >
              <HelpCircle className="h-4.5 w-4.5" />
            </Button>

            {/* Keyboard shortcut hint */}
            <kbd className="hidden sm:inline-flex h-6 items-center gap-0.5 rounded border border-slate-200 bg-slate-50 px-2 font-display text-[10px] font-bold text-slate-400 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-500 shadow-xs pointer-events-none">
              /
            </kbd>
          </div>
        </div>
      </form>

      {/* Recent searches dropdown */}
      {isFocused && recentSearches.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 p-3 bg-white dark:bg-[#201b13] border border-stone-200/80 dark:border-gold-500/20 rounded-2xl shadow-xl z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150"
        >
          <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Recent Searches
            </span>
            <button
              onClick={onClearRecent}
              className="text-[10px] font-semibold font-display uppercase tracking-wider text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="max-h-56 overflow-y-auto no-scrollbar py-1">
            {recentSearches.map((search, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between group rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => handleRecentClick(search)}
                  className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 font-medium cursor-pointer"
                >
                  <Clock className="h-3.5 w-3.5 text-slate-400 group-hover:text-gold-500 transition-colors" />
                  <span className="truncate">{search}</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => onRemoveRecentItem(search)}
                  className="p-1.5 mr-1.5 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-md transition-all cursor-pointer"
                  title="Remove from history"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
