export interface Prophet {
  number: number;
  name: string;
  arabicName: string;
  englishTitle: string;
  isBookBearing: boolean;
  revealedBook?: string;
  details: {
    specialty: string;
    blessings: string;
    difficulties: string;
    tribe: string;
  };
}

export const PROPHETS: Prophet[] = [
  {
    number: 1,
    name: "Adam (Adam)",
    arabicName: "آدَمُ",
    englishTitle: "The Father of Mankind",
    isBookBearing: false,
    details: {
      specialty: "Created directly by Allah's hands from clay, taught the names of all things, and angels were commanded to bow down to him as a sign of respect.",
      blessings: "First human and first prophet, dwelled in Paradise with Hawa (Eve), and chosen as Allah's vicegerent (Khalifa) on Earth.",
      difficulties: "Deceived by Iblis into eating from the forbidden tree, experienced expulsion from Paradise, and sent down to Earth where he wept and made sincere repentance for years.",
      tribe: "First of Mankind (Ancestor of all Humanity)"
    }
  },
  {
    number: 2,
    name: "Idris (Enoch)",
    arabicName: "إِدْرِيسُ",
    englishTitle: "The Writer",
    isBookBearing: false,
    details: {
      specialty: "First human to write with a pen, first to sew and wear tailored garments (people wore animal skins before him), and first to study astronomy and arithmetic.",
      blessings: "Honored in the Quran with the description 'We raised him to a high station', and granted immense wisdom and scientific insights.",
      difficulties: "Faced stubborn paganism, moral corruption, and ignorance from the early descendants of Cain who deviated from the truth.",
      tribe: "Descendants of Seth (Babylon / Egypt)"
    }
  },
  {
    number: 3,
    name: "Nuh (Noah)",
    arabicName: "نُوحٌ",
    englishTitle: "The Builder of the Ark",
    isBookBearing: false,
    details: {
      specialty: "Built the Great Ark by divine instruction to survive the global deluge. Considered the second father of humanity, as all humans descended from the Ark's survivors.",
      blessings: "Saved alongside the believers and pairs of all living creatures, granted a very long life, and praised as 'a grateful servant' by Allah.",
      difficulties: "Preached for 950 years under constant mockery, rejection, and abuse. Faced the heartbreak of his own wife and son rejecting the faith and drowning in the flood.",
      tribe: "Early Mesopotamian Civilization"
    }
  },
  {
    number: 4,
    name: "Hud (Eber)",
    arabicName: "هُودٌ",
    englishTitle: "Prophet to Ad",
    isBookBearing: false,
    details: {
      specialty: "Sent to the ancient superpower civilization of 'Ad. Miraculously saved alongside the believers from a violent, roaring windstorm that eradicated his entire nation.",
      blessings: "Spared from absolute devastation, granted wisdom to counsel a proud nation, and established a new righteous community in Hadramaut.",
      difficulties: "Mocked and called crazy by the giants of 'Ad, who ridiculed him for being poor, boasted of their physical power and tall palaces, and refused to believe.",
      tribe: "People of 'Ad (Ahqaf, Southern Arabia)"
    }
  },
  {
    number: 5,
    name: "Saleh (Salah)",
    arabicName: "صَالِحٌ",
    englishTitle: "Prophet to Thamud",
    isBookBearing: false,
    details: {
      specialty: "Brought forth a giant, pregnant She-Camel directly out of a solid rock mountain side as a miracle demanded by his people.",
      blessings: "Saved from the catastrophic blast (earthquake shriek) that destroyed his stubborn nation, and granted the title of a true warner.",
      difficulties: "His people openly rebelled by hamstringing and killing the She-Camel, plotted to assassinate Saleh and his family, and ignored the 3-day countdown before their destruction.",
      tribe: "People of Thamud (Al-Hijr / Mada'in Saleh)"
    }
  },
  {
    number: 6,
    name: "Ibrahim (Abraham)",
    arabicName: "إِبْرَاهِيمُ",
    englishTitle: "The Patriarch / Khalilullah",
    isBookBearing: true,
    revealedBook: "Suhuf Ibrahim (Scrolls of Abraham)",
    details: {
      specialty: "Patriarch of the Prophets, Father of Ismail & Ishaq, Builder of the Kaaba alongside Ismail. Survived being thrown into a giant furnace by Nimrod's people; Allah commanded the fire: 'O fire, be coolness and safety for Ibrahim.'",
      blessings: "Honored with the title 'Khalilullah' (Friend of Allah). Promised by Allah that prophethood would remain in his lineage (resulting in the major Hebrew and Arab lineages of prophets). Established the annual rites of Hajj.",
      difficulties: "Confronted the tyrant king Nimrod in Mesopotamia. Faced the severe trials of being ordered to leave his wife Hajar and infant son Ismail in the barren valley of Mecca, and later ordered to sacrifice Ismail (which he obeyed, and was replaced by a ram).",
      tribe: "People of Babylon / Mesopotamia"
    }
  },
  {
    number: 7,
    name: "Lut (Lot)",
    arabicName: "لُوطٌ",
    englishTitle: "Prophet to Sodom",
    isBookBearing: false,
    details: {
      specialty: "Sent to reform a society engaged in unprecedented sexual transgressions. Miraculously guided out of the city by angels before it was rained upon with sulfur stones and turned upside down.",
      blessings: "Spared from the absolute destruction of Sodom alongside his daughters by direct angelic intervention.",
      difficulties: "Endured constant insults, harassment, and threats of expulsion from his people. Faced betrayal by his own wife, who supported the transgressors and was destroyed with them.",
      tribe: "Sodom and Gomorrah (Valley of Jordan)"
    }
  },
  {
    number: 8,
    name: "Ismail (Ishmael)",
    arabicName: "إِسْمَاعِيلُ",
    englishTitle: "The Sacrificed one",
    isBookBearing: false,
    details: {
      specialty: "As an infant, scratching his heel in the sand brought forth the miraculous, endless spring of Zamzam. Supported his father Ibrahim in rebuilding the Kaaba in Mecca.",
      blessings: "Saved from sacrifice when replaced by a heavenly ram, and blessed to be the forefather of the Quraish tribe and the Prophet Muhammad (SAW).",
      difficulties: "Left in the barren, waterless desert of Mecca as a baby. Sincerity tested when he willingly agreed to let his father sacrifice him in obedience to Allah's command.",
      tribe: "Amalekites / Jurhum (Early Arab tribes of Mecca)"
    }
  },
  {
    number: 9,
    name: "Ishaq (Isaac)",
    arabicName: "إِسْحَاقُ",
    englishTitle: "Father of Israel",
    isBookBearing: false,
    details: {
      specialty: "The forefather of the Hebrew prophets. Highly praised by Allah in the Quran for his deep wisdom, righteousness, and strength of faith.",
      blessings: "Born miraculously to extremely elderly parents (Ibrahim and Sarah) after years of barrenness. All subsequent prophets of Bani Isra'il descended from him.",
      difficulties: "Spent his life navigating conflicts in Canaan, and working to preserve the monotheistic legacy of his father in pagan lands.",
      tribe: "Canaanites / Early Hebrews"
    }
  },
  {
    number: 10,
    name: "Yaqub (Jacob)",
    arabicName: "يَعْقُوبُ",
    englishTitle: "Israel",
    isBookBearing: false,
    details: {
      specialty: "Given the title 'Israel' (Servant of Allah). Forefather of the 12 Tribes of Israel through his 12 sons. The Quranic symbol of beautiful patience (Sabrun Jameel).",
      blessings: "Reunited with his beloved son Yusuf in Egypt after decades, and had his blindness healed by casting Yusuf's shirt over his face.",
      difficulties: "Suffered decades of agonizing grief over the loss of his favorite son Yusuf, losing his eyesight from constant weeping. Faced deceit from his older sons.",
      tribe: "Bani Isra'il (House of Isaac)"
    }
  },
  {
    number: 11,
    name: "Yusuf (Joseph)",
    arabicName: "يُوسُفُ",
    englishTitle: "The Dream Interpreter",
    isBookBearing: false,
    details: {
      specialty: "Possessed half of all human beauty. Master of dream interpretation and administration, rising from a slave prisoner to the Grand Vizier (treasurer) of Egypt.",
      blessings: "Vindicated of false charges, given authority over the treasuries of Egypt, and successfully saved Egypt and Canaan from a devastating 7-year famine.",
      difficulties: "Betrayed by his jealous brothers and thrown into a well as a child. Sold as a cheap slave, falsely accused of seduction by the minister's wife, and imprisoned for years.",
      tribe: "Bani Isra'il (Hebrews in Egypt)"
    }
  },
  {
    number: 12,
    name: "Ayyub (Job)",
    arabicName: "أَيُّوبُ",
    englishTitle: "The Patient / Symbol of Sabr",
    isBookBearing: false,
    details: {
      specialty: "The ultimate symbol of patience under intense physical suffering. Cured by washing in and drinking from a miraculous, cold spring that Allah brought forth under his feet.",
      blessings: "His health, immense wealth, and family were restored twofold after his trial passed. Praised by Allah: 'Indeed, We found him patient, an excellent servant.'",
      difficulties: "Lost all of his 14 children, lost all of his vast wealth and livestock, and suffered a severe, painful skin disease for 18 years, during which everyone abandoned him except his loyal wife Rahmah.",
      tribe: "People of Hauran (Syria / Jordan region)"
    }
  },
  {
    number: 13,
    name: "Shu'ayb (Jethro)",
    arabicName: "شُعَيْبٌ",
    englishTitle: "Orator of the Prophets",
    isBookBearing: false,
    details: {
      specialty: "Known as the 'Orator of the Prophets' due to his eloquent, passionate preaching. Sent to the commercial capital of Madyan to stop fraud, cheating in weights, and highway robbery.",
      blessings: "Saved alongside the believers from a severe earthquake and scorching cloud that destroyed Madyan. Honored father-in-law to Prophet Musa.",
      difficulties: "Faced extreme hostility, threats of stoning and banishment from the wealthy, corrupt merchants of Midian, who accused him of being bewitched.",
      tribe: "Midianites (People of Madyan)"
    }
  },
  {
    number: 14,
    name: "Harun (Aaron)",
    arabicName: "هَارُونُ",
    englishTitle: "The Eloquent Helper",
    isBookBearing: false,
    details: {
      specialty: "Appointed as a co-prophet helper to his brother Musa due to his superior eloquence, clarity, and persuasive speech. Served as the High Priest of Israel.",
      blessings: "Shared the mission to confront Pharaoh, stood by Musa during the miracles of Egypt, and was highly beloved and respected by the Children of Israel.",
      difficulties: "Left in charge of Bani Isra'il when Musa ascended Mount Sinai. Faced the rebellion of the golden calf, where the people almost killed him when he tried to stop them.",
      tribe: "Levi (Bani Isra'il)"
    }
  },
  {
    number: 15,
    name: "Musa (Moses)",
    arabicName: "مُوسَىٰ",
    englishTitle: "The Lawgiver / Kalimullah",
    isBookBearing: true,
    revealedBook: "Tawrat (Torah)",
    details: {
      specialty: "Liberator of the Children of Israel from Egyptian slavery, lawgiver of the Ten Commandments. Blessed with speaking directly to Allah on Mount Sinai without a mediator (earning the title Kalimullah). Miracles include: parting the Red Sea with his staff, white hand shining with light, and turning his staff into a real serpent.",
      blessings: "Given direct speech with Allah, granted his brother Harun as a co-prophet helper, and witnessed the destruction of Pharaoh's tyranny. Provided with Manna and Quail in the desert.",
      difficulties: "Hunted by Pharaoh, fled Egypt in fear, faced constant rebellion, worship of the golden calf, and stubbornness from the Children of Israel (Bani Isra'il) during their 40 years of wandering in the Sinai desert.",
      tribe: "Levites (Bani Isra'il) in Egypt"
    }
  },
  {
    number: 16,
    name: "Dhul-Kifl (Ezekiel)",
    arabicName: "ذُو الْكِفْلِ",
    englishTitle: "Prophet of Steadfastness",
    isBookBearing: false,
    details: {
      specialty: "Reassured and guided the captive Children of Israel. Renowned for keeping his covenants, doing double deeds of worship, and judging with absolute justice.",
      blessings: "Praised by name in the Quran among the patient and chosen ones, and granted a high spiritual station.",
      difficulties: "Preached during the difficult Babylonian exile, witnessing the destruction of Solomon's Temple, and striving to maintain faith among a displaced, captive population.",
      tribe: "Bani Isra'il (Babylonian Exile)"
    }
  },
  {
    number: 17,
    name: "Dawud (David)",
    arabicName: "دَاوُدُ",
    englishTitle: "The King / Singer of Psalms",
    isBookBearing: true,
    revealedBook: "Zabur (Psalms)",
    details: {
      specialty: "Soldier, King, and Prophet of Bani Isra'il. Renowned for defeating the giant warrior Goliath (Jalut) with a sling. Miracles include: mountains and birds glorifying Allah in unison with his beautiful voice when singing the Zabur, and raw iron softening in his bare hands so he could craft chain mail without tools.",
      blessings: "Granted a mighty, stable kingdom, profound wisdom in judgment, and a lineage of kings (father of Sulayman/Solomon). Praise and prayers were echoed by nature itself.",
      difficulties: "Faced military threats and civil conflicts. Faced the trial of governance, and was heavily pursued and envied by King Saul (Talut) before ascending to the throne.",
      tribe: "Judah (Bani Isra'il)"
    }
  },
  {
    number: 18,
    name: "Sulayman (Solomon)",
    arabicName: "سُلَيْمَانُ",
    englishTitle: "The Wise Ruler",
    isBookBearing: false,
    details: {
      specialty: "Ruler of a massive, miraculous empire. Commanded the wind, spoke the language of animals (ants, birds), ruled over Jinn, and constructed the First Temple of Jerusalem (Judaism's Holy of Holies).",
      blessings: "Granted a kingdom that 'none after him shall inherit', control over wind travel, and copper springs. Queen of Sheba (Bilqis) submitted to Islam under his guidance.",
      difficulties: "Tested with massive power and wealth, fought off sorcery and plots in his kingdom, and bore the heavy responsibility of ruling over both humans and Jinn fairly.",
      tribe: "Judah (Bani Isra'il)"
    }
  },
  {
    number: 19,
    name: "Ilyas (Elijah)",
    arabicName: "إِلْيَاسُ",
    englishTitle: "Prophet to Baalbek",
    isBookBearing: false,
    details: {
      specialty: "Confronted the worship of the false idol Baal in Phoenicia, causing a 3-year drought by his prayers to show Allah's power, and splitting the Jordan river.",
      blessings: "Miraculously fed by ravens during the famine, saved from Jezebel's plots, and raised into heaven.",
      difficulties: "Faced execution plots by the corrupt king Ahab and queen Jezebel, forced to flee and hide in mountain caves for years to escape their soldiers.",
      tribe: "Bani Isra'il (Kingdom of Israel)"
    }
  },
  {
    number: 20,
    name: "Al-Yasa (Elisha)",
    arabicName: "الْيَسَعُ",
    englishTitle: "Follower of Ilyas",
    isBookBearing: false,
    details: {
      specialty: "Continued the mission of Ilyas. Performed miracles of healing the sick, multiplying a small jar of oil to pay a widow's debts, and purifying a poisoned water spring.",
      blessings: "Mentioned by name in the Quran as one of the highly favored, and chosen to maintain the spiritual guidance of Bani Isra'il after Ilyas.",
      difficulties: "Preached during a time of extreme moral decay, military defeat, and political instability in Israel.",
      tribe: "Bani Isra'il"
    }
  },
  {
    number: 21,
    name: "Yunus (Jonah)",
    arabicName: "يُونُسُ",
    englishTitle: "Companion of the Whale",
    isBookBearing: false,
    details: {
      specialty: "Survived for days in the pitch-black belly of a giant whale/fish in the depths of the sea. His prayer of repentance ('La ilaha illa anta subhanaka...') is the ultimate Du'a for distress.",
      blessings: "Saved from the whale's belly. His city of Nineveh became the only nation in history saved from destruction because the entire population (100,000+) repented in time.",
      difficulties: "Fled his mission on a ship in frustration, thrown overboard in a storm, swallowed by a whale, and suffered intense physical illness and weakness when cast onto the shore.",
      tribe: "People of Nineveh (Assyria, modern-day Iraq)"
    }
  },
  {
    number: 22,
    name: "Zakariyah (Zechariah)",
    arabicName: "زَكَرِيَّا",
    englishTitle: "Guardian of Maryam",
    isBookBearing: false,
    details: {
      specialty: "Chief priest of the Temple in Jerusalem. Chosen as the guardian and foster father of Maryam (Mary), witnessing miracles of winter fruit appearing in her chamber in summer.",
      blessings: "Blessed with a noble son, Prophet Yahya, in his extreme old age (90+ years old) when his wife had been barren all her life.",
      difficulties: "Faced severe persecution from corrupt Jewish kings. Martyred by being sawn in half inside a hollow tree where he had sought refuge from soldiers.",
      tribe: "Levites (Bani Isra'il) in Jerusalem"
    }
  },
  {
    number: 23,
    name: "Yahya (John)",
    arabicName: "يَحْيَىٰ",
    englishTitle: "John the Baptist",
    isBookBearing: false,
    details: {
      specialty: "Known for absolute asceticism, purity of heart, and chastity. Granted wisdom and scripture study while still a child. Confirmed the coming of the Messiah Isa.",
      blessings: "Praised by Allah directly in the Quran for having compassion, being duty-bound to his parents, and being completely free from arrogance and disobedience.",
      difficulties: "Imprisoned and beheaded by the corrupt king Herod Antipas for refusing to sanction the king's incestuous, unlawful marriage.",
      tribe: "Levites (Bani Isra'il)"
    }
  },
  {
    number: 24,
    name: "Isa (Jesus)",
    arabicName: "عِيسَىٰ",
    englishTitle: "The Messiah / Al-Masih",
    isBookBearing: true,
    revealedBook: "Injeel (Gospel)",
    details: {
      specialty: "The Messiah (Al-Masih) born of a virgin mother Maryam (Mary). Spoke from the cradle as an infant to defend his mother's honor. Miracles include: healing the blind and lepers, breathing life into clay birds, raising the dead by Allah's permission, and calling down a table of food from heaven.",
      blessings: "Given the titles 'Messiah', 'Word of Allah', and 'Ruhullah' (Spirit from Allah). Supported by the Holy Spirit (Angel Jibreel). Raised alive to heaven and spared from crucifixion.",
      difficulties: "Rejected, slandered, and declared a sorcerer by the elite religious authorities of Jerusalem. Betrayed by one of his disciples, pursued by Roman authorities, and faced attempted execution before being saved.",
      tribe: "Bani Isra'il (House of Maryam)"
    }
  },
  {
    number: 25,
    name: "Muhammad",
    arabicName: "مُحَمَّدٌ",
    englishTitle: "Seal of the Prophets / SAW",
    isBookBearing: true,
    revealedBook: "Al-Quran al-Kareem",
    details: {
      specialty: "The final Messenger sent to all of mankind (Seal of the Prophets). The living miracle of the Holy Quran, which remains completely unchanged. Experienced the Night Journey and Ascension to heaven (Isra and Mi'raj). Miracles include: splitting of the moon, water flowing from his fingers, and feeding hundreds from small meals.",
      blessings: "Honored as 'Mercy to the Worlds' (Rahmatul-lil-'Alameen). Leader of all prophets. Granted the River of abundance (Al-Kauthar) and the station of Great Intercession (Shafa'ah) for his Ummah on the Day of Judgment.",
      difficulties: "Orphaned as a child, lost all his children during his lifetime except Fatima, faced 13 years of violent persecution, boycotts, and assassination attempts in Mecca. Chased out of his home city, fought defensive battles in Medina, and buried his beloved wife Khadijah and uncle Abu Talib in the same difficult year.",
      tribe: "Quraish (Banu Hashim Clan) in Arabia"
    }
  }
];
