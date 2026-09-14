import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GalleryShowcase } from './components/GalleryShowcase';
import { Roadmap } from './components/Roadmap';
import { HornaryGallery } from './components/HornaryGallery';
import { Footer } from './components/Footer';
import { CheeseDivider } from './components/CheeseDivider';
import { TraitModal } from './components/TraitModal';
import { CheeseBackgroundTemplate } from './components/CheeseBackgroundTemplate';
import { NFTItem, CheeseTheme } from './types';

export default function App() {
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [currentTheme, setCurrentTheme] = useState<CheeseTheme>('swiss-gold');
  const [currentPage, setCurrentPage] = useState<'home' | 'hornary'>(() => {
    return window.location.hash === '#hornary' ? 'hornary' : 'home';
  });

  // Listen to hash changes for direct URL sub-branch navigation
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#hornary') {
        setCurrentPage('hornary');
      } else if (window.location.hash === '#home' || window.location.hash === '') {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: 'home' | 'hornary') => {
    setCurrentPage(page);
    if (page === 'hornary') {
      window.location.hash = 'hornary';
    } else {
      if (window.location.hash === '#hornary') {
        history.pushState(null, '', ' ');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CheeseBackgroundTemplate currentTheme={currentTheme} onThemeChange={setCurrentTheme}>
      {/* Fixed Navigation with Cheese Styling and Sub-Branch Routing */}
      <Navbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main className="pt-20">
        {currentPage === 'home' ? (
          <>
            {/* 1. Hero Section with OpenSea Drop CTA */}
            <Hero onSelectNFT={(nft) => setSelectedNFT(nft)} />

            {/* Melting Fondue Transition */}
            <CheeseDivider fillColor="#140e0a" />

            {/* 2. Interactive Gallery / Showcase with Crater Analytics */}
            <GalleryShowcase onSelectNFT={(nft) => setSelectedNFT(nft)} />

            {/* Melting Fondue Transition */}
            <CheeseDivider fillColor="#140e0a" />

            {/* 4. Launch Timeline / Roadmap */}
            <Roadmap />
          </>
        ) : (
          /* Dedicated Sub-Branch Page: Only Hornary Gallery */
          <HornaryGallery onBackToHome={() => handleNavigate('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Detailed Trait & Dossier Inspection Modal */}
      <TraitModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
    </CheeseBackgroundTemplate>
  );
}
