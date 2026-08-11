export interface ProphetJourneyStep {
  title: string;          // Stage Title
  subtitle: string;       // Context Label
  narrative: string;      // Detailed narration text
  gradient: string;       // Tailwind background gradient classes
  particles: 'mist' | 'rain' | 'embers' | 'gold-sand' | 'ocean-glow' | 'stars' | 'wind';
  ambientTitle: string;   // Description of soundscape
  ambientType: 'wind' | 'fire' | 'waves' | 'drone';
  quranRefs: string[];    // Quranic reference citations
}

export interface ProphetProfile {
  id: string;
  name: string;
  emoji: string;
  location: string;
  steps: ProphetJourneyStep[];
}

export const PROPHETS_DATA: ProphetProfile[] = [
  {
    id: 'adam',
    name: 'Prophet Adam (AS)',
    emoji: '🌱',
    location: 'Garden of Eden / Primordial Earth',
    steps: [
      {
        title: 'The Divine Origin',
        subtitle: 'Step 1: Creation & Honor',
        narrative: 'Adam (AS) is created by Allah from clay, endowed with the names of all things, and honored above the angels, who are commanded to bow before him.',
        gradient: 'from-emerald-950/45 via-slate-900/35 to-emerald-950/40',
        particles: 'mist',
        ambientTitle: 'Primal forest morning breeze',
        ambientType: 'wind',
        quranRefs: ['2:30', '2:31', '2:33', '15:28', '15:29']
      },
      {
        title: 'The Garden Test',
        subtitle: 'Step 2: Whispers & Forgiveness',
        narrative: 'Placed in the peaceful Garden of Eden, Adam and Hawa are tested. After eating from the forbidden tree due to Iblees\' whispers, they turn to Allah in deep repentance.',
        gradient: 'from-emerald-900/40 via-stone-900/45 to-emerald-950/30',
        particles: 'stars',
        ambientTitle: 'Mystical garden evening drone',
        ambientType: 'drone',
        quranRefs: ['2:35', '2:36', '2:37', '7:19', '7:20', '7:22', '7:23']
      },
      {
        title: 'Dawn on Earth',
        subtitle: 'Step 3: Temporal Life & Guidance',
        narrative: 'Adam (AS) and Hawa descend to Earth, initiating human history. They are promised divine guidance for their descendants to navigate worldly challenges.',
        gradient: 'from-slate-900/40 via-teal-950/30 to-slate-900/40',
        particles: 'wind',
        ambientTitle: 'Vast earth wind & natural forest sounds',
        ambientType: 'wind',
        quranRefs: ['2:38', '2:39', '20:122', '20:123', '20:126']
      }
    ]
  },
  {
    id: 'nuh',
    name: 'Prophet Nuh (AS)',
    emoji: '🚢',
    location: 'Ancient Mesopotamia (Iraq)',
    steps: [
      {
        title: 'The Decades of Call',
        subtitle: 'Step 1: Unwavering Patience',
        narrative: 'For 950 years, Nuh (AS) calls his people to monotheism with infinite patience. He speaks to them day and night, in public and private, only to face mockery and arrogance.',
        gradient: 'from-slate-950 via-slate-900/50 to-blue-950/20',
        particles: 'wind',
        ambientTitle: 'Distant howling desert wind',
        ambientType: 'wind',
        quranRefs: ['71:5', '71:6', '71:7', '71:8', '71:9', '71:10']
      },
      {
        title: 'Building on Dry Ground',
        subtitle: 'Step 2: The Command & The Ark',
        narrative: 'Instructed by Allah, Nuh begins constructing a colossal wooden Ark on dry ground, far from any water, enduring continuous insults from passing chieftains.',
        gradient: 'from-slate-900/50 via-blue-950/40 to-slate-950/50',
        particles: 'rain',
        ambientTitle: 'Damp overcast rain & wood works',
        ambientType: 'wind',
        quranRefs: ['11:36', '11:37', '11:38', '23:27']
      },
      {
        title: 'The Great Deluge',
        subtitle: 'Step 3: Deliverance & Safe Harbor',
        narrative: 'The heavens open and the earth erupts with water. The Ark floats on mountainous waves until the waters subside, resting on Mount Judi as peace returns.',
        gradient: 'from-blue-950/50 via-slate-950/65 to-blue-950/30',
        particles: 'rain',
        ambientTitle: 'Roaring waves & storm winds',
        ambientType: 'waves',
        quranRefs: ['11:40', '11:41', '11:42', '11:44', '54:11', '54:12', '54:13']
      }
    ]
  },
  {
    id: 'ibrahim',
    name: 'Prophet Ibrahim (AS)',
    emoji: '🔥',
    location: 'Ur (Mesopotamia) & Makkah',
    steps: [
      {
        title: 'The Fire of Nimrod',
        subtitle: 'Step 1: Absolute Trust in God',
        narrative: 'Thrown into a towering furnace by King Nimrod for breaking idols, Ibrahim (AS) demonstrates complete trust. Allah commands the fire to be cool and peaceful.',
        gradient: 'from-orange-950/40 via-red-950/30 to-slate-900/40',
        particles: 'embers',
        ambientTitle: 'Mystical crackling fire & warm breeze',
        ambientType: 'fire',
        quranRefs: ['21:66', '21:68', '21:69', '37:97', '37:98']
      },
      {
        title: 'The Sacrifice Test',
        subtitle: 'Step 2: Submission & Grace',
        narrative: 'Tested with the command to sacrifice his beloved son Ismail, Ibrahim submits without hesitation. At the moment of sacrifice, Allah replaces Ismail with a ram.',
        gradient: 'from-stone-900/50 via-orange-950/20 to-slate-950/40',
        particles: 'gold-sand',
        ambientTitle: 'Dry desert wind & quiet dunes',
        ambientType: 'wind',
        quranRefs: ['37:101', '37:102', '37:103', '37:104', '37:105', '37:107']
      },
      {
        title: 'Rebuilding the Kaaba',
        subtitle: 'Step 3: The Sanctuary',
        narrative: 'Ibrahim and Ismail lay the foundations of the Kaaba in the barren valley of Makkah, establishing a sanctuary of monotheism and calling mankind to pilgrimage.',
        gradient: 'from-amber-950/30 via-slate-950/40 to-slate-900/35',
        particles: 'stars',
        ambientTitle: 'Desert night breeze & spiritual drone',
        ambientType: 'drone',
        quranRefs: ['2:125', '2:127', '14:35', '14:37', '22:26', '22:27']
      }
    ]
  },
  {
    id: 'yusuf',
    name: 'Prophet Yusuf (AS)',
    emoji: '👑',
    location: 'Canaan & Egypt',
    steps: [
      {
        title: 'The Well & The Prison',
        subtitle: 'Step 1: Trials of Isolation',
        narrative: 'Betrayed by his brothers and cast into a well, Yusuf (AS) is sold into slavery and later unjustly imprisoned. Throughout, he maintains absolute faith and integrity.',
        gradient: 'from-stone-900/60 via-slate-950 to-stone-950/50',
        particles: 'mist',
        ambientTitle: 'Quiet stone cavern echo & wind',
        ambientType: 'wind',
        quranRefs: ['12:15', '12:19', '12:21', '12:33', '12:35']
      },
      {
        title: 'Dream Interpreter',
        subtitle: 'Step 2: Rising to Authority',
        narrative: 'Yusuf correctly interprets the Pharaoh\'s dream of seven fat and lean cows, saving Egypt from famine. He is appointed as the chief minister of the land.',
        gradient: 'from-amber-900/30 via-stone-900/40 to-slate-900/35',
        particles: 'gold-sand',
        ambientTitle: 'Warm Egyptian desert dunes',
        ambientType: 'wind',
        quranRefs: ['12:43', '12:46', '12:47', '12:48', '12:54', '12:55']
      },
      {
        title: 'Family Reunited',
        subtitle: 'Step 3: Forgiveness & Joy',
        narrative: 'His brothers arrive in Egypt for grain. Yusuf forgives them, restores his father Yaqub\'s eyesight with his shirt, and reunites the family, thanking Allah.',
        gradient: 'from-emerald-950/20 via-slate-900/40 to-emerald-950/30',
        particles: 'stars',
        ambientTitle: 'Calm Nile river bank breeze',
        ambientType: 'drone',
        quranRefs: ['12:90', '12:93', '12:96', '12:99', '12:100']
      }
    ]
  },
  {
    id: 'musa',
    name: 'Prophet Musa (AS)',
    emoji: '🌊',
    location: 'Red Sea & Mount Sinai',
    steps: [
      {
        title: 'The Burning Bush',
        subtitle: 'Step 1: The Divine Call',
        narrative: 'Wandering in the Sinai wilderness, Musa (AS) is drawn to a sacred flame in a bush. Allah speaks to him, appointing him as a Prophet to confront Pharaoh.',
        gradient: 'from-slate-950 via-red-950/20 to-slate-900/50',
        particles: 'embers',
        ambientTitle: 'Crackling fire & Sinai night wind',
        ambientType: 'fire',
        quranRefs: ['20:9', '20:10', '20:11', '20:12', '20:13', '28:30']
      },
      {
        title: 'Parting the Red Sea',
        subtitle: 'Step 2: The Great Escape',
        narrative: 'Trapped between Pharaoh\'s army and the Red Sea, Musa strikes the sea with his staff. The waters split into towering walls, carving a safe path for Bani Israil.',
        gradient: 'from-cyan-950/40 via-sky-950/25 to-slate-950/40',
        particles: 'wind',
        ambientTitle: 'Roaring sea walls & water sprays',
        ambientType: 'waves',
        quranRefs: ['2:50', '20:77', '26:61', '26:63', '26:65', '44:24']
      },
      {
        title: 'The Tablets on Mount Sinai',
        subtitle: 'Step 3: The Law & The Covenant',
        narrative: 'Musa ascends Mount Sinai for forty nights. Amidst clouds and light, Allah speaks to him directly, engraving the Ten Commandments onto tablets.',
        gradient: 'from-slate-900/60 via-purple-950/20 to-slate-950',
        particles: 'mist',
        ambientTitle: 'Sinai mountain peak howling storm',
        ambientType: 'wind',
        quranRefs: ['7:142', '7:143', '7:144', '7:145', '19:52']
      }
    ]
  },
  {
    id: 'yunus',
    name: 'Prophet Yunus (AS)',
    emoji: '🐳',
    location: 'Mediterranean Sea & Nineveh',
    steps: [
      {
        title: 'The Storm & The Lot',
        subtitle: 'Step 1: Leaving Nineveh',
        narrative: 'Angered by his people\'s disbelief, Yunus (AS) leaves his city without Allah\'s command. He boards a ship, but a violent storm forces the crew to cast lots, and Yunus is thrown into the sea.',
        gradient: 'from-blue-950/60 via-slate-950 to-blue-950/30',
        particles: 'rain',
        ambientTitle: 'Stormy sea waves & thunder gusts',
        ambientType: 'waves',
        quranRefs: ['37:139', '37:140', '37:141', '68:48']
      },
      {
        title: 'The Belly of the Whale',
        subtitle: 'Step 2: Repentance in the Deep',
        narrative: 'Swallowed by a giant fish, Yunus sits in triple darkness. He cries out his famous prayer of repentance: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers."',
        gradient: 'from-blue-950/50 via-teal-950/30 to-slate-950/50',
        particles: 'ocean-glow',
        ambientTitle: 'Submerged deep-ocean hum & whale calls',
        ambientType: 'waves',
        quranRefs: ['21:87', '37:142', '37:143', '37:144']
      },
      {
        title: 'The Gourd Shield',
        subtitle: 'Step 3: Recovery & Rebirth',
        narrative: 'Allah forgives Yunus and commands the fish to eject him onto a sandy beach. Weakened and burned, a leafy gourd plant (Yaqteen) is grown to shade and heal him.',
        gradient: 'from-teal-950/40 via-stone-900/40 to-slate-900/35',
        particles: 'wind',
        ambientTitle: 'Gentle coastal breeze & leaf rustles',
        ambientType: 'wind',
        quranRefs: ['37:145', '37:146', '37:147', '37:148']
      }
    ]
  },
  {
    id: 'isa',
    name: 'Prophet Isa (AS)',
    emoji: '🕊️',
    location: 'Judea / Galilee',
    steps: [
      {
        title: 'Speaking in the Cradle',
        subtitle: 'Step 1: Miracle of Maryam',
        narrative: 'Defending his mother Maryam against false accusations, infant Isa (AS) speaks from the cradle, declaring his prophethood and appointment as a blessing.',
        gradient: 'from-teal-950/35 via-stone-900/45 to-slate-950/40',
        particles: 'stars',
        ambientTitle: 'Soft peaceful night drone',
        ambientType: 'drone',
        quranRefs: ['3:45', '3:46', '19:29', '19:30', '19:31', '19:32', '19:33']
      },
      {
        title: 'Miracles of Clay & Healing',
        subtitle: 'Step 2: Manifest Proofs',
        narrative: 'By Allah\'s leave, Isa creates living birds from clay, cures the blind and the leper, and brings the dead back to life as clear signs of his prophethood.',
        gradient: 'from-emerald-950/30 via-stone-900/40 to-slate-900/35',
        particles: 'mist',
        ambientTitle: 'Judean mountain wind & spring flow',
        ambientType: 'wind',
        quranRefs: ['3:49', '5:110', '43:63']
      },
      {
        title: 'The Heavenly Table',
        subtitle: 'Step 3: The Deliverance',
        narrative: 'At the request of the disciples, Isa prays for a table spread with food to descend from heaven as a feast and assurance of faith. Later, Allah raises him to the heavens.',
        gradient: 'from-sky-950/30 via-slate-900/45 to-sky-950/20',
        particles: 'stars',
        ambientTitle: 'Heavenly wind swells & divine drone',
        ambientType: 'drone',
        quranRefs: ['3:55', '4:158', '5:112', '5:114', '5:115']
      }
    ]
  },
  {
    id: 'muhammad',
    name: 'Prophet Muhammad (SAW)',
    emoji: '🌙',
    location: 'Makkah & Madinah',
    steps: [
      {
        title: 'The First Revelation',
        subtitle: 'Step 1: Cave of Hira',
        narrative: 'Meditating in the silent Cave of Hira under clear starry Arabian skies, Muhammad (SAW) is visited by Angel Jibreel, receiving the first verses of the Noble Quran.',
        gradient: 'from-slate-950 via-emerald-950/20 to-slate-950',
        particles: 'stars',
        ambientTitle: 'Silent desert mountain night wind',
        ambientType: 'wind',
        quranRefs: ['53:7', '53:13', '53:18', '96:1', '96:2', '96:3', '96:4', '96:5']
      },
      {
        title: 'The Miraculous Night Journey',
        subtitle: 'Step 2: Isra\' wal-Mi\'raj',
        narrative: 'Taken on a miraculous night journey from Makkah to Jerusalem, Muhammad ascends through the seven heavens, meeting prior Prophets and receiving the five daily prayers.',
        gradient: 'from-emerald-950/40 via-purple-950/30 to-slate-950',
        particles: 'stars',
        ambientTitle: 'Mystical celestial cosmic drone',
        ambientType: 'drone',
        quranRefs: ['17:1', '53:11', '53:14', '53:15', '53:17']
      },
      {
        title: 'The Splitting of the Moon',
        subtitle: 'Step 3: The Manifest Sign',
        narrative: 'Challenged by the chieftains of Makkah, Muhammad SAW points to the moon. By Allah\'s command, the moon splits visibly in two halves, leaving the mockers stunned.',
        gradient: 'from-slate-900 via-indigo-950/35 to-slate-950',
        particles: 'stars',
        ambientTitle: 'Desert crickets & quiet night hum',
        ambientType: 'drone',
        quranRefs: ['33:40', '48:28', '48:29', '54:1', '54:2']
      }
    ]
  }
];
