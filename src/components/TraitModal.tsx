import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Sparkles, ShieldCheck, Layers, Lock, Image as ImageIcon, ArrowDown } from 'lucide-react';
import { NFTItem } from '../types';
import { OPENSEA_DROP_ENABLED, OPENSEA_DROP_URL } from '../config/whitelistConfig';
import { playFondueBubble } from '../utils/cheeseSound';

interface TraitModalProps {
  nft: NFTItem | null;
  onClose: () => void;
}

export const TraitModal: React.FC<TraitModalProps> = ({ nft, onClose }) => {
  if (!nft) return null;

  const handleClaimChessyRatty = () => {
    playFondueBubble();
    onClose();
    setTimeout(() => {
      const checklistEl = document.getElementById('whitelist-checklist');
      if (checklistEl) {
        checklistEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Golden Swiss 1-of-1':
        return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 font-bold border-amber-300';
      case 'Truffle Brie':
        return 'bg-purple-900/50 text-purple-200 border-purple-500/40';
      case 'Aged Cheddar':
        return 'bg-amber-600/30 text-amber-200 border-amber-500/40';
      case 'Smoked Gouda':
        return 'bg-stone-800 text-stone-300 border-stone-600';
      default:
        return 'bg-stone-800 text-stone-300 border-stone-700';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window in #D9C96C */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#bfae52] bg-[#cbb759]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-stone-950 text-[#D9C96C] font-bold shadow-xs">
                TOKEN #{String(nft.tokenId).padStart(4, '0')}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-xl font-bold bg-stone-950 text-[#D9C96C]">
                {nft.tier}
              </span>
            </div>
            <button
              onClick={onClose}
              id="close-trait-modal-btn"
              className="p-1.5 rounded-xl bg-stone-950 text-[#D9C96C] hover:bg-stone-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto">
            {/* Artwork Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-[#ab9934] bg-[#17100b] shadow-xl group flex flex-col items-center justify-center p-6 text-center">
                {nft.image ? (
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center select-none pointer-events-none">
                    <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-[#ab9934]/60 flex items-center justify-center text-[#D9C96C] mb-2 shadow-lg">
                      <ImageIcon className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-mono font-bold text-stone-200">
                      Token #{String(nft.tokenId).padStart(4, '0')}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400 mt-0.5">
                      Blank Art Slot • Local artwork file
                    </span>
                  </div>
                )}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-stone-950/90 text-xs font-mono text-[#D9C96C] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9C96C]" />
                  Rarity Rank #{nft.rarityRank}
                </div>
              </div>

              {/* Claim Chessy Ratty CTA Button */}
              <div className="space-y-2">
                <button
                  type="button"
                  id="modal-claim-chessy-ratty-btn"
                  onClick={handleClaimChessyRatty}
                  className="group w-full py-3.5 px-4 rounded-2xl bg-stone-950 hover:bg-stone-900 text-[#D9C96C] font-black text-sm tracking-wide shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-[#ab9934] cursor-pointer"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">🧀</span>
                  <span>Claim Chessy Ratty</span>
                  <ArrowDown className="w-4 h-4 text-[#D9C96C] group-hover:translate-y-0.5 transition-transform" />
                </button>
                <div className="text-[11px] text-center font-mono text-stone-900 font-semibold flex items-center justify-center gap-1">
                  <span>Scrolls to Whitelist Checklist Box</span>
                </div>
              </div>

              {/* OpenSea Pre-Mint CTA: Locked/Blurred if !OPENSEA_DROP_ENABLED */}
              {!OPENSEA_DROP_ENABLED ? (
                <div
                  id="modal-opensea-btn-locked"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-stone-950/40 text-stone-400 font-bold text-sm border border-stone-800 cursor-not-allowed select-none filter blur-[0.4px] opacity-75"
                  title="OpenSea Drop is locked for now."
                >
                  <Lock className="w-4 h-4 text-stone-400" />
                  <span>View Drop on OpenSea (Locked)</span>
                </div>
              ) : (
                <a
                  href={OPENSEA_DROP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="modal-opensea-btn"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-stone-950 text-[#D9C96C] font-black text-sm hover:bg-stone-800 transition-all shadow-md active:scale-95"
                >
                  <span>View Drop on OpenSea</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Trait & Info Column */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-stone-950">
                  {nft.name}
                </h3>
                <p className="text-xs font-mono text-stone-800 font-bold mt-1 flex items-center gap-1.5">
                  <span>🧀 Core Infusion:</span>
                  <span className="text-stone-950 font-black">{nft.cheeseType}</span>
                </p>
              </div>

              {/* Backstory Quote */}
              <div className="p-4 rounded-2xl bg-[#cbb759] border-l-4 border-stone-950 text-stone-900 font-medium text-sm italic">
                "{nft.quote}"
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-800 font-bold">
                  Character Dossier
                </div>
                <p className="text-xs sm:text-sm text-stone-900 font-medium leading-relaxed">
                  {nft.description}
                </p>
              </div>

              {/* Procedural Traits Grid in #D9C96C */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-stone-950" />
                    <span>Attributes & Trait Rarity ({nft.traits.length})</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-800 font-semibold">ERC-721A Spec</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {nft.traits.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#cbb759] border-2 border-[#ab9934] text-stone-950"
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-800 font-bold truncate">
                        {t.category}
                      </div>
                      <div className="text-xs font-black text-stone-950 truncate mt-0.5">
                        {t.name}
                      </div>
                      <div className="text-[10px] font-mono text-stone-800 mt-1 flex items-center justify-between font-semibold">
                        <span>Rarity:</span>
                        <span className="text-stone-950 font-black">{t.rarityPct}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety note */}
              <div className="p-3.5 rounded-xl bg-[#cbb759] border-2 border-[#ab9934] text-[11px] text-stone-950 font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-950 shrink-0" />
                <span>Pre-mint preview. Artwork and full high-resolution IPFS metadata reveal after OpenSea mint.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
