export interface QuranWord {
  char_type_name: string;
  transliteration?: {
    text?: string;
  };
}

const SUN_LETTERS = ['r', 's', 'n', 't', 'z', 'd', 'sh', 'ṣ', 'ḍ', 'ṭ', 'ẓ', 'th', 'dh', 'l'];

export function formatTajweedTransliteration(words: string[]): string {
  if (!words || words.length === 0) return '';
  
  const formatted: string[] = [];
  
  for (let i = 0; i < words.length; i++) {
    let word = words[i].trim().toLowerCase();
    
    // 1. Assimilate definite article "l-" with sun letters
    if (word.startsWith('l-')) {
      const nextChar = word.charAt(2);
      if (SUN_LETTERS.includes(nextChar)) {
        word = nextChar + '-' + word.slice(2);
      }
    }
    
    // 2. Prepend 'a' for leading connectors at index 0
    if (i === 0 && (word.startsWith('l-') || word.startsWith('r-') || word.startsWith('d-') || word.startsWith('s-') || word.startsWith('n-') || word.startsWith('ṣ-'))) {
      const parts = word.split('-');
      word = 'a' + parts[0] + '-' + parts[1];
    }
    
    formatted.push(word);
  }
  
  // 3. Connection rules
  const joined: string[] = [];
  for (let i = 0; i < formatted.length; i++) {
    const current = formatted[i];
    const next = formatted[i + 1];
    
    if (current === "bis'mi" && next === "l-lahi") {
      joined.push("bismillāhi");
      i++;
      continue;
    }
    
    if (current.endsWith('u') && next === "l-lahi") {
      joined.push(current);
      joined.push("lillāhi");
      i++;
      continue;
    }
    
    // Merge connections with hyphen
    if (next && (next.startsWith('l-') || next.startsWith('r-') || next.startsWith('d-') || next.startsWith('ṣ-') || next.startsWith('t-') || next.startsWith('s-') || next.startsWith('n-'))) {
      const prefix = next.split('-')[0];
      const rest = next.split('-')[1];
      
      if (['a', 'i', 'u', 'ā', 'ī', 'ū'].includes(current.charAt(current.length - 1))) {
        joined.push(current + prefix + '-' + rest);
        i++;
        continue;
      }
    }
    
    joined.push(current);
  }
  
  // 4. Drop case endings at the end of the verse (Waqf)
  if (joined.length > 0) {
    const lastIndex = joined.length - 1;
    let lastWord = joined[lastIndex];
    if (lastWord.endsWith('a') || lastWord.endsWith('i') || lastWord.endsWith('u')) {
      lastWord = lastWord.slice(0, -1);
    }
    joined[lastIndex] = lastWord;
  }
  
  let result = joined.join(' ');
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  
  return result;
}

export function applyRaTajweed(html: string): string {
  if (!html) return '';

  const parts = html.split(/(<[^>]+>)/g);
  
  const processedParts = parts.map(part => {
    if (part.startsWith('<')) {
      return part;
    }
    
    let result = '';
    for (let i = 0; i < part.length; i++) {
      const char = part[i];
      if (char === 'ر') {
        let j = i + 1;
        let vowel = '';
        
        while (j < part.length) {
          const nextChar = part[j];
          if (nextChar === '\u0651') {
            // skip Shaddah
            j++;
          } else if (nextChar === '\u064e' || nextChar === '\u064b' || nextChar === '\u0670') {
            vowel = 'fatha';
            j++;
          } else if (nextChar === '\u064f' || nextChar === '\u064c') {
            vowel = 'damma';
            j++;
          } else if (nextChar === '\u0650' || nextChar === '\u064d') {
            vowel = 'kasra';
            j++;
          } else if (nextChar === '\u0652') {
            vowel = 'sukoon';
            j++;
          } else {
            break;
          }
        }
        
        let cls = '';
        if (vowel === 'fatha' || vowel === 'damma') {
          cls = 'tafkheem';
        } else if (vowel === 'kasra') {
          cls = 'tarqeeq';
        } else if (vowel === 'sukoon') {
          let k = i - 1;
          let precVowel = '';
          while (k >= 0) {
            const prevChar = part[k];
            if (prevChar === '\u064e' || prevChar === '\u064b' || prevChar === '\u0670') {
              precVowel = 'fatha';
              break;
            } else if (prevChar === '\u064f' || prevChar === '\u064c') {
              precVowel = 'damma';
              break;
            } else if (prevChar === '\u0650' || prevChar === '\u064d') {
              precVowel = 'kasra';
              break;
            }
            k--;
          }
          
          if (precVowel === 'fatha' || precVowel === 'damma') {
            cls = 'tafkheem';
          } else if (precVowel === 'kasra') {
            cls = 'tarqeeq';
          }
        } else {
          cls = 'tafkheem';
        }
        
        if (cls) {
          const diacritics = part.slice(i + 1, j);
          result += `<tajweed class="${cls}">ر</tajweed>${diacritics}`;
          i = j - 1;
        } else {
          result += char;
        }
      } else {
        result += char;
      }
    }
    return result;
  });
  
  return processedParts.join('');
}

export function cleanTajweedMarkup(html: string): string {
  if (!html) return '';
  
  const nasalClasses = [
    'ikhafa', 'ikhfa', 'ikhafa_shafawi', 'iqlab',
    'idgham_ghunnah', 'idgham_wo_ghunnah', 'idgham_mutajanisayn',
    'idgham_mutaqaribayn', 'idgham_shafawi', 'idgham_mthn', 'idgham'
  ];

  const cleaned = html.replace(/<tajweed class=["']?([a-zA-Z0-9_]+)["']?>([\s\S]*?)<\/tajweed>/g, (match, cls, content) => {
    if (!nasalClasses.includes(cls)) {
      return match;
    }

    // Scenario 1: Noon Sakinah (starts with Noon)
    if (content.startsWith('ن')) {
      // Include any immediately following diacritics like sukoon (0652) or small meem (06e2)
      let len = 1;
      if (content.charAt(1) === '\u0652' || content.charAt(1) === '\u06e2') {
        len = 2;
      }
      const target = content.slice(0, len);
      const rest = content.slice(len);
      return `<tajweed class="${cls}">${target}</tajweed>${rest}`;
    }

    // Scenario 2: Tanween Iqlab containing small meem (06e2) without leading Noon
    if (content.includes('\u06e2')) {
      const idx = content.indexOf('\u06e2');
      const target = content.slice(0, idx + 1);
      const rest = content.slice(idx + 1);
      return `<tajweed class="${cls}">${target}</tajweed>${rest}`;
    }

    // Scenario 3: Standard Tanween (contains Fathatain, Kasratain, Dammatain)
    const tanweenRegex = /([\s\S]*?)([\u064b\u064d\u064c])([\s\S]*)/;
    const tanweenMatch = content.match(tanweenRegex);
    if (tanweenMatch) {
      const [, part1, tanween, part2] = tanweenMatch;
      return `${part1}<tajweed class="${cls}">${tanween}</tajweed>${part2}`;
    }

    return match;
  });

  return applyRaTajweed(cleaned);
}
