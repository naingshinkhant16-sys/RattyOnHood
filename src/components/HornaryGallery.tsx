import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Sparkles, Lock, Eye, X, ShieldCheck, Award, FileText, ExternalLink, ChevronRight, ArrowLeft } from 'lucide-react';
import { HORNARY_MASTERPIECES } from '../data/hornaryData';
import { HornaryMasterpiece } from '../types';
import { playCheeseSlice, playFondueBubble } from '../utils/cheeseSound';
import { OPENSEA_DROP_ENABLED, OPENSEA_DROP_URL } from '../config/whitelistConfig';

interface HornaryGalleryProps {
  onBackToHome?: () => void;
}

export const HornaryGallery: React.FC<HornaryGalleryProps> = ({ onBackToHome }) => {
  const [selectedLot, setSelectedLot] = useState<HornaryMasterpiece | null>(null);

  const handleOpenDossier = (lot: HornaryMasterpiece) => {
    playCheeseSlice();
    setSelectedLot(lot);
  };

  const handleCloseDossier = () => {
    playFondueBubble();
    setSelectedLot(null);
  };

  return (
    <div id="hornary-subbranch" className="relative min-h-screen py-16 text-stone-100 overflow-hidden">
      {/* Ambient background glow & subterranean luxury vault lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-amber-500/15 via-yellow-500/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Sub-Branch Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b-2 border-amber-500/20">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#D9C96C] text-stone-950 font-black text-xs font-mono border-2 border-[#bfae52] hover:bg-[#cbb759] transition-all shadow-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to The RATTY Journey (Home)</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-xs text-stone-300">
            <span className="text-amber-400 font-bold">The RATTY Journey</span>
            <span>/</span>
            <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
              Sub-Branch: Hornary Gallery
            </span>
          </div>
        </div>

        {/* Section Header: The Hornary Sub-branch */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c140d]/95 border-2 border-amber-400/60 text-xs font-mono font-bold text-amber-300 shadow-xl shadow-amber-500/10">
            <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="tracking-widest uppercase">HORNARY GALLERY • SPECIAL BUYER SUB-BRANCH</span>
            <span className="text-amber-500">•</span>
            <span className="text-stone-300 font-normal">15 MASTERPIECES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight drop-shadow-lg">
            THE HORNARY{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500">
              MASTERPIECE VAULT
            </span>
          </h1>

          <p className="text-stone-200 text-sm sm:text-base leading-relaxed bg-[#160f0a]/90 p-4 rounded-2xl border border-amber-500/30 max-w-2xl mx-auto shadow-md">
            A dedicated sanctuary reserved exclusively for special buyers and syndicate patrons. Featuring 15 pinnacle 1-of-1 artworks currently undergoing master curation and individual naming.
          </p>

          {/* Staging Notice / Creator info */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200/90 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Masterpiece art & bespoke specifications are currently staged as <strong className="text-amber-300 font-bold underline decoration-amber-400">???</strong> pending creator release.</span>
          </div>
        </div>

        {/* Gallery Controls & Lot Stats Bar in #D9C96C */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 p-5 rounded-3xl bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-950 text-[#D9C96C] flex items-center justify-center font-black text-base shadow-md">
              15
            </div>
            <div>
              <div className="text-xs font-black text-stone-950 font-mono uppercase tracking-wider">Total Special Buyer Lots</div>
              <div className="text-[11px] text-stone-800 font-medium">Masterpiece 1-of-1 Private Allocations (Staged as ???)</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-stone-800 font-bold">Vault Security:</span>
            <span className="px-2.5 py-1 rounded-xl bg-stone-950 text-emerald-400 font-bold flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Cryptographically Sealed
            </span>
          </div>
        </div>

        {/* 15 Masterpiece Art Cards Grid in #D9C96C - 2 Parallel on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {HORNARY_MASTERPIECES.map((lot, idx) => (
            <motion.div
              key={lot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (idx % 5) * 0.05 }}
              onClick={() => handleOpenDossier(lot)}
              className="group relative rounded-2xl sm:rounded-3xl bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] hover:border-stone-900 transition-all duration-300 p-2.5 sm:p-4 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-1.5 cursor-pointer overflow-hidden"
            >
              <div>
                {/* Lot Header & Status */}
                <div className="flex items-center justify-between mb-2 sm:mb-3 text-xs font-mono">
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-lg bg-stone-950 text-[#D9C96C] font-black text-[9px] sm:text-[11px]">
                    {lot.lotCode}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-stone-900 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-stone-950" />
                    <span className="hidden sm:inline">Special Buyer</span>
                    <span className="sm:hidden">VIP</span>
                  </span>
                </div>

                {/* Masterpiece Image Display: image or staged placeholder */}
                <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl bg-stone-950 border-2 border-stone-900 flex flex-col items-center justify-center overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform">
                  {lot.image ? (
                    <img
                      src={lot.image}
                      alt={lot.title !== '???' ? lot.title : lot.lotCode}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="p-2 sm:p-4 flex flex-col items-center justify-center text-center">
                      {/* Glowing background aura */}
                      <div className="absolute inset-0 bg-radial from-[#D9C96C]/10 to-transparent opacity-60 pointer-events-none" />

                      {/* Ornate Wax Seal Frame Icon */}
                      <div className="relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#D9C96C] p-0.5 shadow-lg shadow-black/50 mb-1 sm:mb-2 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-[#D9C96C] font-mono font-black text-sm sm:text-lg">
                          ?
                        </div>
                      </div>

                      {/* Masterpiece Display Indicator */}
                      <div className="relative z-10 space-y-0.5">
                        <div className="text-lg sm:text-2xl font-display font-black text-[#D9C96C] tracking-wider">
                          ???
                        </div>
                        <div className="text-[7px] sm:text-[9px] font-mono text-stone-400 uppercase tracking-widest">
                          [ Staged ]
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex flex-col items-center justify-center gap-1.5 p-3 text-center">
                    <Eye className="w-5 h-5 text-[#D9C96C]" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Inspect Dossier
                    </span>
                    <span className="text-[10px] text-[#D9C96C] font-mono">
                      Lot #{lot.lotNumber} Specs (???)
                    </span>
                  </div>
                </div>

                {/* Title & Specs Staging Display */}
                <div className="mt-2.5 sm:mt-3.5 space-y-1.5 sm:space-y-2">
                  <div className="flex items-baseline justify-between gap-1 sm:gap-2">
                    <h3 className="font-display font-black text-xs sm:text-base text-stone-950 truncate">
                      {lot.title}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-mono font-black text-stone-900 shrink-0">
                      {lot.specs.reserveValuation}
                    </span>
                  </div>

                  {/* Mini Specs Preview (all ???) */}
                  <div className="hidden sm:grid grid-cols-2 gap-1.5 pt-2 border-t border-[#ab9934]/40 text-[10px] font-mono">
                    <div className="bg-[#cbb759] px-2 py-1 rounded border border-[#ab9934]">
                      <span className="text-stone-800">Medium:</span>{' '}
                      <span className="text-stone-950 font-black">{lot.specs.medium}</span>
                    </div>
                    <div className="bg-[#cbb759] px-2 py-1 rounded border border-[#ab9934]">
                      <span className="text-stone-800">Cure:</span>{' '}
                      <span className="text-stone-950 font-black">{lot.specs.cheeseCure}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDossier(lot);
                }}
                className="mt-2.5 sm:mt-4 w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-stone-950 hover:bg-stone-800 text-[#D9C96C] text-[9px] sm:text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1 shadow-md active:scale-95"
              >
                <span>Specs (???)</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Private Buyer Concierge Callout in #D9C96C */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-950 text-[#D9C96C] text-xs font-mono font-bold">
              <Crown className="w-3.5 h-3.5 text-[#D9C96C]" />
              <span>Special Buyer Acquisition Protocol</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-black text-stone-950">
              Acquiring a Hornary Masterpiece Lot
            </h3>
            <p className="text-xs sm:text-sm text-stone-900 font-medium max-w-2xl leading-relaxed">
              Hornary Gallery lots represent high-table patron allocations with 1-on-1 naming rights. Minting and ownership transfers will be settled securely through OpenSea private listings upon collection launch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {!OPENSEA_DROP_ENABLED ? (
              <div
                id="hornary-opensea-btn-locked"
                className="px-6 py-3 rounded-2xl bg-stone-950/40 text-stone-400 font-bold text-xs font-mono flex items-center gap-2 border border-stone-800 cursor-not-allowed select-none filter blur-[0.4px] opacity-75"
                title="OpenSea Drop is locked for now."
              >
                <Lock className="w-3.5 h-3.5 text-stone-400" />
                <span>Follow OpenSea Drop (Locked)</span>
              </div>
            ) : (
              <a
                href={OPENSEA_DROP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playFondueBubble()}
                id="hornary-opensea-btn"
                className="px-6 py-3 rounded-2xl bg-stone-950 hover:bg-stone-800 text-[#D9C96C] font-black text-xs font-mono flex items-center gap-2 shadow-xl transition-all hover:scale-105"
              >
                <span>Follow OpenSea Drop</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Masterpiece Dossier Modal in #D9C96C */}
      <AnimatePresence>
        {selectedLot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={handleCloseDossier}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] p-6 sm:p-8 shadow-2xl shadow-black max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseDossier}
                className="absolute top-5 right-5 p-2 rounded-full bg-stone-950 text-[#D9C96C] hover:bg-stone-800 transition-colors shadow-md"
                aria-label="Close Dossier"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2.5 mb-6 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-stone-950 text-[#D9C96C] font-bold">
                  {selectedLot.lotCode}
                </span>
                <span className="text-stone-800 font-bold">•</span>
                <span className="text-stone-900 font-bold">{selectedLot.status}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Masterpiece Artwork Display: Image or Staged Placeholder */}
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-2xl bg-stone-950 border-2 border-stone-900 flex flex-col items-center justify-center overflow-hidden shadow-inner">
                    {selectedLot.image ? (
                      <img
                        src={selectedLot.image}
                        alt={selectedLot.title !== '???' ? selectedLot.title : selectedLot.lotCode}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="p-6 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full bg-[#D9C96C] p-0.5 shadow-xl shadow-black/50 mb-3 flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-[#D9C96C] font-mono font-black text-3xl">
                            ?
                          </div>
                        </div>
                        <div className="text-4xl font-display font-black text-[#D9C96C] tracking-wider mb-1">
                          ???
                        </div>
                        <div className="text-xs font-mono text-stone-300 uppercase tracking-widest">
                          Artwork Display
                        </div>
                        <div className="text-[11px] text-stone-400 mt-2 max-w-xs leading-relaxed">
                          Pending artist finalization. Final image and bespoke artwork title will be inserted by the creator.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#cbb759] border border-[#ab9934] text-xs font-mono text-stone-950 flex items-center justify-between font-bold">
                    <span className="text-stone-800 font-medium">Estimated Reserve:</span>
                    <span className="text-stone-950 font-black text-sm">{selectedLot.specs.reserveValuation}</span>
                  </div>
                </div>

                {/* Right: Dossier Specs Table */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-display font-black text-stone-950">
                      Masterpiece {selectedLot.title}
                    </h3>
                    <p className="text-xs font-mono text-stone-800 font-bold mt-1">
                      {selectedLot.specs.edition}
                    </p>
                  </div>

                  {/* Specs List with ??? values */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-stone-950" />
                      <span>Specifications & Curatorial Data</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#cbb759] border border-[#ab9934] space-y-2.5 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-[#ab9934]/50">
                        <span className="text-stone-800">Medium:</span>
                        <span className="text-stone-950 font-black">{selectedLot.specs.medium}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#ab9934]/50">
                        <span className="text-stone-800">Dimensions:</span>
                        <span className="text-stone-950 font-black">{selectedLot.specs.dimensions}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#ab9934]/50">
                        <span className="text-stone-800">Rarity Tier:</span>
                        <span className="text-stone-950 font-black">{selectedLot.specs.rarity}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#ab9934]/50">
                        <span className="text-stone-800">Cheese Cure / Finish:</span>
                        <span className="text-stone-950 font-black">{selectedLot.specs.cheeseCure}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#ab9934]/50">
                        <span className="text-stone-800">Provenance:</span>
                        <span className="text-stone-950 font-black">{selectedLot.specs.provenance}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-stone-800">Smart Contract:</span>
                        <span className="text-stone-950 font-bold">{selectedLot.specs.smartContract}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attributes Matrix */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-stone-950" />
                      <span>Masterpiece Attributes (Staged)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {selectedLot.attributes.map((attr, aIdx) => (
                        <div key={aIdx} className="p-2.5 rounded-xl bg-[#cbb759] border border-[#ab9934] text-xs font-mono">
                          <div className="text-[10px] text-stone-800 font-medium">{attr.traitType}</div>
                          <div className="text-stone-950 font-black text-xs">{attr.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Buyer Privileges */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-mono font-bold text-stone-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-stone-950" />
                      <span>Special Buyer Privileges</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-900 font-medium">
                      {selectedLot.specialBuyerPerks.map((perk, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-stone-950 font-bold">✓</span>
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Note */}
              <div className="mt-8 pt-5 border-t border-[#ab9934]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-800">
                <span>Cryptographically secured under Cheddar Syndicate High-Table Charter.</span>
                <button
                  type="button"
                  onClick={handleCloseDossier}
                  className="px-5 py-2 rounded-xl bg-stone-950 text-[#D9C96C] font-bold transition-all hover:bg-stone-800"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
