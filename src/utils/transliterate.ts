export function normalizeUrduForLookup(w: string): string {
  return w
    .replace(/[\u064B-\u0652\u0670]/g, '') // strip diacritics
    .replace(/\u0647/g, '\u06c1')          // Arabic He (U+0647) -> Urdu Heyeh (U+06c1)
    .replace(/\u0649/g, '\u06cc')          // Arabic Alif Maksura -> Urdu Yeh
    .replace(/\u06c2/g, '\u06c1')          // Heyeh with Yeh -> Heyeh
    .replace(/\u06c3/g, '\u06c1')          // Teh Marbuta Goal -> Heyeh
    .replace(/آ/g, 'ا')
    .replace(/آ/g, 'ا');
}

import { TRANSLITERATE_DICT } from './transliterateDict';

export function transliterateUrduToRoman(text: string): string {
  if (!text) return '';

  // Compile the normalized dictionary for O(1) matching
  const wordMap: Record<string, string> = {};
  for (const k in TRANSLITERATE_DICT) {
    wordMap[normalizeUrduForLookup(k)] = TRANSLITERATE_DICT[k];
  }

  // Pre-clean text: normalize spaces and split glued words
  let processed = text.replace(/\u2011/g, '-').replace(/\u00a0/g, ' ');

  // Split commonly glued Urdu words (glued together without space in raw commentaries)
  processed = processed
    .replace(/کےلیے/g, ' کے لیے ')
    .replace(/اٹھااور/g, ' اٹھا اور ')
    .replace(/کیااور/g, ' کیا اور ')
    .replace(/گیااور/g, ' گیا اور ')
    .replace(/تھااور/g, ' था اور ')
    .replace(/تھااور/g, ' تھا اور ')
    .replace(/تھیاور/g, ' تھی اور ')
    .replace(/تھےاور/g, ' تھے اور ')
    .replace(/ہےاور/g, ' ہے اور ')
    .replace(/ہیںاور/g, ' ہیں اور ')
    // Space out numbers from Urdu words (e.g. 6ہجری -> 6 ہجری)
    .replace(/(\d+)([\u0600-\u06FF]+)/g, '$1 $2')
    .replace(/([\u0600-\u06FF]+)(\d+)/g, '$1 $2')
    // Add spaces after Urdu punctuation marks (۔ ، ؟) if missing
    .replace(/([۔،؟])([ابپتٹثجچحخدڈذرڑزژسشصضطظعغفقکگلمنوہیےآ])/g, '$1 $2')
    // Remove extra spaces created
    .replace(/\s+/g, ' ');

  // Split into words, replace known Urdu words, then map letter by letter for any leftovers
  const words = processed.split(/\s+/);
  const mappedWords = words.map(w => {
    // Strip common punctuation for lookup, then re-append
    const cleanWord = w.replace(/[.,/#!%^&*;:{}=_`~()؟۔،-]/g, "");
    let punctuation = w.substring(cleanWord.length);
    
    // Transliterate punctuation characters
    punctuation = punctuation
      .replace(/۔/g, '.')
      .replace(/،/g, ',')
      .replace(/؟/g, '?');

    const prefix = w.substring(0, w.indexOf(cleanWord));
    
    const lookupKey = normalizeUrduForLookup(cleanWord);
    if (wordMap[lookupKey]) {
      return prefix + wordMap[lookupKey] + punctuation;
    }
    
    // Smart syllabic phonetic transliteration fallback for words not in dictionary
    const chars = Array.from(cleanWord);
    const charList = chars.map((c, i) => {
      const isLast = i === chars.length - 1;
      const nextChar = chars[i + 1];
      switch(c) {
        case 'ب': return { val: 'b', type: 'C' };
        case 'پ': return { val: 'p', type: 'C' };
        case 'ت': case 'ط': case 'ٹ': return { val: 't', type: 'C' };
        case 'ث': case 'س': case 'ص': return { val: 's', type: 'C' };
        case 'ج': return { val: 'j', type: 'C' };
        case 'چ': return { val: 'ch', type: 'C' };
        case 'ح': return { val: 'h', type: 'C' }; // Soft h
        case 'خ': return { val: 'kh', type: 'C' }; // Hard kh
        case 'د': case 'ڈ': return { val: 'd', type: 'C' };
        case 'ذ': case 'ز': case 'ض': case 'ظ': return { val: 'z', type: 'C' };
        case 'ر': case 'ڑ': return { val: 'r', type: 'C' };
        case 'ش': return { val: 'sh', type: 'C' };
        case 'ع': return { val: 'a', type: 'V' };
        case 'غ': return { val: 'gh', type: 'C' };
        case 'ف': return { val: 'f', type: 'C' };
        case 'ق': return { val: 'q', type: 'C' };
        case 'ک': return { val: 'k', type: 'C' };
        case 'گ': return { val: 'g', type: 'C' };
        case 'ل': return { val: 'l', type: 'C' };
        case 'م': return { val: 'm', type: 'C' };
        case 'ن': return { val: 'n', type: 'C' };
        case 'و': 
          // If 'و' is followed by 'ہ' at the end of the word, it's a consonant 'w' (e.g., ghazwa, jalwa)
          if (nextChar === 'ہ' && i === chars.length - 2) {
            return { val: 'w', type: 'C' };
          }
          // If first letter: 'w' (consonant). If last: 'o' (vowel). In middle: 'oo' (vowel).
          return { val: i === 0 ? 'w' : (isLast ? 'o' : 'oo'), type: i === 0 ? 'C' : 'V' };
        case 'ی': 
          // If last letter: 'i' (vowel). In middle: 'ee' (vowel).
          return { val: isLast ? 'i' : 'ee', type: 'V' };
        case 'ے': return { val: 'e', type: 'V' };
        case 'ہ': case 'ھ': 
          // If last letter: 'a' (vowel) e.g., shosha, basti, makkah
          return { val: isLast ? 'a' : 'h', type: isLast ? 'V' : 'C' };
        case 'ا': return { val: i === 0 ? 'a' : 'aa', type: 'V' }; // Initial alif is 'a', medial is 'aa'
        case 'ں': return { val: 'n', type: 'M' };
        case 'ء': return { val: 'a', type: 'V' };
        default: return { val: c, type: 'U' };
      }
    });

    // Common consonant clusters that do NOT take 'a' in Roman Urdu
    const skipVowelPairs = new Set([
      'st', 'pt', 'kt', 'qt', 'ld', 'rd', 'rz', 'rk', 'rn', 'ft', 'lm', 'lt', 'rt', 'rf', 'rs', 'sp', 'hm', 'hk',
      'zw', 'lw', 'sh'
    ]);

    const romanParts: string[] = [];
    for (let i = 0; i < charList.length; i++) {
      const curr = charList[i];
      const next = charList[i + 1];
      const prev = charList[i - 1];

      romanParts.push(curr.val);

      if (curr.type === 'C' && next && next.type === 'C') {
        if (next.val === 'h') continue;
        if (curr.val === 'h' && prev && prev.type === 'C') continue;
        if (curr.val === 'n') continue;

        // Skip if they form a common non-vowelled Latin cluster
        const pair = curr.val + next.val;
        if (skipVowelPairs.has(pair)) {
          continue;
        }

        romanParts.push('a');
      }
    }

    let roman = romanParts.join('');
    roman = roman
      .replace(/a{2,}/g, 'aa')
      .replace(/e{2,}/g, 'ee')
      .replace(/o{2,}/g, 'oo');

    return prefix + roman + punctuation;
  });

  return mappedWords.join(' ');
}
