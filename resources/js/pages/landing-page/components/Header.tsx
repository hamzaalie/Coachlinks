import React, { useState, useEffect, useCallback } from 'react';
import { Link, router } from '@inertiajs/react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SiteLogo from './SiteLogo';

interface CustomPage { id: number; title: string; slug: string; }
interface HeaderProps {
  brandColor?: string;
  settings: {
    company_name: string;
    config_sections?: {
      theme?: {
        logo_light?: string;
        logo_dark?: string;
      };
    };
  };
  sectionData?: any;
  customPages?: CustomPage[];
  directoryCustomPages?: CustomPage[];
  isDirectoryContext?: boolean;
  user?: any;
  directorySettings?: { company_name: string; };
}

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const HEADER_OFFSET = 80; // px offset for fixed header

export default function Header({ settings, sectionData, customPages = [], directoryCustomPages = [], isDirectoryContext = false, brandColor = '#7c3aed', user, directorySettings }: HeaderProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scroll spy — track which section is in view (only on landing page)
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);

    if (isDirectoryContext) return; // skip scroll spy on directory pages

    const sections = NAV_ITEMS.map(item => item.href.slice(1));
    let current = '';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= HEADER_OFFSET + 60) {
          current = id;
        }
      }
    }
    setActiveSection(current);
  }, [isDirectoryContext]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isDirectoryContext) {
      // Navigate to homepage with anchor
      window.location.href = route('home') + href;
      return;
    }
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isDirectoryContext
        ? 'bg-[#000000] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
        : isScrolled
          ? 'bg-[#000000]/95 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm'
          : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            {isDirectoryContext ? (
              <Link href={route('home')}>
                <SiteLogo settings={settings} variant="light" />
              </Link>
            ) : (
              <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="group">
                <SiteLogo settings={settings} variant="light" />
              </a>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={isDirectoryContext ? route('home') + item.href : item.href} onClick={(e) => scrollTo(e, item.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  !isDirectoryContext && activeSection === item.href.slice(1)
                    ? 'text-white bg-white/[0.08]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}>
                {t(item.label)}
              </a>
            ))}
            <Link href={route('directory.index')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDirectoryContext
                  ? 'text-white bg-white/[0.08]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}>
              {t('Directory')}
            </Link>
          </nav>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link href={route('dashboard')}
                className="group px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                {t('Dashboard')}
              </Link>
            ) : (
              <>
                <Link href={route('login')}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  {t('Login')}
                </Link>
                <Link href={route('register')}
                  className="group relative px-5 py-2.5 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t('Get Started')}
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-[#000000] rounded-b-2xl">
            <div className="px-4 py-6 space-y-2">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={isDirectoryContext ? route('home') + item.href : item.href} onClick={(e) => scrollTo(e, item.href)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    !isDirectoryContext && activeSection === item.href.slice(1)
                      ? 'text-white bg-white/[0.08]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}>
                  {t(item.label)}
                </a>
              ))}
              <Link href={route('directory.index')} onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isDirectoryContext
                    ? 'text-white bg-white/[0.08]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                }`}>
                {t('Directory')}
              </Link>
              <div className="pt-4 space-y-3 border-t border-white/[0.06]">
                {user ? (
                  <Link href={route('dashboard')}
                    className="block w-full text-center py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                    {t('Dashboard')}
                  </Link>
                ) : (
                  <>
                    <Link href={route('login')} className="block w-full text-center text-slate-400 py-3 text-sm font-medium">{t('Login')}</Link>
                    <Link href={route('register')}
                      className="block w-full text-center py-3 rounded-xl text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                      {t('Get Started')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
