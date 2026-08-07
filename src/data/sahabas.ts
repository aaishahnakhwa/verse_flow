export interface Sahaba {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  role: string;
  virtues: string;
  mustKnowFact: string;
  majorBattles: string[];
  isPromisedParadise: boolean;
}

export const SAHABAS: Sahaba[] = [
  {
    id: "abubakr",
    name: "Abu Bakr Al-Siddiq (RA)",
    arabicName: "أَبُو بَكْرٍ الصِّدِّيقُ",
    title: "Al-Siddiq (The Truthful) (RA)",
    role: "First Caliph of Islam & closest companion of Prophet Muhammad (SAW). Guided the Muslim community through the critical transition after the Prophet's death.",
    virtues: "First adult male to embrace Islam. Accompanied the Prophet in the cave during the dangerous emigration (Hijrah) to Medina. Donated his entire wealth for the Battle of Tabuk. Purchased and freed persecuted slaves, including Bilal ibn Rabah (RA). Standardized the compilation of the Quran into a single volume.",
    mustKnowFact: "He is the only Companion implicitly mentioned in the Quran as the 'second of two' in Cave Thawr (Surah At-Tawbah 9:40). When the enemies were outside the cave, he feared for the Prophet, and the Prophet reassured him: 'Do not grieve; indeed Allah is with us.'",
    majorBattles: ["Ridda Wars (as Caliph)", "Tabuk Campaign", "Conquest of Mecca", "Battle of Hunayn"],
    isPromisedParadise: true
  },
  {
    id: "umar",
    name: "Umar ibn Al-Khattab (RA)",
    arabicName: "عُمَرُ بْنُ الْخَطَّابِ",
    title: "Al-Faruq (The Distinguisher of Truth) (RA)",
    role: "Second Caliph of Islam. Legendary military strategist and administrative genius who structured the early Islamic state's courts, welfare systems, and ministries.",
    virtues: "His conversion gave public strength to Muslims to pray openly at the Kaaba. Expanded the state to defeat the Byzantine Levant and Persian Empires. Conquered Jerusalem peacefully, writing the Pact of Umar to protect Christian shrines. Established the Hijri calendar system.",
    mustKnowFact: "The Prophet (SAW) said of him: 'If there were to be a prophet after me, it would have been Umar.' (Tirmidhi). He was so spiritually intuitive that several Quranic verses were revealed confirming opinions Umar had previously voiced to the Prophet.",
    majorBattles: ["Yarmouk (Strategic director)", "Qadisiyyah (Strategic director)", "Conquest of Jerusalem"],
    isPromisedParadise: true
  },
  {
    id: "uthman",
    name: "Uthman ibn Affan (RA)",
    arabicName: "عُثْمَانُ بْنُ عَفَّانَ",
    title: "Dhun-Nurayn (Possessor of Two Lights) (RA)",
    role: "Third Caliph of Islam. Known for his extreme shyness, modesty, and unmatched generosity in funding the early Muslim community.",
    virtues: "Married two of the Prophet's daughters (Ruqayyah and Umm Kulthum). Fully funded the Well of Rumayh to provide free water, and funded the entire army of Usrah for the Tabuk expedition. Commissioned the standardized written copy of the Quran (Mushaf of Uthman) sent to all provinces.",
    mustKnowFact: "Uthman was so profoundly modest that the Prophet (SAW) said: 'Should I not show modesty to a man whom even the angels of Allah show modesty to?' (Sahih Muslim). He bought the Well of Rumayh from a Jewish owner during a drought and made it a free endowment for everyone.",
    majorBattles: ["Establishment of the First Muslim Navy (as Caliph)", "Conquest of Cyprus"],
    isPromisedParadise: true
  },
  {
    id: "ali",
    name: "Ali ibn Abi Talib (RA)",
    arabicName: "عَلِيُّ بْنُ أَبِي طَالِبٍ",
    title: "Asadullah (Lion of Allah) / Bab al-Ilm (RA)",
    role: "Fourth Caliph of Islam, Cousin and Son-in-law of the Prophet (SAW). Standard-bearer and champion warrior of the early Muslim state.",
    virtues: "First child to embrace Islam. Slept in the Prophet's bed to deceive assassins during the Hijrah. Known for unmatched physical bravery and theological wisdom. Famous for dueling and defeating champion warriors of Quraish.",
    mustKnowFact: "Before the siege of Khaybar, the Prophet (SAW) announced: 'Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love.' He gave it to Ali and Allah granted victory. The Prophet also said: 'I am the city of knowledge and Ali is its gate.'",
    majorBattles: ["Battle of Badr (Duelist)", "Battle of Uhud", "Battle of Khandaq (Slew Amr)", "Battle of Khaybar (Broke the iron gate)"],
    isPromisedParadise: true
  },
  {
    id: "khalid",
    name: "Khalid ibn Al-Walid (RA)",
    arabicName: "خَالِدُ بْنُ الْوَلِيدِ",
    title: "Saifullah al-Maslul (The Drawn Sword of Allah) (RA)",
    role: "Undefeated military general. Led over 100 battles against the Byzantine Empire, Persian Empire, and rebel forces, never losing a single engagement.",
    virtues: "Given the title 'Sword of Allah' by the Prophet after saving the Muslim army at Mu'tah through brilliant tactical retreats, during which he broke 9 swords in hand-to-hand combat. Renowned for swift troop movements across deserts.",
    mustKnowFact: "On his deathbed, Khalid wept because he wanted to die as a martyr in battle rather than on a bed, saying: 'There is not a space the size of a hand on my body that does not have a sword scar or spear wound... and here I am dying on my bed. May the eyes of cowards never sleep.'",
    majorBattles: ["Battle of Mu'tah", "Battle of Yarmouk (Conquered Byzantine forces)", "Battle of Qadisiyyah campaigns", "Conquest of Mecca"],
    isPromisedParadise: false
  },
  {
    id: "hamza",
    name: "Hamza ibn Abdul-Muttalib (RA)",
    arabicName: "حَمْزَةُ بْنُ عَبْدِ الْمُطَّلِبِ",
    title: "Sayyid al-Shuhada (Leader of the Martyrs) (RA)",
    role: "Paternal uncle of the Prophet (SAW) and one of the strongest, most feared warriors in Arabia. Served as the supreme protector of the early Muslims.",
    virtues: "His conversion in Mecca struck fear into Quraish and stopped their open torture of weak Muslims. Fought with dual swords. Martyred at Uhud and honored by the Prophet with the title 'Sayyid al-Shuhada'.",
    mustKnowFact: "During the Battle of Uhud, he was martyred by the javelin of Wahshi, and his body was heavily mutilated by Hind. The Prophet (SAW) wept bitterly upon seeing him and declared him the 'Sayyid al-Shuhada' (Leader of all Martyrs) of the Ummah.",
    majorBattles: ["Battle of Badr (Heroic Duelist)", "Battle of Uhud (Martyred)"],
    isPromisedParadise: false
  },
  {
    id: "sad",
    name: "Sa'd ibn Abi Waqqas (RA)",
    arabicName: "سَعْدُ بْنُ أَبِي وَقَّاصٍ",
    title: "The First Bowman of Islam (RA)",
    role: "Prophet's maternal uncle, commander-in-chief of the Persian expedition, and founder of the city of Kufa.",
    virtues: "First person to shoot an arrow in defense of Islam. One of the Ten Promised Paradise (Asharah Mubasharah). The Prophet made a special Du'a for him: 'O Allah, make his aim true and answer his prayers.'",
    mustKnowFact: "During the chaotic retreat at Uhud, Sa'd stood firm defending the Prophet (SAW). The Prophet handed him arrows and said: 'Shoot, Sa'd! May my father and mother be sacrificed for you!' This is an honor the Prophet never said to any other companion.",
    majorBattles: ["Battle of Badr", "Battle of Uhud (Defended the Prophet)", "Battle of Qadisiyyah (Defeated Persian Empire)"],
    isPromisedParadise: true
  },
  {
    id: "bilal",
    name: "Bilal ibn Rabah (RA)",
    arabicName: "بِلَالُ بْنُ رَبَاحٍ",
    title: "Mu'adhin of the Messenger (RA)",
    role: "First Mu'adhin (caller to prayer) of Islam. Served as the official treasurer of the Islamic state.",
    virtues: "Abyssinian companion who stood steadfast in monotheism while tortured on scorching sands under heavy boulders, chanting 'Ahad, Ahad' (One, One). Symbol of racial equality and spiritual dignity in Islam.",
    mustKnowFact: "The Prophet (SAW) said to Bilal: 'Tell me of the most hopeful deed you did in Islam, for I heard the footsteps of your shoes in front of me in Paradise.' Bilal replied that he performed two units of prayer (Tahiyyat al-Wudu) every single time he made Wudu.",
    majorBattles: ["Battle of Badr (Confronted and slew his former torturer)", "Battle of Uhud", "Battle of Khandaq"],
    isPromisedParadise: false
  },
  {
    id: "musab",
    name: "Mus'ab ibn Umayr (RA)",
    arabicName: "مُصْعَبُ بْنُ عُمَيْرٍ",
    title: "The First Ambassador of Islam (RA)",
    role: "Intellectual diplomat and teacher. Sent by the Prophet as the first envoy to Yathrib (Medina) to teach Islam.",
    virtues: "A wealthy, pampered youth of Mecca who gave up all luxury for Islam. Successfully converted almost the entire city of Medina to Islam prior to the Hijrah. Martyred flag-bearer at Uhud, having both arms severed while protecting the banner.",
    mustKnowFact: "When he was martyred at Uhud, his only garment was a short woven cloak. If they covered his head, his feet were exposed, and if they covered his feet, his head was exposed. The Prophet wept and ordered it to cover his head, placing wild grass over his feet, reciting Quran 33:23.",
    majorBattles: ["Battle of Badr", "Battle of Uhud (Martyred)"],
    isPromisedParadise: false
  },
  {
    id: "abuubaydah",
    name: "Abu Ubaydah ibn al-Jarrah (RA)",
    arabicName: "أَبُو عُبَيْدَةَ بْنُ الْجَرَّاحِ",
    title: "Ameen al-Ummah (Trustworthy of this Nation) (RA)",
    role: "Supreme commander of the Levant army. Renowned for his humility, asceticism, and military brilliance.",
    virtues: "One of the Ten Promised Paradise. The Prophet said: 'Every nation has a trustworthy guardian, and the guardian of this nation is Abu Ubaydah.' At Uhud, he used his teeth to pull out iron helmet rings lodged in the Prophet's cheeks, losing his own front teeth.",
    mustKnowFact: "During the plague of Amwas in Syria, Caliph Umar (RA) tried to recall him to Medina to save his life. Abu Ubaydah wrote back declining, choosing to stay and die alongside his plague-stricken soldiers. Umar wept upon reading the letter.",
    majorBattles: ["Battle of Badr", "Battle of Uhud", "Battle of Yarmouk", "Siege of Damascus"],
    isPromisedParadise: true
  },
  {
    id: "abdurrahman",
    name: "Abdur-Rahman ibn Awf (RA)",
    arabicName: "عَبْدُ الرَّحْمَنِ بْنُ عَوْفٍ",
    title: "The Generous Merchant (RA)",
    role: "Distinguished businessman and major financial pillar of the early Islamic state. Known for his legendary charitable donations.",
    virtues: "One of the Ten Promised Paradise. Rose from zero wealth after Hijrah to absolute wealth, claiming: 'If I pick up a stone, I expect to find gold under it.' Donated hundreds of fully-equipped camel caravans to feed Medina.",
    mustKnowFact: "Because of his extreme wealth, he feared Jannah entrance delay, weeping when he remembered the Prophet saying: 'Abdur-Rahman will enter Paradise crawling (due to accounting wealth).' He immediately freed slaves and donated entire commercial shipments in charity to ease his accounting.",
    majorBattles: ["Battle of Badr (Sustained severe wounds)", "Battle of Uhud"],
    isPromisedParadise: true
  },
  {
    id: "zubayr",
    name: "Zubayr ibn al-Awwam (RA)",
    arabicName: "الزُّبَيْرُ بْنُ الْعَوَّامِ",
    title: "Hawari Rasulullah (The Disciple of the Prophet) (RA)",
    role: "Prophet's cousin (son of Safiyyah bint Abdul-Muttalib) and legendary cavalry commander. Fought with dual swords on horseback.",
    virtues: "One of the Ten Promised Paradise. The first person to draw a sword in defense of Islam in Mecca after hearing a false rumor that the Prophet was captured. Husband to Asma bint Abi Bakr (RA).",
    mustKnowFact: "The Prophet (SAW) praised his loyalty and declared: 'Every prophet has a disciple (Hawari), and my disciple is Al-Zubayr.' (Sahih al-Bukhari). He was renowned for wearing a yellow turban in battle, prompting the Prophet to note that angels descended at Uhud wearing yellow turrets in his likeness.",
    majorBattles: ["Battle of Badr", "Battle of Uhud", "Battle of Khandaq", "Battle of Yarmouk"],
    isPromisedParadise: true
  },
  {
    id: "talhah",
    name: "Talhah ibn Ubaydullah (RA)",
    arabicName: "طَلْحَةُ بْنُ عُبَيْدِ اللَّهِ",
    title: "Talhah al-Khayr (Talhah the Generous) (RA)",
    role: "Heroic defender and standard-bearer. Renowned for his extreme bravery and selflessness in protecting the Prophet (SAW).",
    virtues: "One of the Ten Promised Paradise. Nicknamed 'Talhah the Generous' by the Prophet for donating massive water wells and property to Medina's poor.",
    mustKnowFact: "During the Battle of Uhud, when the Muslim lines broke, Talhah acted as a human shield for the Prophet (SAW). He received over 70 wounds from swords, spears, and arrows, and his hand became permanently paralyzed after deflecting an arrow targeted at the Prophet's face. The Prophet said: 'Whoever wants to see a living martyr walking on earth, let him look at Talhah.'",
    majorBattles: ["Battle of Uhud (Hero of Uhud)", "Battle of Khandaq", "Conquest of Mecca"],
    isPromisedParadise: true
  },
  {
    id: "saeed",
    name: "Sa'eed ibn Zayd (RA)",
    arabicName: "سَعِيدُ بْنُ زَيْدٍ",
    title: "The Answered supplicant (RA)",
    role: "Early pioneer convert and statesman. Known for his asceticism, deep knowledge, and aversion to political positions.",
    virtues: "One of the Ten Promised Paradise. His father, Zayd ibn Amr, was one of the few Monotheists (Hanifs) in Mecca before Islam began. Married to Fatimah bint al-Khattab (Umar's sister); their conversion directly triggered Umar’s conversion.",
    mustKnowFact: "He was famous for having his prayers instantly answered by Allah. When a woman falsely accused him of stealing her land, he prayed: 'O Allah, if she is lying, blind her eyes and make her die in her own well.' She went blind and fell into her household well shortly after, vindicating him in front of all Medina.",
    majorBattles: ["Conquest of Levant", "Battle of Yarmouk", "Siege of Damascus"],
    isPromisedParadise: true
  }
];
