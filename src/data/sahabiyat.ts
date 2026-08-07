export interface Sahabiyah {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  role: string;
  virtues: string;
  mustKnowFact: string;
  contributions: string[];
}

export const SAHABIYAT: Sahabiyah[] = [
  {
    id: "khadijah",
    name: "Khadijah bint Khuwaylid (RA)",
    arabicName: "خَدِيجَةُ بِنْتُ خُوَيْلِدٍ",
    title: "Umm al-Mu'minin (Mother of Believers) / At-Tahirah (RA)",
    role: "First wife of the Prophet Muhammad (SAW) and successful noble merchant. The very first person to embrace Islam.",
    virtues: "Reassurer of the Prophet (SAW) after his first revelation at Cave Hira. Spent her entire immense wealth supporting the early call and the Muslims during the 3-year boycott in Mecca. Sent divine greetings of peace (Salam) from Allah via Angel Jibreel.",
    mustKnowFact: "She was the only wife of the Prophet during her lifetime. The Prophet (SAW) said of her: 'She believed in me when people disbelieved, she trusted me when people accused me, she supported me with her wealth when people boycotted me, and Allah blessed me with children from her alone.'",
    contributions: ["First convert in Islam", "Vast financial support for early call", "Sustained Muslims during Meccan boycott"]
  },
  {
    id: "aisha",
    name: "Aisha bint Abi Bakr (RA)",
    arabicName: "عَائِشَةُ بِنْتُ أَبِي بَكْرٍ",
    title: "Umm al-Mu'minin (Mother of Believers) / Humayra (RA)",
    role: "Wife of the Prophet (SAW), daughter of Abu Bakr (RA). Leading scholar, jurist, and teacher of the early Islamic community.",
    virtues: "Narrated over 2,210 authentic Hadiths of the Prophet (SAW). Renowned for her unmatched memory, sharp intelligence, and expertise in inheritance law, medicine, Arabic poetry, and history. Taught both men and women after the Prophet's death.",
    mustKnowFact: "She is a cornerstone of Islamic law; over a quarter of the rulings of the Shariah (Islamic legal code) are derived from Aisha's scholarly reports and narrations. The Prophet (SAW) took his final breaths on her chest in her chamber.",
    contributions: ["Narrated 2,210+ Hadiths", "Leading scholar of Islamic jurisprudence", "Primary teacher of the Sahabas"]
  },
  {
    id: "fatima",
    name: "Fatima bint Muhammad (RA)",
    arabicName: "فَاطِمَةُ بِنْتُ مُحَمَّدٍ",
    title: "Al-Zahra (The Radiant) / Sayyidat Nisa' al-Jannah (RA)",
    role: "Beloved youngest daughter of the Prophet (SAW), wife of Ali (RA), and mother of Hasan (RA) and Husayn (RA).",
    virtues: "Described by the Prophet (SAW) as the 'leader of all women of Paradise'. Known for her extreme modesty, asceticism, and resembling the Prophet (SAW) closest in speech, gait, and noble character. Stood bravely by her father during Meccan persecution.",
    mustKnowFact: "The Prophet (SAW) famously said: 'Fatima is a part of me; whoever angers her, angers me.' (Sahih al-Bukhari). She was the very first member of the Prophet's family to pass away after his death, dying just 6 months later, as he had secretly prophesied to her.",
    contributions: ["Sustained the Prophet during Meccan persecution", "Ancestor of the Prophet's descendants", "Pinnacle model of modesty and patience"]
  },
  {
    id: "asmabintabibakr",
    name: "Asma bint Abi Bakr (RA)",
    arabicName: "أَسْمَاءُ بِنْتُ أَبِي بَكْرٍ",
    title: "Dhat an-Nitaqayn (Possessor of the Two Belts) (RA)",
    role: "Daughter of Abu Bakr (RA), elder sister of Aisha (RA), and wife of Zubayr ibn al-Awwam (RA). Heroic facilitator of the Hijrah.",
    virtues: "Fearing discovery by Quraish assassins, she tore her waist belt in two to bind the food and water supplies to the Prophet's camel as they hid in Cave Thawr (earning her famous title). Refused to betray the escape plan despite being slapped by Abu Jahl.",
    mustKnowFact: "She was the mother of Abdullah ibn al-Zubayr (RA). When he was born in Quba during the Hijrah, he was the first child born to the Muslim emigrants (Muhajirun) in Medina, breaking the rumors spread by pagan adversaries that they had cursed the Muslims to be childless.",
    contributions: ["Secured Hijrah supply lines", "First mother to give birth in Medina (Abdullah ibn al-Zubayr)", "Stood firm against tyrants in old age"]
  },
  {
    id: "nusaybah",
    name: "Nusaybah bint Ka'b (RA) (Umm Umarah)",
    arabicName: "نُسَيْبَةُ بِنْتُ كَعْبٍ",
    title: "Umm Umarah / The Shield of Uhud (RA)",
    role: "Early Medinan convert, chief negotiator, and warrior companion who fought in battles directly protecting the Prophet (SAW).",
    virtues: "Fought valiantly at the Battle of Uhud, receiving 12 wounds (sword cuts and arrows) while physically shielding the Prophet (SAW) from cavalry attacks. The Prophet said: 'Wherever I looked, to the left or right, I saw Nusaybah fighting in front of me.'",
    mustKnowFact: "Her son Habib (RA) was captured and brutally dismembered limb-by-limb by the false prophet Musaylimah when he refused to renounce Muhammad. Despite the grief, Nusaybah fought Musaylimah at the Battle of Yamama, losing her hand while seeking justice for her son.",
    contributions: ["Pledge of Aqabah negotiator", "Uhud combatant (Shielded the Prophet)", "Fought at Yamama (Lost her hand in combat)"]
  },
  {
    id: "khawlah",
    name: "Khawlah bint al-Azwar (RA)",
    arabicName: "خَوْلَةُ بِنْتُ الأَزْوَرِ",
    title: "Al-Faris al-Muthatham (The Veiled Knight) (RA)",
    role: "Legendary military commander and warrior. Led cavalry charges during the conquests of Syria and the Levant.",
    virtues: "Fought wearing black armor and face veil. Renowned for saving her captured brother Dirar (RA) by charging alone into Byzantine legions. Fought so fiercely that general Khalid ibn Al-Walid (RA) mistook her for a veteran male general until her identity was revealed.",
    mustKnowFact: "She once stopped Caliph Umar (RA) in a crowded public street to admonish and advise him about his duties. Umar stood listening patiently. When asked why, Umar replied: 'How could I not listen to her, when Allah Himself listened to her complaint from above the seven heavens?'",
    contributions: ["Led cavalry charges against Byzantines", "Rescued Muslim prisoners of war", "Commanded all-female defense units"]
  },
  {
    id: "sumayyah",
    name: "Sumayyah bint Khayyat (RA)",
    arabicName: "سُمَيَّةُ بِنْتُ خَيَّاطٍ",
    title: "Awwal Shahidah (First Martyr of Islam) (RA)",
    role: "Mother of Ammar ibn Yasir (RA). Early convert who stood unwavering against tribal torture.",
    virtues: "The first person in history to be martyred for Islam. Subjected to brutal torture under the scorching sun by the clan of Makhzum, she refused to renounce her belief in monotheism until Abu Jahl executed her. Prophet (SAW) comforted her family: 'Patience, O family of Yasir, for your destination is Paradise.'",
    mustKnowFact: "She represents the first sacrifice of life in Islamic history. Her refusal to compromise on her faith despite extreme age and horrific torture established the ultimate standard of steadfastness for all martyrs who followed.",
    contributions: ["First Martyr of Islam", "Pioneer of absolute spiritual steadfastness"]
  },
  {
    id: "ummsulaym",
    name: "Umm Sulaym bint Milhan (RA)",
    arabicName: "أُمُّ سُلَيْمٍ بِنْتُ مِلْحَانَ",
    title: "Ar-Rumaysa / Al-Ghumaysa (RA)",
    role: "Noble companion in Medina, mother of Anas ibn Malik (RA). Served as a nurse and counselor.",
    virtues: "Accepted Islam early and taught it to Anas. Set her dowry for marriage to Abu Talhah (RA) as his conversion to Islam. Carried a dagger to defend the Prophet (SAW) at Hunayn, and served medical care. The Prophet said: 'I entered Paradise and heard footsteps... it was Ar-Rumaysa.'",
    mustKnowFact: "When her young son died while her husband Abu Talhah (RA) was away, she bathed and prepared the child, instructing her family not to say anything. She fed her husband and let him rest, breaking the news only the next morning. The Prophet prayed for them, and they were blessed with a righteous new son.",
    contributions: ["Uhud and Hunayn battlefield nurse", "Arranged the Islamic conversion of Abu Talhah", "Hosted the Prophet's household helpers"]
  },
  {
    id: "rufaydah",
    name: "Rufaydah al-Aslamiyah (RA)",
    arabicName: "رُفَيْدَةُ الأَسْلَمِيَّةُ",
    title: "First Nurse in Islam (RA)",
    role: "Medical doctor and social worker. Established the first mobile field hospital in Islamic history.",
    virtues: "Erected a clinical tent inside the Prophet's Mosque during the Battle of Khandaq to treat wounded soldiers (such as Sa'd ibn Mu'adh). Renowned for her surgical skills, sanitary care, and training other Sahabiyat in clinical nursing.",
    mustKnowFact: "She pioneered clinical hygiene and battlefield medicine. The Prophet (SAW) was so supportive of her medical facility that he explicitly ordered Sa'd ibn Mu'adh's (RA) recovery tent to be pitched inside her clinical clinic so he could visit him closely.",
    contributions: ["Founded first mobile tent hospital", "Trained early Islamic nursing corps", "Created community welfare shelters"]
  },
  {
    id: "hafsah",
    name: "Hafsah bint Umar (RA)",
    arabicName: "حَفْصَةُ بِنْتُ عُمَرَ",
    title: "Umm al-Mu'minin (Mother of Believers) / Custodian of the Quran (RA)",
    role: "Wife of the Prophet (SAW), daughter of Umar ibn Al-Khattab (RA). Custodian of the first official Quranic manuscript.",
    virtues: "Known for her literacy, memorization of the Quran, and deep fasting and night prayers. Entrusted with the custody of the singular official compiled manuscript of the Quran (compiled under Abu Bakr), which Uthman (RA) later used to standardize the text.",
    mustKnowFact: "The standardization of the Quran we read today exists because of Hafsah. The singular, master handwritten Quran scroll was placed in her custody for years, safeguarding it until Caliph Uthman (RA) requested it to duplicate copies for the global provinces.",
    contributions: ["Safeguarded the primary written Quran manuscript", "Narrated multiple Hadiths", "Managed religious education in Medina"]
  }
];
