import React from 'react';
import { Theme } from '../types';
import { Moon, Sun } from 'lucide-react';

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<Props> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:border-primary hover:text-primary transition-all duration-300"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;