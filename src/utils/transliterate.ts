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

export function transliterateUrduToRoman(text: string): string {
  if (!text) return '';

  // Raw dictionary definitions in standard Urdu script
  const rawWordMap: Record<string, string> = {
    // General connecting words
    'اور': 'aur',
    'ہے': 'hai',
    'ہیں': 'hain',
    'تھا': 'tha',
    'تھی': 'thi',
    'تھے': 'the',
    'کا': 'ka',
    'کی': 'ki',
    'کے': 'ke',
    'ko': 'ko',
    'کو': 'ko',
    'نے': 'ne',
    'سے': 'se',
    'پر': 'par',
    'میں': 'mein',
    'یہ': 'yeh',
    'وہ': 'woh',
    'وه': 'woh',
    'بھی': 'bhi',
    'تو': 'toh',
    'کہ': 'keh',
    'جو': 'jo',
    'جس': 'jiss',
    'سب': 'sab',
    'ایک': 'ek',
    'بندے': 'bande',
    'کام': 'kaam',
    'اپنے': 'apne',
    'رب': 'rab',
    'نام': 'naam',
    'شروع': 'shuru',
    'ہستی': 'hasti',
    'تمام': 'tamam',
    'خزانہ': 'khazana',
    'مدد': 'madad',
    'کامیابی': 'kamyabi',
    'ضمانت': 'zamanat',
    'بندگی': 'bandagi',
    'ساتھ': 'saath',
    'دونوں': 'donon',
    'آنکھوں': 'aankhon',
    'پیروں': 'pairon',
    'ملک': 'mulk',
    'دنیا': 'dunya',
    'خدا': 'khuda',
    'چیزیں': 'cheezein',
    'زندگی': 'zindagi',
    'کائنات': 'kainaat',
    'شکر': 'shukr',
    'انعام': 'inaam',
    'سایہ': 'saaya',
    'راستہ': 'raasta',
    'سچا': 'sacha',
    'توفیق': 'taufeeq',
    'بقیہ': 'baqiya',
    'تصویر': 'tasveer',
    'لیے': 'liye',
    'کسی': 'kisi',
    'کرے': 'kare',
    'رہتی': 'rehti',
    'اس': 'iss',
    'کرنا': 'karna',
    'अपनी': 'apni',
    'اپنی': 'apni',
    'بے': 'be',
    'मेरी': 'meri',
    'میری': 'meri',
    'میرے': 'mere',
    'طرف': 'taraf',
    'اسی': 'issi',
    'کیونکہ': 'kyunki',
    'ہر': 'har',
    'وقت': 'waqt',
    'لوگ': 'log',
    'لوگوں': 'logon',
    'بندوں': 'bandon',
    'انسان': 'insaan',
    'آج': 'aaj',
    'کل': 'kal',
    'نہ': 'na',
    'یا': 'ya',
    'مگر': 'magar',
    'وہیں': 'wahin',

    // Qiblah paragraph specific vocabulary
    'قبلہ': 'qibla',
    'تعلق': 'taalluq',
    'مظاہر': 'mazaahir',
    'عبادت': 'ibadat',
    'حقیقت': 'haqeeqat',
    'اصل': 'asal',
    'مقصد': 'maqsad',
    'تنظیم': 'tanzeem',
    'عمومی': 'amoomi',
    'رخ': 'rukh',
    'تعین': "ta'ayyun",
    'سمت': 'simt',
    'مقرر': 'muqarrar',
    'کردے': 'karde',
    'وہی': 'wahi',
    'پسندیدہ': 'pasandeeda',
    'عبادتی': 'ibadati',
    'خواه': 'khwah',
    'خواہ': 'khwah',
    'مشرق': 'mashriq',
    'مغرب': 'maghrib',
    'لمبی': 'lambi',
    'مدت': 'muddat',
    'بیت': 'Bait',
    'المقدس': 'al-Muqaddas',
    'وجہ': 'wajah',
    'اول': 'awwal',
    'تقدس': 'taqaddus',
    'حاصل': 'haasil',
    'ہوگیا': 'ho gaya',
    'ہوگیا۔': 'ho gaya.',
    'ہو گیا': 'ho gaya',
    'چنانچہ': 'chunanche',
    'ہجری': 'hijri',
    'تبدیلی': 'tabdeeli',
    'اعلان': 'ailaan',
    'بہت': 'bohat',
    'ذہن': 'zehan',
    'مطابق': 'mutaabiq',
    'بنانا': 'banana',
    'مشکل': 'mushkil',
    'ہوگیا۔آپ': 'ho gaya. Aap',
    'مخالفت': 'mukhalifat',
    'والے': 'waale',
    'بہانہ': 'bahana',
    'بنا': 'bana',
    'کر': 'kar',
    'خلاف': 'khilaaf',
    'طرح': 'tarah',
    'باتیں': 'baatein',
    'پھیلانی': 'phailani',
    'کیں': 'keen',
    'ہمیشہ': 'hamesha',
    'نبیوں': 'nabiyon',
    'پھر': 'phir',
    'کیوں': 'kyun',
    'ظاہر': 'zaahir',
    'تحریک': 'tehreek',
    'یہود': 'yahood',
    'زد': 'zad',
    'چلائی': 'chalayi',
    'جا': 'jaa',
    'رہی': 'rahi',
    'کوئی': 'koi',
    'کہتا': 'kehta',
    'مدعی': "mudda'ee",
    'رسالت': 'risalat',
    'خود': 'khud',
    'مشن': 'mission',
    'متحیر': 'mutahayyir',
    'متردد': 'mutaraddid',
    'کنفیوزڈ': 'confused',
    'کبھی': 'kabhi',
    'نماز': 'namaz',
    'پڑھتے': 'padhte',
    'رہے': 'rahe',
    'ان': 'un',
    'نمازیں': 'namazein',
    'بےکار': 'bekaar',
    'گئیں': 'gayin',
    'وغیرہ': 'waghaira',
    'سچے': 'sache',
    'پرست': 'parast',
    'ہوئے': 'hue',
    'نہیں': 'nahin',
    'سمجھنے': 'samajhne',
    'دیر': 'deer',
    'لگی': 'lagi',
    'آجائے': 'aa jaye',
    'روایت': 'riwayat',
    'تقریباً': 'taqreeban',
    'تقریبا': 'taqreeban',
    'سترہ': 'satrah',
    'ماہ': 'maah',
    'بعد': 'baad',
    'رسول': 'rasool',
    'صلی': 'sallallahu',
    'علیہ': 'alaihi',
    'وسلم': 'wasallam',
    'اصحاب': 'ashaab',
    'جماعت': 'jamaat',
    'مدینہ': 'Madinah',
    'ادا': 'ada',
    'کررہے': 'kar rahe',
    'معلوم': 'maaloom',
    'آپ': 'aap',
    'مسلمانوں': 'musalmanon',
    'عین': 'ain',
    'حالت': 'haalat',
    'کعبہ': 'Kaaba',
    'یعنی': 'yaani',
    'شمال': 'shimal',
    'جنوب': 'junoob',
    'حضرت': 'hazrat',
    'موسی': 'musa',
    'موسیٰ': 'musa',
    'بنی': 'bani',
    'اسرائیل': 'israil',
    'قتل': 'qatl',
    'ہوا': 'hua',
    'پتہ': 'pata',
    'لگانے': 'lagane',
    'تعالی': "ta'ala",
    'تعالیٰ': "ta'ala",
    'نبی': 'nabi',
    'واسطے': 'waaste',
    'حکم': 'hukm',
    'دیا': 'diya',
    'گائے': 'gaaye',
    'ذبح': 'zabah',
    'کرو': 'karo',
    'گوشت': 'gosht',
    'مقتول': 'maqtool',
    'مارو': 'maaro',
    'قاتل': 'qaatil',
    'بتادے': 'batade',
    'معجزاتی': 'mujizati',
    'تدبیر': 'tadbeer',
    'چند': 'chand',
    'مقاصد': 'maqaasid',
    'اختیار': 'ikhtiyar',
    'گئی': 'gayi',
    'گئے': 'gaye',
    'گیا': 'gaya',
    'थी': 'thi',
    'thi': 'thi',
  };

  // Compile the normalized dictionary for O(1) matching
  const wordMap: Record<string, string> = {};
  for (const k in rawWordMap) {
    wordMap[normalizeUrduForLookup(k)] = rawWordMap[k];
  }

  // Pre-clean text: normalize spaces
  const processed = text.replace(/\u2011/g, '-').replace(/\u00a0/g, ' ');

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
    
    // Character by character mapping fallback for words not in the dictionary
    const charMap: Record<string, string> = {
      'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's',
      'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh',
      'د': 'd', 'ڈ': 'd', 'ذ': 'z',
      'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
      'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z',
      'ط': 't', 'ظ': 'z',
      'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q',
      'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n',
      'و': 'o', 'ی': 'i', 'ے': 'e', 'ہ': 'h', 'ء': 'a',
      'ا': 'a', 'ں': 'n', 'ھ': 'h'
    };
    
    let roman = '';
    for (let i = 0; i < cleanWord.length; i++) {
      const char = cleanWord[i];
      roman += charMap[char] || char;
    }
    return prefix + roman + punctuation;
  });

  return mappedWords.join(' ');
}
