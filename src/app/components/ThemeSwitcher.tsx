'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Zap } from 'lucide-react';

type Theme = 'cyberpunk' | 'synthwave' | 'neon';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('cyberpunk');

  useEffect(() => {
    // Set initial theme from localStorage or default
    const savedTheme = localStorage.getItem('theme') as Theme || 'cyberpunk';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const cycleTheme = () => {
    const themeOrder: Theme[] = ['cyberpunk', 'synthwave', 'neon'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const newTheme = themeOrder[nextIndex];

    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
      <button
          onClick={cycleTheme}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
      >
        {theme === 'cyberpunk' && (
            <Moon className="w-5 h-5 text-[var(--primary)]" />
        )}
        {theme === 'synthwave' && (
            <Sun className="w-5 h-5 text-[var(--secondary)]" />
        )}
        {theme === 'neon' && (
            <Zap className="w-5 h-5 text-[var(--primary)]" />
        )}
      </button>
  );
}
