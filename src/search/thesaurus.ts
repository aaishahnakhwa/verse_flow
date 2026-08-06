// Comprehensive offline search thesaurus for contextual query expansion in VerseFlow
export const THESAURUS: Record<string, string[]> = {
  // Prophets & Figures (Strict English <-> Transliterated Arabic mappings)
  moses: ['musa'],
  musa: ['moses'],
  
  abraham: ['ibrahim'],
  ibrahim: ['abraham'],
  
  jesus: ['isa', 'messiah', 'christ'],
  isa: ['jesus', 'messiah', 'christ'],
  messiah: ['jesus', 'isa', 'christ'],
  christ: ['jesus', 'isa', 'messiah'],
  
  mary: ['maryam'],
  maryam: ['mary'],
  
  noah: ['nuh'],
  nuh: ['noah'],
  
  joseph: ['yusuf'],
  yusuf: ['joseph'],
  
  jacob: ['yaqub'],
  yaqub: ['jacob'],
  
  david: ['dawud'],
  dawud: ['david'],
  
  solomon: ['sulaiman'],
  sulaiman: ['solomon'],
  
  jonah: ['yunus'],
  yunus: ['jonah'],
  
  job: ['ayyub'],
  ayyub: ['job'],
  
  lot: ['lut'],
  lut: ['lot'],
  
  aaron: ['harun'],
  harun: ['aaron'],
  
  john: ['yahya'],
  yahya: ['john'],
  
  zachariah: ['zakariyya'],
  zakariyya: ['zachariah'],
  
  ishmael: ['ismail'],
  ismail: ['ishmael'],
  
  isaac: ['ishaq'],
  ishaq: ['isaac'],
  
  eve: ['hawa'],
  hawa: ['eve'],

  // Angels
  gabriel: ['jibril'],
  jibril: ['gabriel'],
  
  michael: ['mikail'],
  mikail: ['michael'],

  // Spiritual concepts
  satan: ['shaytan', 'iblis', 'devil', 'whisperer'],
  shaytan: ['satan', 'iblis', 'devil', 'whisperer'],
  iblis: ['satan', 'shaytan', 'devil'],
  devil: ['satan', 'shaytan', 'iblis', 'whisperer'],

  // Family, Gender & Modesty Concepts
  woman: ['women', 'female', 'females', 'lady', 'ladies', 'wife', 'wives', 'daughter', 'daughters', 'mother', 'mothers', 'attire', 'garment', 'garments', 'veil', 'veils', 'dress', 'modest', 'modesty', 'cover', 'covers', 'bosom', 'bosoms', 'chaste', 'chastity'],
  women: ['woman', 'female', 'females', 'lady', 'ladies', 'wife', 'wives', 'daughter', 'daughters', 'mother', 'mothers', 'attire', 'garment', 'garments', 'veil', 'veils', 'dress', 'modest', 'modesty', 'cover', 'covers', 'bosom', 'bosoms', 'chaste', 'chastity'],
  female: ['woman', 'women', 'females', 'lady', 'ladies', 'wife', 'wives', 'daughter', 'daughters', 'mother', 'mothers', 'attire', 'garment', 'garments', 'veil', 'veils', 'dress', 'modest', 'modesty', 'cover', 'covers', 'bosom', 'bosoms', 'chaste', 'chastity'],
  females: ['woman', 'women', 'female', 'lady', 'ladies', 'wife', 'wives', 'daughter', 'daughters', 'mother', 'mothers', 'attire', 'garment', 'garments', 'veil', 'veils', 'dress', 'modest', 'modesty', 'cover', 'covers', 'bosom', 'bosoms', 'chaste', 'chastity'],
  
  wife: ['wives', 'husband', 'spouse', 'spouses', 'marriage', 'marry', 'partner', 'partners'],
  wives: ['wife', 'husband', 'spouse', 'spouses', 'marriage', 'marry', 'partner', 'partners'],
  husband: ['husbands', 'wife', 'wives', 'spouse', 'spouses', 'marriage', 'marry'],
  husbands: ['husband', 'wife', 'wives', 'spouse', 'spouses', 'marriage', 'marry'],
  spouse: ['spouses', 'marriage', 'marry', 'wife', 'wives', 'husband', 'husbands', 'partner'],
  spouses: ['spouse', 'marriage', 'marry', 'wife', 'wives', 'husband', 'husbands', 'partner'],
  marriage: ['marry', 'married', 'spouse', 'spouses', 'wife', 'wives', 'husband', 'husbands', 'nikah', 'wedlock'],
  marry: ['marriage', 'married', 'spouse', 'spouses', 'wife', 'wives', 'husband', 'husbands', 'nikah', 'wedlock'],
  
  parent: ['parents', 'mother', 'father', 'child', 'children', 'son', 'daughter', 'kinship'],
  parents: ['parent', 'mother', 'father', 'child', 'children', 'son', 'daughter', 'kinship'],
  mother: ['mothers', 'parents', 'father', 'parent', 'child', 'children', 'son', 'daughter'],
  mothers: ['mother', 'parents', 'father', 'parent', 'child', 'children', 'son', 'daughter'],
  father: ['fathers', 'parents', 'mother', 'parent', 'child', 'children', 'son', 'daughter'],
  fathers: ['father', 'parents', 'mother', 'parent', 'child', 'children', 'son', 'daughter'],

  hijab: ['veil', 'veils', 'garment', 'garments', 'attire', 'dress', 'modest', 'modesty', 'cover', 'covers', 'bosoms', 'cloaks', 'adornment', 'chaste', 'chastity'],
  veil: ['hijab', 'veils', 'garment', 'garments', 'attire', 'dress', 'modest', 'modesty', 'cover', 'covers', 'bosoms', 'cloaks', 'adornment', 'chaste', 'chastity'],
  veils: ['hijab', 'veil', 'garment', 'garments', 'attire', 'dress', 'modest', 'modesty', 'cover', 'covers', 'bosoms', 'cloaks', 'adornment', 'chaste', 'chastity'],
  garment: ['garments', 'hijab', 'veil', 'veils', 'attire', 'dress', 'cloak', 'cloaks', 'clothing', 'cover', 'covers', 'modesty', 'adornment', 'ornament'],
  garments: ['garment', 'hijab', 'veil', 'veils', 'attire', 'dress', 'cloak', 'cloaks', 'clothing', 'cover', 'covers', 'modesty', 'adornment', 'ornament'],
  attire: ['garment', 'garments', 'hijab', 'veil', 'veils', 'dress', 'cloak', 'cloaks', 'clothing', 'cover', 'covers', 'modesty', 'adornment'],
  dress: ['dresses', 'garment', 'garments', 'hijab', 'veil', 'veils', 'attire', 'cloak', 'cloaks', 'clothing', 'cover', 'covers', 'modesty'],
  cloak: ['cloaks', 'garment', 'garments', 'hijab', 'veil', 'veils', 'attire', 'dress', 'clothing', 'cover', 'covers', 'modesty'],
  cloaks: ['cloak', 'garment', 'garments', 'hijab', 'veil', 'veils', 'attire', 'dress', 'clothing', 'cover', 'covers', 'modesty'],
  modest: ['modesty', 'chaste', 'chastity', 'hijab', 'veil', 'veils', 'garment', 'garments', 'attire', 'dress', 'cover'],
  modesty: ['modest', 'chaste', 'chastity', 'hijab', 'veil', 'veils', 'garment', 'garments', 'attire', 'dress', 'cover'],
  chaste: ['chastity', 'modest', 'modesty', 'hijab', 'veil', 'veils', 'garment', 'garments'],
  chastity: ['chaste', 'modest', 'modesty', 'hijab', 'veil', 'veils', 'garment', 'garments'],

  // Worship & Rituals
  prayer: ['pray', 'prayers', 'salat', 'supplication', 'worship', 'sujud', 'prostration', 'bow', 'bowing', 'wudu', 'ablution', 'mosque', 'masjid'],
  pray: ['prayer', 'prayers', 'salat', 'supplication', 'worship', 'sujud', 'prostration', 'bow', 'bowing', 'wudu', 'ablution'],
  prayers: ['prayer', 'pray', 'salat', 'supplication', 'worship', 'sujud', 'prostration', 'bow', 'bowing'],
  salat: ['prayer', 'pray', 'prayers', 'supplication', 'worship', 'sujud', 'prostration', 'masjid', 'mosque'],
  fasting: ['fast', 'ramadan', 'sawm', 'abstain', 'food', 'drink'],
  fast: ['fasting', 'ramadan', 'sawm', 'abstain', 'food', 'drink'],
  ramadan: ['fasting', 'fast', 'sawm', 'month', 'quran'],
  sawm: ['fasting', 'fast', 'ramadan'],

  // Charity & Wealth Concepts
  charity: ['poor', 'alms', 'spend', 'spending', 'gives', 'giving', 'zakah', 'sadaqah', 'tithe', 'needy', 'beggar', 'wealth'],
  alms: ['charity', 'poor', 'spend', 'spending', 'gives', 'giving', 'zakah', 'sadaqah', 'tithe', 'needy'],
  spend: ['spending', 'spent', 'charity', 'alms', 'zakah', 'sadaqah', 'poor', 'needy', 'wealth'],
  spending: ['spend', 'charity', 'alms', 'zakah', 'sadaqah', 'poor', 'needy', 'wealth'],
  zakah: ['charity', 'alms', 'spend', 'spending', 'zakat', 'sadaqah', 'poor', 'needy'],
  sadaqah: ['charity', 'alms', 'spend', 'spending', 'zakah', 'poor', 'needy'],
  wealth: ['wealthy', 'riches', 'money', 'gold', 'silver', 'property', 'possessions', 'treasures', 'spend', 'charity', 'alms'],
  riches: ['wealth', 'money', 'gold', 'silver', 'property', 'possessions', 'spend', 'charity'],

  // Afterlife & Judgment Concepts
  heaven: ['paradise', 'jannah', 'garden', 'gardens', 'bliss', 'eternity', 'hereafter', 'afterlife'],
  paradise: ['heaven', 'jannah', 'garden', 'gardens', 'bliss', 'afterlife', 'hereafter'],
  jannah: ['heaven', 'paradise', 'garden', 'gardens', 'bliss', 'eternity'],
  hell: ['fire', 'jahannam', 'doom', 'punishment', 'blaze', 'torment', 'afterlife', 'hereafter'],
  jahannam: ['hell', 'fire', 'doom', 'punishment', 'blaze', 'torment'],
  afterlife: ['hereafter', 'resurrection', 'reckoning', 'judgment', 'hour', 'paradise', 'jannah', 'heaven', 'hell', 'fire'],
  hereafter: ['afterlife', 'resurrection', 'reckoning', 'judgment', 'hour', 'paradise', 'jannah', 'heaven', 'hell', 'fire'],
  resurrection: ['resurrected', 'afterlife', 'hereafter', 'reckoning', 'judgment', 'hour', 'grave', 'graves', 'trumpet'],

  // Creation & Nature Concepts
  creation: ['create', 'created', 'creator', 'earth', 'heavens', 'sky', 'mountains', 'seas', 'rivers', 'rain', 'water', 'clay', 'dust', 'universe'],
  create: ['creation', 'created', 'creator', 'earth', 'heavens', 'clay', 'dust'],
  created: ['creation', 'create', 'creator', 'earth', 'heavens', 'clay', 'dust'],
  nature: ['creation', 'earth', 'mountains', 'seas', 'rain', 'water', 'plants', 'cattle', 'sun', 'moon', 'stars'],

  // Food, Drink & Laws
  food: ['eat', 'eating', 'drink', 'drinking', 'meat', 'lawful', 'halal', 'forbidden', 'haram', 'fruits', 'honey', 'milk'],
  eat: ['food', 'eating', 'drink', 'drinking', 'meat', 'lawful', 'forbidden', 'fruits'],
  eating: ['food', 'eat', 'drink', 'drinking', 'meat', 'lawful', 'forbidden'],
  drink: ['drinking', 'food', 'eat', 'wine', 'water', 'intoxicants', 'milk'],
  drinking: ['drink', 'food', 'eat', 'wine', 'water', 'intoxicants'],
  lawful: ['halal', 'food', 'permitted', 'good'],
  forbidden: ['haram', 'lawful', 'intoxicants', 'wine', 'carrion', 'blood', 'pork', 'swine'],

  // Ethics, Character & Knowledge
  patience: ['sabr', 'patient', 'endure', 'endurance', 'steadfast', 'steadfastness', 'persevere', 'perseverance'],
  sabr: ['patience', 'patient', 'endure', 'endurance', 'steadfast', 'steadfastness', 'persevere', 'perseverance'],
  forgiveness: ['forgive', 'forgiven', 'pardon', 'pardoned', 'repent', 'repentance', 'mercy', 'merciful', 'remission', 'absolve'],
  forgive: ['forgiveness', 'pardon', 'repent', 'repentance', 'mercy', 'merciful', 'remission', 'absolve'],
  knowledge: ['wise', 'wisdom', 'learn', 'teaching', 'understanding', 'intellect', 'scholar', 'scholars', 'read', 'study'],
  wisdom: ['knowledge', 'wise', 'learn', 'teaching', 'understanding', 'intellect', 'scholar', 'scholars'],
   justice: ['equity', 'fairness', 'just', 'scales', 'judge', 'judging'],
  peace: ['tranquility', 'salaam', 'calm', 'security', 'hearts', 'assured', 'remembrance'],
  gratitude: ['grateful', 'thanks', 'thankful', 'shukr', 'praise'],
  thanks: ['gratitude', 'grateful', 'thankful', 'shukr', 'praise'],

  // Emotional Health, Hardship & Comfort Concepts
  anxiety: ['worry', 'worried', 'grief', 'sadness', 'sorrow', 'depression', 'difficulty', 'distress', 'hardship', 'ease', 'comfort', 'peace', 'tranquility', 'relief', 'sabr', 'patience', 'fear', 'hearts', 'remembrance', 'healing'],
  depression: ['sadness', 'sorrow', 'grief', 'anxiety', 'distress', 'hardship', 'despair', 'hopeless', 'ease', 'comfort', 'peace', 'relief', 'heart', 'hearts', 'remembrance', 'healing'],
  grief: ['sadness', 'sorrow', 'depression', 'anxiety', 'worry', 'distress', 'comfort', 'peace', 'relief', 'heart', 'hearts', 'healed'],
  sadness: ['depression', 'grief', 'sorrow', 'anxiety', 'worry', 'distress', 'comfort', 'peace', 'relief', 'hearts'],
  sorrow: ['sadness', 'depression', 'grief', 'anxiety', 'worry', 'distress', 'comfort', 'peace', 'relief'],
  worry: ['anxiety', 'depression', 'grief', 'sadness', 'sorrow', 'distress', 'comfort', 'peace', 'relief', 'ease'],
  distress: ['hardship', 'difficulty', 'anxiety', 'depression', 'grief', 'comfort', 'peace', 'relief', 'ease', 'constrain', 'constrained', 'breast'],
  despair: ['depression', 'anxiety', 'hopeless', 'mercy', 'hope', 'grief']
};

