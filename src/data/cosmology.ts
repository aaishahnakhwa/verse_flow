export interface Angel {
  name: string;
  arabicName: string;
  role: string;
  mustKnowFact: string;
}

export interface RealmLevel {
  number: number;
  name: string;
  arabicName: string;
  meaning: string;
  scriptureRef: string;
  mustKnowFact: string;
}

export interface JannahGate {
  name: string;
  arabicName: string;
  meaning: string;
  whoEnters: string;
  mustKnowFact: string;
}

export interface JudgementEvent {
  title: string;
  arabicName: string;
  description: string;
  mustKnowFact: string;
  scriptureRef: string;
}

export const ANGELS: Angel[] = [
  {
    name: "Jibreel (Gabriel) (AS)",
    arabicName: "جِبْرِيلُ",
    role: "Archangel of Revelation. Entrusted with transmitting Allah's words and scriptures to all prophets.",
    mustKnowFact: "He is described as 'Ruh al-Qudus' (The Holy Spirit) and 'Ar-Ruh al-Ameen' (The Trustworthy Spirit) in the Quran. He appeared to Prophet Muhammad (SAW) in Cave Hira to deliver the first verses of the Quran."
  },
  {
    name: "Mikail (Michael) (AS)",
    arabicName: "مِيكَائِيلُ",
    role: "Angel of Sustenance, Nature, and Providence. Responsible for directing rain, wind, and crops by Allah's command.",
    mustKnowFact: "He commands helper angels who manage clouds and rainfall. He is mentioned by name in Surah Al-Baqarah (2:98), and is known to be so grave in his duties that he has never laughed since the creation of Hellfire."
  },
  {
    name: "Israfeel (Raphael) (AS)",
    arabicName: "إِسْرَافِيلُ",
    role: "Angel of the Trumpet. Entrusted with blowing the Trumpet (As-Sur) to mark the onset of the Day of Judgment.",
    mustKnowFact: "He has the Trumpet held to his lips, eyes fixed on the Throne of Allah, waiting since his creation for the command to blow it. The first blow will cause all living creations to die; the second blow will resurrect them."
  },
  {
    name: "Malak al-Mawt (Azrael) (AS)",
    arabicName: "مَلَكُ الْمَوْتِ",
    role: "Angel of Death. Responsible for extracting the souls of humans when their pre-written lifespan ends.",
    mustKnowFact: "While commonly referred to as 'Azrael' in historical folklore, the Quran and authentic Sunnah refer to him strictly by his official title: 'Malak al-Mawt' (The Angel of Death)."
  },
  {
    name: "Kiraman Katibin (Noble Scribes)",
    arabicName: "كِرَامًا كَاتِبِينَ",
    role: "The Recording Angels. Raqeeb (on the right shoulder) records good deeds, and Atid (on the left shoulder) records bad deeds.",
    mustKnowFact: "They record every spoken word, action, and silent intention. The angel on the left waits and delays recording a bad deed for a period of time, giving the believer a chance to repent first."
  },
  {
    name: "Munkar & Nakeer (AS)",
    arabicName: "مُنْكَرٌ وَنَكِيرٌ",
    role: "Angels of the Grave. Responsible for questioning every human soul in their grave immediately after burial.",
    mustKnowFact: "They appear in a terrifying dark-blue, black form, and ask three critical questions: (1) Who is your Lord? (2) What is your religion? (3) Who was the man sent among you (Prophet Muhammad)?"
  },
  {
    name: "Ridwan (AS)",
    arabicName: "رِضْوَانُ",
    role: "Guardian of Paradise. The chief angel gatekeeper who welcomes the righteous believers into Jannah.",
    mustKnowFact: "His name literally means 'Pleasure' or 'Satisfaction', reflecting the ultimate spiritual reward of the dwellers of Paradise: the Pleasure of Allah (Ridwanullah)."
  },
  {
    name: "Maalik (AS)",
    arabicName: "مَالِكُ",
    role: "Guardian of Hellfire. The chief angel who oversees the guardians of Hell (Az-Zabaniyah).",
    mustKnowFact: "He is mentioned explicitly by name in Surah Az-Zukhruf (43:77), where the dwellers of Hell cry out to him: 'O Maalik, let your Lord make an end of us!' He replies: 'Indeed, you will remain.'"
  },
  {
    name: "Hamalat al-Arsh (Throne Bearers)",
    arabicName: "حَمَلَةُ الْعَرْشِ",
    role: "Bearers of the Throne. Massive angels whose sole purpose is to glorify Allah and carry His majestic Throne.",
    mustKnowFact: "Currently, they are four giant angels; on the Day of Judgment, their number will increase to eight (Surah Al-Haqqah 69:17). The Prophet said one of them is so massive that the distance between his earlobe and shoulder is a journey of 700 years."
  }
];

