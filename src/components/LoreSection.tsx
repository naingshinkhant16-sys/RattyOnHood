import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LORE_CHAPTERS, vaultHeroImg } from '../data/nftData';
import { BookOpen, ShieldAlert, Sparkles, MapPin, Key, Crown, Flame, Clock } from 'lucide-react';
import { playCheeseSlice, playFondueBubble, playCheeseNibble } from '../utils/cheeseSound';

export const LoreSection: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [agingMonths, setAgingMonths] = useState(24);
  const currentChapter = LORE_CHAPTERS[activeChapter];

  const syndicateFactions = [
    {
      title: 'The Vault Sentinels',
      desc: 'Heavy-armored guardians of the deep-core aging caves who test rind hardness and guard the master brine.',
      icon: ShieldAlert,
      cheese: 'Aged Cheddar & Emmental',
      badge: 'Heavy Defense',
      sharpness: '9.4/10',
    },
    {
      title: 'The Infiltrator Guild',
      desc: 'Specialists who glide through refrigeration ventilation to recover rare curd samples and secret recipes.',
      icon: Key,
      cheese: 'Smoked Gouda & Alpine Gruyère',
      badge: 'Stealth Ops',
      sharpness: '8.9/10',
    },
    {
      title: 'The Royal Curd Council',
      desc: 'The aristocratic high court overseeing ancient fermentation scrolls and the Legendary Golden Wheel.',
      icon: Crown,
      cheese: 'Truffle Brie & Golden Swiss',
      badge: 'Sovereign Clan',
      sharpness: '9.9/10',
    },
  ];

  const handleChapterClick = (idx: number) => {
    playCheeseSlice();
    setActiveChapter(idx);
  };

  return (
    <section id="lore" className="relative py-24 text-stone-200 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-yellow-500/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18110b]/90 border-2 border-amber-400/50 text-xs font-mono font-bold text-amber-300 shadow-md">
            <span className="text-sm">🧀</span>
            <span>THE FROMAGERIE MYTHOS</span>
            <span className="text-amber-500">•</span>
            <span className="text-stone-300">SECTOR 7</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight drop-shadow-md">
            DEEP BENEATH CURD CITY, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
              A DAIRY REVOLUTION BREWS.
            </span>
          </h2>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed bg-[#160f0a]/80 p-3 rounded-2xl border border-amber-500/20 max-w-2xl mx-auto">
            Buried in the sub-zero subterranean vaults beneath Neo-Fromage, 5,555 extraordinary rodents have perfected the forbidden art of dairy alchemy.
          </p>
        </div>

        {/* Featured Vault Visual & Storyboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Cinematic Visual with Swiss Cheese Hole Border */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative rounded-3xl overflow-hidden border-2 border-amber-400/50 group shadow-2xl bg-[#140e09]"
          >
            {/* 3D Swiss Cheese Crater Accents */}
            <div className="absolute top-3 left-3 w-6 h-6 swiss-crater opacity-70 z-10 pointer-events-none" />
            <div className="absolute top-12 left-8 w-3 h-3 swiss-crater-sm opacity-60 z-10 pointer-events-none" />

            <div className="aspect-[16/10] relative overflow-hidden bg-stone-950">
              <img
                src={vaultHeroImg}
                alt="Subterranean Cheese Vault"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140e09] via-transparent to-black/30" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-amber-200 z-10">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-amber-400/40 shadow-lg">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Sector 7: The Master Fondue Reactor
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-400 text-stone-950 font-black shadow-md">
                  Vault Door #09
                </span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Lore Chapters */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Chapter Selection Tabs in #D9C96C container */}
            <div className="flex gap-2 p-1.5 rounded-2xl bg-[#D9C96C] border-2 border-[#bfae52] shadow-xl overflow-x-auto">
              {LORE_CHAPTERS.map((chapter, idx) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterClick(idx)}
                  className={`flex-1 min-w-[120px] px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all text-center flex items-center justify-center gap-1.5 ${
                    idx === activeChapter
                      ? 'bg-stone-950 text-[#D9C96C] shadow-md font-black scale-102'
                      : 'text-stone-900 hover:text-black hover:bg-[#cbb759]'
                  }`}
                >
                  <span>🧀</span>
                  <span>Chapter {idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Active Chapter Content in #D9C96C */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] space-y-4 shadow-2xl relative overflow-hidden">
              {/* Corner cheese crater */}
              <div className="absolute -bottom-3 -right-3 w-10 h-10 swiss-crater opacity-40 pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-stone-950 text-[#D9C96C]">
                  {currentChapter.tag}
                </span>
                <span className="text-xs font-mono font-bold text-stone-800">
                  RECORD {activeChapter + 1} / {LORE_CHAPTERS.length}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-black text-stone-950 tracking-tight">
                {currentChapter.title}
              </h3>

              <p className="text-stone-900 font-semibold text-sm leading-relaxed italic border-l-4 border-stone-950 pl-3.5 bg-[#cbb759]/70 py-1.5 rounded-r-xl">
                "{currentChapter.summary}"
              </p>

              <p className="text-stone-900 text-sm leading-relaxed pt-1 font-medium">
                {currentChapter.text}
              </p>

              {/* Interactive Wheel Aging Simulator inside Lore */}
              <div className="pt-3 border-t border-[#ab9934]/40">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-stone-900 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-950" />
                    Vault Maturation:
                  </span>
                  <span className="text-stone-950 font-black bg-[#cbb759] px-2 py-0.5 rounded border border-[#ab9934]">
                    {agingMonths} Months ({agingMonths >= 30 ? 'Reserve Master' : agingMonths >= 18 ? 'Sharp Vintage' : 'Mild Cream'})
                  </span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={36}
                  step={6}
                  value={agingMonths}
                  onChange={(e) => {
                    playCheeseSlice();
                    setAgingMonths(Number(e.target.value));
                  }}
                  className="w-full accent-stone-950 cursor-pointer h-2 bg-[#bda945] rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-800 font-bold mt-1">
                  <span>6 Mo (Fresh)</span>
                  <span>18 Mo (Sharp)</span>
                  <span>36 Mo (Alpine Gold)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Faction Cards Grid with #D9C96C Box Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {syndicateFactions.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <motion.div
                key={fac.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] hover:border-stone-900 transition-all duration-300 group hover:-translate-y-1 shadow-xl relative overflow-hidden"
              >
                {/* 3D Crater cutout on card */}
                <div className="absolute top-3 right-3 w-5 h-5 swiss-crater opacity-50 pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-950 text-[#D9C96C] flex items-center justify-center group-hover:scale-105 transition-all shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#cbb759] text-stone-900 border border-[#ab9934]">
                    {fac.badge}
                  </span>
                </div>
                <h4 className="text-lg font-display font-black text-stone-950 mb-2">
                  {fac.title}
                </h4>
                <p className="text-xs text-stone-900 font-medium leading-relaxed mb-4">
                  {fac.desc}
                </p>
                <div className="text-[11px] font-mono text-stone-800 pt-3 border-t border-[#ab9934]/40 flex items-center justify-between">
                  <span>Sharpness: <strong className="text-stone-950 font-black">{fac.sharpness}</strong></span>
                  <span className="text-stone-950 font-bold truncate max-w-[55%]">🧀 {fac.cheese}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
