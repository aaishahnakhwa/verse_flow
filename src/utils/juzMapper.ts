export interface JuzRange {
  juzNum: number;
  juzName: string;
  arabicName: string;
  start: { chapter: number; verse: number };
}

export const JUZ_RANGES: JuzRange[] = [
  { juzNum: 1, juzName: "Alif Lam Meem", arabicName: "الم", start: { chapter: 1, verse: 1 } },
  { juzNum: 2, juzName: "Sayaqool", arabicName: "سَيَقُولُ", start: { chapter: 2, verse: 142 } },
  { juzNum: 3, juzName: "Tilkal-Rusul", arabicName: "تِلْكَ الرُّسُلُ", start: { chapter: 2, verse: 253 } },
  { juzNum: 4, juzName: "Lan Tanalu", arabicName: "لَنْ تَنَالُوا", start: { chapter: 3, verse: 93 } },
  { juzNum: 5, juzName: "Wal-Muhsanat", arabicName: "وَالْمُحْصَنَاتُ", start: { chapter: 4, verse: 24 } },
  { juzNum: 6, juzName: "La Yuhibbullahu", arabicName: "لَا يُحِبُّ اللَّهُ", start: { chapter: 4, verse: 148 } },
  { juzNum: 7, juzName: "Wa Idha Sami'u", arabicName: "وَإِذَا سَمِعُوا", start: { chapter: 5, verse: 82 } },
  { juzNum: 8, juzName: "Wa Law Annana", arabicName: "وَلَوْ أَنَّنَا", start: { chapter: 6, verse: 111 } },
  { juzNum: 9, juzName: "Qalal-Mala'u", arabicName: "قَالَ الْمَلَأُ", start: { chapter: 7, verse: 88 } },
  { juzNum: 10, juzName: "Wa'lamu", arabicName: "وَاعْلَمُوا", start: { chapter: 8, verse: 41 } },
  { juzNum: 11, juzName: "Ya'tadhiruna", arabicName: "يَعْتَذِرُونَ", start: { chapter: 9, verse: 93 } },
  { juzNum: 12, juzName: "Wa Ma Min Dabbatin", arabicName: "وَمَا مِنْ دَابَّةٍ", start: { chapter: 11, verse: 6 } },
  { juzNum: 13, juzName: "Wa Ma Ubarri'u", arabicName: "وَمَا أُبَرِّئُ", start: { chapter: 12, verse: 53 } },
  { juzNum: 14, juzName: "Rubama", arabicName: "رُبَمَا", start: { chapter: 15, verse: 1 } },
  { juzNum: 15, juzName: "Subhanalladhi", arabicName: "سُبْحَانَ الَّذِي", start: { chapter: 17, verse: 1 } },
  { juzNum: 16, juzName: "Qala Alam", arabicName: "قَالَ أَلَمْ", start: { chapter: 18, verse: 75 } },
  { juzNum: 17, juzName: "Aqtaraba", arabicName: "اقْتَرَبَ", start: { chapter: 21, verse: 1 } },
  { juzNum: 18, juzName: "Qad Aflaha", arabicName: "قَدْ أَفْلَحَ", start: { chapter: 23, verse: 1 } },
  { juzNum: 19, juzName: "Wa Qalal-Ladhina", arabicName: "وَقَالَ الَّذِينَ", start: { chapter: 25, verse: 21 } },
  { juzNum: 20, juzName: "Amman Khalaqa", arabicName: "أَمَّنْ خَلَقَ", start: { chapter: 27, verse: 56 } },
  { juzNum: 21, juzName: "Utlu Ma Uhiya", arabicName: "اتْلُ مَا أُوحِيَ", start: { chapter: 29, verse: 46 } },
  { juzNum: 22, juzName: "Wa Man Yaqnut", arabicName: "وَمَنْ يَقْنُتْ", start: { chapter: 33, verse: 31 } },
  { juzNum: 23, juzName: "Wa Maliya", arabicName: "وَمَا لِيَ", start: { chapter: 36, verse: 28 } },
  { juzNum: 24, juzName: "Faman Athlamu", arabicName: "فَمَنْ أَظْلَمُ", start: { chapter: 39, verse: 32 } },
  { juzNum: 25, juzName: "Ilayhi Yuraddu", arabicName: "إِلَيْهِ يُرَدُّ", start: { chapter: 41, verse: 47 } },
  { juzNum: 26, juzName: "Ha Meem", arabicName: "حم", start: { chapter: 46, verse: 1 } },
  { juzNum: 27, juzName: "Qala Fama Khatbukum", arabicName: "قَالَ فَمَا خَطْبُكُمْ", start: { chapter: 51, verse: 31 } },
  { juzNum: 28, juzName: "Qad Sami'allahu", arabicName: "قَدْ سَمِعَ اللَّهُ", start: { chapter: 58, verse: 1 } },
  { juzNum: 29, juzName: "Tabarakalladhi", arabicName: "تَبَارَكَ الَّذِي", start: { chapter: 67, verse: 1 } },
  { juzNum: 30, juzName: "Amma", arabicName: "عَمَّ", start: { chapter: 78, verse: 1 } }
];

