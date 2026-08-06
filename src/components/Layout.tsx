import * as React from 'react';
import { Sun, Moon, Bookmark, Compass, Search, Keyboard, Heart } from 'lucide-react';
import { Button } from './ui/Button';

interface LayoutProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  activeView: 'search' | 'advanced' | 'bookmarks' | 'counsel';
  onViewChange: (view: 'search' | 'advanced' | 'bookmarks' | 'counsel') => void;
  onHelpClick: () => void;
  bookmarksCount: number;
}

export function Layout({
  children,
  theme,
  onThemeToggle,
  activeView,
  onViewChange,
  onHelpClick,
  bookmarksCount,
}: LayoutProps) {
  // Focus listener for theme toggle shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle theme with 'd' key if not typing
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        activeEl?.getAttribute('contenteditable') === 'true';

      if (e.key === 'd' && !isInputFocused) {
        e.preventDefault();
        onThemeToggle();
      }

      // Show shortcuts dialog with '?' key
      if (e.key === '?' && !isInputFocused) {
        e.preventDefault();
        onHelpClick();
      }

      // Navigation shortcuts
      if (e.key === 'g' && !isInputFocused) {
        const nextKeyHandler = (nextEvent: KeyboardEvent) => {
          if (nextEvent.key === 's') {
            onViewChange('search');
          } else if (nextEvent.key === 'a') {
            onViewChange('advanced');
          } else if (nextEvent.key === 'b') {
            onViewChange('bookmarks');
          } else if (nextEvent.key === 'c') {
            onViewChange('counsel');
          }
          window.removeEventListener('keydown', nextKeyHandler);
        };
        window.addEventListener('keydown', nextKeyHandler, { once: true });
        // Clean up key listener after 1 second if no key follows
        setTimeout(() => window.removeEventListener('keydown', nextKeyHandler), 1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onThemeToggle, onHelpClick, onViewChange]);

  return (
    <div className="min-h-screen flex flex-col bg-islamic-pattern bg-repeat relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-[10%] w-[350px] h-[350px] rounded-full bg-gold-500/6 dark:bg-gold-500/3 blur-[80px] pointer-events-none" />
      <div className="absolute top-[35%] right-[8%] w-[450px] h-[450px] rounded-full bg-gold-500/5 dark:bg-gold-500/2.5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-gold-500/4 dark:bg-gold-500/2 blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full glass border-b border-slate-200/50 dark:border-slate-800/40 px-4 sm:px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <button
            onClick={() => onViewChange('search')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="h-9 w-9 rounded-xl bg-gold-500 dark:bg-gold-500 flex items-center justify-center text-[#11141a] dark:text-[#11141a] logo-box-glow">
              <svg 
                className="h-5 w-5 fill-current" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 3v18c-4.97 0-9-4.03-9-9s4.03-9 9-9zm0-2C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold font-cinzel tracking-wider leading-none brand-name-glow">
                VerseFlow
              </h1>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold font-display tracking-wider uppercase leading-none block mt-0.5">
                Reference Library
              </span>
            </div>
          </button>

          {/* Navigation Controls */}
          <nav className="flex items-center gap-1.5 md:gap-3">
            <Button
              variant={activeView === 'search' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('search')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline font-display text-xs font-semibold">Search</span>
            </Button>

            <Button
              variant={activeView === 'advanced' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('advanced')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              <Compass className="h-4 w-4" />
              <span className="hidden sm:inline font-display text-xs font-semibold">Advanced</span>
            </Button>

            <Button
              variant={activeView === 'counsel' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('counsel')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline font-display text-xs font-semibold">Counsel</span>
            </Button>

            <Button
              variant={activeView === 'bookmarks' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('bookmarks')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 relative cursor-pointer"
            >
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline font-display text-xs font-semibold">Bookmarks</span>
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-slate-950 font-display ring-2 ring-white dark:ring-slate-900 animate-in zoom-in duration-200 shadow-sm shadow-gold-500/30">
                  {bookmarksCount}
                </span>
              )}
            </Button>
          </nav>

          {/* Theme & Shortcuts togglers */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="h-9 w-9 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg cursor-pointer"
              title="Toggle theme (D)"
            >
              {theme === 'light' ? (
                <Moon className="h-4.5 w-4.5" />
              ) : (
                <Sun className="h-4.5 w-4.5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onHelpClick}
              className="h-9 w-9 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg cursor-pointer"
              title="Keyboard shortcuts (?)"
            >
              <Keyboard className="h-4.5 w-4.5" />
            </Button>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/50 dark:border-slate-800/40 py-6 px-4 bg-slate-50 dark:bg-slate-950/40 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500 font-medium font-display">
          <div>
            © {new Date().getFullYear()} VerseFlow Library • Authentic reference database.
          </div>
          <div className="flex items-center gap-4">
            <span>Client-side MiniSearch Indexing</span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-800" />
            <span>Works 100% Offline</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
