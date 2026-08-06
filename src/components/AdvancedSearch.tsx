import * as React from 'react';
import { Search, Info, RotateCcw } from 'lucide-react';
import type { CollectionConfig } from '../types/scripture';
import { Button } from './ui/Button';
import { Switch } from './ui/Switch';

interface AdvancedSearchProps {
  collections: CollectionConfig[];
  availableBooks: string[];
  availableTopics: string[];
  onSearch: (filters: {
    query: string;
    collections?: string[];
    book?: string;
    topic?: string;
    chapter?: number;
    exactPhrase?: boolean;
  }) => void;
  initialQuery?: string;
  initialExact?: boolean;
}

export function AdvancedSearch({
  collections,
  availableBooks,
  availableTopics,
  onSearch,
  initialQuery = '',
  initialExact = false,
}: AdvancedSearchProps) {
  const [query, setQuery] = React.useState(initialQuery);
  const [exactPhrase, setExactPhrase] = React.useState(initialExact);
  const [selectedCollection, setSelectedCollection] = React.useState<string>('');
  const [selectedBook, setSelectedBook] = React.useState<string>('');
  const [selectedTopic, setSelectedTopic] = React.useState<string>('');
  const [chapter, setChapter] = React.useState<string>('');

  // Sync state with parent props synchronously during render if props change
  const [prevInitialQuery, setPrevInitialQuery] = React.useState(initialQuery);
  const [prevInitialExact, setPrevInitialExact] = React.useState(initialExact);

  if (initialQuery !== prevInitialQuery) {
    setQuery(initialQuery);
    setPrevInitialQuery(initialQuery);
  }
  if (initialExact !== prevInitialExact) {
    setExactPhrase(initialExact);
    setPrevInitialExact(initialExact);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query: query.trim(),
      collections: selectedCollection ? [selectedCollection] : undefined,
      book: selectedBook || undefined,
      topic: selectedTopic || undefined,
      chapter: chapter ? parseInt(chapter, 10) : undefined,
      exactPhrase,
    });
  };

  const handleReset = () => {
    setQuery('');
    setExactPhrase(false);
    setSelectedCollection('');
    setSelectedBook('');
    setSelectedTopic('');
    setChapter('');
    onSearch({ query: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-2 text-left">
      {/* Search inputs */}
      <form onSubmit={handleSearch} className="lg:col-span-2 space-y-4">
        <div className="glass p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 space-y-4">
          <h2 className="text-xl font-semibold font-serif text-slate-900 dark:text-white mb-2">
            Advanced Search Filters
          </h2>

          {/* Keyword Search */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="adv-query" className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
              Search Term / Phrase
            </label>
            <input
              id="adv-query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter keywords, verses, names or references..."
              className="w-full h-11 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Exact phrase switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/30">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 font-display">
                Exact Phrase Matching
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Match the query phrase exactly in the exact order.
              </span>
            </div>
            <Switch checked={exactPhrase} onCheckedChange={setExactPhrase} id="exact-phrase-switch" />
          </div>

          {/* Collections Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="adv-collection" className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                Library / Collection
              </label>
              <select
                id="adv-collection"
                value={selectedCollection}
                onChange={(e) => {
                  setSelectedCollection(e.target.value);
                  setSelectedBook(''); // Reset book when collection changes
                }}
                className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-sm text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                <option value="">Search All Collections</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Book Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="adv-book" className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                Book / Chapter Name
              </label>
              <select
                id="adv-book"
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                disabled={availableBooks.length === 0}
                className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-sm text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 disabled:opacity-50 cursor-pointer"
              >
                <option value="">All Books</option>
                {availableBooks.map((book) => (
                  <option key={book} value={book}>
                    {book}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Topic Select */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="adv-topic" className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                Filter by Topic
              </label>
              <select
                id="adv-topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-sm text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                <option value="">All Topics</option>
                {availableTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            {/* Chapter Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="adv-chapter" className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                Chapter / Surah Number
              </label>
              <input
                id="adv-chapter"
                type="number"
                min="1"
                placeholder="e.g. 2, 5, 23"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="accent" className="flex items-center gap-2 px-6 h-11 cursor-pointer">
              <Search className="h-4 w-4" />
              <span>Apply & Search</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2 px-5 h-11 text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Filters</span>
            </Button>
          </div>
        </div>
      </form>

      {/* Guide/Sidebar */}
      <div className="glass p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 h-fit space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Info className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
          <h3 className="text-base font-bold font-display uppercase tracking-wider text-slate-900 dark:text-white">
            Search Guide
          </h3>
        </div>

        <div className="space-y-3.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          <p>
            <strong>Keywords:</strong> Enter basic terms like <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono text-[10px]">patience</code> or <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono text-[10px]">charity</code> to return matches containing those words (or partial/prefixed variations) ordered by relevance.
          </p>
          <p>
            <strong>Exact Phrase:</strong> Toggle "Exact Phrase Matching" when looking for specific quote fragments (e.g. <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono text-[10px]">heavens and the earth</code>).
          </p>
          <p>
            <strong>References:</strong> Search directly by citation e.g. <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono text-[10px]">Quran 1:5</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono text-[10px]">Genesis 1:1</code>, or <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono text-[10px]">Sahih al-Bukhari 1</code>.
          </p>
          <p>
            <strong>Topics:</strong> Use the topic filter to target specific themes categorized across collections (e.g., <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono text-[10px]">monotheism</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono text-[10px]">trust</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono text-[10px]">brotherhood</code>).
          </p>
          <p>
            <strong>Offline Operation:</strong> This search runs entirely client-side. There are no tracking scripts, network latency, or external dependencies after initial data files are loaded.
          </p>
        </div>
      </div>
    </div>
  );
}
