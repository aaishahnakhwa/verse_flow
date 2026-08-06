export interface CounselingProfile {
  id: string;
  categoryName: string;
  emoji: string;
  keywords: Record<string, number>; // Keyword to weight score mapping
  excludeKeywords?: string[]; // Keywords that disqualify this category
  counselText: string;
  matchingVerses: string[];
  matchingHadiths: string[]; // Specific Hadith keys (e.g., bukhari_1) to render
  recommendedDua: {
    arabic: string;
    transliteration: string;
    english: string;
    reference: string;
  };
}

export const COUNSELING_REGISTRY: CounselingProfile[] = [
  {
    id: 'anxiety',
    categoryName: 'Anxiety, Stress & Worry',
    emoji: '😟',
    keywords: {
      anxiety: 4.0, stress: 4.0, worry: 3.5, worried: 3.5, fear: 2.0, scared: 2.0,
      panic: 4.0, nervous: 4.0, exams: 5.0, pressure: 3.0, overwhelmed: 4.0, restless: 3.5
    },
    excludeKeywords: ['died', 'death', 'passed away', 'funeral', 'illness', 'cancer', 'sick', 'job', 'money', 'divorce', 'marriage'],
    counselText: 'The Quran acknowledges that human hearts are prone to restlessness and worry, but reassures us that true relief lies in divine remembrance. In Surah Ar-Ra’d (13:28), Allah says: "Unquestionably, by the remembrance of Allah hearts are assured." He also promises in Surah Ash-Sharh (94:5-6) that ease is paired with every difficulty. Remind yourself that your current stress is temporary, and use patience (Sabr) and prayer as your anchors.',
    matchingVerses: ['13:28', '94:5', '94:6', '2:155', '2:286'],
    matchingHadiths: ['muslim_223', 'tirmidhi_2516', 'ibnmajah_4159'],
    recommendedDua: {
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
      transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan, wal-\'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala\'id-dayni wa ghalabatir-rijal.',
      english: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.',
      reference: 'Sahih al-Bukhari 6369'
    }
  },
  {
    id: 'finance',
    categoryName: 'Financial Strain & Career Stress',
    emoji: '💼',
    keywords: {
      job: 4.0, work: 3.0, money: 3.0, debt: 5.0, poverty: 4.0, career: 4.0,
      broke: 4.0, finance: 3.0, finances: 3.0, unemployed: 5.0, business: 3.0, poor: 2.0
    },
    excludeKeywords: ['mother', 'father', 'died', 'funeral', 'sick', 'disease', 'illness', 'divorce', 'marriage', 'guilt', 'sin'],
    counselText: 'In times of economic uncertainty, the Quran redirects our hearts to recognize that Allah is Al-Razzaq (The Provider). In Surah At-Talaq (65:2-3), Allah delivers a powerful promise: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect." Seek a lawful livelihood, put your full trust (Tawakkul) in His timing, and avoid despair, for your provision was written before you were born.',
    matchingVerses: ['65:2', '65:3', '11:6', '2:268', '29:60'],
    matchingHadiths: ['bukhari_54', 'abudawud_1681', 'ibnmajah_4102', 'ibnmajah_4159', 'nasai_2526'],
    recommendedDua: {
      arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
      transliteration: 'Rabbi inni lima anzalta ilayya min khayrin faqir.',
      english: 'My Lord, indeed I am, for whatever good You would send down to me, in need.',
      reference: 'Quran 28:24 (The Du’a of Musa)'
    }
  },
  {
    id: 'grief',
    categoryName: 'Grief & Loss of a Loved One',
    emoji: '😔',
    keywords: {
      grief: 3.0, death: 4.0, lost: 1.0, passed: 1.5, die: 3.0, dead: 3.5,
      mourning: 4.0, sorrow: 2.0, sadness: 2.0, grandfather: 4.0, grandmother: 4.0,
      mother: 2.5, father: 2.5, brother: 2.5, sister: 2.5, parent: 2.5, child: 2.5, wife: 2.5, husband: 2.5
    },
    excludeKeywords: ['job', 'work', 'money', 'career', 'unemployed', 'business', 'exams', 'debt', 'exam', 'exam stress'],
    counselText: 'Losing someone close to us is one of the heaviest trials of the human experience. The Quran comforts us by framing this life as a brief journey and returning to Allah as our ultimate destination. In Surah Al-Baqarah (2:155-156), Allah says: "Give good tidings to the patient, who, when disaster strikes them, say, \'Indeed we belong to Allah, and indeed to Him we will return.\'" Sincere patience in the face of bereavement is met with immense rewards and divine mercy.',
    matchingVerses: ['2:155', '2:156', '3:185', '39:10', '12:86'],
    matchingHadiths: ['bukhari_6407', 'muslim_223'],
    recommendedDua: {
      arabic: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا',
      transliteration: 'Inna lillahi wa inna ilayhi raji\'un. O Allah, reward me in my affliction and replace it for me with something better.',
      english: 'Indeed we belong to Allah, and indeed to Him we will return. O Allah, reward me in my affliction and replace it for me with something better.',
      reference: 'Sahih Muslim 918'
    }
  },
  {
    id: 'family',
    categoryName: 'Family & Relationship Conflicts',
    emoji: '🤝',
    keywords: {
      family: 3.0, marriage: 4.0, divorce: 5.0, wife: 3.0, husband: 3.0,
      parents: 2.5, conflict: 4.0, fight: 3.0, argument: 4.0, kids: 2.5, children: 2.5,
      relative: 2.5, relatives: 2.5, friend: 2.0, friends: 2.0, betrayal: 4.0
    },
    excludeKeywords: ['job', 'unemployed', 'exams', 'exam', 'cancer', 'disease', 'illness', 'repent', 'sins', 'sin'],
    counselText: 'Human relationships are testaments of patience and mercy. The Quran urges us to respond to discord with kindness and to pray for harmony in our households. In Surah Al-Furqan (25:74), the believers are described as those who pray: "Our Lord, grant us from among our wives and offspring comfort to our eyes." When dealing with conflicts, maintain ties of kinship, communicate with grace, and remember that resolving disputes earns high spiritual status.',
    matchingVerses: ['25:74', '30:21', '3:159', '49:10', '17:23'],
    matchingHadiths: ['bukhari_3010', 'bukhari_54', 'abudawud_4941', 'tirmidhi_1986'],
    recommendedDua: {
      arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      transliteration: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yunin wa-j\'alna lil-muttaqina imama.',
      english: 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.',
      reference: 'Quran 25:74'
    }
  },
  {
    id: 'illness',
    categoryName: 'Illness, Physical Pain & Healing',
    emoji: '🩹',
    keywords: {
      illness: 4.0, sick: 4.0, disease: 4.0, cancer: 5.0, pain: 3.0, health: 3.0,
      injury: 4.0, suffering: 2.0, healing: 4.0, cure: 4.0, hospital: 4.0, fever: 4.0, ache: 4.0
    },
    excludeKeywords: ['job', 'work', 'money', 'exams', 'debt', 'marriage', 'divorce', 'sin', 'guilt'],
    counselText: 'Physical pain and illness are difficult trials, but in Islamic teachings, they serve as a profound means of purification and expiation of sins. In Surah Ash-Shu’ara (26:80), Prophet Ibrahim proclaims: "And when I am ill, it is He who cures me." Trust in Allah’s healing, seek medical treatment, and remember the legendary patience of Prophet Ayyub (AS), who called upon Allah in his extreme suffering with absolute respect.',
    matchingVerses: ['26:80', '21:83', '21:84', '17:82', '10:57'],
    matchingHadiths: ['muslim_223', 'bukhari_3010'],
    recommendedDua: {
      arabic: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
      transliteration: 'Anni massaniya-ddurru wa-anta arhamur-rahimin.',
      english: 'Indeed, adversity has touched me, and you are the Most Merciful of the merciful.',
      reference: 'Quran 21:83 (The Du’a of Ayyub)'
    }
  },
  {
    id: 'guilt',
    categoryName: 'Guilt, Mistakes & Forgiveness',
    emoji: '🕊️',
    keywords: {
      guilt: 4.0, sin: 4.0, sins: 4.0, forgive: 3.0, mistake: 3.0, regret: 3.0,
      repent: 4.0, repentance: 4.0, bad: 1.0, ashamed: 4.0, shame: 4.0, wrongdoer: 3.5, wronged: 3.0
    },
    excludeKeywords: ['job', 'money', 'exams', 'illness', 'cancer', 'sick', 'divorce', 'marriage', 'funeral', 'died'],
    counselText: 'No matter the scale of your mistakes, the Quran leaves no room for despair. Despairing of Allah’s mercy is strongly discouraged. In Surah Az-Zumar (39:53), Allah calls out: "Say, \'O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.\'" Sincere repentance (Tawbah) immediately washes away sins, returning you to a clean spiritual slate.',
    matchingVerses: ['39:53', '7:23', '2:222', '3:135', '11:114'],
    matchingHadiths: ['bukhari_1', 'muslim_2580', 'nasai_1', 'nasai_2526'],
    recommendedDua: {
      arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
      transliteration: 'Rabbana thalamna anfusina wa-in lam taghfir lana wa-tarhamna lanakunanna minal-khasirin.',
      english: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
      reference: 'Quran 7:23 (The Du’a of Adam & Hawa)'
    }
  },
  {
    id: 'purpose',
    categoryName: 'Lack of Purpose / Feeling Lost',
    emoji: '🗺️',
    keywords: {
      lost: 1.5, purpose: 4.0, guide: 3.0, guidance: 3.0, future: 2.5, confused: 3.0,
      empty: 3.0, hopelessness: 3.5, despair: 2.0, depressed: 2.0, meaning: 4.0, pointless: 4.0
    },
    excludeKeywords: ['exams', 'debt', 'job', 'unemployed', 'divorce', 'marriage', 'cancer', 'disease', 'illness', 'died', 'death', 'funeral'],
    counselText: 'Feeling listless or lacking direction is a sign that the soul is seeking connection with its Creator. The Quran describes itself as a book of light and guidance. In Surah Al-Ankabut (29:69), Allah promises: "And those who strive for Us - We will surely guide them to Our ways." Reconnect with the Quran, establish your daily prayers, and ask Al-Hadi (The Guide) to guide your heart to what is good in this life and the next.',
    matchingVerses: ['1:6', '29:69', '2:2', '10:57', '94:7', '94:8'],
    matchingHadiths: ['bukhari_6407', 'muslim_2699', 'ibnmajah_224', 'ibnmajah_4102'],
    recommendedDua: {
      arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      transliteration: 'Ihdina-s-siratal-mustaqim.',
      english: 'Guide us to the straight path.',
      reference: 'Quran 1:6'
    }
  },
  {
    id: 'anger',
    categoryName: 'Anger & Control of Self',
    emoji: '😠',
    keywords: {
      anger: 4.0, angry: 4.0, mad: 4.0, hate: 3.0, furious: 4.0, rage: 4.0,
      impatient: 3.5, revenge: 4.0, grudge: 4.0, grudges: 4.0, bitter: 3.0
    },
    excludeKeywords: ['job', 'money', 'exams', 'illness', 'cancer', 'repent', 'sins', 'sin'],
    counselText: 'Anger is a spark from Satan that can consume our peace and reasoning. The Quran praises those who restrain their anger and pardon others as people of excellence (Muhsinin). In Surah Al-Imran (3:134), the righteous are described as "those who restrain anger and who pardon the people." When anger strikes, seek refuge in Allah, sit or lie down, make wudu, and choose the path of forgiveness.',
    matchingVerses: ['3:134', '7:200', '42:37', '41:34', '25:63'],
    matchingHadiths: ['bukhari_3010', 'tirmidhi_2002', 'nasai_2526'],
    recommendedDua: {
      arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
      transliteration: 'A\'udhu billahi minash-shaytanir-rajim.',
      english: 'I seek refuge in Allah from Satan the expelled.',
      reference: 'Sunnah Recommendation (Al-Bukhari 3282)'
    }
  },
  {
    id: 'loneliness',
    categoryName: 'Loneliness & Social Isolation',
    emoji: '👥',
    keywords: {
      lonely: 4.0, isolation: 4.0, rejected: 3.0, alone: 3.5, friendless: 4.0,
      sad: 1.0, abandoned: 4.0, ignored: 3.0, depressed: 2.0, nobody: 3.0, empty: 2.0
    },
    excludeKeywords: ['job', 'money', 'exams', 'exam', 'illness', 'cancer', 'marriage', 'divorce', 'died', 'death', 'funeral'],
    counselText: 'Even when you feel entirely isolated from people, the Quran reminds us that we are never truly alone. Allah’s presence and knowledge encompass all things. In Surah Qaf (50:16), Allah says: "And We are closer to him than [his] jugular vein." Prophet Yunus (AS) was alone in the pitch black belly of the whale, yet his call of faith was heard and answered. Turn your loneliness into solitude with your Creator, who never leaves those who call upon Him.',
    matchingVerses: ['50:16', '21:87', '21:88', '2:186', '9:40'],
    matchingHadiths: ['abudawud_4815', 'tirmidhi_1986'],
    recommendedDua: {
      arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
      transliteration: 'La ilaha illa anta subhanaka inni kuntu minath-thalimin.',
      english: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
      reference: 'Quran 21:87 (The Du’a of Yunus in the whale)'
    }
  }
];

