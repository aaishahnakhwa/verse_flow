export interface Adhkar {
  phrase: string;
  arabic: string;
  meaning: string;
  reward: string;
  source: string;
}

export interface DuaEtiquette {
  step: number;
  title: string;
  description: string;
}

export interface DuaTime {
  title: string;
  description: string;
  source: string;
}

export interface DestructiveSin {
  number: number;
  title: string;
  arabicName: string;
  warning: string;
  source: string;
}

export interface SajdahVerse {
  number: number;
  surahName: string;
  surahNumber: number;
  verseNumber: number;
  details: string;
  duaArabic?: string;
  duaTransliteration?: string;
  duaMeaning?: string;
}

export const DAILY_ADHKAR: Adhkar[] = [
  {
    phrase: "Sayyidul Istighfar (The Master Du'a for Forgiveness)",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    meaning: "O Allah, You are my Lord, there is no deity worthy of worship except You. You created me and I am Your servant, and I am faithful to my covenant and my promise to You as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge before You Your blessings upon me, and I acknowledge my sin, so forgive me, for indeed none can forgive sins except You.",
    reward: "The Prophet (SAW) said: 'Whoever recites this during the day with firm faith and dies before evening, he will be from the dwellers of Paradise; and whoever recites it at night with firm faith and dies before morning, he will be from the dwellers of Paradise.'",
    source: "Sahih al-Bukhari"
  },
  {
    phrase: "SubhanAllahi wa bihamdihi (100 times daily)",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    meaning: "Glory be to Allah and His is the praise.",
    reward: "The Prophet (SAW) said: 'Whoever says this 100 times in a day, his sins will be forgiven even if they were like the foam of the sea.'",
    source: "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    phrase: "La ilaha illallah wahdahu la sharika lah... (100 times daily)",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    meaning: "There is no deity worthy of worship except Allah alone, without partner. His is the sovereignty and His is the praise, and He has power over all things.",
    reward: "The Prophet (SAW) said: 'Whoever recites this 100 times in a day will have a reward equal to freeing 10 slaves, 100 good deeds will be written for him, 100 sins will be erased, and it will be a shield for him against Shaytan until evening.'",
    source: "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    phrase: "SubhanAllahi wal-hamdulillahi wa la ilaha illallahu Wallahu Akbar",
    arabic: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ",
    meaning: "Glory be to Allah, all praise is due to Allah, there is no deity worthy of worship except Allah, and Allah is the Greatest.",
    reward: "The Prophet (SAW) said: 'That I say these words is dearer to me than everything over which the sun rises.' These words are described as the most beloved phrases to Allah.",
    source: "Sahih Muslim"
  }
];

export const DUA_ETIQUETTES: DuaEtiquette[] = [
  {
    step: 1,
    title: "Sincere Intention & Purifying the Heart",
    description: "Start with a clean intention (Ikhlas), ensuring you are calling upon Allah alone without any intermediaries. Ensure your food, drink, and income are lawful (Halal)."
  },
  {
    step: 2,
    title: "Praise Allah first (Hamd)",
    description: "Begin your Du'a by glorifying Allah. Mention His majestic attributes (e.g. 'O Al-Rahman, O Al-Wahhab') and thank Him for His endless blessings."
  },
  {
    step: 3,
    title: "Send Salutations on the Prophet (SAW)",
    description: "Send peace and blessings upon Prophet Muhammad (SAW) (e.g. reciting Durood Shareef). Du'as are suspended between heaven and earth until salutations are sent."
  },
  {
    step: 4,
    title: "Raise Hands & Face the Qiblah",
    description: "It is from the Sunnah to face the direction of the Kaaba (Qiblah) and raise your hands to the level of your chest, palms facing upward in humility."
  },
  {
    step: 5,
    title: "Show Extreme Humility & Weep",
    description: "Speak in a quiet, soft voice. Confess your weaknesses, errors, and sins before Him. Beg with desperation, and try to shed tears out of fear and love of Allah."
  },
  {
    step: 6,
    title: "Be Firm, Persistent & Patient",
    description: "Ask with firm conviction, never saying 'O Allah, forgive me if You wish.' Repeat your request three times. Avoid impatience, saying 'I made Du'a but it was not answered.'"
  }
];

