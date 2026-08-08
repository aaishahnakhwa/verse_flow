import * as React from 'react';
import { Heart, Sparkles, BookOpen, Compass, Calendar, Search, ArrowRight, Bookmark } from 'lucide-react';

interface DashboardHomeProps {
  onNavigate: (view: 'search' | 'advanced' | 'bookmarks' | 'counsel' | 'reference', initialTab?: 'names' | 'prophets' | 'sahabas' | 'sahabiyat' | 'cosmology' | 'worship') => void;
  onQuickSearch: (query: string) => void;
  bookmarksCount: number;
}

interface DailyInspiration {
  verse: string;
  arabic: string;
  translation: string;
  reference: string;
}

const DAILY_INSPIRATIONS: DailyInspiration[] = [
  {
    verse: "Ease with Hardship",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا . إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
    reference: "Surah Ash-Sharh (94:5-6)"
  },
  {
    verse: "Peace of Heart",
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    translation: "Unquestionably, by the remembrance of Allah hearts are assured.",
    reference: "Surah Ar-Ra'd (13:28)"
  },
  {
    verse: "Patience and Prayer",
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    reference: "Surah Al-Baqarah (2:153)"
  },
  {
    verse: "Divine Mercy & Care",
    arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ",
    translation: "Your Lord has not taken leave of you, nor has He detested you.",
    reference: "Surah Ad-Duha (93:3)"
  },
  {
    verse: "Hope & Strength",
    arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ",
    translation: "So do not weaken and do not grieve, and you will be superior if you are true believers.",
    reference: "Surah Ali 'Imran (3:139)"
  },
  {
    verse: "Direct Supplication",
    arabic: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ",
    translation: "And your Lord says, 'Call upon Me; I will respond to you.'",
    reference: "Surah Ghafir (40:60)"
  },
  {
    verse: "Sufficient Trust",
    arabic: "وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    translation: "And whoever relies upon Allah - then He is sufficient for him.",
    reference: "Surah At-Talaq (65:3)"
  }
];