export function findBestProfile(userInput: string): CounselingProfile {
  if (!userInput) {
    return COUNSELING_REGISTRY[0]; // Default to general anxiety/peace
  }

  const normalized = userInput.toLowerCase();

  // ==========================================
  // DIRECT CONTEXT PHRASE OVERRIDES
  // Immediate precision matching to prevent cross-referencing
  // ==========================================
  if (normalized.includes('lost my job') || normalized.includes('lost job') || normalized.includes('no job') || normalized.includes('unemployed') || normalized.includes('fired') || normalized.includes('lost business') || normalized.includes('lost money') || normalized.includes('broke')) {
    return COUNSELING_REGISTRY.find(c => c.id === 'finance')!;
  }

  if (normalized.includes('passed away') || normalized.includes('died') || normalized.includes('loss of') || normalized.includes('grandparent') ||
      ((normalized.includes('lost') || normalized.includes('death')) && 
       (normalized.includes('mother') || normalized.includes('father') || normalized.includes('parent') || 
        normalized.includes('grandmother') || normalized.includes('grandfather') || normalized.includes('brother') || 
        normalized.includes('sister') || normalized.includes('son') || normalized.includes('daughter') || 
        normalized.includes('child') || normalized.includes('wife') || normalized.includes('husband') || 
        normalized.includes('friend') || normalized.includes('relative')))) {
    return COUNSELING_REGISTRY.find(c => c.id === 'grief')!;
  }

  if (normalized.includes('feel lost') || normalized.includes('feeling lost') || normalized.includes('lost in life') || normalized.includes('purpose of life') || normalized.includes('pointless') || normalized.includes('confused') || normalized.includes('lack direction') || normalized.includes('meaning of life')) {
    return COUNSELING_REGISTRY.find(c => c.id === 'purpose')!;
  }

  // ==========================================
  // SCORING-BASED ENGINE (with weights & exclusions)
  // ==========================================
  const words = normalized
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  let bestProfile = COUNSELING_REGISTRY[0];
  let maxScore = -1;

  COUNSELING_REGISTRY.forEach(profile => {
    // 1. Verify if any exclusion keyword is present in the query
    if (profile.excludeKeywords) {
      const hasExclusion = words.some(word => profile.excludeKeywords?.includes(word));
      if (hasExclusion) return; // Disqualify this profile immediately
    }

    let score = 0;
    words.forEach(word => {
      // Direct Match
      if (profile.keywords[word] !== undefined) {
        score += profile.keywords[word];
      }
      
      // Singular Stem check
      if (word.endsWith('s') && !profile.keywords[word]) {
        const singular = word.slice(0, -1);
        if (profile.keywords[singular] !== undefined) {
          score += profile.keywords[singular] * 0.8;
        }
      }
      
      // Verbs Stem check
      if (word.endsWith('ing') && !profile.keywords[word]) {
        const base = word.slice(0, -3);
        if (profile.keywords[base] !== undefined) {
          score += profile.keywords[base] * 0.8;
        }
      }
      if (word.endsWith('ed') && !profile.keywords[word]) {
        const base = word.slice(0, -2);
        if (profile.keywords[base] !== undefined) {
          score += profile.keywords[base] * 0.8;
        }
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestProfile = profile;
    }
  });

  // If no match scoring succeeded at all, fall back to general anxiety comfort
  return maxScore > 0 ? bestProfile : COUNSELING_REGISTRY[0];
}