export const JANNAH_GARDENS: RealmLevel[] = [
  {
    number: 1,
    name: "Jannat al-Firdaws",
    arabicName: "جَنَّةُ الْفِرْدَوْسِ",
    meaning: "The Gardens of the Highest Paradise",
    scriptureRef: "Surah Al-Kahf (18:107)",
    mustKnowFact: "The absolute highest and most premium named garden in Paradise, located directly beneath the Throne of Allah (Arsh). The Prophet (SAW) said: 'When you ask Allah, ask Him for Al-Firdaws, for it is the middle and highest part of Jannah.'"
  },
  {
    number: 2,
    name: "Jannat al-Adn",
    arabicName: "جَنَّاتُ عَدْنٍ",
    meaning: "The Gardens of Perpetual Residence",
    scriptureRef: "Surah At-Tawbah (9:72)",
    mustKnowFact: "A place of beautiful, permanent residence containing castles of gold and silver. Allah has promised that those who enter here will receive His ultimate pleasure (Ridwan), which is the greatest blessing of all."
  },
  {
    number: 3,
    name: "Jannat al-Ma'wa",
    arabicName: "جَنَّةُ الْمَأْوَىٰ",
    meaning: "The Gardens of Abode",
    scriptureRef: "Surah An-Najm (53:15)",
    mustKnowFact: "Located near the Lote Tree of the Utmost Boundary (Sidrat al-Muntaha). This is the peaceful resting place and sanctuary for the souls of the martyrs (Shuhada) and righteous believers."
  },
  {
    number: 4,
    name: "Jannat an-Naim",
    arabicName: "جَنَّاتُ النَّعِيمِ",
    meaning: "The Gardens of Delight",
    scriptureRef: "Surah Yunus (10:9)",
    mustKnowFact: "A realm of sheer luxury and pleasure, characterized by peaceful landscapes, beautiful companions, and endless varieties of delicious foods, serving as a reward for those who lived a life of piety (Taqwa)."
  },
  {
    number: 5,
    name: "Dar al-Khuld",
    arabicName: "دَارُ الْخُلْدِ",
    meaning: "The Land of Eternity",
    scriptureRef: "Surah Al-Furqan (25:15)",
    mustKnowFact: "Highlighting the absolute eternal nature of Jannah, where there is no death, no aging, no sickness, and no passage of time to decay its beauty. The dwellers will remain youthful forever."
  },
  {
    number: 6,
    name: "Dar as-Salam",
    arabicName: "دَارُ السَّلَامِ",
    meaning: "The Home of Peace",
    scriptureRef: "Surah Al-An'am (6:127)",
    mustKnowFact: "A realm completely free of pain, sorrow, anger, jealousy, or noise. The dwellers will hear only words of peace (Salam), and will be greeted with peace directly by Allah and the angels."
  },
  {
    number: 7,
    name: "Dar al-Muqamah",
    arabicName: "دَارُ الْمُقَامَةِ",
    meaning: "The Home of Permanent Settlement",
    scriptureRef: "Surah Fatir (35:35)",
    mustKnowFact: "A place where believers are cured of all physical and mental fatigue. The Quran quotes its residents: 'Who has settled us in this home of settlement... here no fatigue touches us, and no weariness.'"
  },
  {
    number: 8,
    name: "Al-Maqam al-Amin",
    arabicName: "الْمَقَامُ الْأَمِينُ",
    meaning: "The Secure Station",
    scriptureRef: "Surah Ad-Dukhan (44:51)",
    mustKnowFact: "A place of absolute security, safety, and tranquility. Dwellers are guaranteed that they will never be expelled, their blessings will never decrease, and they will never face any fear."
  }
];