export function DashboardHome({
  onNavigate,
  onQuickSearch,
  bookmarksCount
}: DashboardHomeProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Get daily inspiration based on day of the week
  const dailyInspiration = React.useMemo(() => {
    const day = new Date().getDay(); // 0 is Sunday, 6 is Saturday
    return DAILY_INSPIRATIONS[day] || DAILY_INSPIRATIONS[0];
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onQuickSearch(searchQuery.trim());
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* 1. Grand Welcoming Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto py-4">
        <div className="inline-flex h-12 w-12 rounded-full bg-gold-500/10 dark:bg-gold-500/15 items-center justify-center text-gold-600 dark:text-gold-500 mb-2 shadow-xs shadow-gold-500/5">
          <Sparkles className="h-6 w-6 animate-pulse" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight brand-name-glow">
          Welcome to VerseFlow
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-400 font-semibold leading-relaxed">
          A unified, premium gateway to search verified Islamic scriptures, seek AI spiritual counsel, and explore comprehensive theological catalogs.
        </p>
      </div>

      {/* 2. Rotating Daily Inspiration Widget */}
      <div className="glass p-6 rounded-3xl border border-gold-500/15 dark:border-gold-500/10 shadow-lg relative overflow-hidden bg-gradient-to-r from-gold-500/5 via-transparent to-transparent">
        <div className="absolute top-4 right-5 text-[9px] font-bold font-display uppercase tracking-widest text-gold-600 dark:text-gold-500/80 flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 animate-spin-slow" />
          <span>Inspiration of the Day</span>
        </div>

        <div className="space-y-4 text-center py-2">
          <span className="text-[10px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            — {dailyInspiration.verse} —
          </span>
          <p className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-gold-100 leading-loose tracking-wide max-w-3xl mx-auto">
            {dailyInspiration.arabic}
          </p>
          <div className="space-y-1.5 max-w-2xl mx-auto px-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-semibold italic">
              "{dailyInspiration.translation}"
            </p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-display block font-bold">
              — {dailyInspiration.reference}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Centralized Quick Search Widget */}
      <div className="max-w-2xl mx-auto space-y-4">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="absolute left-4.5 h-5.5 w-5.5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, topics, or Surah:Verse (e.g., 'patience', '2:255')..."
            className="w-full h-14 pl-14 pr-32 rounded-2xl bg-white dark:bg-[#161a22] border border-stone-200/80 dark:border-gold-500/20 text-base text-slate-900 dark:text-gold-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-gold-500/20 dark:focus:ring-gold-500/20 focus:border-gold-500 dark:focus:border-gold-500 transition-all shadow-md shadow-gold-500/2"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 h-10 text-xs font-bold font-display uppercase tracking-wider bg-gold-500 text-[#11141a] rounded-xl hover:bg-gold-600 active:scale-95 transition-all cursor-pointer shadow-sm shadow-gold-500/10 flex items-center gap-1.5"
          >
            <span>Search</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* 4. Interactive Services Grid */}
      <div className="space-y-4">
        <span className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 dark:text-slate-500 block text-center">
          Explore Available Features
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          
          {/* Card 1: Concordance Search */}
          <div className="glass p-5 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 group shadow-md shadow-gold-500/2">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Search className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
                Scripture Concordance
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Search Quranic verses and Hadith registers with comprehensive translations, Juz indexations, and advanced filter queries.
              </p>
            </div>
            <button
              onClick={() => onNavigate('search')}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold font-display uppercase tracking-widest text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 pt-4 cursor-pointer mt-auto border-none bg-transparent"
            >
              <span>Open Search Panel</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 2: AI Counselor */}
          <div className="glass p-5 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 group shadow-md shadow-gold-500/2">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-red-500/10 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
                AI Spiritual Counsel
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Speak anonymously to our AI counselor regarding stress, trials, or ask theological questions. Access scripture-backed prayers and comforting advice.
              </p>
            </div>
            <button
              onClick={() => onNavigate('counsel')}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold font-display uppercase tracking-widest text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 pt-4 cursor-pointer mt-auto border-none bg-transparent"
            >
              <span>Seek AI Counsel</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 3: 99 Divine Names */}
          <div className="glass p-5 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 group shadow-md shadow-gold-500/2">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-gold-500/10 dark:bg-gold-500/10 flex items-center justify-center text-gold-600 dark:text-gold-400 shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
                99 Names of Allah
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Explore the transliteration, meanings, theological descriptions, and recommended Du'a use cases for the 99 Names of Allah.
              </p>
            </div>
            <button
              onClick={() => onNavigate('reference', 'names')}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold font-display uppercase tracking-widest text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 pt-4 cursor-pointer mt-auto border-none bg-transparent"
            >
              <span>Explore Divine Names</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 4: Worship Hub */}
          <div className="glass p-5 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 group shadow-md shadow-gold-500/2">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
                Worship & Du'a Hub
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Access morning & evening Adhkar, answered times for Du'as, prostration verses (Sajdah Tilawah), and the 7 major destructive sins.
              </p>
            </div>
            <button
              onClick={() => onNavigate('reference', 'worship')}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold font-display uppercase tracking-widest text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 pt-4 cursor-pointer mt-auto border-none bg-transparent"
            >
              <span>Open Worship Hub</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 5: Prophets & Companions */}
          <div className="glass p-5 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 group shadow-md shadow-gold-500/2">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Compass className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
                Prophets & Companions
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Review the chronological timeline of the 25 prophets, and biographies, battles, and virtues of the esteemed Sahabas and Sahabiyats.
              </p>
            </div>
            <button
              onClick={() => onNavigate('reference', 'prophets')}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold font-display uppercase tracking-widest text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 pt-4 cursor-pointer mt-auto border-none bg-transparent"
            >
              <span>Explore History</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 6: Cosmology & Beliefs */}
          <div className="glass p-5 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 group shadow-md shadow-gold-500/2">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
                Cosmology & Creed
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Read description of the Angels, the gates of Jannah, levels of Jahannam, signs of Qiyamah, the 5 Revealed Books, and the articles of Creed.
              </p>
            </div>
            <button
              onClick={() => onNavigate('reference', 'cosmology')}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold font-display uppercase tracking-widest text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 pt-4 cursor-pointer mt-auto border-none bg-transparent"
            >
              <span>Read Cosmology</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* 5. Bookmarked Entries Quick Link (Conditional Badge) */}
      {bookmarksCount > 0 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => onNavigate('bookmarks')}
            className="glass px-6 py-3.5 rounded-2xl border border-gold-500/15 text-xs text-slate-700 dark:text-slate-300 font-semibold font-display uppercase tracking-wider hover:bg-gold-500/5 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Bookmark className="h-4.5 w-4.5 text-gold-500 fill-current" />
            <span>You have {bookmarksCount} bookmarked scriptures saved</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
}
