import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink, Twitter, Sparkles, ShieldCheck, Flame, Lock } from 'lucide-react';
import { CheeseTheme } from '../types';
import { playCheeseNibble } from '../utils/cheeseSound';
import { OPENSEA_DROP_ENABLED, OPENSEA_DROP_URL, X_FOLLOW_URL } from '../config/whitelistConfig';

// 1. Your logo import from src/assets/images:
import siteLogo from '../assets/images/logo.png';

// 2. Logo assignment:
const WEBSITE_LOGO: string | null = siteLogo;

interface NavbarProps {
  currentTheme?: CheeseTheme;
  onThemeChange?: (theme: CheeseTheme) => void;
  currentPage?: 'home' | 'hornary';
  onNavigate?: (page: 'home' | 'hornary') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme = 'swiss-gold',
  onThemeChange,
  currentPage = 'home',
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    playCheeseNibble();
  };

  const goToPage = (page: 'home' | 'hornary', anchor?: string) => {
    playCheeseNibble();
    if (onNavigate) {
      onNavigate(page);
    }
    if (page === 'home' && anchor) {
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Art Showcase', href: '#gallery', isAnchor: true },
    { name: 'Roadmap', href: '#roadmap', isAnchor: true },
    { name: 'Whitelist', href: '#whitelist-checklist', isAnchor: true },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#120d09]/95 backdrop-blur-md border-b-2 border-amber-400/40 py-2.5 shadow-2xl shadow-black/80'
          : 'bg-[#120d09]/80 backdrop-blur-sm border-b border-amber-500/20 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Website Logo Slot */}
        <button
          type="button"
          onClick={() => goToPage('home')}
          className="flex items-center gap-3 group text-left"
        >
          {/* LOGO CONTAINER */}
          <div
            id="website-logo-container"
            className={`w-10 h-10 rounded-2xl ${
              WEBSITE_LOGO
                ? 'overflow-hidden border-2 border-amber-400/70 bg-[#17100b] shadow-md'
                : 'border-2 border-dashed border-amber-400/40 bg-[#17100b]/60'
            } flex items-center justify-center shrink-0 transition-all group-hover:border-amber-400`}
            title={WEBSITE_LOGO ? 'The RATTY Journey' : 'Logo Placeholder'}
          >
            {WEBSITE_LOGO ? (
              <img
                src={WEBSITE_LOGO}
                alt="The RATTY Journey Logo"
                className="w-full h-full object-contain p-0.5"
                referrerPolicy="no-referrer"
              />
            ) : null}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                The <span className="text-amber-400 font-extrabold tracking-normal">RATTY</span> Journey
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-400/30">
                Art First
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-amber-300/80 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
              <span>4,444 Artworks • OpenSea Launchpad</span>
            </div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-[#1a130d]/80 px-3 py-1.5 rounded-full border border-amber-500/30 shadow-inner">
          {currentPage === 'hornary' && (
            <button
              type="button"
              onClick={() => goToPage('home')}
              className="px-3 py-1 text-xs font-semibold rounded-full text-stone-200 hover:text-stone-950 hover:bg-amber-400 transition-all"
            >
              ← Back to Home
            </button>
          )}

          {currentPage === 'home' &&
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 text-stone-200 hover:text-stone-950 hover:bg-amber-400"
              >
                <span>{link.name}</span>
              </a>
            ))}

          {/* Dedicated Sub-branch link to Hornary Gallery */}
          <button
            type="button"
            onClick={() => goToPage('hornary')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
              currentPage === 'hornary'
                ? 'bg-[#D9C96C] text-stone-950 shadow-md font-black'
                : 'text-amber-300 bg-amber-400/15 border border-amber-400/40 hover:bg-amber-400 hover:text-stone-950'
            }`}
          >
            <span>👑</span>
            <span>Hornary Gallery</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-950 text-[#D9C96C] font-mono uppercase tracking-wider">
              Special Buyers
            </span>
          </button>
        </nav>

        {/* Social / OpenSea CTAs */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3">
          <a
            href={X_FOLLOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            id="nav-twitter-btn"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-stone-200 hover:text-white bg-[#1a130d] hover:bg-[#251b12] border border-amber-500/30 hover:border-amber-400 rounded-full transition-all"
            title="Follow @RattyOnHood on X"
          >
            <Twitter className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-mono text-amber-300">@RattyOnHood</span>
          </a>

          {!OPENSEA_DROP_ENABLED ? (
            <div
              id="nav-opensea-btn-locked"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-stone-400 font-bold text-xs tracking-wide border border-amber-500/30 cursor-not-allowed select-none filter blur-[0.3px] opacity-75"
              title="OpenSea Drop is currently locked"
            >
              <span className="text-sm grayscale">🧀</span>
              <span>OpenSea Drop</span>
              <Lock className="w-3.5 h-3.5 text-amber-400/90" />
            </div>
          ) : (
            <a
              href={OPENSEA_DROP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              id="nav-opensea-btn"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-stone-950 font-black text-xs tracking-wide shadow-lg shadow-amber-500/40 hover:shadow-amber-400/60 hover:scale-105 active:scale-95 transition-all border border-yellow-200"
            >
              <span className="text-sm">🧀</span>
              <span>OpenSea Drop</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => {
              playCheeseNibble();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 text-stone-200 hover:text-white rounded-xl bg-[#1a130d] border border-amber-500/30"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-[#140e0a]/98 border-b-2 border-amber-400 px-4 py-4 space-y-3 shadow-2xl"
          >
            {currentPage === 'hornary' && (
              <button
                type="button"
                onClick={() => goToPage('home')}
                className="w-full text-left px-3 py-2 text-sm font-bold rounded-xl text-stone-200 hover:text-stone-950 hover:bg-amber-400 transition-colors"
              >
                ← Back to Home
              </button>
            )}

            {currentPage === 'home' &&
              navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    playCheeseNibble();
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-sm font-bold rounded-xl text-stone-200 hover:text-stone-950 hover:bg-amber-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}

            <button
              type="button"
              onClick={() => goToPage('hornary')}
              className={`w-full text-left px-3 py-2 text-sm font-black rounded-xl transition-colors flex items-center justify-between ${
                currentPage === 'hornary'
                  ? 'bg-[#D9C96C] text-stone-950'
                  : 'text-amber-300 bg-amber-400/20 border border-amber-400/40'
              }`}
            >
              <span>👑 Hornary Gallery</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-[#D9C96C] font-mono uppercase">
                Special Buyers
              </span>
            </button>
            <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between gap-3">
              <a
                href={X_FOLLOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full text-center py-2.5 text-xs font-bold text-amber-300 bg-[#1e150f] border border-amber-500/40 rounded-xl flex items-center justify-center gap-2"
              >
                <Twitter className="w-3.5 h-3.5 text-amber-300" />
                <span>Follow @RattyOnHood on X</span>
              </a>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-xs text-amber-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Safe pre-mint showcase. Zero wallet connections. Verified on OpenSea.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};