export const JANNAH_GATES: JannahGate[] = [
  {
    name: "Bab As-Salah (The Gate of Prayer)",
    arabicName: "بَابُ الصَّلَاةِ",
    meaning: "Gate for those who prioritized prayer",
    whoEnters: "Believers who were punctual, regular, and dedicated in performing their daily obligatory (Fard) and voluntary (Nafl) prayers with focus and humility.",
    mustKnowFact: "Salah is the second pillar of Islam and the first deed to be audited on the Day of Judgment. Those who protected their prayers will find this gate calling out to them specifically."
  },
  {
    name: "Bab Ar-Rayyan (The Gate of Thirst-Quenching)",
    arabicName: "بَابُ الرَّيَّانِ",
    meaning: "Gate for those who observed fasting",
    whoEnters: "Believers who frequently fasted during Ramadan and observed voluntary fasts (like Mondays/Thursdays or the White Days) to gain Allah's pleasure.",
    mustKnowFact: "The word Rayyan literally means 'sated with drink' or 'thirst-quenched'. The Prophet (SAW) said: 'Indeed, in Paradise there is a gate called Ar-Rayyan, through which only those who fast will enter on the Day of Resurrection... Once they enter, it will be locked, and no one else will enter through it.'"
  },
  {
    name: "Bab As-Sadaqah (The Gate of Charity)",
    arabicName: "بَابُ الصَّدَقَةِ",
    meaning: "Gate for those who gave in charity",
    whoEnters: "Believers who paid their Zakat obligations and continuously gave voluntary charity (Sadaqah) out of their wealth, feeding the poor and supporting families.",
    mustKnowFact: "Giving charity does not decrease wealth, but purifies it. Those who secretly gave charity to avoid showing off will be invited through this gate."
  },
  {
    name: "Bab Al-Jihad (The Gate of Striving)",
    arabicName: "بَابُ الْجِهَادِ",
    meaning: "Gate for those who strove in Allah's cause",
    whoEnters: "Believers who physically, financially, and intellectually strove in the path of Allah to defend the weak and protect the faith.",
    mustKnowFact: "Entering this gate is a reward for absolute courage and willingness to sacrifice one's life and comfort for the preservation of monotheism."
  },
  {
    name: "Bab Al-Ayman (The Right-Hand Gate)",
    arabicName: "بَابُ الْأَيْمَنِ",
    meaning: "Gate for those who enter without reckoning",
    whoEnters: "The elite class of believers who will enter Paradise without any questioning, auditing, or punishment because of their complete trust (Tawakkul) in Allah.",
    mustKnowFact: "This is the right-hand gate of Paradise. Only those who never sought incantations, were not superstitious, and relied entirely on their Lord will cross here."
  },
  {
    name: "Bab Al-Kazimeen Al-Ghaiz (The Gate of Self-Control)",
    arabicName: "بَابُ الْكَاظِمِينَ الْغَيْظَ",
    meaning: "Gate for those who suppressed their anger",
    whoEnters: "Believers who controlled their tempers when provoked and chose to forgive people despite having the power to retaliate.",
    mustKnowFact: "The Prophet (SAW) said: 'The strong man is not the one who can wrestle, but the one who can control himself when he is angry.' This gate honors that difficult spiritual victory."
  },
  {
    name: "Bab At-Tawbah (The Gate of Repentance)",
    arabicName: "بَابُ التَّوْبَةِ",
    meaning: "Gate for those who constantly repented",
    whoEnters: "Believers who continuously returned to Allah in sincere repentance (Tawbah) whenever they made mistakes or fell into sin.",
    mustKnowFact: "Unlike other gates, this gate has been open since the creation of the heavens and earth and will remain open until the Sun rises from the West."
  },
  {
    name: "Bab Al-Hajj (The Gate of Pilgrimage)",
    arabicName: "بَابُ الْحَجِّ",
    meaning: "Gate for those who performed the pilgrimage",
    whoEnters: "Believers who performed the obligatory Hajj pilgrimage and maintained its spiritual purity, keeping away from arguments and sins.",
    mustKnowFact: "The Prophet (SAW) said: 'An accepted Hajj (Hajj Mabrur) has no reward other than Paradise.' This gate welcomes those who successfully completed this life journey."
  }
];