export const JUZ_SURAH_MAP: Record<number, number[]> = {
  1: [1, 2],
  2: [2],
  3: [2, 3],
  4: [3, 4],
  5: [4],
  6: [4, 5],
  7: [5, 6],
  8: [6, 7],
  9: [7, 8],
  10: [8, 9],
  11: [9, 10, 11],
  12: [11, 12],
  13: [12, 13, 14, 15],
  14: [15, 16],
  15: [17, 18],
  16: [18, 19, 20],
  17: [21, 22],
  18: [23, 24, 25],
  19: [25, 26, 27],
  20: [27, 28, 29],
  21: [29, 30, 31, 32, 33],
  22: [33, 34, 35, 36],
  23: [36, 37, 38, 39],
  24: [39, 40, 41],
  25: [41, 42, 43, 44, 45],
  26: [46, 47, 48, 49, 50, 51],
  27: [51, 52, 53, 54, 55, 56, 57],
  28: [58, 59, 60, 61, 62, 63, 64, 65, 66],
  29: [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77],
  30: Array.from({ length: 37 }, (_, i) => 78 + i)
};

export function getJuzForVerse(chapter: number, verse: number): number {
  for (let i = JUZ_RANGES.length - 1; i >= 0; i--) {
    const start = JUZ_RANGES[i].start;
    if (chapter > start.chapter || (chapter === start.chapter && verse >= start.verse)) {
      return JUZ_RANGES[i].juzNum;
    }
  }
  return 1;
}

export function getJuzDefinition(juzNum: number): JuzRange {
  return JUZ_RANGES[juzNum - 1] || JUZ_RANGES[0];
}

// Get the verse range boundary descriptors for display
export function getJuzRangeString(juzNum: number): string {
  const current = JUZ_RANGES[juzNum - 1];
  if (!current) return "";
  
  const next = JUZ_RANGES[juzNum];
  if (!next) {
    return `Surah ${current.start.chapter}:${current.start.verse} to Surah 114:6`;
  }
  
  // Calculate previous verse boundary before next juz start
  let endChapter = next.start.chapter;
  let endVerse = next.start.verse - 1;
  if (endVerse <= 0) {
    endChapter = next.start.chapter - 1;
    endVerse = 999; // Represents up to end of chapter
  }
  
  return `Surah ${current.start.chapter}:${current.start.verse} to ${endChapter}:${endVerse === 999 ? 'End' : endVerse}`;
}

export function getSurahsForJuz(juzNum: number, allSurahNames: string[]): string[] {
  const surahNumbers = JUZ_SURAH_MAP[juzNum] || [];
  return surahNumbers
    .map(num => allSurahNames[num - 1])
    .filter(Boolean);
}