export const DUA_ACCEPTANCE_TIMES: DuaTime[] = [
  {
    title: "The Last Third of the Night (Tahajjud)",
    description: "Every night during the final third, Allah descends to the lowest heaven and asks: 'Who is calling upon Me that I may answer him? Who is asking of Me that I may give him? Who is seeking forgiveness that I may forgive him?'",
    source: "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    title: "During Prostration (Sajdah)",
    description: "The Prophet (SAW) said: 'The nearest a servant is to his Lord is when he is prostrating (in Sajdah), so increase your supplications in it.'",
    source: "Sahih Muslim"
  },
  {
    title: "Between the Adhan and the Iqamah",
    description: "The Prophet (SAW) said: 'A supplication made between the Adhan (call to prayer) and the Iqamah (second call) is never rejected.'",
    source: "Sunan Abi Dawud & Sunan at-Tirmidhi"
  },
  {
    title: "While Rain Falls",
    description: "The Prophet (SAW) said: 'Two supplications are not rejected: the Du'a at the time of the call to prayer, and the Du'a when it rains.'",
    source: "Sunan Abi Dawud"
  },
  {
    title: "The Hour of Friday (Sa'at al-Ijabah)",
    description: "On Friday there is a specific hour (traditionally understood to be between Asr and Maghrib) where if a Muslim stands in prayer asking Allah for good, He will grant it.",
    source: "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    title: "When Breaking the Fast (Iftar)",
    description: "The Prophet (SAW) said: 'Three supplications are not rejected: the supplication of a father, the supplication of a fasting person when he breaks his fast, and the supplication of a traveler.'",
    source: "Sunan at-Tirmidhi"
  }
];

export const DESTRUCTIVE_SINS: DestructiveSin[] = [
  {
    number: 1,
    title: "Shirk (Associating Partners with Allah)",
    arabicName: "الشِّرْكُ بِاللَّهِ",
    warning: "The absolute greatest sin. Worshiping idols, calling upon the dead, or attributing divine qualities to creation. Allah does not forgive Shirk if a person dies without making Tawbah.",
    source: "Surah An-Nisa (4:48) / Sahih al-Bukhari"
  },
  {
    number: 2,
    title: "Sihr (Sorcery & Dark Magic)",
    arabicName: "السِّحْرُ",
    warning: "Practicing magic, visiting fortune tellers, seeking spells, or using amulets to cause harm or manipulate destiny. It represents an alliance with Shaytan and nullifies faith.",
    source: "Surah Al-Baqarah (2:102) / Sahih al-Bukhari"
  },
  {
    number: 3,
    title: "Qatl (Murder of an Innocent Soul)",
    arabicName: "قَتْلُ النَّفْسِ",
    warning: "Unlawfully ending an innocent human life. The Quran states that killing one innocent person is equivalent to killing all of humanity.",
    source: "Surah Al-Ma'idah (5:32) / Sahih al-Bukhari"
  },
  {
    number: 4,
    title: "Riba (Consuming Usury & Interest)",
    arabicName: "أَكْلُ الرِّبَا",
    warning: "Engaging in lending or borrowing money with interest. Allah declares war in the Quran against those who refuse to give up usury.",
    source: "Surah Al-Baqarah (2:278-279) / Sahih al-Bukhari"
  },
  {
    number: 5,
    title: "Akl Mal al-Yateem (Orphan's Wealth Theft)",
    arabicName: "أَكْلُ مَالِ الْيَتِيمِ",
    warning: "Unlawfully taking or mismanaging the inheritance or money of a child who has lost their parents. The Quran warns that such people eat fire into their bellies.",
    source: "Surah An-Nisa (4:10) / Sahih al-Bukhari"
  },
  {
    number: 6,
    title: "At-Tawalli (Fleeing from the Battlefield)",
    arabicName: "التَّوَلِّي يَوْمَ الزَّحْفِ",
    warning: "Fleeing in cowardice from active military combat when defending the Muslim community, leaving fellow soldiers exposed, except as a tactical maneuver.",
    source: "Surah Al-Anfal (8:15-16) / Sahih al-Bukhari"
  },
  {
    number: 7,
    title: "Qazf (Slandering Chaste Women)",
    arabicName: "قَذْفُ الْمُحْصَنَاتِ",
    warning: "Accusing, gossiping, or slandering chaste, innocent believing women of adultery or unchastity without producing four eye-witnesses.",
    source: "Surah An-Nur (24:4) / Sahih al-Bukhari"
  }
];