export const JAHANNAM_LEVELS: RealmLevel[] = [
  {
    number: 1,
    name: "Jahannam",
    arabicName: "جَهَنَّمُ",
    meaning: "The Purgatory / First Level of Fire",
    scriptureRef: "Surah Al-Hijr (15:43)",
    mustKnowFact: "The default name of Hell. This upper level is a temporary place of punishment for sinful monotheists (believers) who had more bad deeds than good. They will eventually be released and admitted to Jannah after serving their term."
  },
  {
    number: 2,
    name: "Ladha",
    arabicName: "لَظَىٰ",
    meaning: "The Blazing Flame",
    scriptureRef: "Surah Al-Ma'arij (70:15)",
    mustKnowFact: "A severe, screaming fire that peels off the scalp and skin of those who turned their backs on the truth, hoarded wealth, and refused to give charity to the poor."
  },
  {
    number: 3,
    name: "Al-Hutamah",
    arabicName: "الْحُطَمَةُ",
    meaning: "The Crusher / The Devourer",
    scriptureRef: "Surah Al-Humazah (104:4)",
    mustKnowFact: "A fire fueled by the anger of Allah that crushes bones to powder and burns the bodies from the feet upward, devouring their flesh until it penetrates directly into the heart."
  },
  {
    number: 4,
    name: "Sa'eer",
    arabicName: "السَّعِيرُ",
    meaning: "The Roaring / Scorching Flame",
    scriptureRef: "Surah An-Nisa (4:10)",
    mustKnowFact: "A fiercely burning fire that roars and crackles loudly. The Quran specifically warns that this level is reserved for those who unlawfully consume the wealth of orphans and those who reject the prophets."
  },
  {
    number: 5,
    name: "Saqar",
    arabicName: "سَقَرُ",
    meaning: "The Melting Heat / Scorcher",
    scriptureRef: "Surah Al-Muddaththir (74:26)",
    mustKnowFact: "A fire that melts anything inside it, leaving nothing behind and sparing no one. It is guarded by nineteen strict, powerful angels (Az-Zabaniyah) who enforce the punishment without mercy."
  },
  {
    number: 6,
    name: "Al-Jahim",
    arabicName: "الْجَحِيمُ",
    meaning: "The Fierce Fire / Giant Hot Pit",
    scriptureRef: "Surah Al-Infitar (82:14)",
    mustKnowFact: "A massive, deep, blazing hot pit of fire reserved for the arrogant deniers of truth, pagans, and those who actively opposed the message of the prophets."
  },
  {
    number: 7,
    name: "Al-Hawiyah",
    arabicName: "الْهَاوِيَةُ",
    meaning: "The Bottomless Pit / Abyss of Fire",
    scriptureRef: "Surah Al-Qari'ah (101:9)",
    mustKnowFact: "The lowest, deepest, and most severe depth of Hell. It is a bottomless abyss of boiling, raging fire. Reserved for hypocrites (Munafiqun), who pretended to have faith but secretly plotted against Islam."
  }
];

export const MINOR_SIGNS: JudgementEvent[] = [
  {
    title: "Prophet Muhammad's Sending & Death (SAW)",
    arabicName: "بِعْثَةُ النَّبِيِّ وَوَفَاتُهُ",
    description: "The very emergence and passing of the final Messenger of Allah marks the first boundary of the End Times.",
    mustKnowFact: "The Prophet (SAW) said: 'I have been sent and the Hour is like these two,' holding his index and middle fingers together.",
    scriptureRef: "Sahih al-Bukhari"
  },
  {
    title: "Competitions in Tall Buildings",
    arabicName: "تَطَاوُلٌ فِي الْبُنْيَانِ",
    description: "Impoverished, barefoot nomadic sheep herders competing with one another to build tall, luxurious towers.",
    mustKnowFact: "This is a direct prophecy recorded in the famous Hadith Jibreel. It has clearly manifested in the modern Middle East skyline, with countries competing to build the tallest skyscrapers.",
    scriptureRef: "Sahih Muslim"
  },
  {
    title: "Acceleration of Time",
    arabicName: "تَقَارُبُ الزَّمَانِ",
    description: "Time passing so rapidly that years feel like months, months feel like weeks, and weeks feel like days.",
    mustKnowFact: "The Prophet (SAW) explained that this would occur due to the removal of blessing (Barakah) from time and the preoccupation of people's hearts with material concerns and technology.",
    scriptureRef: "Jami` at-Tirmidhi"
  },
  {
    title: "Decline of Knowledge & Rise of Ignorance",
    arabicName: "قَبْضُ الْعِلْمِ وَظُهُورُ الْجَهْلِ",
    description: "The loss of authentic religious scholarship and the rise of unqualified, ignorant figures misleading the public.",
    mustKnowFact: "Allah does not take away knowledge by pulling it out from people, but by the death of authentic scholars. When no scholars remain, people take ignorant leaders who give rulings without knowledge, going astray and leading others astray.",
    scriptureRef: "Sahih al-Bukhari"
  },
  {
    title: "Prevalence of Music & Intoxicants",
    arabicName: "كَثْرَةُ الْمَعَازِفِ وَالْخُمُورِ",
    description: "Musical instruments and intoxicants (alcohol/drugs) becoming widely accepted, normalized, and called by other names.",
    mustKnowFact: "The Prophet (SAW) warned: 'There will be people from my Ummah who will seek to make lawful adultery, silk, alcohol, and musical instruments.'",
    scriptureRef: "Sahih al-Bukhari"
  }
];

