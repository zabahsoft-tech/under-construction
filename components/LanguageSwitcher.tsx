import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<Props> = ({ currentLang, onLanguageChange }) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fa', label: 'FA' },
    { code: 'ps', label: 'PS' },
  ];

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:border-primary transition-colors cursor-pointer">
        <Globe size={16} className="text-foreground" />
        <span className="text-sm font-mono font-bold uppercase">{currentLang}</span>
      </div>
      
      <div className="absolute top-full mt-2 left-0 right-0 py-2 bg-background border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`w-full px-4 py-2 text-sm text-left hover:bg-primary/10 hover:text-primary transition-colors ${currentLang === lang.code ? 'text-primary font-bold' : 'text-foreground'}`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;