/**
 * Returns a list of synonyms for a given search query.
 * It tokenizes the query into words, looks up each word in the thesaurus,
 * performs stemming/suffix matching, and returns a deduplicated array of synonyms.
 */
export function getSynonymsForQuery(query: string): string[] {
  if (!query) return [];
  
  // Clean and split words
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const synonymsSet = new Set<string>();

  words.forEach(word => {
    // 1. Direct match (e.g. "woman")
    if (THESAURUS[word]) {
      THESAURUS[word].forEach(syn => synonymsSet.add(syn));
    }
    
    // 2. Singular check (e.g. "garments" -> "garment")
    if (word.endsWith('s')) {
      const singular = word.slice(0, -1);
      if (THESAURUS[singular]) {
        THESAURUS[singular].forEach(syn => synonymsSet.add(syn));
      }
    }
    
    // 3. Suffix check for plurals ending in 'es' (e.g. "dresses" -> "dress")
    if (word.endsWith('es')) {
      const base = word.slice(0, -2);
      if (THESAURUS[base]) {
        THESAURUS[base].forEach(syn => synonymsSet.add(syn));
      }
    }

    // 4. Suffix check for verbs (e.g. "praying" / "prayed" -> "pray")
    if (word.endsWith('ing')) {
      const base = word.slice(0, -3);
      if (THESAURUS[base]) {
        THESAURUS[base].forEach(syn => synonymsSet.add(syn));
      }
    }
    if (word.endsWith('ed')) {
      const base = word.slice(0, -2);
      if (THESAURUS[base]) {
        THESAURUS[base].forEach(syn => synonymsSet.add(syn));
      }
    }
  });

  // Remove any words that were part of the original query or their simple stems
  words.forEach(word => {
    synonymsSet.delete(word);
    if (word.endsWith('s')) synonymsSet.delete(word.slice(0, -1));
    if (word.endsWith('es')) synonymsSet.delete(word.slice(0, -2));
    if (word.endsWith('ing')) synonymsSet.delete(word.slice(0, -3));
    if (word.endsWith('ed')) synonymsSet.delete(word.slice(0, -2));
  });

  return Array.from(synonymsSet);
}