export const MAJOR_SIGNS: JudgementEvent[] = [
  {
    title: "Al-Dajjal (The False Messiah)",
    arabicName: "الْمَسِيحُ الدَّجَّالُ",
    description: "The greatest trial to face humanity. A one-eyed man claiming divinity, given temporary power by Allah to perform false miracles (e.g. commanding rain and raising the dead).",
    mustKnowFact: "Every single prophet warned their nation about the Dajjal. He is blind in his right eye, which resembles a floating grape, and written between his eyes are the Arabic letters 'Kaf-Fa-Ra' (Kafir/Disbeliever), which every literate and illiterate believer will read.",
    scriptureRef: "Sahih Muslim"
  },
  {
    title: "Descent of Isa ibn Maryam (AS)",
    arabicName: "نُزُولُ عِيسَى ابْنِ مَرْيَمَ",
    description: "Prophet Isa (Jesus) will descend bodily at the white minaret in Damascus, Syria, wearing yellow garments, resting his hands on the wings of two angels.",
    mustKnowFact: "Isa (AS) will not return as a new prophet, but as a ruler under the law (Shariah) of Prophet Muhammad (SAW). He will join Imam Mahdi's forces, hunt down the Dajjal, and slay him at the Gate of Ludd (modern-day Lod, near Tel Aviv).",
    scriptureRef: "Sahih al-Bukhari"
  },
  {
    title: "Ya'juj and Ma'juj (Gog and Magog)",
    arabicName: "يَأْجُوجُ وَمَأْجُوجُ",
    description: "Two massive, wild tribes of humans currently sealed behind a massive iron wall built by King Dhul-Qarnayn, who dig at the wall daily.",
    mustKnowFact: "They will be released after Isa (AS) kills the Dajjal. They will consume all fresh water on Earth (drinking dry the Sea of Galilee) and overpower all militaries. Isa and the believers will pray to Allah, Who will destroy them with neck worms.",
    scriptureRef: "Surah Al-Kahf (18:94-98)"
  },
  {
    title: "The Smoke (Ad-Dukhan)",
    arabicName: "الدُّخَانُ",
    description: "A thick, heavy smoke that will blanket the entire Earth for forty days.",
    mustKnowFact: "This smoke will affect everyone. For the believers, it will cause mild symptoms similar to a common cold; but for the disbelievers, it will enter their ears and bodies, causing intense physical agony.",
    scriptureRef: "Surah Ad-Dukhan (44:10-11)"
  },
  {
    title: "The Beast of the Earth (Dabbat al-Ard)",
    arabicName: "دَابَّةُ الْأَرْضِ",
    description: "A miraculous creature emerging from the ground, carrying the Staff of Musa (AS) and the Ring of Sulayman (AS).",
    mustKnowFact: "The Beast will speak to people. It will touch the face of the believer with the Staff of Musa, making their face shine with light, and seal the nose of the disbeliever with the Ring of Sulayman, writing their spiritual state clearly on their faces.",
    scriptureRef: "Surah An-Naml (27:82)"
  },
  {
    title: "Rising of the Sun from the West",
    arabicName: "طُلُوعُ الشَّمْسِ مِنْ مَغْرِبِهَا",
    description: "The sun will alter its path and rise from its place of setting in the West.",
    mustKnowFact: "This is the absolute cosmic cutoff point for repentance (Tawbah). Once the sun rises from the West, the gates of mercy are closed permanently; no new faith will be accepted, and no repentance will be recorded.",
    scriptureRef: "Sahih al-Bukhari"
  },
  {
    title: "The Fire of Aden (Yemen)",
    arabicName: "نَارُ الْيَمَنِ",
    description: "A massive, roaring fire that will emerge from the bottom of Aden (Yemen) and spread across the lands.",
    mustKnowFact: "This is the final Major Sign. The fire will not consume the people immediately, but will drive all humanity, pushing them from behind, directing them toward the Levant (Shaam), which is the Land of Gathering (Mahshar).",
    scriptureRef: "Sahih Muslim"
  }
];

