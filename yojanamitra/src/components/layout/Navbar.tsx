import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, User, LogOut, Mic } from 'lucide-react';
import { useAppStore } from '../../hooks/useAppStore';
import { t, LANGUAGE_LABELS, type Language } from '../../services/i18n';
import { cn } from '../../utils';

const NAV_LINKS = [
  { to: '/dashboard', getLabel: (lang: Language) => t('nav_dashboard', lang) },
  { to: '/schemes', getLabel: (lang: Language) => t('nav_schemes', lang) },
  { to: '/planner', getLabel: (lang: Language) => t('nav_planner', lang) },
  { to: '/documents', getLabel: (lang: Language) => t('nav_documents', lang) },
  { to: '/readiness', getLabel: (lang: Language) => t('nav_readiness', lang) },
  { to: '/partners', getLabel: (lang: Language) => t('nav_partners', lang) },
];

const LANGUAGES: Language[] = ['en', 'hi', 'mr'];

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout, language, setLanguage } = useAppStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  const displayName = currentUser?.name.split(' ')[0] ?? '';

  return (
    <header className="sticky top-0 z-50 bg-[#1e3a5f] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 text-white font-extrabold text-lg tracking-tight">
          <span className="text-orange-400">YM</span>
          <span className="hidden sm:inline">{t('app_name', language)}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ to, getLabel }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                )
              }
            >
              {getLabel(language)}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Talk to YojanaMitra (Desktop) */}
          <button
            onClick={() => navigate('/intake')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors"
          >
            <Mic size={12} />
            {t('talk_to_yojanamitra', language)}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => { setLangOpen(!langOpen); setUserOpen(false); }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors"
            >
              <Globe size={13} />
              {LANGUAGE_LABELS[language]}
              <ChevronDown size={11} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-32">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setLangOpen(false); }}
                    className={cn(
                      'w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50',
                      language === lang ? 'text-[#1e3a5f] bg-indigo-50' : 'text-gray-700'
                    )}
                  >
                    {LANGUAGE_LABELS[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => { setUserOpen(!userOpen); setLangOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <User size={13} />
                <span className="hidden sm:inline max-w-20 truncate">{displayName}</span>
                <ChevronDown size={11} />
              </button>
              {userOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-40">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    {t('logout', language)}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
            >
              <User size={13} />
              {t('login', language)}
            </button>
          )}

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-1.5 hover:bg-white/10 rounded-lg"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-[#162640] border-t border-white/10 px-4 py-3 space-y-1">
          {NAV_LINKS.map(({ to, getLabel }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                )
              }
            >
              {getLabel(language)}
            </NavLink>
          ))}

          {/* Mobile: Talk to YojanaMitra */}
          <button
            onClick={() => { navigate('/intake'); setMenuOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-bold"
          >
            <Mic size={14} />
            {t('talk_to_yojanamitra', language)}
          </button>

          <div className="border-t border-white/10 pt-3 flex gap-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setMenuOpen(false); }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
                  language === lang ? 'bg-white text-[#1e3a5f]' : 'text-white/70 hover:bg-white/10'
                )}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </div>

          {currentUser && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/10"
            >
              <LogOut size={14} />
              {t('logout', language)}
            </button>
          )}
        </div>
      )}
    </header>
  );
}
