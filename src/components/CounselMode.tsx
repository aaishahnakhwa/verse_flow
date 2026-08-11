import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, Sparkles, Copy, Check, BookOpen, AlertCircle, Settings, RefreshCw } from 'lucide-react';
import { COUNSELING_REGISTRY, findBestProfile, type CounselingProfile } from '../search/counselRegistry';
import type { SearchEngine } from '../search/searchEngine';
import type { ScriptureEntry } from '../types/scripture';
import { ResultCard } from './ResultCard';

interface CounselModeProps {
  searchEngine: SearchEngine;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onReadContext: (entry: ScriptureEntry) => void;
}

export function CounselMode({
  searchEngine,
  bookmarks,
  onToggleBookmark,
  onReadContext,
}: CounselModeProps) {
  // Mode selector: 'registry' (offline) or 'ai' (live openrouter) - Defaulting to AI Chat
  const [activeTab, setActiveTab] = React.useState<'registry' | 'ai'>('ai');

  // Registry Mode States
  const [userInput, setUserInput] = React.useState('');
  const [activeProfile, setActiveProfile] = React.useState<CounselingProfile | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  // Live AI Chat Mode States
  const apiKey = (import.meta.env.VITE_OPENROUTER_API_KEY as string) || localStorage.getItem('openrouter_api_key') || '';
  const [aiModel, setAiModel] = React.useState('openrouter/free');
  const [chatInput, setChatInput] = React.useState('');
  const [isAiSending, setIsAiSending] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState<Array<{ role: 'user' | 'assistant'; content: string; respondingModel?: string }>>([
    {
      role: 'assistant',
      content: 'Assalamu Alaikum. I am your AI Spiritual Counselor. Please feel free to share what is weighing on your heart, or ask any theological questions about the Quran, Hadith, or Islamic history. I am here to offer comforting wisdom and relevant scriptural references.'
    }
  ]);

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  // Scroll to bottom of chat log
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiSending, activeTab]);

  // Registry search logic
  const matchingVerses = React.useMemo(() => {
    if (!activeProfile) return [];
    const resolved: ScriptureEntry[] = [];
    activeProfile.matchingVerses.forEach(ref => {
      const [chapStr, verStr] = ref.split(':');
      if (chapStr && verStr) {
        const chap = parseInt(chapStr, 10);
        const ver = parseInt(verStr, 10);
        const results = searchEngine.searchCollections({
          query: '',
          book: 'Quran',
          chapter: chap,
        });
        const match = results.find(doc => doc.verse === ver);
        if (match) resolved.push(match);
      }
    });
    return resolved;
  }, [activeProfile, searchEngine]);

  const matchingHadiths = React.useMemo(() => {
    if (!activeProfile) return [];
    const resolved: ScriptureEntry[] = [];
    activeProfile.matchingHadiths.forEach(id => {
      const match = searchEngine.getEntryById(id);
      if (match) resolved.push(match);
    });
    return resolved;
  }, [activeProfile, searchEngine]);

  const handleRegistrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const match = findBestProfile(userInput);
      setActiveProfile(match);
      setIsSearching(false);
    }, 450);
  };

  const handleChipClick = (chipText: string) => {
    setUserInput(chipText);
    setIsSearching(true);
    setTimeout(() => {
      const match = findBestProfile(chipText);
      setActiveProfile(match);
      setIsSearching(false);
    }, 400);
  };

  const handleCopyDua = (duaText: string, translation: string, ref: string) => {
    const textToCopy = `"${duaText}"\n\nTransliteration: ${activeProfile?.recommendedDua.transliteration}\n\nTranslation: ${translation}\n\nReference: ${ref}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // OpenRouter Chat completion
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiSending) return;

    const userText = chatInput.trim();
    setChatInput('');
    setErrorMsg('');

    const newMessages = [...chatMessages, { role: 'user' as const, content: userText }];
    setChatMessages(newMessages);
    setIsAiSending(true);

    const payloadMessages = [
      {
        role: 'system' as const,
        content: 'You are an empathetic, wise, and highly knowledgeable AI Islamic Spiritual Counselor. Your goal is to help users find comfort, guidance, and peace by answering their questions and sharing relevant verses from the Quran, Hadiths, and stories of the prophets, sahabas, and sahabiyat. Keep your tone gentle, compassionate, and faithful. Use appropriate greetings (e.g., Salaam) and respect suffixes (e.g., SAW, AS, RA) where appropriate. Detect the language used by the user: if the user talks or asks questions in Hinglish (a mixture of Hindi and English written in Latin/English characters), you MUST respond in friendly, conversational Hinglish. Keep scriptural quotes and transliterations accurate, but explain and comfort them in the same Hinglish style. Format references clearly (e.g., **Surah Al-Baqarah 2:153**) so they stand out.'
      },
      ...newMessages
    ];

    try {
      let response;
      if (apiKey.trim()) {
        // Direct Client-Side call (using user-entered key)
        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://verseflow-counsel.ai',
            'X-Title': 'VerseFlow Spiritual Counselor',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: aiModel,
            messages: payloadMessages,
          }),
        });
      } else {
        // Secure Vercel Serverless Function call (hiding API key on server side)
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: aiModel,
            messages: payloadMessages,
          }),
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || errorData?.error || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'I could not retrieve an answer. Please try again.';
      const actualModel = data.model || aiModel;
      setChatMessages(prev => [...prev, { role: 'assistant' as const, content: reply, respondingModel: actualModel }]);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'A network error occurred. Please verify your internet connection or API Key.';
      setErrorMsg(errorMessage);
    } finally {
      setIsAiSending(false);
    }
  };

  const handleClearChat = () => {
    setChatMessages([
      {
        role: 'assistant',
        content: 'Assalamu Alaikum. I am your AI Spiritual Counselor. Please feel free to share what is weighing on your heart, or ask any theological questions about the Quran, Hadith, or Islamic history. I am here to offer comforting wisdom and relevant scriptural references.'
      }
    ]);
    setErrorMsg('');
  };

  // Simple Markdown bold / paragraph parser
  const renderMessageContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="text-gold-600 dark:text-gold-400 font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return (
        <span key={index} className="block min-h-[1em]">
          {parsedLine}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 z-10 relative">

      {/* Hero Welcome Panel */}
      <div className="text-center space-y-3 max-w-2xl mx-auto py-2">
        <div className="inline-flex h-11 w-11 rounded-full bg-gold-500/10 dark:bg-gold-500/10 items-center justify-center text-gold-600 dark:text-gold-500 mb-1 shadow-xs shadow-gold-500/5">
          <Heart className="h-5.5 w-5.5 fill-current" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight brand-name-glow">
          Spiritual Counsel
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 font-semibold leading-relaxed">
          Share what is weighing on your heart today, and retrieve comforting advice, prayers, and references from the Quran and Sunnah.
        </p>
      </div>

      {/* Mode Switcher Buttons */}
      <div className="flex justify-center gap-1.5 p-1 bg-slate-200/50 dark:bg-slate-800/30 rounded-xl border border-slate-200/20 dark:border-slate-700/20 max-w-xs mx-auto no-print">
        <button
          onClick={() => setActiveTab('registry')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeTab === 'registry'
            ? 'bg-white dark:bg-slate-900 text-gold-600 dark:text-gold-500 shadow-xs'
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
        >
          Registry Profiles
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeTab === 'ai'
            ? 'bg-white dark:bg-slate-900 text-gold-600 dark:text-gold-500 shadow-xs'
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
        >
          ✨ Live AI Chat
        </button>
      </div>

      {/* Mode Status Banner Indicator */}
      <div className="max-w-xs mx-auto no-print">
        {activeTab === 'registry' ? (
          <div className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/40 rounded-xl text-[10px] font-bold font-display uppercase tracking-wider text-slate-500 dark:text-slate-400 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>📋 Offline Registry (Non-AI)</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-gold-500/5 border border-gold-500/15 rounded-xl text-[10px] font-bold font-display uppercase tracking-wider text-gold-600 dark:text-gold-400 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span>✨ Live AI Chat (Online)</span>
          </div>
        )}
      </div>

      {/* VIEW A: REGISTRY COUNSEL */}
      {activeTab === 'registry' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Interactive Counsel Input Form */}
          <div className="glass p-5 rounded-2xl border border-stone-200/50 dark:border-gold-500/10 shadow-lg space-y-4">
            <form onSubmit={handleRegistrySubmit} className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Describe your struggle (e.g., 'I am worried about my exams', 'loss of a loved one')..."
                className="w-full h-12 pl-12 pr-28 rounded-xl bg-white dark:bg-[#161a22] border border-stone-200/80 dark:border-gold-500/20 text-sm text-slate-900 dark:text-gold-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-1 focus:ring-gold-500/20 dark:focus:ring-gold-500/20 focus:border-gold-500 dark:focus:border-gold-500 transition-all shadow-md shadow-gold-500/2"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 px-4 h-8 text-[10px] font-bold font-display uppercase tracking-wider bg-gold-500 text-[#11141a] rounded-lg hover:bg-gold-600 active:scale-95 transition-all cursor-pointer shadow-sm shadow-gold-500/10 flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSearching ? 'Seeking...' : 'Seek'}
              </button>
            </form>

            {/* Quick select search chips */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                Or select a common challenge
              </span>
              <div className="flex flex-wrap gap-2">
                {COUNSELING_REGISTRY.map(profile => (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => handleChipClick(Object.keys(profile.keywords)[0])}
                    className="text-[10px] font-bold font-display px-3 py-1.5 rounded-xl bg-white hover:bg-gold-50 dark:bg-[#201b13] dark:hover:bg-gold-950/20 text-slate-700 dark:text-slate-300 border border-stone-200/60 dark:border-gold-500/10 hover:border-gold-500/30 dark:hover:border-gold-500/30 transition-all cursor-pointer shadow-xs"
                  >
                    <span>{profile.emoji} {profile.categoryName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Counseling matches details wrapper */}
          <AnimatePresence mode="wait">
            {activeProfile && !isSearching && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 animate-in fade-in duration-200"
              >
                {/* Counselor message advice card */}
                <div className="glass p-5 rounded-2xl border-l-4 border-l-gold-500/80 shadow-md space-y-3 text-left">
                  <div className="flex items-center gap-2 text-gold-600 dark:text-gold-500">
                    <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                    <h3 className="text-xs font-bold font-display uppercase tracking-wider leading-none">
                      Counsel: {activeProfile.categoryName}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-semibold">
                    {activeProfile.counselText}
                  </p>
                </div>

                {/* Recommended Du'a card block */}
                <div className="glass p-5 rounded-2xl border border-stone-200/60 dark:border-gold-500/15 shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 dark:border-gold-500/10 pb-2.5">
                    <span className="text-[10px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Recommended Supplication (Du’a)
                    </span>
                    <button
                      onClick={() => handleCopyDua(activeProfile.recommendedDua.arabic, activeProfile.recommendedDua.english, activeProfile.recommendedDua.reference)}
                      className="h-8 px-3 rounded-lg border border-stone-200 dark:border-gold-500/20 text-[9px] font-bold font-display uppercase tracking-wider text-slate-500 dark:text-gold-400 hover:bg-gold-50 dark:hover:bg-gold-950/20 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Du’a</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Calligraphy-styled Arabic frame */}
                  <div className="text-center py-4 bg-gold-50/20 dark:bg-gold-950/5 rounded-xl border border-gold-500/5 px-4 space-y-3">
                    <p className="text-xl sm:text-2xl font-serif text-slate-900 dark:text-gold-100 leading-loose tracking-wide">
                      {activeProfile.recommendedDua.arabic}
                    </p>
                    <p className="text-[11px] font-serif-italic text-slate-500 dark:text-slate-400 px-4 leading-relaxed max-w-xl mx-auto">
                      "{activeProfile.recommendedDua.transliteration}"
                    </p>
                  </div>

                  <div className="space-y-1 text-left px-2">
                    <span className="text-[9px] font-bold font-display uppercase tracking-wider text-gold-600 dark:text-gold-500">
                      Translation & Reference
                    </span>
                    <p className="text-xs text-slate-600 dark:text-stone-300 leading-relaxed font-semibold">
                      {activeProfile.recommendedDua.english}
                    </p>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-display block pt-0.5 font-bold">
                      — {activeProfile.recommendedDua.reference}
                    </span>
                  </div>
                </div>

                {/* Matching Scriptures Deck list */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2 px-1 border-b border-stone-200/50 dark:border-gold-500/10 pb-2">
                    <BookOpen className="h-4 w-4 text-gold-600 dark:text-gold-500" />
                    <h4 className="text-[10px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Relevant Quranic Verses ({matchingVerses.length})
                    </h4>
                  </div>

                  {matchingVerses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {matchingVerses.map(entry => (
                        <ResultCard
                          key={entry.id}
                          entry={entry}
                          searchQuery=""
                          exactPhrase={false}
                          isBookmarked={bookmarks.includes(entry.id)}
                          onToggleBookmark={onToggleBookmark}
                          onReadContext={onReadContext}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-medium">
                        Scripture references are loading. Make sure the Quran collection is parsed correctly.
                      </span>
                    </div>
                  )}
                </div>

                {/* Matching Hadiths Deck list */}
                {matchingHadiths.length > 0 && (
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-2 px-1 border-b border-stone-200/50 dark:border-gold-500/10 pb-2">
                      <Sparkles className="h-4 w-4 text-gold-600 dark:text-gold-500" />
                      <h4 className="text-[10px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Relevant Hadiths ({matchingHadiths.length})
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {matchingHadiths.map(entry => (
                        <ResultCard
                          key={entry.id}
                          entry={entry}
                          searchQuery=""
                          exactPhrase={false}
                          isBookmarked={bookmarks.includes(entry.id)}
                          onToggleBookmark={onToggleBookmark}
                          onReadContext={onReadContext}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* VIEW B: LIVE AI COUNSELOR CHAT */}
      {activeTab === 'ai' && (
        <div className="space-y-4 animate-in fade-in duration-200 text-left">
          {/* API & Model Settings Drawer */}
          <div className="glass rounded-2xl border border-stone-200/50 dark:border-gold-500/10 shadow-md p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-gold-500" />
                <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  AI Counselor Settings
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-[10px] font-bold font-display uppercase tracking-widest text-gold-600 dark:text-gold-400 hover:underline cursor-pointer"
              >
                {showSettings ? 'Hide Panel' : 'Edit Configuration'}
              </button>
            </div>

            {showSettings && (
              <div className="pt-1 animate-in slide-in-from-top-1 duration-150 max-w-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    AI Language Model
                  </label>
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-white dark:bg-[#161a22] border border-stone-200 dark:border-gold-500/25 text-xs text-slate-800 dark:text-gold-200 focus:outline-hidden focus:border-gold-500 cursor-pointer"
                  >
                    <option value="openrouter/free">OpenRouter: Auto-select Free Model (Recommended - 100% Free)</option>
                    <option value="meta-llama/llama-3-8b-instruct:free">Meta: Llama 3 8B Free (100% Free - 8k Context)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* AI Unpredictability Disclaimer */}
          <div className="flex items-start gap-2.5 p-3.5 bg-amber-500/5 dark:bg-amber-500/5 border border-amber-500/15 dark:border-amber-500/10 rounded-2xl text-xs text-amber-700 dark:text-amber-400 font-semibold leading-relaxed shadow-sm">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 animate-pulse text-amber-500" />
            <div>
              <span className="font-bold uppercase tracking-wider text-[10px] block mb-0.5">⚠️ AI Counselor Disclaimer</span>
              Please note that AI is unpredictable and can sometimes provide incorrect or inaccurate answers. Always verify scriptural references, hadiths, contexts of the given answer/question and rulings with qualified scholars or authentic sources.
            </div>
          </div>

          {/* Chat Messages Panel */}
          <div className="glass rounded-2xl border border-stone-200/50 dark:border-gold-500/10 shadow-lg p-4 space-y-4 flex flex-col min-h-[350px]">
            <div className="flex-1 overflow-y-auto max-h-[380px] space-y-3.5 pr-1 text-xs sm:text-sm">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 ${msg.role === 'user'
                      ? 'bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 rounded-tr-xs border border-slate-200/30'
                      : 'bg-gold-500/5 border border-gold-500/15 dark:border-gold-500/10 text-slate-800 dark:text-stone-300 rounded-tl-xs space-y-2'
                      }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 text-gold-600 dark:text-gold-400 font-bold font-display uppercase tracking-widest text-[9px] border-b border-gold-500/5 pb-1 mb-1.5">
                        <Sparkles className="h-3 w-3" />
                        <span>AI Counsel</span>
                      </div>
                    )}
                    <div className="leading-relaxed font-semibold whitespace-pre-wrap font-sans text-xs">
                      {msg.role === 'assistant' ? renderMessageContent(msg.content) : msg.content}
                    </div>
                    {msg.role === 'assistant' && msg.respondingModel && (
                      <div className="text-[9px] text-slate-400/80 dark:text-slate-500/80 font-display block pt-1.5 text-right font-medium italic border-t border-gold-500/5 mt-2 leading-none">
                        Responded via: {msg.respondingModel}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isAiSending && (
                <div className="flex justify-start animate-pulse">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-xs p-3 bg-gold-500/5 border border-gold-500/10 text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span className="text-[10px] font-bold font-display uppercase tracking-widest">Reflecting on Quran & Sunnah...</span>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-semibold leading-relaxed">
                    {errorMsg}
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Message Form */}
            <form onSubmit={handleSendChat} className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask the AI counselor a spiritual question or share your heart..."
                disabled={isAiSending}
                className="flex-1 h-11 px-4 rounded-xl bg-white dark:bg-[#161a22] border border-stone-200/80 dark:border-gold-500/20 text-xs sm:text-sm text-slate-900 dark:text-gold-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-gold-500 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleClearChat}
                title="Restart Chat"
                className="h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer flex items-center justify-center transition-colors shrink-0"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={isAiSending || !chatInput.trim()}
                className="h-11 px-4 bg-gold-500 hover:bg-gold-600 text-[#11141a] rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50 shrink-0 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold font-display uppercase tracking-wider hidden sm:inline">Ask AI</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
