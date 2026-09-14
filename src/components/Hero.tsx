import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Sparkles, Twitter, ShieldCheck, ChevronRight, Eye, Lock, Image as ImageIcon } from 'lucide-react';
import { NFT_COLLECTION, SYNDICATE_STATS } from '../data/nftData';
import { NFTItem } from '../types';
import { playCheeseNibble, playCheeseSlice, playFondueBubble } from '../utils/cheeseSound';
import { OPENSEA_DROP_ENABLED, OPENSEA_DROP_URL, X_FOLLOW_URL } from '../config/whitelistConfig';

interface HeroProps {
  onSelectNFT: (nft: NFTItem) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectNFT }) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredNFTs = NFT_COLLECTION.filter((n) => n.isFeatured);
  const currentNFT = featuredNFTs[featuredIndex] || NFT_COLLECTION[0];

  const handleCardSwitch = (idx: number) => {
    playCheeseSlice();
    setFeaturedIndex(idx);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient glowing cheese vapor */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[500px] bg-gradient-to-b from-amber-400/25 via-yellow-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-24 right-10 w-80 h-80 bg-yellow-400/20 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute bottom-12 left-10 w-80 h-80 bg-amber-500/20 blur-[100px] pointer-events-none rounded-full" />

      {/* Giant Decorative Cheese Wheel outline background */}
      <div className="absolute right-[-140px] top-[10%] w-[580px] h-[580px] rounded-full border-2 border-amber-400/20 border-dashed pointer-events-none -z-10 hidden xl:flex items-center justify-center">
        <div className="w-[360px] h-[360px] rounded-full border border-amber-400/15 border-dotted" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Lore tease, CTAs, countdown */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18110b]/90 border-2 border-amber-400/50 text-xs font-bold text-amber-300 shadow-lg shadow-amber-500/20"
            >
              <span className="text-base">🧀</span>
              <span className="tracking-wide uppercase font-mono text-[11px]">100% Raw Milk Cave-Aged</span>
              <span className="text-amber-500">•</span>
              <span className="text-white">Official OpenSea Launchpad</span>
            </motion.div>

            {/* Main Headline with Cheesy Gradient & 3D Depth */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-black tracking-tight text-white leading-[1.06] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            >
              THE UNDERGROUND{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-300 to-amber-500 drop-shadow-[0_0_35px_rgba(245,158,11,0.6)]">
                CHEESE HEIST
                {/* Visual melted cheese underline */}
                <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-full" />
              </span>{' '}
              HAS BEGUN.
            </motion.h1>

            {/* Subheading / Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-stone-200 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-sm"
            >
              RATTY is built around <span className="text-amber-300 font-bold underline decoration-amber-400/50 underline-offset-4">art first</span> — with a collector experience that grows beyond the mint.
            </motion.p>
            <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed -mt-3">
              A curated collection of <strong className="text-amber-200 font-semibold">4,444 hand-drawn artworks</strong> crafted for collectors who appreciate originality, character, and artistic detail.
            </p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
            >
              {/* View on OpenSea CTA: Blurred & Locked if !OPENSEA_DROP_ENABLED, Clickable if true */}
              {!OPENSEA_DROP_ENABLED ? (
                <div
                  id="hero-opensea-cta-locked"
                  className="relative group cursor-not-allowed select-none"
                  title="OpenSea Drop is currently locked. Unlocks at launch."
                >
                  <div className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-amber-500/20 text-stone-400 font-bold text-sm tracking-wide border-2 border-amber-500/30 backdrop-blur-xs filter blur-[0.4px] opacity-75">
                    <span className="text-xl grayscale">🧀</span>
                    <span>View on OpenSea</span>
                    <Lock className="w-4 h-4 text-amber-400/90 ml-1" />
                  </div>
                  <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-stone-900 border border-amber-400/60 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg">
                    🔒 Locked
                  </span>
                </div>
              ) : (
                <a
                  href={OPENSEA_DROP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playFondueBubble()}
                  id="hero-opensea-cta"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-stone-950 font-black text-sm tracking-wide shadow-xl shadow-amber-500/40 hover:shadow-amber-400/60 hover:scale-105 active:scale-95 transition-all border-2 border-yellow-100"
                >
                  <span className="text-xl">🧀</span>
                  <span>View on OpenSea</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {/* Follow Twitter / X CTA */}
              <a
                href={X_FOLLOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCheeseNibble()}
                id="hero-twitter-cta"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#1c130d] hover:bg-[#2a1d13] text-stone-200 hover:text-white font-semibold text-sm border-2 border-amber-500/30 hover:border-amber-400 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/50"
              >
                <Twitter className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Follow</span>
                <span className="text-xs text-amber-300 font-mono font-bold">@RattyOnHood</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400/70" />
              </a>
            </motion.div>

            {/* Zero-Drainer Safe Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-xs text-stone-300 pt-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-mono">100% Pre-mint Showcase. Zero wallet connections. Verified on OpenSea.</span>
            </motion.div>
          </div>

          {/* Right Column: Interactive Featured Rat Card with Swiss Cheese Hole Accents */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-md"
            >
              {/* Golden aura background glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/50 via-yellow-400/40 to-amber-600/50 rounded-3xl blur-2xl opacity-80 animate-pulse" />

              {/* Card Container styled in #D9C96C */}
              <div className="relative bg-[#D9C96C] text-stone-950 rounded-3xl border-2 border-[#bfae52] p-5 sm:p-6 shadow-2xl overflow-hidden">
                {/* 3D Swiss Cheese Crater cutouts on card body */}
                <div className="absolute top-4 right-4 w-7 h-7 swiss-crater opacity-70 pointer-events-none" />
                <div className="absolute top-16 right-9 w-4 h-4 swiss-crater-sm opacity-60 pointer-events-none" />
                <div className="absolute bottom-20 left-3 w-5 h-5 swiss-crater-sm opacity-50 pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between mb-3.5 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-stone-950 text-[#D9C96C] font-mono text-xs font-black shadow-md">
                      #{String(currentNFT.tokenId).padStart(4, '0')}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#cbb759] text-stone-900 border border-[#ab9934]">
                      {currentNFT.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-stone-900">
                    <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                    <span>Rank #{currentNFT.rarityRank}</span>
                  </div>
                </div>

                {/* Artwork Render: Blank slot if no image, or image if provided locally */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#17100b] border-2 border-dashed border-[#bfae52] group shadow-inner flex flex-col items-center justify-center p-6 text-center">
                  {currentNFT.image ? (
                    <img
                      src={currentNFT.image}
                      alt={currentNFT.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 select-none pointer-events-none">
                      <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-[#ab9934]/60 flex items-center justify-center text-[#D9C96C] shadow-lg">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                      <span className="font-mono text-sm font-black text-stone-200">
                        #{String(currentNFT.tokenId).padStart(4, '0')} Artwork Slot
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">
                        Blank: Ready for local image insertion
                      </span>
                    </div>
                  )}
                  {/* Subtle gradient overlay at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-85 pointer-events-none" />

                  {/* Cheese Type Tag overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="px-3 py-1.5 rounded-xl bg-stone-950/90 backdrop-blur-md border border-[#bfae52]/40 text-xs font-bold text-[#D9C96C] truncate max-w-[65%] shadow-lg">
                      🧀 {currentNFT.cheeseType}
                    </div>
                    <button
                      onClick={() => {
                        playCheeseNibble();
                        onSelectNFT(currentNFT);
                      }}
                      id="hero-inspect-btn"
                      className="px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-[#D9C96C] text-xs font-black flex items-center gap-1.5 shadow-lg transition-all hover:scale-105"
                      title="Inspect full traits & cheese profile"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="mt-4 space-y-3 relative z-10">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl sm:text-2xl font-display font-black text-stone-950 tracking-tight flex items-center gap-2">
                      {currentNFT.name}
                      <span className="text-sm">🧀</span>
                    </h3>
                    <div className="text-right">
                      <div className="text-[10px] text-stone-700 font-mono uppercase tracking-wider font-semibold">Est. Drop</div>
                      <div className="text-base sm:text-lg font-mono font-black text-stone-950">
                        {currentNFT.estimatedPriceETH} ETH
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-900 italic line-clamp-2 leading-relaxed bg-[#cbb759]/70 p-2 rounded-xl border border-[#ab9934]">
                    "{currentNFT.quote}"
                  </p>

                  {/* Traits preview bar */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {currentNFT.traits.slice(0, 3).map((trait, idx) => (
                      <div
                        key={idx}
                        className="bg-[#cbb759] p-2 rounded-xl border border-[#ab9934] text-center shadow-inner"
                      >
                        <div className="text-[9px] uppercase tracking-wider text-stone-700 truncate font-mono font-semibold">
                          {trait.category}
                        </div>
                        <div className="text-xs font-black text-stone-950 truncate">
                          {trait.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Character selector pills */}
                  <div className="pt-2 border-t border-[#ab9934]/40 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-stone-800">
                      CHEESE SAMPLES ({featuredIndex + 1}/{featuredNFTs.length})
                    </span>
                    <div className="flex gap-2">
                      {featuredNFTs.map((nft, idx) => (
                        <button
                          key={nft.id}
                          onClick={() => handleCardSwitch(idx)}
                          className={`h-3 rounded-full transition-all ${
                            idx === featuredIndex
                              ? 'bg-stone-950 w-8 shadow-sm'
                              : 'bg-[#ab9934] hover:bg-stone-900 w-3'
                          }`}
                          aria-label={`Show ${nft.name}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {SYNDICATE_STATS.map((stat, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group shadow-xl shadow-black/40 relative overflow-hidden"
            >
              {/* Subtle mini Swiss cheese hole inside card */}
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-stone-950/10" />

              <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800 mb-1 flex items-center justify-between">
                <span>{stat.label}</span>
                <span className="text-stone-900 text-xs">🧀</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-black text-stone-950">
                {stat.value}
              </div>
              <div className="text-xs text-stone-800 mt-1 flex items-center gap-1 group-hover:text-stone-950 transition-colors font-mono font-medium">
                <ChevronRight className="w-3.5 h-3.5 text-stone-900" />
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
