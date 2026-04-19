import { useState, useEffect } from 'react';
import { Search, Type, Monitor, Smartphone, Tablet, Sun, Moon } from 'lucide-react';

const Header = ({ searchTerm, setSearchTerm }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const themeColorMeta = document.querySelector("meta[name='theme-color']");

    if (darkMode) {
      root.classList.add("dark");
      if (themeColorMeta) themeColorMeta.content = "rgb(16, 24, 43)";
    } else {
      root.classList.remove("dark");
      if (themeColorMeta) themeColorMeta.content = "rgb(194, 205, 219)";
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">

        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="8" className="fill-blue-600" />
            <text x="18" y="24" textAnchor="middle" fontSize="20" fontWeight="700"
              fontFamily="'Battambang', 'Khmer', serif" fill="white">ពុម្ភ</text>
          </svg>
          <h1 className="text-xl sm:text-2xl font-bold whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif" }}>
            Khmer<span className="text-blue-600">Fonts</span>
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="ស្វែងរកពុម្ពអក្សរ..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
            style={{ fontFamily: "'Lato', sans-serif" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Actions: Theme Toggle & Device Indicators */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:ring-2 hover:ring-blue-500 transition-all active:scale-90"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
            <Monitor size={14} />
            <Tablet size={14} />
            <Smartphone size={14} />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="ស្វែងរកពុម្ពអក្សរ..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;