import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Mail, Terminal, Phone, ExternalLink } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import InteractiveBackground from './components/InteractiveBackground';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';
import ContactModal from './components/ContactModal';
import { CONTENT, SOCIAL_LINKS } from './constants';
import { Language, Theme } from './types';

// Component for the animated font effect
const GlitchTitle: React.FC<{ text: string; isRTL: boolean }> = ({ text, isRTL }) => {
  const [fontIndex, setFontIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Define font stacks for English and RTL languages
  const fonts = isRTL 
    ? ['font-sans', 'font-mono', 'font-serif', 'font-[Tahoma]', 'font-[Arial]']
    : ['font-sans', 'font-mono', 'font-serif', 'font-[Impact]', 'font-[Courier]'];

  // Initial glitch effect on mount
  useEffect(() => {
    const initialGlitch = setInterval(() => {
      setFontIndex(prev => (prev + 1) % fonts.length);
    }, 150);

    const cleanup = setTimeout(() => {
      clearInterval(initialGlitch);
      setFontIndex(0); // Reset to default font
    }, 1500);

    return () => {
      clearInterval(initialGlitch);
      clearTimeout(cleanup);
    };
  }, [text, fonts.length]);

  // Glitch effect on hover
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setFontIndex(prev => (prev + 1) % fonts.length);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setFontIndex(0);
    }
  }, [isHovered, fonts.length]);

  return (
    <h1 
      className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1] cursor-default select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-gray-500 pb-2 transition-all duration-75 ${fonts[fontIndex]}`}>
        {text}
      </span>
    </h1>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [loading, setLoading] = useState(true);
  const [domainName, setDomainName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Simulate loading sequence and get domain
  useEffect(() => {
    setDomainName(window.location.hostname.replace('www.', ''));
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const content = CONTENT[lang];
  const isRTL = lang === 'fa' || lang === 'ps';

  // Google Drive Direct Link Converter
  const lightLogo = "https://drive.google.com/uc?export=view&id=1sEh8xWFzBBgM8kvERQPXu-_RP47TMDxU";
  const darkLogo = "https://drive.google.com/uc?export=view&id=1cxk3qxTBxbHpaDhLe-C-q-FAhipz3Qsn";

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className={`min-h-screen w-full relative overflow-hidden transition-colors duration-500 selection:bg-primary selection:text-white ${isRTL ? 'font-sans' : ''}`}
    >
      <CustomCursor />
      
      {/* Background Layer */}
      <InteractiveBackground theme={theme} />

      {/* Grid Overlay for Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 h-screen flex flex-col px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center py-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="relative h-12 w-12 flex items-center justify-center">
              <img 
                src={theme === 'light' ? lightLogo : darkLogo} 
                alt="ZabahSoft Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-mono font-bold text-lg tracking-tight hidden sm:block">
              {content.companyName}
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
            <ThemeToggle theme={theme} toggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} />
          </motion.div>
        </header>

        {/* Center Content */}
        <main className="flex-1 flex flex-col justify-center items-start relative">
          
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-4">
                   <Terminal className="w-12 h-12 text-primary animate-pulse" />
                   <p className="font-mono text-sm text-gray-500 animate-pulse">{content.building}</p>
                   {/* Progress Bar */}
                   <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl"
              >
                {/* Status Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-mono mb-8"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                  </span>
                  <span>System Maintenance</span>
                </motion.div>

                {/* Hero Title with Animated Font */}
                <GlitchTitle text={content.title} isRTL={isRTL} />

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light max-w-3xl mb-12 leading-relaxed">
                  {content.subtitle} <span className="text-primary font-mono font-medium">{domainName}</span>.
                </p>

                {/* COOL ACTION BUTTONS */}
                <div className="flex flex-wrap gap-6">
                  
                  {/* Email Button (Shiny & Filled) */}
                  <motion.a
                    href="mailto:info@zabahsoft.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden group px-8 py-4 bg-foreground text-background font-bold rounded-lg flex items-center gap-3 shadow-lg hover:shadow-primary/50 transition-shadow duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12" />
                    <span className="relative z-10">{content.contact}</span>
                    <Mail className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </motion.a>

                  {/* Build With Us Button (Neon Glow Border) */}
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group px-1 py-1 rounded-lg overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary via-purple-500 to-primary opacity-0 group-hover:opacity-100 animate-spin-slow transition-opacity duration-300" />
                    <div className="relative px-8 py-3.5 bg-background rounded-[calc(0.5rem-2px)] border border-border group-hover:border-transparent transition-colors flex items-center gap-3 font-bold text-foreground">
                       <span>{content.cta}</span>
                       <Hammer className={`w-5 h-5 group-hover:text-primary transition-colors ${isRTL ? 'rotate-90' : ''}`} />
                    </div>
                  </motion.button>

                  {/* WhatsApp Button (Jello Effect & Pulse) */}
                  <motion.a
                    href="https://wa.me/93792929814"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-8 py-4 bg-[#25D366] text-white rounded-lg font-bold flex items-center gap-3 hover:bg-[#128C7E] transition-all shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)]"
                  >
                    <span>{content.whatsapp}</span>
                    <Phone className="w-5 h-5 fill-current" />
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="py-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-border/30 backdrop-blur-sm z-20">
           <div className="flex flex-wrap justify-center gap-6">
              {SOCIAL_LINKS.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-mono text-sm uppercase tracking-wider relative group"
                >
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                  <span>{link.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </motion.a>
              ))}
           </div>
           
           <div className="text-gray-500 text-xs font-mono text-center md:text-right">
             {content.rights}
           </div>
        </footer>
      </div>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        translations={content.modal}
        isRTL={isRTL}
      />

      {/* Decorative Glows (Fixed positions) */}
      <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 -left-20 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />
      
    </div>
  );
};

export default App;