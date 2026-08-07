import * as React from 'react';
import { Search, Sparkles, BookOpen, Award, ShieldAlert, Heart, Calendar, Shield, Users } from 'lucide-react';
import { DIVINE_NAMES } from '../data/divineNames';
import { PROPHETS } from '../data/prophets';
import { SAHABAS } from '../data/sahabas';
import { SAHABIYAT } from '../data/sahabiyat';
import { ANGELS, JANNAH_GARDENS, JANNAH_GATES, JAHANNAM_LEVELS, MINOR_SIGNS, MAJOR_SIGNS, QIYAMAH_STAGES } from '../data/cosmology';

export function ReferenceHub() {
  const [activeTab, setActiveTab] = React.useState<'names' | 'prophets' | 'sahabas' | 'sahabiyat' | 'cosmology'>('names');
  const [namesSearch, setNamesSearch] = React.useState('');
  const [prophetsSearch, setProphetsSearch] = React.useState('');
  const [sahabasSearch, setSahabasSearch] = React.useState('');
  const [sahabiyatSearch, setSahabiyatSearch] = React.useState('');
  const [cosmologySearch, setCosmologySearch] = React.useState('');
  const [cosmologySubTab, setCosmologySubTab] = React.useState<'angels' | 'jannah' | 'jahannam' | 'qiyamah'>('angels');
  const [qiyamahCategory, setQiyamahCategory] = React.useState<'minor' | 'major' | 'stages'>('minor');
  const [jannahCategory, setJannahCategory] = React.useState<'gates' | 'gardens'>('gates');
  const [expandedProphetNum, setExpandedProphetNum] = React.useState<number | null>(null);
  const [expandedSahabaId, setExpandedSahabaId] = React.useState<string | null>(null);
  const [expandedSahabiyahId, setExpandedSahabiyahId] = React.useState<string | null>(null);

  // Filter 99 Names of Allah
  const filteredNames = React.useMemo(() => {
    const query = namesSearch.toLowerCase().trim();
    if (!query) return DIVINE_NAMES;
    return DIVINE_NAMES.filter(
      (n) =>
        n.transliteration.toLowerCase().includes(query) ||
        n.meaning.toLowerCase().includes(query) ||
        n.description.toLowerCase().includes(query) ||
        n.arabic.includes(query)
    );
  }, [namesSearch]);

  // Filter Prophets
  const filteredProphets = React.useMemo(() => {
    const query = prophetsSearch.toLowerCase().trim();
    if (!query) return PROPHETS;
    return PROPHETS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.englishTitle.toLowerCase().includes(query) ||
        p.arabicName.includes(query) ||
        (p.revealedBook && p.revealedBook.toLowerCase().includes(query))
    );
  }, [prophetsSearch]);

  // Filter Sahabas
  const filteredSahabas = React.useMemo(() => {
    const query = sahabasSearch.toLowerCase().trim();
    if (!query) return SAHABAS;
    return SAHABAS.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.title.toLowerCase().includes(query) ||
        s.arabicName.includes(query) ||
        s.role.toLowerCase().includes(query) ||
        s.majorBattles.some((b) => b.toLowerCase().includes(query))
    );
  }, [sahabasSearch]);

  // Filter Sahabiyat
  const filteredSahabiyat = React.useMemo(() => {
    const query = sahabiyatSearch.toLowerCase().trim();
    if (!query) return SAHABIYAT;
    return SAHABIYAT.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.title.toLowerCase().includes(query) ||
        s.arabicName.includes(query) ||
        s.role.toLowerCase().includes(query) ||
        s.contributions.some((c) => c.toLowerCase().includes(query))
    );
  }, [sahabiyatSearch]);

  // Filter Angels
  const filteredAngels = React.useMemo(() => {
    const query = cosmologySearch.toLowerCase().trim();
    if (!query) return ANGELS;
    return ANGELS.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.role.toLowerCase().includes(query) ||
        a.mustKnowFact.toLowerCase().includes(query) ||
        a.arabicName.includes(query)
    );
  }, [cosmologySearch]);

  // Filter Jannah Gardens
  const filteredJannahGardens = React.useMemo(() => {
    const query = cosmologySearch.toLowerCase().trim();
    if (!query) return JANNAH_GARDENS;
    return JANNAH_GARDENS.filter(
      (j) =>
        j.name.toLowerCase().includes(query) ||
        j.meaning.toLowerCase().includes(query) ||
        j.mustKnowFact.toLowerCase().includes(query) ||
        j.scriptureRef.toLowerCase().includes(query) ||
        j.arabicName.includes(query)
    );
  }, [cosmologySearch]);

  // Filter Jannah Gates
  const filteredJannahGates = React.useMemo(() => {
    const query = cosmologySearch.toLowerCase().trim();
    if (!query) return JANNAH_GATES;
    return JANNAH_GATES.filter(
      (g) =>
        g.name.toLowerCase().includes(query) ||
        g.meaning.toLowerCase().includes(query) ||
        g.whoEnters.toLowerCase().includes(query) ||
        g.mustKnowFact.toLowerCase().includes(query) ||
        g.arabicName.includes(query)
    );
  }, [cosmologySearch]);

  // Filter Jahannam Levels
  const filteredJahannam = React.useMemo(() => {
    const query = cosmologySearch.toLowerCase().trim();
    if (!query) return JAHANNAM_LEVELS;
    return JAHANNAM_LEVELS.filter(
      (j) =>
        j.name.toLowerCase().includes(query) ||
        j.meaning.toLowerCase().includes(query) ||
        j.mustKnowFact.toLowerCase().includes(query) ||
        j.scriptureRef.toLowerCase().includes(query) ||
        j.arabicName.includes(query)
    );
  }, [cosmologySearch]);

  // Filter Minor Signs
  const filteredMinorSigns = React.useMemo(() => {
    const query = cosmologySearch.toLowerCase().trim();
    if (!query) return MINOR_SIGNS;
    return MINOR_SIGNS.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.mustKnowFact.toLowerCase().includes(query) ||
        s.arabicName.includes(query)
    );
  }, [cosmologySearch]);

  // Filter Major Signs
  const filteredMajorSigns = React.useMemo(() => {
    const query = cosmologySearch.toLowerCase().trim();
    if (!query) return MAJOR_SIGNS;
    return MAJOR_SIGNS.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.mustKnowFact.toLowerCase().includes(query) ||
        s.arabicName.includes(query)
    );
  }, [cosmologySearch]);

  // Filter Qiyamah Stages
  const filteredQiyamahStages = React.useMemo(() => {
    const query = cosmologySearch.toLowerCase().trim();
    if (!query) return QIYAMAH_STAGES;
    return QIYAMAH_STAGES.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.mustKnowFact.toLowerCase().includes(query) ||
        s.arabicName.includes(query)
    );
  }, [cosmologySearch]);

  return (
    <div className="w-full space-y-6">
      {/* Top Toggle Selector Header */}
      <div className="flex flex-wrap md:flex-row items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 max-w-4xl mx-auto no-print">
        <button
          onClick={() => setActiveTab('names')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === 'names'
              ? 'bg-white dark:bg-[#1f1910] text-gold-600 dark:text-gold-500 shadow-sm border border-slate-200/40 dark:border-gold-500/10'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="h-4 w-4 text-gold-500" />
          <span>99 Names</span>
        </button>
        <button
          onClick={() => setActiveTab('prophets')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === 'prophets'
              ? 'bg-white dark:bg-[#1f1910] text-gold-600 dark:text-gold-500 shadow-sm border border-slate-200/40 dark:border-gold-500/10'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="h-4 w-4 text-gold-500" />
          <span>Prophets Guide</span>
        </button>
        <button
          onClick={() => setActiveTab('sahabas')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === 'sahabas'
              ? 'bg-white dark:bg-[#1f1910] text-gold-600 dark:text-gold-500 shadow-sm border border-slate-200/40 dark:border-gold-500/10'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Shield className="h-4 w-4 text-gold-500" />
          <span>Sahabas (RA)</span>
        </button>
        <button
          onClick={() => setActiveTab('sahabiyat')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === 'sahabiyat'
              ? 'bg-white dark:bg-[#1f1910] text-gold-600 dark:text-gold-500 shadow-sm border border-slate-200/40 dark:border-gold-500/10'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Users className="h-4 w-4 text-gold-500" />
          <span>Sahabiyat (RA)</span>
        </button>
        <button
          onClick={() => setActiveTab('cosmology')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === 'cosmology'
              ? 'bg-white dark:bg-[#1f1910] text-gold-600 dark:text-gold-500 shadow-sm border border-slate-200/40 dark:border-gold-500/10'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="h-4 w-4 text-gold-500" />
          <span>Belief Guide</span>
        </button>
      </div>

      {/* VIEW 1: 99 NAMES OF ALLAH */}
      {activeTab === 'names' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="max-w-md mx-auto relative no-print">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search Names (e.g. 'Mercy', 'Razzaq', 'الرحمن')..."
              value={namesSearch}
              onChange={(e) => setNamesSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/60 focus:outline-hidden focus:ring-1 focus:ring-gold-500 dark:focus:ring-gold-500 text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNames.map((name) => (
              <div
                key={name.number}
                className="glass p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between hover:border-gold-500/30 dark:hover:border-gold-500/20 transition-all group hover:shadow-md dark:hover:shadow-gold-950/5 relative"
              >
                {/* Number Badge */}
                <span className="absolute top-4 left-4 text-[10px] font-bold font-display text-slate-400 dark:text-slate-500">
                  #{String(name.number).padStart(2, '0')}
                </span>

                {/* Calligraphy header */}
                <div className="text-right pb-3 mb-2 border-b border-slate-100 dark:border-slate-800/40">
                  <span className="text-3xl font-bold text-slate-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors font-amiri leading-normal">
                    {name.arabic}
                  </span>
                </div>

                {/* Meanings */}
                <div className="space-y-1.5 text-left">
                  <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200">
                    {name.transliteration}
                  </h3>
                  <p className="text-xs font-semibold text-gold-700 dark:text-gold-400">
                    {name.meaning}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {name.description}
                  </p>
                </div>

                {/* Du'a Usage Section */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/40 text-left bg-gold-500/3 dark:bg-gold-500/1.5 p-3 rounded-xl border border-gold-500/5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Heart className="h-3.5 w-3.5 text-gold-500" />
                    <span className="text-[9px] font-bold font-display uppercase tracking-widest text-gold-600 dark:text-gold-400">
                      Du'a Invocation / Usage
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                    {name.duaUsage}
                  </p>
                </div>
              </div>
            ))}
            {filteredNames.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-sm text-slate-400 font-semibold">No divine names match your search.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: PROPHETS OF ISLAM */}
      {activeTab === 'prophets' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="max-w-md mx-auto relative no-print">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search Prophets (e.g. 'Musa', 'Ibrahim', 'Quran')..."
              value={prophetsSearch}
              onChange={(e) => setProphetsSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/60 focus:outline-hidden focus:ring-1 focus:ring-gold-500 dark:focus:ring-gold-500 text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredProphets.map((prophet) => {
              const isExpanded = expandedProphetNum === prophet.number;
              return (
                <div
                  key={prophet.number}
                  className={`glass rounded-2xl border transition-all duration-200 text-left ${
                    prophet.isBookBearing
                      ? 'border-gold-500/20 dark:border-gold-500/10 hover:border-gold-500/30'
                      : 'border-slate-200/50 dark:border-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700/60'
                  }`}
                >
                  {/* Prophet Title Row */}
                  <div
                    onClick={() => {
                      setExpandedProphetNum(isExpanded ? null : prophet.number);
                    }}
                    className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      {/* Chronological ID Badge */}
                      <span className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                        {prophet.number}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200">
                          {prophet.name}
                        </h3>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold font-display tracking-wide">
                          {prophet.englishTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Calligraphy name */}
                      <span className="text-xl font-bold font-amiri text-slate-700 dark:text-slate-300 mr-2 leading-none">
                        {prophet.arabicName}
                      </span>

                      {prophet.isBookBearing && (
                        <span className="px-2 py-0.5 rounded-md bg-gold-500/15 border border-gold-500/20 text-[9px] font-bold font-display uppercase tracking-widest text-gold-600 dark:text-gold-400">
                          Book Revealed
                        </span>
                      )}

                      <span className="text-xs text-slate-400">
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Detailed Grid */}
                  {isExpanded && prophet.details && (
                    <div className="border-t border-slate-100 dark:border-slate-800/40 p-4 sm:p-6 bg-gold-500/2 dark:bg-gold-500/1 rounded-b-2xl space-y-4 animate-in slide-in-from-top-2 duration-200">
                      
                      {/* Meta Information Cards Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/30 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gold-500 shrink-0" />
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider leading-none">Prophet Number</span>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">#{prophet.number} of all Prophets</span>
                          </div>
                        </div>
                        {prophet.isBookBearing && prophet.revealedBook && (
                          <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/30 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-gold-500 shrink-0" />
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider leading-none">Revealed Scripture</span>
                              <span className="text-xs font-bold text-gold-600 dark:text-gold-400">{prophet.revealedBook}</span>
                            </div>
                          </div>
                        )}
                        <div className={`bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/30 flex items-center gap-2 ${!prophet.isBookBearing ? 'sm:col-span-2' : ''}`}>
                          <Award className="h-4 w-4 text-gold-500 shrink-0" />
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider leading-none">Assigned Tribe / Nation</span>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{prophet.details.tribe}</span>
                          </div>
                        </div>
                      </div>

                      {/* Specialized in-depth sections */}
                      <div className="space-y-3.5">
                        
                        {/* Specialty / Miracles */}
                        <div>
                          <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-gold-500" />
                            <span>Specialty & Key Miracles</span>
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                            {prophet.details.specialty}
                          </p>
                        </div>

                        {/* Blessings */}
                        <div>
                          <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1.5">
                            <Award className="h-3.5 w-3.5 text-emerald-500" />
                            <span>Divine Blessings</span>
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                            {prophet.details.blessings}
                          </p>
                        </div>

                        {/* Difficulties & Trials */}
                        <div className="bg-red-500/5 dark:bg-red-500/2.5 border border-red-500/10 p-3.5 rounded-xl">
                          <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-red-500 dark:text-red-400 mb-1.5 flex items-center gap-1.5">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            <span>Difficulties & Trials</span>
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                            {prophet.details.difficulties}
                          </p>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
            {filteredProphets.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-slate-400 font-semibold">No prophets match your search.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: SAHABAS & WARRIORS */}
      {activeTab === 'sahabas' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="max-w-md mx-auto relative no-print">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search Sahabas (e.g. 'Khalid', 'Siddiq', 'Yarmouk')..."
              value={sahabasSearch}
              onChange={(e) => setSahabasSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/60 focus:outline-hidden focus:ring-1 focus:ring-gold-500 dark:focus:ring-gold-500 text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredSahabas.map((sahaba) => {
              const isExpanded = expandedSahabaId === sahaba.id;
              return (
                <div
                  key={sahaba.id}
                  className="glass rounded-2xl border border-slate-200/50 dark:border-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700/60 transition-all duration-200 text-left"
                >
                  {/* Title Row */}
                  <div
                    onClick={() => {
                      setExpandedSahabaId(isExpanded ? null : sahaba.id);
                    }}
                    className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-7 w-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        🛡️
                      </span>
                      <div>
                        <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200">
                          {sahaba.name}
                        </h3>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold font-display tracking-wide">
                          {sahaba.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold font-amiri text-slate-700 dark:text-slate-300 mr-2 leading-none">
                        {sahaba.arabicName}
                      </span>
                      <span className="text-xs text-slate-400">
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content Drawer */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 dark:border-slate-800/40 p-4 sm:p-6 bg-gold-500/2 dark:bg-gold-500/1 rounded-b-2xl space-y-4 animate-in slide-in-from-top-2 duration-200">
                      {/* Role */}
                      <div>
                        <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5 text-gold-500" />
                          <span>Historical Role & Specialty</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                          {sahaba.role}
                        </p>
                      </div>

                      {/* Virtues */}
                      <div className="bg-emerald-500/5 dark:bg-emerald-500/2.5 border border-emerald-500/10 p-3.5 rounded-xl">
                        <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                          <Heart className="h-3.5 w-3.5" />
                          <span>Spiritual Virtues & Milestones</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                          {sahaba.virtues}
                        </p>
                      </div>

                      {/* Must-Know Fact */}
                      <div className="bg-amber-500/5 dark:bg-amber-500/2.5 border border-amber-500/10 p-3.5 rounded-xl">
                        <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                          <span>Essential Must-Know Fact</span>
                        </h4>
                        <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                          {sahaba.mustKnowFact}
                        </p>
                      </div>

                      {/* Major Battles */}
                      <div>
                        <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1.5">
                          <Shield className="h-3.5 w-3.5 text-gold-500" />
                          <span>Key Battles & Campaigns</span>
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {sahaba.majorBattles.map((battle) => (
                            <span
                              key={battle}
                              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 text-[9px] font-bold font-display text-slate-600 dark:text-slate-300"
                            >
                              {battle}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
            {filteredSahabas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-slate-400 font-semibold">No Sahabas match your search.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 4: SAHABIYAT & FEMALE LEADERS */}
      {activeTab === 'sahabiyat' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="max-w-md mx-auto relative no-print">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search Sahabiyat (e.g. 'Aisha', 'Khadijah', 'Uhud')..."
              value={sahabiyatSearch}
              onChange={(e) => setSahabiyatSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/60 focus:outline-hidden focus:ring-1 focus:ring-gold-500 dark:focus:ring-gold-500 text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredSahabiyat.map((sahabiyah) => {
              const isExpanded = expandedSahabiyahId === sahabiyah.id;
              return (
                <div
                  key={sahabiyah.id}
                  className="glass rounded-2xl border border-slate-200/50 dark:border-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700/60 transition-all duration-200 text-left"
                >
                  {/* Title Row */}
                  <div
                    onClick={() => {
                      setExpandedSahabiyahId(isExpanded ? null : sahabiyah.id);
                    }}
                    className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-7 w-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        🌸
                      </span>
                      <div>
                        <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200">
                          {sahabiyah.name}
                        </h3>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold font-display tracking-wide">
                          {sahabiyah.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold font-amiri text-slate-700 dark:text-slate-300 mr-2 leading-none">
                        {sahabiyah.arabicName}
                      </span>
                      <span className="text-xs text-slate-400">
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content Drawer */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 dark:border-slate-800/40 p-4 sm:p-6 bg-gold-500/2 dark:bg-gold-500/1 rounded-b-2xl space-y-4 animate-in slide-in-from-top-2 duration-200">
                      {/* Role */}
                      <div>
                        <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5 text-gold-500" />
                          <span>Key Role & Status</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                          {sahabiyah.role}
                        </p>
                      </div>

                      {/* Virtues */}
                      <div className="bg-emerald-500/5 dark:bg-emerald-500/2.5 border border-emerald-500/10 p-3.5 rounded-xl">
                        <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                          <Heart className="h-3.5 w-3.5" />
                          <span>Spiritual Virtues & Character</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                          {sahabiyah.virtues}
                        </p>
                      </div>

                      {/* Must-Know Fact */}
                      <div className="bg-amber-500/5 dark:bg-amber-500/2.5 border border-amber-500/10 p-3.5 rounded-xl">
                        <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                          <span>Essential Must-Know Fact</span>
                        </h4>
                        <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                          {sahabiyah.mustKnowFact}
                        </p>
                      </div>

                      {/* Major Contributions */}
                      <div>
                        <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1.5">
                          <Shield className="h-3.5 w-3.5 text-gold-500" />
                          <span>Key Milestones & Achievements</span>
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {sahabiyah.contributions.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 text-[9px] font-bold font-display text-slate-600 dark:text-slate-300"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
            {filteredSahabiyat.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-slate-400 font-semibold">No Sahabiyat match your search.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 5: COSMOLOGY & BELIEF (ANGELS & AFTERLIFE) */}
      {activeTab === 'cosmology' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Sub-tab selection row */}
          <div className="grid grid-cols-2 sm:flex sm:justify-center gap-2 max-w-md mx-auto p-1.5 bg-slate-100/80 dark:bg-slate-900/40 rounded-xl border border-slate-200/40 dark:border-slate-800/20 no-print">
            <button
              onClick={() => { setCosmologySubTab('angels'); setCosmologySearch(''); }}
              className={`py-2 px-3 rounded-lg text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                cosmologySubTab === 'angels'
                  ? 'bg-white dark:bg-[#1f1910] text-gold-600 dark:text-gold-500 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Angels
            </button>
            <button
              onClick={() => { setCosmologySubTab('jannah'); setCosmologySearch(''); }}
              className={`py-2 px-3 rounded-lg text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                cosmologySubTab === 'jannah'
                  ? 'bg-white dark:bg-[#1f1910] text-gold-600 dark:text-gold-500 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Jannah (8)
            </button>
            <button
              onClick={() => { setCosmologySubTab('jahannam'); setCosmologySearch(''); }}
              className={`py-2 px-3 rounded-lg text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                cosmologySubTab === 'jahannam'
                  ? 'bg-white dark:bg-[#1f1910] text-gold-600 dark:text-gold-500 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Jahannam (7)
            </button>
            <button
              onClick={() => { setCosmologySubTab('qiyamah'); setCosmologySearch(''); }}
              className={`py-2 px-3 rounded-lg text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                cosmologySubTab === 'qiyamah'
                  ? 'bg-white dark:bg-[#1f1910] text-gold-600 dark:text-gold-500 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Last Day
            </button>
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative no-print">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder={`Search ${cosmologySubTab === 'angels' ? 'Angels' : cosmologySubTab === 'jannah' ? 'Jannah Levels' : 'Jahannam Levels'}...`}
              value={cosmologySearch}
              onChange={(e) => setCosmologySearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/60 focus:outline-hidden focus:ring-1 focus:ring-gold-500 dark:focus:ring-gold-500 text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Render active subtab list */}
          <div className="grid grid-cols-1 gap-4">
            {/* Sub-tab 1: Angels */}
            {cosmologySubTab === 'angels' && (
              <>
                {filteredAngels.map((angel) => (
                  <div
                    key={angel.name}
                    className="glass rounded-2xl border border-slate-200/50 dark:border-slate-800/40 p-4 sm:p-5 text-left space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="h-7 w-7 rounded-full bg-amber-500/10 flex items-center justify-center text-xs font-bold text-amber-600 dark:text-amber-400">
                          ✨
                        </span>
                        <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200">
                          {angel.name}
                        </h3>
                      </div>
                      <span className="text-xl font-bold font-amiri text-slate-700 dark:text-slate-300 leading-none">
                        {angel.arabicName}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">
                        Divine Role & Responsibility
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                        {angel.role}
                      </p>
                    </div>

                    <div className="bg-amber-500/5 dark:bg-amber-500/2.5 border border-amber-500/10 p-3.5 rounded-xl">
                      <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                        <span>Essential Must-Know Fact</span>
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                        {angel.mustKnowFact}
                      </p>
                    </div>
                  </div>
                ))}
                {filteredAngels.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm text-slate-400 font-semibold">No angels match your search.</p>
                  </div>
                )}
              </>
            )}

            {/* Sub-tab 2: Jannah Gardens & Gates */}
            {cosmologySubTab === 'jannah' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Horizontal pills for gates/gardens */}
                <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-slate-200/50 dark:bg-slate-800/30 rounded-xl border border-slate-200/20 dark:border-slate-700/20 max-w-sm mx-auto no-print">
                  <button
                    onClick={() => setJannahCategory('gates')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      jannahCategory === 'gates'
                        ? 'bg-white dark:bg-slate-900 text-gold-600 dark:text-gold-500 shadow-xs'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    8 Gates (Hadith)
                  </button>
                  <button
                    onClick={() => setJannahCategory('gardens')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      jannahCategory === 'gardens'
                        ? 'bg-white dark:bg-slate-900 text-gold-600 dark:text-gold-500 shadow-xs'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    8 Named Gardens (Quran)
                  </button>
                </div>

                {/* Display Note */}
                <div className="text-center max-w-md mx-auto px-2">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-relaxed">
                    {jannahCategory === 'gates' 
                      ? "🚪 In Paradise there are 8 gates. The levels (Darajat) inside Jannah are 100+ (matching the height between heaven & earth)."
                      : "💡 The Quran mentions several descriptive names for Paradise, traditionally classified as the 8 principal named realms."
                    }
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Gates Category */}
                  {jannahCategory === 'gates' && (
                    <>
                      {filteredJannahGates.map((gate) => (
                        <div
                          key={gate.name}
                          className="glass rounded-2xl border border-gold-500/20 dark:border-gold-500/10 p-4 sm:p-5 text-left space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="h-7 w-7 rounded-full bg-amber-500/10 flex items-center justify-center text-xs font-bold text-amber-600 dark:text-amber-400">
                                🚪
                              </span>
                              <div>
                                <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200">
                                  {gate.name}
                                </h3>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold font-display tracking-wide">
                                  {gate.meaning}
                                </p>
                              </div>
                            </div>
                            <span className="text-xl font-bold font-amiri text-slate-700 dark:text-slate-300 leading-none">
                              {gate.arabicName}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">
                              Who is Invited to Enter
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                              {gate.whoEnters}
                            </p>
                          </div>

                          <div className="bg-amber-500/5 dark:bg-amber-500/2.5 border border-amber-500/10 p-3.5 rounded-xl">
                            <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1.5 flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                              <span>Essential Must-Know Fact</span>
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                              {gate.mustKnowFact}
                            </p>
                          </div>
                        </div>
                      ))}
                      {filteredJannahGates.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-sm text-slate-400 font-semibold">No Jannah gates match your search.</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Named Gardens Category */}
                  {jannahCategory === 'gardens' && (
                    <>
                      {filteredJannahGardens.map((garden) => (
                        <div
                          key={garden.number}
                          className="glass rounded-2xl border border-gold-500/20 dark:border-gold-500/10 p-4 sm:p-5 text-left space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="h-7 w-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                🟢
                              </span>
                              <div>
                                <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                  <span>{garden.name}</span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/15">
                                    Garden {garden.number}
                                  </span>
                                </h3>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold font-display tracking-wide">
                                  {garden.meaning}
                                </p>
                              </div>
                            </div>
                            <span className="text-xl font-bold font-amiri text-slate-700 dark:text-slate-300 leading-none">
                              {garden.arabicName}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                            <BookOpen className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                            <span>Quranic Mention: <span className="text-slate-700 dark:text-slate-200">{garden.scriptureRef}</span></span>
                          </div>

                          <div className="bg-amber-500/5 dark:bg-amber-500/2.5 border border-amber-500/10 p-3.5 rounded-xl">
                            <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1.5 flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                              <span>Essential Must-Know Fact</span>
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                              {garden.mustKnowFact}
                            </p>
                          </div>
                        </div>
                      ))}
                      {filteredJannahGardens.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-sm text-slate-400 font-semibold">No Jannah gardens match your search.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Sub-tab 3: Jahannam Levels */}
            {cosmologySubTab === 'jahannam' && (
              <>
                {filteredJahannam.map((level) => (
                  <div
                    key={level.number}
                    className="glass rounded-2xl border border-red-500/20 dark:border-red-500/10 p-4 sm:p-5 text-left space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="h-7 w-7 rounded-full bg-red-500/10 flex items-center justify-center text-xs font-bold text-red-600 dark:text-red-400">
                          🔴
                        </span>
                        <div>
                          <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <span>{level.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/15">
                              Depth {level.number}
                            </span>
                          </h3>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold font-display tracking-wide">
                            {level.meaning}
                          </p>
                        </div>
                      </div>
                      <span className="text-xl font-bold font-amiri text-slate-700 dark:text-slate-300 leading-none">
                        {level.arabicName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      <BookOpen className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                      <span>Quranic Mention: <span className="text-slate-700 dark:text-slate-200">{level.scriptureRef}</span></span>
                    </div>

                    <div className="bg-amber-500/5 dark:bg-amber-500/2.5 border border-amber-500/10 p-3.5 rounded-xl">
                      <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                        <span>Essential Must-Know Fact / Warning</span>
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                        {level.mustKnowFact}
                      </p>
                    </div>
                  </div>
                ))}
                {filteredJahannam.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm text-slate-400 font-semibold">No Jahannam levels match your search.</p>
                  </div>
                )}
              </>
            )}

            {/* Sub-tab 4: Day of Judgment (Signs & Stages) */}
            {cosmologySubTab === 'qiyamah' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Horizontal pills for minor/major/stages */}
                <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-slate-200/50 dark:bg-slate-800/30 rounded-xl border border-slate-200/20 dark:border-slate-700/20 max-w-sm mx-auto no-print">
                  <button
                    onClick={() => setQiyamahCategory('minor')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      qiyamahCategory === 'minor'
                        ? 'bg-white dark:bg-slate-900 text-gold-600 dark:text-gold-500 shadow-xs'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Minor Signs
                  </button>
                  <button
                    onClick={() => setQiyamahCategory('major')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      qiyamahCategory === 'major'
                        ? 'bg-white dark:bg-slate-900 text-gold-600 dark:text-gold-500 shadow-xs'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Major Signs (10)
                  </button>
                  <button
                    onClick={() => setQiyamahCategory('stages')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      qiyamahCategory === 'stages'
                        ? 'bg-white dark:bg-slate-900 text-gold-600 dark:text-gold-500 shadow-xs'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Stages of Qiyamah
                  </button>
                </div>

                {/* Render Selected Qiyamah Category List */}
                <div className="space-y-4">
                  {/* Minor Signs */}
                  {qiyamahCategory === 'minor' && (
                    <>
                      {filteredMinorSigns.map((item) => (
                        <div
                          key={item.title}
                          className="glass rounded-2xl border border-slate-200/50 dark:border-slate-800/40 p-4 sm:p-5 text-left space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                                ⏳
                              </span>
                              <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200">
                                {item.title}
                              </h3>
                            </div>
                            <span className="text-lg font-bold font-amiri text-slate-700 dark:text-slate-300 leading-none">
                              {item.arabicName}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                            {item.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                            <BookOpen className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                            <span>Source: <span className="text-slate-700 dark:text-slate-200">{item.scriptureRef}</span></span>
                          </div>

                          <div className="bg-amber-500/5 dark:bg-amber-500/2.5 border border-amber-500/10 p-3.5 rounded-xl">
                            <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1.5 flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                              <span>Essential Must-Know Fact</span>
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                              {item.mustKnowFact}
                            </p>
                          </div>
                        </div>
                      ))}
                      {filteredMinorSigns.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-sm text-slate-400 font-semibold">No minor signs match your search.</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Major Signs */}
                  {qiyamahCategory === 'major' && (
                    <>
                      {filteredMajorSigns.map((item) => (
                        <div
                          key={item.title}
                          className="glass rounded-2xl border border-red-500/20 dark:border-red-500/10 p-4 sm:p-5 text-left space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="h-7 w-7 rounded-full bg-red-500/10 flex items-center justify-center text-xs font-bold text-red-600 dark:text-red-400 animate-pulse">
                                🚨
                              </span>
                              <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200">
                                {item.title}
                              </h3>
                            </div>
                            <span className="text-lg font-bold font-amiri text-slate-700 dark:text-slate-300 leading-none">
                              {item.arabicName}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                            {item.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                            <BookOpen className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                            <span>Source: <span className="text-slate-700 dark:text-slate-200">{item.scriptureRef}</span></span>
                          </div>

                          <div className="bg-amber-500/5 dark:bg-amber-500/2.5 border border-amber-500/10 p-3.5 rounded-xl">
                            <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1.5 flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                              <span>Essential Must-Know Fact</span>
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                              {item.mustKnowFact}
                            </p>
                          </div>
                        </div>
                      ))}
                      {filteredMajorSigns.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-sm text-slate-400 font-semibold">No major signs match your search.</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Stages of Qiyamah */}
                  {qiyamahCategory === 'stages' && (
                    <>
                      {filteredQiyamahStages.map((item) => (
                        <div
                          key={item.title}
                          className="glass rounded-2xl border border-gold-500/20 dark:border-gold-500/10 p-4 sm:p-5 text-left space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="h-7 w-7 rounded-full bg-gold-500/10 flex items-center justify-center text-xs font-bold text-gold-600 dark:text-gold-400">
                                ⚖️
                              </span>
                              <h3 className="text-sm font-bold font-display text-slate-800 dark:text-slate-200">
                                {item.title}
                              </h3>
                            </div>
                            <span className="text-lg font-bold font-amiri text-slate-700 dark:text-slate-300 leading-none">
                              {item.arabicName}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                            {item.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                            <BookOpen className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                            <span>Quranic Source: <span className="text-slate-700 dark:text-slate-200">{item.scriptureRef}</span></span>
                          </div>

                          <div className="bg-amber-500/5 dark:bg-amber-500/2.5 border border-amber-500/10 p-3.5 rounded-xl">
                            <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1.5 flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                              <span>Essential Must-Know Fact</span>
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                              {item.mustKnowFact}
                            </p>
                          </div>
                        </div>
                      ))}
                      {filteredQiyamahStages.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-sm text-slate-400 font-semibold">No stages match your search.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
