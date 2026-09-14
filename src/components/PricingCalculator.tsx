import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Zap, ShieldCheck, Gift, Check, ExternalLink, Sparkles, Flame } from 'lucide-react';
import { playCheeseSlice, playFondueBubble } from '../utils/cheeseSound';

export const PricingCalculator: React.FC = () => {
  const [tierType, setTierType] = useState<'gtd' | 'fcfs'>('gtd');
  const [quantity, setQuantity] = useState<number>(2);

  const ethRate = 3150; // USD per ETH benchmark
  const unitPriceETH = tierType === 'gtd' ? 0.00016 : 0.00036;
  const totalETH = Number((unitPriceETH * quantity).toFixed(5));
  const totalUSD = (totalETH * ethRate).toFixed(2);

  // Gas savings calculation under ERC-721A batch
  const estimatedGasUSD = tierType === 'gtd' ? 2 : 4;

  const handlePhaseChange = (phase: 'gtd' | 'fcfs') => {
    playFondueBubble();
    setTierType(phase);
  };

  const handleQuantityChange = (qty: number) => {
    playCheeseSlice();
    setQuantity(qty);
  };

  const getPerks = (qty: number) => {
    const perks = [
      { text: 'Full high-res 4K NFT art & commercial IP cheese brand rights', unlocked: qty >= 1 },
      { text: 'Access to the private Discord Syndicate Alpha Lounge & Cheese Cellar', unlocked: qty >= 1 },
      { text: 'Automatic raffle entry into the 1-of-1 Genesis Golden Swiss lottery', unlocked: qty >= 2 },
      { text: 'Interoperable 3D VRM rodent avatar rig for metaverse & games', unlocked: qty >= 3 },
      { text: 'Physical artisan wax-sealed 2kg aged Swiss cheese wheel giftbox', unlocked: qty >= 5 },
    ];
    return perks;
  };

  return (
    <section id="pricing" className="relative py-24 text-stone-100 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-amber-400/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-yellow-500/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18110b]/90 border-2 border-amber-400/50 text-xs font-mono font-bold text-amber-300 shadow-md">
            <span className="text-sm">🧀</span>
            <span>FROMAGE ALLOCATOR & ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight drop-shadow-md">
            TRANSPARENT DROP PRICING &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
              CHEESE PERKS ENGINE
            </span>
          </h2>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed bg-[#160f0a]/80 p-3 rounded-2xl border border-amber-500/20 max-w-2xl mx-auto">
            Zero surprise price spikes or predatory gas wars. Choose between GTD and FCFS allocations before the official OpenSea drop opens.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Side in #D9C96C */}
          <div className="lg:col-span-7 bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] rounded-3xl p-6 sm:p-8 space-y-7 shadow-2xl relative overflow-hidden">
            {/* Subtle cheese crater in corner */}
            <div className="absolute top-4 right-4 w-7 h-7 swiss-crater opacity-40 pointer-events-none" />

            {/* Phase Selector */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                <span>🧀</span>
                <span>1. Select Drop Tier & Pricing</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handlePhaseChange('gtd')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    tierType === 'gtd'
                      ? 'bg-stone-950 border-stone-950 shadow-xl text-white font-bold'
                      : 'bg-[#cbb759] border-[#ab9934] text-stone-900 hover:bg-[#c3ae4e]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold text-sm ${tierType === 'gtd' ? 'text-[#D9C96C]' : 'text-stone-950'}`}>
                      GTD Price
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold border border-emerald-500/30">
                      Guaranteed
                    </span>
                  </div>
                  <div className={`font-mono text-lg font-black ${tierType === 'gtd' ? 'text-white' : 'text-stone-950'}`}>
                    0.00016 ETH
                  </div>
                  <div className={`text-[11px] mt-1 ${tierType === 'gtd' ? 'text-stone-300' : 'text-stone-700 font-medium'}`}>
                    ≈ ${(0.00016 * ethRate).toFixed(2)} USD • Guaranteed Allocation
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePhaseChange('fcfs')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    tierType === 'fcfs'
                      ? 'bg-stone-950 border-stone-950 shadow-xl text-white font-bold'
                      : 'bg-[#cbb759] border-[#ab9934] text-stone-900 hover:bg-[#c3ae4e]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold text-sm ${tierType === 'fcfs' ? 'text-[#D9C96C]' : 'text-stone-950'}`}>
                      FCFS Price
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 font-mono font-bold border border-amber-400/40">
                      First-Come
                    </span>
                  </div>
                  <div className={`font-mono text-lg font-black ${tierType === 'fcfs' ? 'text-white' : 'text-stone-950'}`}>
                    0.00036 ETH
                  </div>
                  <div className={`text-[11px] mt-1 ${tierType === 'fcfs' ? 'text-stone-300' : 'text-stone-700 font-medium'}`}>
                    ≈ ${(0.00036 * ethRate).toFixed(2)} USD • Public Drop Tier
                  </div>
                </button>
              </div>
            </div>

            {/* Quantity Selector styled like a cheese slicer */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <span>🔪</span>
                  <span>2. How Many Cheese Wheels To Slice?</span>
                </label>
                <span className="font-mono text-base font-black text-[#D9C96C] bg-stone-950 px-3 py-1 rounded-xl shadow-md">
                  {quantity} Rodent {quantity === 1 ? 'Wheel' : 'Wheels'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-full h-3 bg-[#bda945] rounded-lg appearance-none cursor-pointer accent-stone-950 mt-2"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone-800 font-semibold mt-2">
                <span>1 (Curd Scout)</span>
                <span>3 (Squad Pack)</span>
                <span>5 (Cellar Master)</span>
                <span>10 (Max Limit)</span>
              </div>
            </div>

            {/* Unlocked Perks List */}
            <div className="pt-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-stone-950" />
                <span>Unlocked Collector Privileges ({quantity}/10)</span>
              </div>
              <div className="space-y-2">
                {getPerks(quantity).map((perk, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 p-3 rounded-2xl border text-xs transition-colors ${
                      perk.unlocked
                        ? 'bg-[#cbb759] border-[#ab9934] text-stone-950 font-medium'
                        : 'bg-[#cbb759]/40 border-[#ab9934]/30 text-stone-700 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        perk.unlocked ? 'bg-stone-950 text-[#D9C96C] font-bold' : 'bg-[#ab9934] text-stone-700'
                      }`}
                    >
                      {perk.unlocked ? <Check className="w-2.5 h-2.5" /> : '•'}
                    </div>
                    <span>{perk.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Receipt / Invoice Side in #D9C96C */}
          <div className="lg:col-span-5 bg-[#D9C96C] text-stone-950 border-2 border-[#bfae52] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Swiss Crater cutouts */}
            <div className="absolute top-4 right-4 w-8 h-8 swiss-crater opacity-50 pointer-events-none" />
            <div className="absolute bottom-20 left-4 w-6 h-6 swiss-crater-sm opacity-40 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#ab9934]/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-stone-950 flex items-center justify-center text-[#D9C96C] font-black text-sm">
                    🧀
                  </div>
                  <div>
                    <h3 className="font-display font-black text-base text-stone-950">Curd Allocation Summary</h3>
                    <div className="text-[10px] font-mono text-stone-800 font-semibold">ERC-721A Gas Optimized</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-stone-950 text-[#D9C96C] text-[10px] font-mono font-bold">
                  Pre-Mint Spec
                </span>
              </div>

              {/* Cost Line Items */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-stone-800">
                  <span>Selected Phase:</span>
                  <span className="text-stone-950 font-bold">{tierType === 'gtd' ? 'GTD (Guaranteed)' : 'FCFS (First-Come)'}</span>
                </div>
                <div className="flex justify-between text-stone-800">
                  <span>Wheel Quantity:</span>
                  <span className="text-stone-950 font-bold">{quantity} Rodents</span>
                </div>
                <div className="flex justify-between text-stone-800">
                  <span>Unit Price:</span>
                  <span className="text-stone-950 font-black">{unitPriceETH} ETH</span>
                </div>
                <div className="flex justify-between text-stone-800">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-stone-950" />
                    Estimated Gas (ERC-721A):
                  </span>
                  <span className="text-emerald-800 font-black">~${estimatedGasUSD} USD (Batch Save)</span>
                </div>
              </div>

              {/* Total Plaque */}
              <div className="p-5 rounded-2xl bg-stone-950 text-[#D9C96C] border-2 border-stone-900 space-y-1 shadow-2xl">
                <div className="text-[11px] font-mono uppercase text-[#D9C96C]/80 font-bold">Total Estimated Cost</div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl sm:text-4xl font-display font-black text-[#D9C96C]">
                    {totalETH} ETH
                  </div>
                  <div className="text-sm font-mono text-stone-300 font-bold">
                    ≈ ${totalUSD} USD
                  </div>
                </div>
              </div>

              {/* Anti-Scam Security Note */}
              <div className="p-3 rounded-xl bg-[#cbb759] border border-[#ab9934] flex items-start gap-2 text-[11px] text-stone-900 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <span>
                  Pricing is guaranteed for the official OpenSea drop contract. No funds are accepted or requested on this showcase site.
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 relative z-10">
              <a
                href="https://opensea.io"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playFondueBubble()}
                className="w-full py-4 rounded-2xl bg-stone-950 hover:bg-stone-800 text-[#D9C96C] font-black text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-95 transition-all border-2 border-stone-800"
              >
                <span>🧀 Verify Drop on OpenSea</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