export const SAJDAH_VERSES: SajdahVerse[] = [
  {
    number: 1,
    surahName: "Al-A'raf",
    surahNumber: 7,
    verseNumber: 206,
    details: "The final verse of Surah Al-A'raf. Describes the angels who do not show arrogance in worshiping Allah and prostrate to Him.",
    duaArabic: "سَجَدَ وَجْهِي لِلَّذِي خَلَقَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ، فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ",
    duaTransliteration: "Sajada wajhi lilladhi khalaqahu, wa shaqqa sam'ahu wa basarahu bihawlihi wa quwwatihi, fatabarakAllahu ahsanul-khaliqeen.",
    duaMeaning: "My face has prostrated to the One Who created it and opened its hearing and sight by His might and power. Blessed is Allah, the Best of Creators."
  },
  {
    number: 2,
    surahName: "Ar-Ra'd",
    surahNumber: 13,
    verseNumber: 15,
    details: "Declares that everything in the heavens and earth prostrates to Allah willingly or unwillingly, as do their shadows."
  },
  {
    number: 3,
    surahName: "An-Nahl",
    surahNumber: 16,
    verseNumber: 49,
    details: "Mentions that all creatures in the heavens and earth, including the angels, prostrate to Allah without any pride."
  },
  {
    number: 4,
    surahName: "Al-Isra",
    surahNumber: 17,
    verseNumber: 109,
    details: "Describes the righteous who fall down on their faces weeping when they hear the Quran, and it increases them in humility."
  },
  {
    number: 5,
    surahName: "Maryam",
    surahNumber: 19,
    verseNumber: 58,
    details: "Mentions that when the verses of the Most Merciful were recited to the prophets, they fell down in prostration and weeping."
  },
  {
    number: 6,
    surahName: "Al-Hajj",
    surahNumber: 22,
    verseNumber: 18,
    details: "Proclaims that sun, moon, stars, mountains, trees, animals, and many humans prostrate to Allah."
  },
  {
    number: 7,
    surahName: "Al-Hajj (Second Sajdah)",
    surahNumber: 22,
    verseNumber: 77,
    details: "Commands the believers directly: 'O you who have believed, bow down and prostrate and worship your Lord.'"
  },
  {
    number: 8,
    surahName: "Al-Furqan",
    surahNumber: 25,
    verseNumber: 60,
    details: "Describes how the disbelievers refuse to prostrate to the Most Merciful when commanded, asking 'What is the Most Merciful?'"
  },
  {
    number: 9,
    surahName: "An-Naml",
    surahNumber: 27,
    verseNumber: 25,
    details: "Hoopoe bird stating that the people of Sheba should prostrate to Allah, Who brings forth what is hidden in heavens and earth."
  },
  {
    number: 10,
    surahName: "As-Sajdah",
    surahNumber: 32,
    verseNumber: 15,
    details: "Declares that the true believers are those who, when reminded of the verses, fall down in prostration and glorify Him."
  },
  {
    number: 11,
    surahName: "Sad",
    surahNumber: 38,
    verseNumber: 24,
    details: "Prophet Dawud (AS) realizing he was being tested, falling down in prostration and repenting to Allah."
  },
  {
    number: 12,
    surahName: "Fussilat",
    surahNumber: 41,
    verseNumber: 38,
    details: "Advises not to prostrate to the sun or moon, but to prostrate to Allah Who created them, if you truly worship Him."
  },
  {
    number: 13,
    surahName: "An-Najm",
    surahNumber: 53,
    verseNumber: 62,
    details: "The final verse of Surah An-Najm, commanding: 'So prostrate to Allah and worship Him.'"
  },
  {
    number: 14,
    surahName: "Al-Inshiqaq",
    surahNumber: 84,
    verseNumber: 21,
    details: "Asks why the disbelievers do not prostrate when the Quran is recited to them."
  },
  {
    number: 15,
    surahName: "Al-Alaq",
    surahNumber: 96,
    verseNumber: 19,
    details: "The final verse of the first revealed Surah, commanding: 'No! Do not obey him. But prostrate and draw near (to Allah).'"
  }
];
