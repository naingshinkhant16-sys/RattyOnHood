import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Sparkles, Eye, Flame, ArrowUpRight, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { NFT_COLLECTION } from '../data/nftData';
import { NFTItem, RarityTier } from '../types';
import { playCheeseSlice, playCheeseNibble } from '../utils/cheeseSound';

interface GalleryShowcaseProps {
  onSelectNFT: (nft: NFTItem) => void;
}

export const GalleryShowcase: React.FC<GalleryShowcaseProps> = ({ onSelectNFT }) => {
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tiers = [
    { label: 'All Cheeses', value: 'All', icon: '🧀' },
    { label: 'Golden Swiss (1-of-1)', value: 'Golden Swiss 1-of-1', icon: '👑' },
    { label: 'Truffle Brie (Top 5%)', value: 'Truffle Brie', icon: '🧈' },
    { label: 'Aged Cheddar (Top 20%)', value: 'Aged Cheddar', icon: '🧀' },
    { label: 'Smoked Gouda', value: 'Smoked Gouda', icon: '🫕' },
  ];

  const filteredNFTs = useMemo(() => {
    return NFT_COLLECTION.filter((nft) => {
      const matchesTier = selectedTier === 'All' || nft.tier === selectedTier;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        nft.name.toLowerCase().includes(q) ||
        nft.cheeseType.toLowerCase().includes(q) ||
        String(nft.tokenId).includes(q) ||
        nft.traits.some((t) => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
      return matchesTier && matchesSearch;
    });
  }, [selectedTier, searchQuery]);

  const handleTierSelect = (tier: string) => {
    playCheeseSlice();
    setSelectedTier(tier);
  };

  const getTierBadgeStyle = (tier: RarityTier) => {
    switch (tier) {
      case 'Golden Swiss 1-of-1':
        return 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-stone-950 font-black border-yellow-200 shadow-md shadow-amber-400/30';
      case 'Truffle Brie':
        return 'bg-purple-900/50 text-purple-200 border-purple-400/50 font-bold';
      case 'Aged Cheddar':
        return 'bg-amber-500/25 text-amber-300 border-amber-400/40 font-bold';
      case 'Smoked Gouda':
        return 'bg-[#251b14] text-stone-300 border-stone-600 font-medium';
      default:
        return 'bg-stone-800 text-stone-300';
    }
  };

  return (
    <section id="gallery" className="relative py-24 text-stone-100 overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-amber-400/15 blur-[140px] pointer-events-none rounded-full" />

      {/* Marquee Sneak Peek Ticker with Cheese Wheels */}
      <div className="mb-16 border-y-2 border-amber-400/30 bg-[#160f0a]/95 backdrop-blur-md py-3.5 overflow-hidden shadow-2xl">
        <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
          {/* Double array for continuous seamless scrolling */}
          {[...NFT_COLLECTION, ...NFT_COLLECTION].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => {
                playCheeseNibble();
                onSelectNFT(item);
              }}
              className="inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#22160f] border-2 border-amber-500/30 hover:border-amber-400 cursor-pointer transition-all duration-200 shrink-0 group hover:scale-105 shadow-md"
            >
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-dashed border-amber-400/40 bg-[#160f0a] flex items-center justify-center shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-[10px] font-mono font-bold text-amber-300">
                    #{item.tokenId}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-white group-hover:text-amber-300 transition-colors">
                  <span>{item.name}</span>
                  <span className="text-[10px] font-mono text-amber-400/80">#{item.tokenId}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-300">
                  <span className="text-amber-400 font-bold">{item.tier.split(' ')[0]}</span>
                  <span className="text-stone-500">•</span>
                  <span className="text-stone-300 truncate max-w-[120px]">{item.cheeseType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18110b]/90 border-2 border-amber-400/50 text-xs font-mono font-bold text-amber-300 shadow-md">
            <span className="text-sm">🧀</span>
            <span>GALLERY OF 10 RODENT ARISTOCRATS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight drop-shadow-md">
            SNEAK PEEK &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
              CHEESE CRATER ANALYTICS
            </span>
          </h2>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed bg-[#160f0a]/80 p-3 rounded-2xl border border-amber-500/20 max-w-2xl mx-auto">
            Inspect pre-mint character art, curd fermentation scores, and trait rarity matrices across all 10 showcase rodents ahead of our OpenSea launch.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b-2 border-amber-500/20">
          {/* Tier Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {tiers.map((tier) => (
              <button
                key={tier.value}
                onClick={() => handleTierSelect(tier.value)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedTier === tier.value
                    ? 'bg-amber-400 text-stone-950 shadow-lg shadow-amber-400/30 font-black border-2 border-yellow-100 scale-102'
                    : 'bg-[#18110b]/95 text-stone-300 hover:text-white hover:bg-[#251a11] border-2 border-amber-500/20'
                }`}
              >
                <span>{tier.icon}</span>
                <span>{tier.label}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by cheese, name, or #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#17100b]/95 border-2 border-amber-400/40 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-300 shadow-inner transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-300 hover:text-white bg-stone-800 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid: 2 parallel items on mobile (grid-cols-2), 3 on tablet, 5 on desktop */}
        {filteredNFTs.length === 0 ? (
          <div className="text-center py-20 bg-[#17100b]/90 rounded-3xl border-2 border-amber-400/30 p-8 shadow-2xl">
            <span className="text-4xl block mb-2">🧀</span>
            <p className="text-stone-300 text-sm font-semibold">No rats match your current cheese filter or search criteria.</p>
            <button
              onClick={() => {
                playCheeseSlice();
                setSelectedTier('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-amber-400 text-stone-950 text-xs font-black shadow-lg shadow-amber-400/30"
            >
              Reset Cheese Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {filteredNFTs.map((nft) => (
              <motion.div
                key={nft.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl sm:rounded-3xl bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] hover:border-stone-900 p-2.5 sm:p-5 transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-black/25 flex flex-col justify-between overflow-hidden"
              >
                {/* 3D Swiss crater cutout in top-right of card */}
                <div className="hidden sm:block absolute top-2.5 right-2.5 w-4 h-4 swiss-crater opacity-40 pointer-events-none" />

                <div>
                  {/* Image Container: Blank slot for local image insertion */}
                  <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-[#17100b] border-2 border-dashed border-[#ab9934] mb-2 sm:mb-3.5 flex flex-col items-center justify-center p-2 sm:p-4 text-center group-hover:border-stone-900 transition-colors">
                    {nft.image ? (
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pointer-events-none select-none">
                        <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-stone-900/95 border border-[#ab9934]/60 flex items-center justify-center text-[#D9C96C] mb-1 sm:mb-1.5 shadow-md">
                          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-mono font-bold text-stone-200">
                          #{String(nft.tokenId).padStart(4, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-mono text-stone-400 uppercase tracking-wider">
                          Blank Slot
                        </span>
                      </div>
                    )}

                    {/* Top tags */}
                    <div className="absolute top-1.5 sm:top-2.5 left-1.5 sm:left-2.5 right-1.5 sm:right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="px-1.5 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg bg-black/85 backdrop-blur-md text-[9px] sm:text-[11px] font-mono font-black text-[#D9C96C] border border-stone-800 shadow-sm">
                        #{String(nft.tokenId).padStart(4, '0')}
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg bg-black/85 backdrop-blur-md text-[8px] sm:text-[10px] font-mono text-stone-200 border border-stone-700">
                        #{nft.rarityRank}
                      </span>
                    </div>

                    {/* Quick inspect hover button */}
                    <div className="hidden sm:flex absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center p-4">
                      <button
                        onClick={() => {
                          playCheeseNibble();
                          onSelectNFT(nft);
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-stone-950 hover:bg-stone-800 text-[#D9C96C] text-xs font-black flex items-center gap-1.5 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all border border-stone-800"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Dossier</span>
                      </button>
                    </div>
                  </div>

                  {/* Info Header */}
                  <div className="space-y-0.5 sm:space-y-1 mb-1.5 sm:mb-2.5">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-display font-black text-xs sm:text-base text-stone-950 truncate">
                        {nft.name}
                      </h3>
                      <span className="text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg bg-stone-950 text-[#D9C96C] whitespace-nowrap">
                        {nft.tier.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-stone-800 truncate flex items-center gap-1">
                      <span>🧀</span>
                      <span className="truncate">{nft.cheeseType}</span>
                    </div>
                  </div>

                  {/* Traits preview chips */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 my-1.5 sm:my-2.5">
                    {nft.traits.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[8px] sm:text-[10px] font-mono font-medium px-1.5 sm:px-2 py-0.5 rounded sm:rounded-md bg-[#cbb759] text-stone-950 border border-[#ab9934] truncate max-w-[85px] sm:max-w-[125px]"
                      >
                        {t.name}
                      </span>
                    ))}
                    {nft.traits.length > 2 && (
                      <span className="text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded sm:rounded-md bg-[#cbb759] text-stone-900 font-mono font-bold border border-[#ab9934]">
                        +{nft.traits.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Inspect Dossier Action */}
                <div className="pt-2 sm:pt-3 border-t-2 border-[#ab9934]/40 flex items-center justify-between mt-1">
                  <div className="text-[9px] sm:text-[10px] font-mono font-bold text-stone-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-950" />
                    <span className="hidden xs:inline">Rank </span>#{nft.rarityRank}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      playCheeseNibble();
                      onSelectNFT(nft);
                    }}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-stone-950 hover:bg-stone-800 text-[#D9C96C] text-[10px] sm:text-xs font-mono font-bold transition-all hover:scale-105 shadow-md active:scale-95"
                    title="Inspect full character dossier"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tier Legend & OpenSea Drop note in #D9C96C */}
        <div className="mt-14 p-6 rounded-3xl bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] grid grid-cols-1 md:grid-cols-4 gap-4 text-xs shadow-2xl">
          <div className="p-4 rounded-2xl bg-[#cbb759] border-2 border-[#ab9934] space-y-1">
            <div className="font-black text-stone-950 flex items-center gap-1.5">
              <span>👑</span>
              <span>Golden Swiss (1-of-1)</span>
            </div>
            <div className="text-stone-900 font-medium leading-relaxed">Handcrafted mythical patriarchs with pure liquid 24K gold fondue traits and sovereignty rights.</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#cbb759] border-2 border-[#ab9934] space-y-1">
            <div className="font-black text-stone-950 flex items-center gap-1.5">
              <span>🧈</span>
              <span>Truffle Brie (Top 5%)</span>
            </div>
            <div className="text-stone-900 font-medium leading-relaxed">High-council aristocrats featuring velvet coats, gilded monocles, and private cellar access.</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#cbb759] border-2 border-[#ab9934] space-y-1">
            <div className="font-black text-stone-950 flex items-center gap-1.5">
              <span>🧀</span>
              <span>Aged Cheddar (Top 20%)</span>
            </div>
            <div className="text-stone-900 font-medium leading-relaxed">Battle-tested enforcers, ronin swordsmen, and master vault-crackers of Sector 7.</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#cbb759] border-2 border-[#ab9934] space-y-1">
            <div className="font-black text-stone-950 flex items-center gap-1.5">
              <span>🫕</span>
              <span>Smoked Gouda (Standard)</span>
            </div>
            <div className="text-stone-900 font-medium leading-relaxed">Cyber infiltrators and ventilation scouts equipped with night visors and curd blasters.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
