import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/Dialog';

interface ShortcutsHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShortcutsHelp({ open, onOpenChange }: ShortcutsHelpProps) {
  const shortcuts = [
    { keys: ['/'], description: 'Focus search input from anywhere' },
    { keys: ['Esc'], description: 'Clear search input, suggestions, or close modals' },
    { keys: ['d'], description: 'Toggle Dark / Light theme mode' },
    { keys: ['g', 's'], description: 'Go to Simple Search view' },
    { keys: ['g', 'a'], description: 'Go to Advanced Search view' },
    { keys: ['g', 'b'], description: 'Go to Bookmarks view' },
    { keys: ['?'], description: 'Toggle this keyboard shortcuts menu' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-slate-100 dark:border-slate-800 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif font-semibold text-slate-900 dark:text-white">
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Speed up your search and library navigation with these keyboard shortcuts.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-2.5">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {shortcut.description}
                </span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      {keyIndex > 0 && <span className="text-xs text-slate-400 font-display font-medium">+</span>}
                      <kbd className="inline-flex h-5 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-1.5 text-[10px] font-bold font-display text-slate-800 shadow-xs dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200">
                        {key === ' ' ? 'Space' : key.toUpperCase()}
                      </kbd>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
