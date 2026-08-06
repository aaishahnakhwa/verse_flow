import fs from 'fs';
import path from 'path';

// List of all 114 Surah names transliterated in English
const SURAH_NAMES = [
  "Al-Fatiha", "Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am",
  "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd",
  "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Taha",
  "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara",
  "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah",
  "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar",
  "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah",
  "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat",
  "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid",
  "Al-Mujadilah", "Al-Hashr", "Al-Mumtahanah", "As-Saff", "Al-Jumu'ah",
  "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam",
  "Al-Haqqah", "Al-Ma'arij", "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir",
  "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "'Abasa",
  "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj",
  "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad", "Ash-Shams",
  "Al-Layl", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-'Alaq", "Al-Qadr",
  "Al-Bayyinah", "Az-Zalzalah", "Al-'Adiyat", "Al-Qari'ah", "At-Takathur",
  "Al-'Asr", "Al-Humazah", "Al-Fil", "Quraysh", "Al-Ma'un", "Al-Kawthar",
  "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

async function importQuran() {
  console.log("Downloading full Quran (Clear Quran)...");
  const response = await fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-mustafakhattabg.min.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch Quran: ${response.statusText}`);
  }
  const rawData = await response.json();
  const rawVerses = rawData.quran;

  console.log(`Mapping ${rawVerses.length} Quran verses...`);
  const mapped = rawVerses.map(v => {
    const surahName = SURAH_NAMES[v.chapter - 1] || `Chapter ${v.chapter}`;
    
    const topics = [];
    const keywords = [];
    
    const textLower = v.text.toLowerCase();
    if (textLower.includes("patience") || textLower.includes("patient")) {
      topics.push("patience");
      keywords.push("sabr");
    }
    if (textLower.includes("pray") || textLower.includes("prayer") || textLower.includes("worship")) {
      topics.push("worship");
      topics.push("prayer");
    }
    if (textLower.includes("mercy") || textLower.includes("merciful") || textLower.includes("compassion")) {
      topics.push("mercy");
    }
    if (textLower.includes("charity") || textLower.includes("gives") || textLower.includes("spend")) {
      topics.push("charity");
      keywords.push("zakah");
      keywords.push("sadaqah");
    }
    if (textLower.includes("knowledge") || textLower.includes("knows") || textLower.includes("wise")) {
      topics.push("knowledge");
    }
    if (textLower.includes("forgive") || textLower.includes("forgiveness") || textLower.includes("pardon")) {
      topics.push("forgiveness");
    }
    if (textLower.includes("moses")) {
      topics.push("moses");
    }
    if (textLower.includes("mary")) {
      topics.push("mary");
    }

    return {
      id: `quran_${v.chapter}_${v.verse}`,
      collection: "Quran",
      book: surahName,
      chapter: v.chapter,
      verse: v.verse,
      reference: `Quran ${v.chapter}:${v.verse}`,
      text: v.text,
      topics,
      keywords,
      language: "en",
      translator: "Mustafa Khattab (The Clear Quran)"
    };
  });

  const destPath = path.resolve("public/data/quran.json");
  fs.writeFileSync(destPath, JSON.stringify(mapped, null, 2));
  console.log(`Quran successfully written to ${destPath} (Count: ${mapped.length})`);
  return mapped.length;
}

function updateConfig(quranCount) {
  const configPath = path.resolve("public/data/config.json");
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  config.collections.forEach(col => {
    if (col.id === 'quran') {
      col.entryCount = quranCount;
      col.translator = "Mustafa Khattab (Clear Quran)";
    }
  });

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`Updated config.json count: Quran=${quranCount}`);
}

async function run() {
  try {
    const qCount = await importQuran();
    updateConfig(qCount);
    console.log("Import pipeline complete! Quran loaded.");
  } catch (error) {
    console.error("Import failed:", error);
    process.exit(1);
  }
}

run();