export const QIYAMAH_STAGES: JudgementEvent[] = [
  {
    title: "The Trumpet Blast (As-Sur)",
    arabicName: "النَّفْخُ فِي الصُّورِ",
    description: "Angel Israfeel (AS) blowing the massive Trumpet on Allah's command.",
    mustKnowFact: "There will be two blasts. The first blast (Nafkhat al-Faza) will cause absolute terror and kill every living creature in the universe. The second blast (Nafkhat al-Ba'th) will cause all humans to be resurrected, rising from their graves.",
    scriptureRef: "Surah Az-Zumar (39:68)"
  },
  {
    title: "The Resurrection (Al-Ba'th)",
    arabicName: "الْبَعْثُ",
    description: "The physical recreation of human bodies, arising from their graves as souls are reunited with their forms.",
    mustKnowFact: "Every human will decay into dust except for their tailbone (Ajb adh-Dhanab). When the second trumpet is blown, Allah will send a special rain from the heavens, and human bodies will grow out from this tailbone like plants.",
    scriptureRef: "Surah Ya-Sin (36:51-52)"
  },
  {
    title: "The Gathering (Al-Hashr)",
    arabicName: "الْحَشْرُ",
    description: "Humanity being driven to the plains of Mahshar, standing under a sun brought down to the distance of a mile.",
    mustKnowFact: "People will be gathered barefoot, completely naked, and uncircumcised. When Aisha (RA) asked if men and women would look at each other, the Prophet (SAW) replied: 'The situation will be too severe for them to care about that.' People will sweat based on their sins.",
    scriptureRef: "Sahih al-Bukhari"
  },
  {
    title: "The Great Intercession (Ash-Shafa'ah)",
    arabicName: "الشَّفَاعَةُ الْعُظْمَىٰ",
    description: "The Prophet Muhammad (SAW) pleading with Allah to begin the judgment when humanity is in despair.",
    mustKnowFact: "Humanity will go to Adam, Nuh, Ibrahim, Musa, and Isa (AS) pleading for intercession, and all will say 'Nafsi, Nafsi' (Myself, myself) and decline. Finally, they will come to Prophet Muhammad, who will prostrate beneath the Throne and praise Allah until told: 'Raise your head, speak and you will be heard, intercede and it will be accepted.'",
    scriptureRef: "Sahih al-Bukhari"
  },
  {
    title: "The Reckoning (Al-Hisab)",
    arabicName: "الْحِسَابُ",
    description: "The individual auditing of every human's deeds, where people are presented with their books of records.",
    mustKnowFact: "The righteous will have their books given in their right hand and receive an easy reckoning. The wicked and hypocrites will have their books given behind their backs or in their left hands. Believers will receive a private meeting with Allah (As-Satr) where He forgives their sins.",
    scriptureRef: "Surah Al-Inshiqaq (84:7-10)"
  },
  {
    title: "The Scale (Al-Mizan)",
    arabicName: "الْمِيزَانُ",
    description: "A physical, cosmic scale set up to weigh the good deeds and bad deeds of every individual down to an atom's weight.",
    mustKnowFact: "It is not just the written scroll of deeds that is weighed; the person themselves and their character will be weighed. The heaviest deed on the Scale is good character (Husn al-Khuluq), and the statement 'SubhanAllahi wa bihamdihi, SubhanAllahil-Azeem' is beloved to Allah and fills the scale.",
    scriptureRef: "Surah Al-Anbiya (21:47)"
  },
  {
    title: "The Pool (Al-Hawd)",
    arabicName: "الْحَوْضُ",
    description: "A massive, heavenly drinking reservoir granted to Prophet Muhammad (SAW) for his followers.",
    mustKnowFact: "Its water is whiter than milk, sweeter than honey, and colder than snow. Its drinking vessels are as numerous as the stars. Anyone who drinks a single sip from it will never experience thirst again. Certain innovators will be chased away from it by angels.",
    scriptureRef: "Sahih Muslim"
  },
  {
    title: "The Bridge (As-Sirat)",
    arabicName: "الصِّرَاطُ",
    description: "A physical bridge set up over the abyss of Hellfire, leading to the entrance of Jannah.",
    mustKnowFact: "It is described as thinner than a single strand of hair and sharper than a sword, lined with iron hooks and thorns (Kalaaleeb) catching people based on their sins. Believers will cross at speeds matching their deeds (like lightning, wind, or crawling). The disbelievers will fall into the fire.",
    scriptureRef: "Sahih al-Bukhari"
  }
];
