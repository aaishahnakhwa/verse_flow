export interface DivineName {
  number: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  description: string;
  duaUsage: string;
}

export const DIVINE_NAMES: DivineName[] = [
  {
    number: 1,
    arabic: "الرَّحْمَنُ",
    transliteration: "Ar-Rahman",
    meaning: "The Most Beneficent / Infinite Mercy",
    description: "He who wills goodness and mercy for all His creatures, encompassing both the believer and disbeliever in this world.",
    duaUsage: "Recite when asking for general mercy in this life and relief from major worldly difficulties."
  },
  {
    number: 2,
    arabic: "الرَّحِيمُ",
    transliteration: "Ar-Rahim",
    meaning: "The Most Merciful / Merciful Friend",
    description: "He who bestows special mercy, guidance, and eternal reward upon the believers in the hereafter.",
    duaUsage: "Call upon 'Ya Rahim' to seek forgiveness, protection of faith, and entry into Paradise (Jannah)."
  },
  {
    number: 3,
    arabic: "الْمَلِكُ",
    transliteration: "Al-Malik",
    meaning: "The Sovereign / The Absolute Ruler",
    description: "The absolute Lord, Owner, and Ruler of the entire creation, with complete authority and without any partners.",
    duaUsage: "Use to ask for stability in authority, self-sufficiency, and success in leadership roles."
  },
  {
    number: 4,
    arabic: "الْقُدُّوسُ",
    transliteration: "Al-Quddus",
    meaning: "The Pure / The Holy",
    description: "The One who is absolutely free from any imperfection, error, weakness, or human limitations.",
    duaUsage: "Recite to purify your heart from doubts, spiritual diseases, anxiety, and obsessive thoughts (Waswas)."
  },
  {
    number: 5,
    arabic: "السَّلَامُ",
    transliteration: "As-Salam",
    meaning: "The Source of Peace / Giver of Safety",
    description: "The One who is free from all danger and defect, and the sole source of safety and peace for creation.",
    duaUsage: "Call upon 'Ya Salam' to seek peace in conflicts, mental clarity, physical safety, and protection in times of crisis."
  },
  {
    number: 6,
    arabic: "الْمُؤْمِنُ",
    transliteration: "Al-Mu'min",
    meaning: "The Guardian of Faith / Granter of Security",
    description: "The Giver of faith and security, who safeguards His servants from injustice and establishes trust.",
    duaUsage: "Recite to seek protection from fear, anxiety, and betrayal by others."
  },
  {
    number: 7,
    arabic: "الْمُهَيْمِنُ",
    transliteration: "Al-Muhaymin",
    meaning: "The Overseer / The Protecting Guardian",
    description: "The One who watches over, controls, protects, and preserves all of His creation.",
    duaUsage: "Use to seek physical safety, shelter from harm, and protection for your family when away."
  },
  {
    number: 8,
    arabic: "الْعَزِيزُ",
    transliteration: "Al-Aziz",
    meaning: "The Almighty / The Invincible",
    description: "The victorious One who cannot be overcome, possessing all honor, strength, and glory.",
    duaUsage: "Call upon 'Ya Aziz' to seek respect, honor, protection against oppressors, and strength of character."
  },
  {
    number: 9,
    arabic: "الْجَبَّارُ",
    transliteration: "Al-Jabbar",
    meaning: "The Compeller / The Restorer of Brokenness",
    description: "The One who repairs all fractures, consoles the broken-hearted, and enforces His decree with supreme power.",
    duaUsage: "Recite when feeling deeply broken, oppressed, or when seeking the restoration of lost health or wealth."
  },
  {
    number: 10,
    arabic: "الْمُتَكَبِّرُ",
    transliteration: "Al-Mutakabbir",
    meaning: "The Supreme / The Majestic",
    description: "The One who shows His greatness in all things, possessing absolute grandeur and majesty.",
    duaUsage: "Recite to find humility and to overcome arrogance or dependencies on worldly idols."
  },
  {
    number: 11,
    arabic: "الْخَالِقُ",
    transliteration: "Al-Khaliq",
    meaning: "The Creator / The Planner",
    description: "The One who creates everything from nonexistence, determining its structure and life span.",
    duaUsage: "Use when seeking creativity, planning new life goals, or when asking for a child."
  },
  {
    number: 12,
    arabic: "الْبَارِئُ",
    transliteration: "Al-Bari",
    meaning: "The Maker of Order / The Evolver",
    description: "The One who shapes His creations with perfect harmony, proportions, and functions, without any faults.",
    duaUsage: "Recite to seek order in chaotic situations, cure from physical diseases, and harmony in life."
  },
  {
    number: 13,
    arabic: "الْمُصَوِّرُ",
    transliteration: "Al-Musawwir",
    meaning: "The Fashioner of Forms / The Artist",
    description: "The One who gives each creation its unique beauty, distinct shape, color, and character.",
    duaUsage: "Recite to seek success in design, beauty in speech, and when praying for healthy children."
  },
  {
    number: 14,
    arabic: "الْغَفَّارُ",
    transliteration: "Al-Ghaffar",
    meaning: "The Forgiver / The Veiler of Sins",
    description: "The One who forgives sins repeatedly and veils the faults of His servants from public view.",
    duaUsage: "Call upon 'Ya Ghaffar' to beg for forgiveness of major sins and to have your hidden faults protected."
  },
  {
    number: 15,
    arabic: "الْقَهَّارُ",
    transliteration: "Al-Qahhar",
    meaning: "The Subduer / The All-Conquering",
    description: "The One who dominates and subdues all creation, with absolute control over life, death, and nature.",
    duaUsage: "Recite to conquer bad habits, addictions, evil whispers, or to seek protection from severe tyranny."
  },
  {
    number: 16,
    arabic: "الْوَهَّابُ",
    transliteration: "Al-Wahhab",
    meaning: "The Giver of All / The Supreme Bestower",
    description: "The One who gives blessings freely and continuously without expecting any return or reward.",
    duaUsage: "Call upon 'Ya Wahhab' to ask for children, wealth, sudden opportunities, and unexpected blessings."
  },
  {
    number: 17,
    arabic: "الرَّزَّاقُ",
    transliteration: "Al-Razzaq",
    meaning: "The Provider / The Sustainer",
    description: "The One who provides all forms of sustenance, both material (food, money) and spiritual (knowledge, faith).",
    duaUsage: "Call upon 'Ya Razzaq' when facing financial difficulties, unemployment, or when seeking barakah in income."
  },
  {
    number: 18,
    arabic: "الْفَتَّاحُ",
    transliteration: "Al-Fattah",
    meaning: "The Opener / The Arbitrator",
    description: "The One who opens closed doors of opportunity, unlocks knowledge, and resolves complex disputes.",
    duaUsage: "Call upon 'Ya Fattah' when starting a new venture, sitting for exams, or when facing a stagnant situation."
  },
  {
    number: 19,
    arabic: "الْعَلِيمُ",
    transliteration: "Al-Alim",
    meaning: "The All-Knowing / Omniscient",
    description: "The One whose knowledge is infinite, encompassing all secrets, thoughts, past, present, and future.",
    duaUsage: "Recite to seek wisdom, memory, deep understanding of scriptures, and guidance in decision-making."
  },
  {
    number: 20,
    arabic: "الْقَابِضُ",
    transliteration: "Al-Qabid",
    meaning: "The Withholder / Restrictor",
    description: "The One who restricts provision, life, or hearts according to His wisdom to teach patience and reliance.",
    duaUsage: "Recite when feeling restricted or depressed, asking Him to expand your chest and ease the squeeze."
  },
  {
    number: 21,
    arabic: "الْبَاسِطُ",
    transliteration: "Al-Basit",
    meaning: "The Expander / Extender",
    description: "The One who expands provision, mercy, and joy, bringing relief and prosperity to His servants.",
    duaUsage: "Call upon 'Ya Basit' to seek ease, emotional relief, happiness, and an expansion of livelihood."
  },
  {
    number: 22,
    arabic: "الْخَافِضُ",
    transliteration: "Al-Khafid",
    meaning: "The Abaser / The Humbler",
    description: "The One who humbles the arrogant, lowers tyrants, and reduces evil systems to dust.",
    duaUsage: "Recite to protect against haughty oppressors and to maintain humility in your own heart."
  },
  {
    number: 23,
    arabic: "الرَّافِعُ",
    transliteration: "Ar-Rafi",
    meaning: "The Exalter / The Elevator",
    description: "The One who raises the status, honor, and station of His righteous servants in this world and the next.",
    duaUsage: "Call upon 'Ya Rafi' to seek promotions, honor among people, and elevated spiritual levels."
  },
  {
    number: 24,
    arabic: "الْمُعِزُّ",
    transliteration: "Al-Mu'izz",
    meaning: "The Giver of Honor",
    description: "The One who bestows dignity, strength, and victory upon whomever He wills.",
    duaUsage: "Recite when feeling humiliated or disrespected, seeking strength and honorable exit/entry."
  },
  {
    number: 25,
    arabic: "الْمُذِلُّ",
    transliteration: "Al-Mudhill",
    meaning: "The Giver of Dishonor",
    description: "The One who debases the proud, exposing their weakness and stripping away their false power.",
    duaUsage: "Recite to seek safety from tyrants, abusers, and those who seek to humiliate you."
  },
  {
    number: 26,
    arabic: "السَّمِيعُ",
    transliteration: "As-Sami",
    meaning: "The All-Hearing",
    description: "The One who hears all whispers, silent prayers, thoughts, and outer sounds, without any limit.",
    duaUsage: "Call upon 'Ya Sami' when begging for your private Du'as to be heard and accepted."
  },
  {
    number: 27,
    arabic: "الْبَصِيرُ",
    transliteration: "Al-Basir",
    meaning: "The All-Seeing",
    description: "The One who sees all actions, intentions, secrets, and events, even a black ant on a black stone in the dark.",
    duaUsage: "Recite to cultivate mindfulness (Ihsan), knowing He sees you, and to seek clarity of physical and spiritual vision."
  },
  {
    number: 28,
    arabic: "الْحَكَمُ",
    transliteration: "Al-Hakam",
    meaning: "The Supreme Judge / The Arbitrator",
    description: "The One who judges between truth and falsehood, whose decree cannot be turned back or delayed.",
    duaUsage: "Recite when seeking justice, resolving legal matters, or when dealing with false accusations."
  },
  {
    number: 29,
    arabic: "الْعَدْلُ",
    transliteration: "Al-Adl",
    meaning: "The Utterly Just",
    description: "The One who is absolutely fair and balanced in all His decisions, rulings, and creation designs.",
    duaUsage: "Use to ask for fairness in treatment, balance in your life, and justice in your affairs."
  },
  {
    number: 30,
    arabic: "الْحَلِيمُ",
    transliteration: "Al-Halim",
    meaning: "The Forbearing / The Gentle Tolerant",
    description: "The One who does not hasten to punish His servants for their sins, giving them ample time to repent.",
    duaUsage: "Recite to calm anger, cultivate patience, and when asking Allah for time to reform yourself."
  },
  {
    number: 31,
    arabic: "اللَّطِيفُ",
    transliteration: "Al-Latif",
    meaning: "The Subtle / The Gentle Provider",
    description: "The One who is extremely gentle, kind, and subtle in sending provisions and easing trials in ways unseen.",
    duaUsage: "Call upon 'Ya Latif' during hidden difficulties, hardship, anxiety, and to ask for smooth ease."
  },
  {
    number: 32,
    arabic: "الْخَبِيرُ",
    transliteration: "Al-Khabir",
    meaning: "The All-Aware / The Inner-Knowing",
    description: "The One who knows the absolute reality, hidden motivations, and inner truths of all things.",
    duaUsage: "Recite to discover hidden facts, make clear choices, and when facing confusing decisions."
  },
  {
    number: 33,
    arabic: "الْعَظِيمُ",
    transliteration: "Al-Azim",
    meaning: "The Infinite Majesty / The Great One",
    description: "The One who is magnificent and great beyond human comprehension, limits, or comparison.",
    duaUsage: "Recite to fill your heart with awe of Allah and to reduce the fear of worldly empires or situations."
  },
  {
    number: 34,
    arabic: "الْغَفُورُ",
    transliteration: "Al-Ghafur",
    meaning: "The All-Forgiving",
    description: "The One who forgives completely, erasing the sin and protecting the sinner from its consequences.",
    duaUsage: "Call upon 'Ya Ghafur' to seek forgiveness for repeated sins and to request relief from guilt."
  },
  {
    number: 35,
    arabic: "الشَّكُورُ",
    transliteration: "Ash-Shakur",
    meaning: "The Appreciative / The Rewarder of Gratitude",
    description: "The One who appreciates even the smallest good deed, rewarding it with immense, multiplying blessings.",
    duaUsage: "Call upon 'Ya Shakur' to ask for barakah in your good deeds and to remove feelings of ungratefulness."
  },
  {
    number: 36,
    arabic: "الْعَلِيُّ",
    transliteration: "Al-Aliy",
    meaning: "The Most High / The Sublime",
    description: "The One who is exalted above all creation in rank, power, and essence.",
    duaUsage: "Call upon 'Ya Aliy' when seeking elevation, success in high ambitions, and victory over trials."
  },
  {
    number: 37,
    arabic: "الْكَبِيرُ",
    transliteration: "Al-Kabir",
    meaning: "The Most Great / Infinite Grandeur",
    description: "The One who is infinitely great, possessing complete greatness that cannot be matched.",
    duaUsage: "Recite when facing overwhelming obstacles, repeating 'Allahu Akbar' and calling upon 'Ya Kabir'."
  },
  {
    number: 38,
    arabic: "الْحَفِيظُ",
    transliteration: "Al-Hafiz",
    meaning: "The Preserver / The Protector",
    description: "The One who guards and protects all creations, keeping record of all their deeds without failing.",
    duaUsage: "Recite for physical safety, protection when traveling, and to preserve your children from harm."
  },
  {
    number: 39,
    arabic: "الْمُقِيتُ",
    transliteration: "Al-Muqit",
    meaning: "The Nourisher / The Giver of Strength",
    description: "The One who creates and distributes food, nutrition, and strength to body and soul.",
    duaUsage: "Recite when struggling with physical weakness, hunger, illness, or fatigue, to ask for energy."
  },
  {
    number: 40,
    arabic: "الْحَسِيبُ",
    transliteration: "Al-Hasib",
    meaning: "The Sufficient Reckoner",
    description: "The One who is sufficient as a protector, and the One who will reckon all deeds on Judgment Day.",
    duaUsage: "Recite when feeling insecure or dependent, repeating: 'Hasbiyallahu wa ni'mal wakeel' (Allah is sufficient for me)."
  },
  {
    number: 41,
    arabic: "الْجَلِيلُ",
    transliteration: "Al-Jalil",
    meaning: "The Majestic / The Glorious",
    description: "The One who possesses absolute majesty, glory, grandeur, and sublime attributes.",
    duaUsage: "Recite to find spiritual dignity, respect, and reverence in the hearts of others."
  },
  {
    number: 42,
    arabic: "الْكَرِيمُ",
    transliteration: "Al-Karim",
    meaning: "The Most Generous / The Bountiful",
    description: "The One who gives generously, starting blessings without request, and forgiving when He has power.",
    duaUsage: "Call upon 'Ya Karim' to request abundant provisions, high character, and generous treatment."
  },
  {
    number: 43,
    arabic: "الرَّقِيبُ",
    transliteration: "Ar-Raqib",
    meaning: "The Watchful / The Ever-Observant",
    description: "The One who watches over every heartbeat, movement, and thought, never losing attention.",
    duaUsage: "Recite to strengthen your sincerity (Muraqabah) and to protect your household from theft/intruders."
  },
  {
    number: 44,
    arabic: "الْمُجِيبُ",
    transliteration: "Al-Mujib",
    meaning: "The Responder to Prayers",
    description: "The One who hears, answers, and fulfills the prayers, needs, and requests of His servants.",
    duaUsage: "Call upon 'Ya Mujib' when you need an urgent answer to your prayers or are in desperate distress."
  },
  {
    number: 45,
    arabic: "الْوَاسِعُ",
    transliteration: "Al-Wasi",
    meaning: "The All-Encompassing / Boundless",
    description: "The One whose attributes, mercy, knowledge, and power are infinite and embrace all creations.",
    duaUsage: "Recite when feeling claustrophobic, poor, or limited, to ask for vastness in provision and heart."
  },
  {
    number: 46,
    arabic: "الْحَكِيمُ",
    transliteration: "Al-Hakim",
    meaning: "The All-Wise",
    description: "The One who acts with absolute wisdom, putting everything in its correct place and time.",
    duaUsage: "Call upon 'Ya Hakim' when you are confused about why a trial happened, seeking contentment and wisdom."
  },
  {
    number: 47,
    arabic: "الْوَدُودُ",
    transliteration: "Al-Wadud",
    meaning: "The Loving One / The Source of Affection",
    description: "The One who loves His righteous servants, placing love and affection in the hearts of creation.",
    duaUsage: "Call upon 'Ya Wadud' to resolve marital disputes, mend family ties, and increase mutual love."
  },
  {
    number: 48,
    arabic: "الْمَجِيدُ",
    transliteration: "Al-Majid",
    meaning: "The Glorious / Infinite Glory",
    description: "The One who is grand in attributes, noble in actions, and possesses immense honor.",
    duaUsage: "Recite to seek dignity, noble character, and to recover from feelings of shame."
  },
  {
    number: 49,
    arabic: "الْبَاعِثُ",
    transliteration: "Al-Ba'ith",
    meaning: "The Resurrector / The Quickener",
    description: "The One who will raise all dead bodies from the graves and bring dormant hearts back to life.",
    duaUsage: "Recite when feeling spiritual laziness (sloth) or depression, to seek revival of energy and faith."
  },
  {
    number: 50,
    arabic: "الشَّهِيدُ",
    transliteration: "Ash-Shahid",
    meaning: "The Witness",
    description: "The One who is present everywhere, witnessing all manifest and hidden deeds.",
    duaUsage: "Use to seek justice against oppressors who act in secret, and to keep yourself honest."
  },
  {
    number: 51,
    arabic: "الْحَقُّ",
    transliteration: "Al-Haqq",
    meaning: "The Absolute Truth",
    description: "The One whose existence is real, unchangeable, and eternal, and who manifests the ultimate truth.",
    duaUsage: "Recite when searching for truth, dealing with falsities, or wanting your rights to be returned."
  },
  {
    number: 52,
    arabic: "الْوَكِيلُ",
    transliteration: "Al-Wakil",
    meaning: "The Trustee / The Dependable Protector",
    description: "The One who manages all affairs perfectly, and who is sufficient for those who delegate their trust to Him.",
    duaUsage: "Recite 'Ya Wakil' when placing your trust in Him before a major task, exam, surgery, or journey."
  },
  {
    number: 53,
    arabic: "الْقَوِيُّ",
    transliteration: "Al-Qawiy",
    meaning: "The All-Strong / Infinite Strength",
    description: "The One with complete, unlimited strength, who can never be weakened or exhausted.",
    duaUsage: "Recite when feeling physically weak, tired, or when facing a much stronger enemy/opponent."
  },
  {
    number: 54,
    arabic: "الْمَتِينُ",
    transliteration: "Al-Matin",
    meaning: "The Firm / The Steadfast",
    description: "The One who is extremely firm in His power, whose decisions can never be shaken or disrupted.",
    duaUsage: "Call upon 'Ya Matin' to request steadfastness in your faith and protection from moral deviation."
  },
  {
    number: 55,
    arabic: "الْوَلِيُّ",
    transliteration: "Al-Waliy",
    meaning: "The Protecting Friend / Patron Lord",
    description: "The One who is the loving guardian, helper, and close ally of the righteous believers.",
    duaUsage: "Call upon 'Ya Waliy' when feeling lonely, friendless, or when seeking supportive companions."
  },
  {
    number: 56,
    arabic: "الْحَمِيدُ",
    transliteration: "Al-Hamid",
    meaning: "The All-Praiseworthy",
    description: "The One who deserves all praise and appreciation for His beauty, attributes, and actions.",
    duaUsage: "Recite to increase your state of contentment, praise Him for blessings, and gain humility."
  },
  {
    number: 57,
    arabic: "الْمُحْصِي",
    transliteration: "Al-Muhsi",
    meaning: "The Appraiser / The Counter",
    description: "The One who keeps absolute count of every drop of rain, leaf, and deed, down to the smallest detail.",
    duaUsage: "Recite to develop focus, study well, and hold yourself accountable before Judgment Day."
  },
  {
    number: 58,
    arabic: "الْمُبْدِئُ",
    transliteration: "Al-Mubdi",
    meaning: "The Initiator / Originator",
    description: "The One who starts creation from nothing, initiating all life and processes.",
    duaUsage: "Call upon 'Ya Mubdi' when starting a new business, writing a book, or launching any new phase in life."
  },
  {
    number: 59,
    arabic: "الْمُعِيدُ",
    transliteration: "Al-Mu'id",
    meaning: "The Restorer / The Recreator",
    description: "The One who brings things back to their original state after they have perished or degraded.",
    duaUsage: "Recite to ask for the restoration of lost health, lost relationships, or lost spiritual focus."
  },
  {
    number: 60,
    arabic: "الْمُحْيِي",
    transliteration: "Al-Muhyi",
    meaning: "The Giver of Life",
    description: "The One who grants physical life to dust, and spiritual life to dark, dead hearts.",
    duaUsage: "Recite to ask for cure from terminal illnesses, and to revive a heart that feels spiritually cold."
  },
  {
    number: 61,
    arabic: "الْمُمِيتُ",
    transliteration: "Al-Mumit",
    meaning: "The Bringer of Death",
    description: "The One who decrees death for all living things when their pre-written time is reached.",
    duaUsage: "Recite to suppress your ego (Nafs), combat desires, and prepare your heart for a good death."
  },
  {
    number: 62,
    arabic: "الْحَيُّ",
    transliteration: "Al-Hayy",
    meaning: "The Ever-Living",
    description: "The One who is eternally alive, possessing perfect, continuous life without beginning or end.",
    duaUsage: "Often paired as 'Ya Hayyu Ya Qayyum' - recite when in deep crisis to beg for absolute survival and help."
  },
  {
    number: 63,
    arabic: "الْقَيُّومُ",
    transliteration: "Al-Qayyum",
    meaning: "The Self-Sustaining / Sustainer of All",
    description: "The One who supports and sustains all of creation, standing in need of absolutely nothing Himself.",
    duaUsage: "Recite 'Ya Qayyum' to request stability in your life, discipline, and help in organizing your affairs."
  },
  {
    number: 64,
    arabic: "الْوَاجِدُ",
    transliteration: "Al-Wajid",
    meaning: "The Finder / The Rich",
    description: "The One who finds whatever He wants, whenever He wants, lacking absolutely nothing.",
    duaUsage: "Recite when searching for lost items, or when wanting to find deep inner contentment."
  },
  {
    number: 65,
    arabic: "الْمَاجِدُ",
    transliteration: "Al-Majid",
    meaning: "The Illustrious / The Noble",
    description: "The One who is noble, generous, and possesses magnificent bounty and glory.",
    duaUsage: "Recite to ask for noble descendants, high morals, and success in virtuous work."
  },
  {
    number: 66,
    arabic: "الْوَاحِدُ",
    transliteration: "Al-Wahid",
    meaning: "The One / The Unique",
    description: "The One who is single and unique in His attributes, actions, and essence, without any peer.",
    duaUsage: "Recite to eliminate polytheistic thoughts, reduce fear of others, and focus your sincerity."
  },
  {
    number: 67,
    arabic: "الْأَحَدُ",
    transliteration: "Al-Ahad",
    meaning: "The Only One / The Indivisible",
    description: "The absolute, indivisible One, who has no parents, children, or equal.",
    duaUsage: "Call upon 'Ya Ahad' to strengthen your conviction in monotheism (Tawhid) and erase doubts."
  },
  {
    number: 68,
    arabic: "الصَّمَدُ",
    transliteration: "As-Samad",
    meaning: "The Self-Sufficient / Eternal Refuge",
    description: "The absolute Lord whom all creation depends upon for their needs, while He stands in need of none.",
    duaUsage: "Call upon 'Ya Samad' when you are in desperate need of food, security, shelter, or basic resources."
  },
  {
    number: 69,
    arabic: "الْقَادِرُ",
    transliteration: "Al-Qadir",
    meaning: "The Capable / The Powerful",
    description: "The One who possesses absolute capability and power to do whatever He decrees.",
    duaUsage: "Call upon 'Ya Qadir' when seeking success in a task that seems completely impossible to achieve."
  },
  {
    number: 70,
    arabic: "الْمُقْتَدِرُ",
    transliteration: "Al-Muqtadir",
    meaning: "The Supreme Determiner / Omnipotent",
    description: "The One who enforces His absolute power, executing His decrees with perfect precision and strength.",
    duaUsage: "Recite to seek energy, power in difficult environments, and steadfastness against major challenges."
  },
  {
    number: 71,
    arabic: "الْمُقَدِّمُ",
    transliteration: "Al-Muqaddim",
    meaning: "The Promoter / Expediter",
    description: "The One who brings things forward, promoting whom He wills to priority and high ranks.",
    duaUsage: "Call upon 'Ya Muqaddim' to speed up a slow process, pass exams early, or get promoted."
  },
  {
    number: 72,
    arabic: "الْمُؤَخِّرُ",
    transliteration: "Al-Mu'akhkhir",
    meaning: "The Delayer / Postponer",
    description: "The One who delays events or keeps whom He wills behind according to His perfect wisdom.",
    duaUsage: "Recite when you want to delay an exam, a journey, or prevent a harmful event from occurring too soon."
  },
  {
    number: 73,
    arabic: "الْأَوَّلُ",
    transliteration: "Al-Awwal",
    meaning: "The First",
    description: "The One who existed before anything else, without any beginning.",
    duaUsage: "Recite to start things successfully, have long-term vision, and prioritize primary duties."
  },
  {
    number: 74,
    arabic: "الْآخِرُ",
    transliteration: "Al-Akhir",
    meaning: "The Last",
    description: "The One who remains after all creation has perished, without any end.",
    duaUsage: "Recite to ask for a good ending to your life (Husn al-Khatimah) and success in your projects."
  },
  {
    number: 75,
    arabic: "الظَّاهِرُ",
    transliteration: "Az-Zahir",
    meaning: "The Manifest / The Clear",
    description: "The One who is evident through His signs, creations, and victories, exalted above all things.",
    duaUsage: "Recite when you want the truth of a matter to become clear, or to expose fraud and lies."
  },
  {
    number: 76,
    arabic: "الْبَاطِنُ",
    transliteration: "Al-Batin",
    meaning: "The Hidden / The Knower of Secrets",
    description: "The One who is hidden from physical sight in this life, knowing the deepest mysteries of all hearts.",
    duaUsage: "Recite to seek inner purity, discover hidden knowledge, and protect your private life."
  },
  {
    number: 77,
    arabic: "الْوَالِي",
    transliteration: "Al-Wali",
    meaning: "The Governor / The Directing Ruler",
    description: "The One who governs, directs, and plans the affairs of the entire universe.",
    duaUsage: "Recite when managing a household, business, or community, to ask for administrative wisdom."
  },
  {
    number: 78,
    arabic: "الْمُتَعَالِي",
    transliteration: "Al-Muta'ali",
    meaning: "The Supreme Exalted",
    description: "The One who is exalted far above all human concepts, associations, and weaknesses.",
    duaUsage: "Call upon 'Ya Muta'ali' when facing intense arrogance from oppressors, seeking their defeat."
  },
  {
    number: 79,
    arabic: "الْبَرُّ",
    transliteration: "Al-Barr",
    meaning: "The Source of All Goodness / The Kind",
    description: "The One who is source of all virtue and goodness, continuously showing kindness and safety to creatures.",
    duaUsage: "Recite to ask for blessings in your children, high character, and clean relationships."
  },
  {
    number: 80,
    arabic: "التَّوَّابُ",
    transliteration: "At-Tawwab",
    meaning: "The Acceptor of Repentance",
    description: "The One who repeatedly opens the path of repentance and accepts the sincere return of His servants.",
    duaUsage: "Call upon 'Ya Tawwab' when repenting from any sin, major or minor, asking Him to accept your Tawbah."
  },
  {
    number: 81,
    arabic: "الْمُنْتَقِمُ",
    transliteration: "Al-Muntaqim",
    meaning: "The Avenger",
    description: "The One who punishes transgressors and tyrants when they refuse all chances of repentance.",
    duaUsage: "Use to seek protection and justice against violent oppressors, tyrants, and abusers."
  },
  {
    number: 82,
    arabic: "الْمُقْسِطُ",
    transliteration: "Al-Muqsit",
    meaning: "The Equitable / The Fair Restorer",
    description: "The One who establishes absolute equity, and who restores balance and fairness to the wronged.",
    duaUsage: "Recite to resolve disputes, remove malice/jealousy from your heart, and ask for fair judgment."
  },
  {
    number: 83,
    arabic: "الْعَفُوُّ",
    transliteration: "Al-Afuw",
    meaning: "The Pardoner / The Eraser of Sins",
    description: "The One who pardons sins completely, removing the record of the sin as if it never existed.",
    duaUsage: "Recite in the last 10 nights of Ramadan: 'Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni'."
  },
  {
    number: 84,
    arabic: "الرَّؤُوفُ",
    transliteration: "Ar-Ra'uf",
    meaning: "The Most Compassionate / Tender",
    description: "The One who is extremely mild, compassionate, and tenderly mercy to His creations, sparing them hardship.",
    duaUsage: "Call upon 'Ya Ra'uf' when suffering from physical pain, stress, or when wanting gentleness in your life."
  },
  {
    number: 85,
    arabic: "مَالِكُ الْمُلْكِ",
    transliteration: "Malik-ul-Mulk",
    meaning: "The Owner of Sovereignty",
    description: "The absolute, eternal Owner of the entire kingdom of existence, doing whatever He wills.",
    duaUsage: "Recite to protect your assets, home, and business from being seized or ruined."
  },
  {
    number: 86,
    arabic: "ذُو الْجَلَالِ وَالْإِكْرَامِ",
    transliteration: "Dhul-Jalali-wal-Ikram",
    meaning: "Lord of Majesty and Generosity",
    description: "The One who possesses absolute majesty, grandeur, and the One who is source of all honor and generosity.",
    duaUsage: "The Prophet advised to cling tightly to this name in Du'as. Call upon Him for massive, comprehensive requests."
  },
  {
    number: 87,
    arabic: "الْجَامِعُ",
    transliteration: "Al-Jami",
    meaning: "The Gatherer / The Uniter",
    description: "The One who will gather all of creation on the Day of Judgment, and who unites hearts and paths.",
    duaUsage: "Recite when looking for lost items, trying to reunite separated families, or finding a spouse."
  },
  {
    number: 88,
    arabic: "الْغَنِيُّ",
    transliteration: "Al-Ghaniy",
    meaning: "The Rich / The Self-Sufficient",
    description: "The One who is completely rich and self-sufficient, standing in need of absolutely nothing.",
    duaUsage: "Call upon 'Ya Ghaniy' to seek wealth, independence from others, and freedom from debt."
  },
  {
    number: 89,
    arabic: "الْمُغْنِي",
    transliteration: "Al-Mughni",
    meaning: "The Enricher / Bestower of Wealth",
    description: "The One who enriches His servants, giving them wealth, content hearts, and satisfaction.",
    duaUsage: "Call upon 'Ya Mughni' to ask for prosperity, financial security, and satisfaction in life."
  },
  {
    number: 90,
    arabic: "الْمَانِعُ",
    transliteration: "Al-Mani",
    meaning: "The Preventer / Shielding Guardian",
    description: "The One who blocks and prevents harmful situations from reaching His servants according to His wisdom.",
    duaUsage: "Recite to seek protection from accidents, illnesses, bad decisions, and the jealousy of others."
  },
  {
    number: 91,
    arabic: "الضَّارُّ",
    transliteration: "Ad-Darr",
    meaning: "The Distressor / Creator of Adversity",
    description: "The One who allows distress and adversity to occur to test patience, expiate sins, and teach reliance.",
    duaUsage: "Recite to seek patience during trials, recognizing that no harm can touch you without His permission."
  },
  {
    number: 92,
    arabic: "النَّافِعُ",
    transliteration: "An-Nafi",
    meaning: "The Propitious / Creator of Good",
    description: "The One who creates and sends benefit, goodness, and advantage to whomever He wills.",
    duaUsage: "Call upon 'Ya Nafi' to seek success in health treatments, studies, farming, and business actions."
  },
  {
    number: 93,
    arabic: "النُّورُ",
    transliteration: "An-Nur",
    meaning: "The Light",
    description: "The One who guides, illuminates, and makes visible all worlds and hearts with His guidance.",
    duaUsage: "Call upon 'Ya Nur' to ask for light in your heart, light in your grave, and clarity of mind."
  },
  {
    number: 94,
    arabic: "الْهَادِي",
    transliteration: "Al-Hadi",
    meaning: "The Guide",
    description: "The One who sends guidance, directing His creations to what is beneficial and leading believers to the straight path.",
    duaUsage: "Call upon 'Ya Hadi' when feeling lost, confused, or when praying for the guidance of a loved one."
  },
  {
    number: 95,
    arabic: "الْبَدِيعُ",
    transliteration: "Al-Badi",
    meaning: "The Incomparable Originator",
    description: "The One who creates beautiful things out of nothing in a unique, peerless, and incomparable way.",
    duaUsage: "Recite when seeking creativity, solving hard engineering/design problems, and launching creative works."
  },
  {
    number: 96,
    arabic: "الْبَاقِي",
    transliteration: "Al-Baqi",
    meaning: "The Everlasting / The Eternal",
    description: "The One who remains forever, unaffected by time, death, decay, or change.",
    duaUsage: "Recite to seek stability, peace of mind, and the longevity of good blessings in your life."
  },
  {
    number: 97,
    arabic: "الْوَارِثُ",
    transliteration: "Al-Warith",
    meaning: "The Supreme Inheritor",
    description: "The One to whom all possessions return after their temporary owners have passed away.",
    duaUsage: "Recite when buying a home, planning family inheritances, or asking for children to carry your legacy."
  },
  {
    number: 98,
    arabic: "الرَّشِيدُ",
    transliteration: "Ar-Rashid",
    meaning: "The Guide to Right Path / The Teacher",
    description: "The One who directs all things to their correct destinations with absolute accuracy and wisdom.",
    duaUsage: "Call upon 'Ya Rashid' to seek direction in complex matters, making good business deals, and avoid mistakes."
  },
  {
    number: 99,
    arabic: "الصَّبُورُ",
    transliteration: "As-Sabur",
    meaning: "The Patient One",
    description: "The One who does not punish immediately, letting people act and testing His servants with patience.",
    duaUsage: "Call upon 'Ya Sabur' when feeling restless, irritated, or when needing extreme endurance to finish a trial."
  }
];
