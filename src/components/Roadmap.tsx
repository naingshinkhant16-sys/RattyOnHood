import React from 'react';
import { motion } from 'motion/react';
import { ROADMAP_PHASES } from '../data/nftData';
import { Sparkles, Palette, Coins, Brush, Crown, Bookmark } from 'lucide-react';
import { playCheeseNibble } from '../utils/cheeseSound';

export const Roadmap: React.FC = () => {
  const phaseIcons = [
    <Palette key="1" className="w-5 h-5 text-amber-400" />,
    <Coins key="2" className="w-5 h-5 text-amber-400" />,
    <Brush key="3" className="w-5 h-5 text-amber-400" />,
    <Crown key="4" className="w-5 h-5 text-amber-400" />,
  ];

  return (
    <section id="roadmap" className="relative py-28 text-stone-100 overflow-hidden">
      {/* Subterranean ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-yellow-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18110b]/90 border border-amber-400/40 text-xs font-mono font-bold text-amber-300 shadow-lg">
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-widest uppercase">THE CHRONOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight drop-shadow-md">
            RATTY — <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500">ROADMAP</span>
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            RATTY is built around art first — with a collector experience that grows beyond the mint.
          </p>
        </div>

        {/* 4 Phases Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROADMAP_PHASES.map((phase, idx) => {
            const hasChapterNote = Boolean(phase.chapterNote);

            return (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => playCheeseNibble()}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] shadow-2xl hover:shadow-black/30 hover:-translate-y-1 cursor-default overflow-hidden ${
                  hasChapterNote ? 'md:col-span-2' : ''
                }`}
              >
                {/* Corner Cheese Patina */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/20 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

                <div>
                  {/* Top Bar: Number & Tag */}
                  <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-[#ab9934]/40">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                        {phase.number}
                      </span>
                      <span className="text-stone-700 font-mono text-xs">/</span>
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-800">
                        {phase.tag}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-stone-950 text-[#D9C96C] flex items-center justify-center shadow-sm">
                      {phaseIcons[idx] || <Sparkles className="w-4 h-4 text-[#D9C96C]" />}
                    </div>
                  </div>

                  {/* Main Phase Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-black text-stone-950 tracking-tight mb-4">
                    {phase.title}
                  </h3>

                  {/* Body Copy */}
                  <div className="space-y-3.5 text-sm sm:text-base leading-relaxed">
                    <p className="font-bold text-stone-950">
                      {phase.lead}
                    </p>
                    <p className="text-stone-900 font-medium text-sm leading-relaxed">
                      {phase.detail}
                    </p>
                  </div>
                </div>

                {/* Optional "A New Chapter After Mint" closing card on Phase 04 */}
                {phase.chapterNote && (
                  <div className="mt-8 pt-6 border-t-2 border-[#ab9934]/40">
                    <div className="p-6 rounded-2xl bg-[#cbb759] border-2 border-[#ab9934] relative overflow-hidden shadow-inner">
                      <div className="absolute top-0 left-0 w-2 h-full bg-stone-950" />
                      
                      <div className="pl-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-stone-950" />
                          <h4 className="text-base sm:text-lg font-display font-black text-stone-950 tracking-tight">
                            {phase.chapterNote.heading}
                          </h4>
                        </div>

                        <p className="text-stone-950 text-sm leading-relaxed font-medium">
                          {phase.chapterNote.body1}
                        </p>
                        
                        <p className="text-stone-900 font-mono text-xs tracking-wide font-bold">
                          {phase.chapterNote.body2}
                        </p>

                        <p className="text-xs sm:text-sm text-stone-950 italic pt-1 border-t border-[#ab9934]/50 leading-relaxed font-semibold">
                          "{phase.chapterNote.closing}"
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
