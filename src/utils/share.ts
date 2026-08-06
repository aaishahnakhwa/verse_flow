import type { ScriptureEntry } from '../types/scripture';

export interface SearchState {
  query: string;
  collections: string[]; // collection IDs
  book: string;
  topic: string;
  chapter: string; // string representing number or empty
  exactPhrase: boolean;
  activeView: 'search' | 'advanced' | 'bookmarks' | 'counsel';
}

/**
 * Parses URL query parameters into the application's search state.
 */
export function parseUrlParams(): Partial<SearchState> {
  const params = new URLSearchParams(window.location.search);
  const state: Partial<SearchState> = {};

  const query = params.get('q');
  if (query !== null) state.query = query;

  const collections = params.get('collections');
  if (collections) {
    state.collections = collections.split(',').filter(Boolean);
  }

  const book = params.get('book');
  if (book !== null) state.book = book;

  const topic = params.get('topic');
  if (topic !== null) state.topic = topic;

  const chapter = params.get('chapter');
  if (chapter !== null) state.chapter = chapter;

  const exact = params.get('exact');
  if (exact !== null) state.exactPhrase = exact === 'true';

  const view = params.get('view');
  if (view && ['search', 'advanced', 'bookmarks', 'counsel'].includes(view)) {
    state.activeView = view as SearchState['activeView'];
  }

  return state;
}

/**
 * Updates the browser's URL query parameters without reloading the page.
 */
export function updateUrlParams(state: SearchState): void {
  const params = new URLSearchParams();

  if (state.query.trim()) {
    params.set('q', state.query.trim());
  }

  if (state.collections.length > 0) {
    params.set('collections', state.collections.join(','));
  }

  if (state.book) {
    params.set('book', state.book);
  }

  if (state.topic) {
    params.set('topic', state.topic);
  }

  if (state.chapter) {
    params.set('chapter', state.chapter);
  }

  if (state.exactPhrase) {
    params.set('exact', 'true');
  }

  if (state.activeView !== 'search') {
    params.set('view', state.activeView);
  }

  const newSearch = params.toString();
  const currentSearch = window.location.search.replace(/^\?/, '');

  if (newSearch !== currentSearch) {
    const newRelativePathQuery = window.location.pathname + (newSearch ? '?' + newSearch : '');
    window.history.replaceState(null, '', newRelativePathQuery);
  }
}

/**
 * Formats a scripture/hadith entry for copy/share citations.
 */
export function formatCitation(entry: ScriptureEntry): string {
  const translatorInfo = entry.translator ? ` (Translation: ${entry.translator})` : '';
  
  if (entry.hadithNumber) {
    return `"${entry.text}"\n\n— ${entry.reference} [${entry.book}, Chapter ${entry.chapter}]${translatorInfo}`;
  }
  
  return `"${entry.text}"\n\n— ${entry.reference} [${entry.book}]${translatorInfo}`;
}

/**
 * Copies text to the clipboard and returns a promise indicating success.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}

/**
 * Generates a shareable URL specifically for a single scripture/hadith entry.
 */
export function getEntryShareUrl(entryId: string): string {
  const url = new URL(window.location.href);
  url.search = `?q=${encodeURIComponent(entryId)}&exact=true`;
  return url.toString();
}
