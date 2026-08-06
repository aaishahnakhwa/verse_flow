import { getSynonymsForQuery } from '../search/thesaurus';

/**
 * Escapes special HTML characters in a string.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Escapes characters for regex matching.
 */
function escapeRegExp(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * Highlights matches of a search query in a text string.
 * It escapes the input text first to ensure safety from XSS.
 * 
 * @param text The plain text to highlight.
 * @param query The search query string.
 * @param exactPhrase Whether to match the query as a single exact phrase.
 * @returns A string of safe HTML with matches wrapped in <mark> tags.
 */
export function highlightText(text: string, query: string, exactPhrase: boolean = false): string {
  if (!query || !query.trim()) {
    return escapeHtml(text);
  }

  const escapedText = escapeHtml(text);
  const trimmedQuery = query.trim();

  // Highlight style classes: warm amber highlight with smooth borders
  const highlightClass = "bg-amber-200/80 dark:bg-amber-500/30 text-amber-950 dark:text-amber-100 font-semibold px-0.5 rounded";

  if (exactPhrase) {
    const escapedQuery = escapeRegExp(trimmedQuery);
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return escapedText.replace(regex, `<mark class="${highlightClass}">$1</mark>`);
  } else {
    // Split by whitespace and sanitize words, ignoring empty terms and punctuation
    const terms = trimmedQuery
      .split(/\s+/)
      .map(term => term.replace(/[^a-zA-Z0-9]/g, ''))
      .filter(term => term.length > 0);

    if (terms.length === 0) return escapedText;

    // Gather synonyms for the search terms and add them to the highlight list!
    const synonyms = getSynonymsForQuery(trimmedQuery);
    const allTerms = [...terms, ...synonyms];

    // Sort terms by length descending so that we match longer words first (e.g. "forgiveness" before "forgive")
    const sortedTerms = allTerms.sort((a, b) => b.length - a.length);
    const regexString = sortedTerms.map(term => escapeRegExp(term)).join('|');
    
    // Match any of the words, case-insensitive
    const regex = new RegExp(`(${regexString})`, 'gi');
    return escapedText.replace(regex, `<mark class="${highlightClass}">$1</mark>`);
  }
}
