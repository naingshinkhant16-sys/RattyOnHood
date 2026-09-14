import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, VolumeX, MousePointerClick, RefreshCw, Flame } from 'lucide-react';
import { swissCheeseBg } from '../data/nftData';
import { CheeseTheme } from '../types';
import { playCheeseNibble, isCheeseSoundEnabled, setCheeseSoundEnabled, playFondueBubble } from '../utils/cheeseSound';

interface CheeseBackgroundTemplateProps {
  currentTheme: CheeseTheme;
  onThemeChange: (theme: CheeseTheme) => void;
  children: React.ReactNode;
}

interface CustomBite {
  id: string;
  x: number;
  y: number;
  size: number;
}

export const CheeseBackgroundTemplate: React.FC<CheeseBackgroundTemplateProps> = ({
  currentTheme,
  onThemeChange,
  children,
}) => {
  const [crumbs, setCrumbs] = useState(0);
  const [bites, setBites] = useState<CustomBite[]>([]);
  const [nibbleMode, setNibbleMode] = useState(false);
  const [soundActive, setSoundActive] = useState(isCheeseSoundEnabled());
  const [toast, setToast] = useState<string | null>(null);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setCheeseSoundEnabled(next);
    if (next) playFondueBubble();
  };

  const handleGlobalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If nibble mode is active, place a bite anywhere
    if (nibbleMode) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const newBite: CustomBite = {
        id: `bite-${Date.now()}-${Math.random()}`,
        x: clickX,
        y: clickY,
        size: Math.floor(Math.random() * 35) + 30,
      };

      setBites((prev) => [...prev.slice(-25), newBite]);
      const nextCrumbs = crumbs + 1;
      setCrumbs(nextCrumbs);
      playCheeseNibble();

      if (nextCrumbs === 1) {
        showToast('🧀 First nibble taken! Swiss cheese craters unlocked.');
      } else if (nextCrumbs === 10) {
        showToast('👑 Master Rodent: 10 cheese crumbs devoured!');
      }
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  // Fixed set of authentic Swiss cheese craters matching user's template image
  const swissHoles = [
    // Top section
    { x: '8%', y: '6%', size: 76, depth: 0.9 },
    { x: '18%', y: '12%', size: 94, depth: 1 },
    { x: '32%', y: '8%', size: 68, depth: 0.85 },
    { x: '48%', y: '14%', size: 110, depth: 1.1 },
    { x: '65%', y: '7%', size: 82, depth: 0.9 },
    { x: '80%', y: '11%', size: 104, depth: 1 },
    { x: '92%', y: '5%', size: 55, depth: 0.8 },
    { x: '24%', y: '22%', size: 115, depth: 1.2 },
    { x: '42%', y: '26%', size: 62, depth: 0.75 },
    { x: '58%', y: '22%', size: 98, depth: 1 },
    { x: '72%', y: '28%', size: 120, depth: 1.2 },
    { x: '88%', y: '24%', size: 84, depth: 0.9 },
    { x: '12%', y: '36%', size: 102, depth: 1.05 },
    { x: '4%', y: '24%', size: 54, depth: 0.7 },
    { x: '28%', y: '42%', size: 45, depth: 0.7 },
    { x: '52%', y: '38%', size: 118, depth: 1.15 },
    { x: '68%', y: '45%', size: 86, depth: 0.9 },
    { x: '84%', y: '40%', size: 106, depth: 1 },
    { x: '95%', y: '35%', size: 48, depth: 0.65 },
    // Mid & Lower sections
    { x: '7%', y: '55%', size: 112, depth: 1.1 },
    { x: '22%', y: '62%', size: 78, depth: 0.85 },
    { x: '38%', y: '56%', size: 124, depth: 1.25 },
    { x: '56%', y: '65%', size: 66, depth: 0.8 },
    { x: '76%', y: '58%', size: 114, depth: 1.1 },
    { x: '91%', y: '68%', size: 90, depth: 0.95 },
    { x: '15%', y: '78%', size: 88, depth: 0.9 },
    { x: '33%', y: '84%', size: 108, depth: 1.05 },
    { x: '49%', y: '79%', size: 58, depth: 0.75 },
    { x: '67%', y: '88%', size: 116, depth: 1.2 },
    { x: '83%', y: '82%', size: 72, depth: 0.85 },
    { x: '95%', y: '92%', size: 64, depth: 0.8 },
    { x: '5%', y: '92%', size: 80, depth: 0.9 },
  ];

  return (
    <div
      onClick={handleGlobalClick}
      className={`relative min-h-screen transition-colors duration-700 overflow-x-hidden ${
        currentTheme === 'swiss-gold'
          ? 'bg-[#151410] text-stone-100' // Darker Cave-Aged Molded Swiss (Earthy olive/sage mold cellar)
          : currentTheme === 'cheddar-fondue'
          ? 'bg-[#0e1316] text-stone-100' // Dark Blue Roquefort (Dusky slate-indigo mold cellar)
          : 'bg-[#080706] text-stone-100'  // Ash Rind & Spore Vault (Charcoal cellar crypt)
      }`}
    >
      {/* BASE BACKGROUND TEMPLATE: Dark Cave-Aged Molding Swiss Cheese Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Layer 1: Subdued Image Texture Layer based on template */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
            currentTheme === 'swiss-gold'
              ? 'opacity-25 mix-blend-luminosity brightness-90 contrast-125'
              : currentTheme === 'cheddar-fondue'
              ? 'opacity-20 mix-blend-color-dodge brightness-75 contrast-150'
              : 'opacity-15 mix-blend-overlay brightness-50'
          }`}
          style={{
            backgroundImage: `url(${swissCheeseBg})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '100% auto',
          }}
        />

        {/* Layer 2: Vector Swiss Cheese Craters, Penicillium Mold Veins, and Spore Blooms */}
        <div className="absolute inset-0 transition-opacity duration-700 opacity-90">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              {/* 3D Crater Shadow - Darker Molded Swiss (Mossy/Amber Cave Depths) */}
              <radialGradient id="craterDeepShadowSwiss" cx="34%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#090c09" stopOpacity="0.98" />
                <stop offset="35%" stopColor="#162217" stopOpacity="0.92" />
                <stop offset="70%" stopColor="#28331e" stopOpacity="0.8" />
                <stop offset="90%" stopColor="#473f24" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6e7856" stopOpacity="0.4" />
              </radialGradient>

              {/* 3D Crater Shadow - Blue Roquefort (Penicillium Roqueforti Teal-Indigo Abyss) */}
              <radialGradient id="craterDeepShadowBlue" cx="34%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#050a0d" stopOpacity="0.98" />
                <stop offset="35%" stopColor="#0d1b22" stopOpacity="0.92" />
                <stop offset="70%" stopColor="#18313a" stopOpacity="0.8" />
                <stop offset="90%" stopColor="#264850" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4f7c85" stopOpacity="0.4" />
              </radialGradient>

              {/* 3D Crater Shadow - Ash & Spore Vault (Charcoal Crypt Depths) */}
              <radialGradient id="craterDeepShadowAsh" cx="34%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#040403" stopOpacity="0.98" />
                <stop offset="40%" stopColor="#0e0d0b" stopOpacity="0.92" />
                <stop offset="75%" stopColor="#1c1814" stopOpacity="0.8" />
                <stop offset="92%" stopColor="#30281e" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#524637" stopOpacity="0.35" />
              </radialGradient>

              {/* Mold Spore Bloom Soft Gradient */}
              <radialGradient id="sporeBloomGrad" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor={
                    currentTheme === 'swiss-gold'
                      ? '#3d5c47'
                      : currentTheme === 'cheddar-fondue'
                      ? '#276878'
                      : '#454035'
                  }
                  stopOpacity="0.45"
                />
                <stop
                  offset="50%"
                  stopColor={
                    currentTheme === 'swiss-gold'
                      ? '#253d2e'
                      : currentTheme === 'cheddar-fondue'
                      ? '#183a42'
                      : '#28241e'
                  }
                  stopOpacity="0.22"
                />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              {/* Edge Rim Highlight Filter for aged mold rind */}
              <filter id="craterRimBevel" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow
                  dx="1"
                  dy="2"
                  stdDeviation="2"
                  floodColor={
                    currentTheme === 'swiss-gold'
                      ? '#788c64'
                      : currentTheme === 'cheddar-fondue'
                      ? '#4b7f87'
                      : '#5c5240'
                  }
                  floodOpacity="0.4"
                />
              </filter>
            </defs>

            {/* MOLD SPORE BLOOMS: Powdery fungal colonies naturally forming on aged cheese */}
            <g className="mold-spore-colonies">
              {[
                { cx: '14%', cy: '8%', r: 42 },
                { cx: '30%', cy: '16%', r: 54 },
                { cx: '64%', cy: '24%', r: 68 },
                { cx: '88%', cy: '18%', r: 48 },
                { cx: '22%', cy: '40%', r: 40 },
                { cx: '75%', cy: '42%', r: 60 },
                { cx: '42%', cy: '58%', r: 72 },
                { cx: '86%', cy: '64%', r: 50 },
                { cx: '18%', cy: '76%', r: 56 },
                { cx: '62%', cy: '82%', r: 65 },
                { cx: '92%', cy: '86%', r: 45 },
              ].map((spore, sIdx) => (
                <circle
                  key={`spore-${sIdx}`}
                  cx={spore.cx}
                  cy={spore.cy}
                  r={spore.r}
                  fill="url(#sporeBloomGrad)"
                />
              ))}
            </g>

            {/* PENICILLIUM MOLD VEINS: Organic branching fissure network running across the cheese */}
            <g
              className="mold-veins"
              stroke={
                currentTheme === 'swiss-gold'
                  ? '#34523d'
                  : currentTheme === 'cheddar-fondue'
                  ? '#215c6b'
                  : '#383228'
              }
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Primary Mold Vein Trunk 1: Upper section */}
              <path
                d="M -20,120 Q 120,90 240,160 T 480,180 T 720,130 T 960,200 T 1200,160 T 1460,210"
                strokeWidth="3"
                strokeOpacity={currentTheme === 'aged-gruyere' ? '0.35' : '0.55'}
                strokeDasharray="18 4 12 3"
              />
              <path
                d="M 240,160 Q 280,240 360,270 T 440,320"
                strokeWidth="1.8"
                strokeOpacity="0.45"
                strokeDasharray="10 3 6 2"
              />
              <path
                d="M 720,130 Q 760,70 820,50 T 900,40"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M 960,200 Q 1020,290 1080,340 T 1140,370"
                strokeWidth="2"
                strokeOpacity="0.45"
              />

              {/* Primary Mold Vein Trunk 2: Mid section */}
              <path
                d="M -20,480 Q 160,420 320,500 T 600,470 T 840,540 T 1100,480 T 1460,560"
                strokeWidth="3.2"
                strokeOpacity={currentTheme === 'aged-gruyere' ? '0.35' : '0.55'}
                strokeDasharray="22 5 14 3"
              />
              <path
                d="M 320,500 Q 380,620 440,660 T 520,700"
                strokeWidth="2.2"
                strokeOpacity="0.45"
                strokeDasharray="12 4 8 2"
              />
              <path
                d="M 840,540 Q 800,640 820,740 T 860,820"
                strokeWidth="2"
                strokeOpacity="0.45"
              />
              <path
                d="M 1100,480 Q 1180,410 1260,390"
                strokeWidth="1.6"
                strokeOpacity="0.4"
              />

              {/* Primary Mold Vein Trunk 3: Lower section */}
              <path
                d="M -20,800 Q 220,740 400,820 T 700,790 T 980,860 T 1280,800 T 1460,870"
                strokeWidth="3"
                strokeOpacity={currentTheme === 'aged-gruyere' ? '0.35' : '0.55'}
                strokeDasharray="16 4 10 3"
              />
              <path
                d="M 400,820 Q 460,920 520,960"
                strokeWidth="2"
                strokeOpacity="0.4"
              />
              <path
                d="M 980,860 Q 1040,940 1100,980"
                strokeWidth="1.8"
                strokeOpacity="0.4"
              />
            </g>

            {/* SWISS HOLE CRATERS: Darkened cave-aged pockets with mold-cured rims */}
            {swissHoles.map((hole, idx) => {
              const activeGrad =
                currentTheme === 'swiss-gold'
                  ? 'url(#craterDeepShadowSwiss)'
                  : currentTheme === 'cheddar-fondue'
                  ? 'url(#craterDeepShadowBlue)'
                  : 'url(#craterDeepShadowAsh)';

              const rimColor =
                currentTheme === 'swiss-gold'
                  ? '#73835e'
                  : currentTheme === 'cheddar-fondue'
                  ? '#477b82'
                  : '#4f4435';

              return (
                <g key={`hole-${idx}`} transform={`translate(${idx % 2 === 0 ? 0 : 4}, 0)`}>
                  {/* Subtle mold halo around crater lip */}
                  <circle
                    cx={hole.x}
                    cy={hole.y}
                    r={hole.size / 2 + 5}
                    fill="none"
                    stroke={
                      currentTheme === 'swiss-gold'
                        ? '#3a5441'
                        : currentTheme === 'cheddar-fondue'
                        ? '#225561'
                        : '#352e25'
                    }
                    strokeWidth="3"
                    strokeOpacity="0.3"
                    strokeDasharray="6 4"
                  />

                  {/* Outer Crater Rim */}
                  <circle
                    cx={hole.x}
                    cy={hole.y}
                    r={hole.size / 2}
                    fill={activeGrad}
                    filter="url(#craterRimBevel)"
                  />

                  {/* Inner Depth Crescent - Deep cave soil shadow */}
                  <ellipse
                    cx={hole.x}
                    cy={hole.y}
                    rx={hole.size * 0.42}
                    ry={hole.size * 0.38}
                    fill="#050806"
                    opacity={0.65}
                  />

                  {/* Bottom Lip Highlight - Dusky aged mold rind edge */}
                  <path
                    d={`M -${hole.size * 0.34} ${hole.size * 0.14} A ${hole.size * 0.38} ${hole.size * 0.32} 0 0 0 ${hole.size * 0.34} ${hole.size * 0.14}`}
                    stroke={rimColor}
                    strokeWidth="2"
                    strokeOpacity="0.55"
                    fill="none"
                  />

                  {/* Crunchy Calcium Lactate Mineral Crystal glint in aged craters */}
                  {hole.depth >= 1.1 && (
                    <polygon
                      points={`0,-3 2,-1 4,0 2,1 0,3 -2,1 -4,0 -2,-1`}
                      fill="#e8e0c8"
                      opacity="0.65"
                      transform={`translate(${hole.size * 0.12}, ${hole.size * 0.08})`}
                    />
                  )}
                </g>
              );
            })}

            {/* Custom Interactive Bites dropped by user in Nibble Mode */}
            {bites.map((bite) => (
              <g key={bite.id} transform={`translate(${bite.x}, ${bite.y})`}>
                <circle
                  r={bite.size}
                  fill={
                    currentTheme === 'swiss-gold'
                      ? 'url(#craterDeepShadowSwiss)'
                      : currentTheme === 'cheddar-fondue'
                      ? 'url(#craterDeepShadowBlue)'
                      : 'url(#craterDeepShadowAsh)'
                  }
                />
                <circle r={bite.size * 0.6} fill="#040604" opacity="0.7" />
                <circle
                  r={bite.size * 1.08}
                  stroke={
                    currentTheme === 'swiss-gold'
                      ? '#6e805a'
                      : currentTheme === 'cheddar-fondue'
                      ? '#44787f'
                      : '#4c4234'
                  }
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Layer 3: Dark Subterranean Cave Haze & Mold Atmosphere */}
        <div
          className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b transition-colors duration-700 pointer-events-none ${
            currentTheme === 'swiss-gold'
              ? 'from-[#1a2b20]/30 via-[#151c16]/15 to-transparent'
              : currentTheme === 'cheddar-fondue'
              ? 'from-[#122830]/35 via-[#0d1c22]/15 to-transparent'
              : 'from-[#14120e]/40 via-[#0e0c0a]/20 to-transparent'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t transition-colors duration-700 pointer-events-none ${
            currentTheme === 'swiss-gold'
              ? 'from-[#0d120e]/80 via-[#121914]/30 to-transparent'
              : currentTheme === 'cheddar-fondue'
              ? 'from-[#081014]/80 via-[#0c181e]/30 to-transparent'
              : 'from-[#050403]/90 via-[#0a0806]/40 to-transparent'
          }`}
        />

        {/* Layer 4: Dark Cave-Molded Cheese Header Drip along top of screen */}
        <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none select-none z-10">
          <svg viewBox="0 0 1440 40" fill="none" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,0 L1440,0 L1440,12 C1380,24 1330,38 1280,26 C1210,10 1160,34 1100,20 C1040,6 990,32 940,24 C870,12 820,38 760,28 C690,16 640,36 580,22 C520,8 470,30 410,20 C350,10 300,34 240,24 C170,10 120,32 60,18 L0,12 Z"
              fill={
                currentTheme === 'swiss-gold'
                  ? '#1f281e'
                  : currentTheme === 'cheddar-fondue'
                  ? '#132229'
                  : '#14120f'
              }
              opacity="0.95"
            />
            {/* Drip droplets with subtle mold rind edging */}
            <circle
              cx="240"
              cy="28"
              r="4.5"
              fill={currentTheme === 'swiss-gold' ? '#3d523c' : currentTheme === 'cheddar-fondue' ? '#214e59' : '#2d271f'}
            />
            <circle
              cx="580"
              cy="26"
              r="5"
              fill={currentTheme === 'swiss-gold' ? '#3d523c' : currentTheme === 'cheddar-fondue' ? '#214e59' : '#2d271f'}
            />
            <circle
              cx="940"
              cy="28"
              r="5.5"
              fill={currentTheme === 'swiss-gold' ? '#3d523c' : currentTheme === 'cheddar-fondue' ? '#214e59' : '#2d271f'}
            />
            <circle
              cx="1280"
              cy="30"
              r="4"
              fill={currentTheme === 'swiss-gold' ? '#3d523c' : currentTheme === 'cheddar-fondue' ? '#214e59' : '#2d271f'}
            />
          </svg>
        </div>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Floating Interactive Cheese Dock */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#0e0d0b]/95 backdrop-blur-md border-2 border-amber-500/40 shadow-2xl shadow-black/80 text-xs font-mono text-white">
          {/* Mold Flora Status Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/50 text-emerald-300 font-bold border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            <span className="hidden sm:inline">Flora:</span>
            <span>Penicillium Active</span>
          </div>

          {/* Theme Quick Switcher for Darker Molding Cheese Themes */}
          <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => {
                onThemeChange('swiss-gold');
                showToast('🧀 Molded Swiss selected: Cave flora & sage mold veins activated.');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                currentTheme === 'swiss-gold'
                  ? 'bg-emerald-800/80 text-emerald-100 border border-emerald-400/50 shadow-md shadow-emerald-900/50'
                  : 'text-stone-400 hover:text-emerald-300'
              }`}
              title="Molded Swiss (Cave Flora & Sage Rind)"
            >
              <span>🧀</span>
              <span className="hidden md:inline">Molded Swiss</span>
            </button>
            <button
              onClick={() => {
                onThemeChange('cheddar-fondue');
                showToast('🫕 Blue Roquefort selected: Deep Penicillium veins awakened.');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                currentTheme === 'cheddar-fondue'
                  ? 'bg-cyan-900/90 text-cyan-100 border border-cyan-400/50 shadow-md shadow-cyan-950/60'
                  : 'text-stone-400 hover:text-cyan-300'
              }`}
              title="Blue Roquefort (Penicillium Roqueforti Veins)"
            >
              <span>🫕</span>
              <span className="hidden md:inline">Blue Roquefort</span>
            </button>
            <button
              onClick={() => {
                onThemeChange('aged-gruyere');
                showToast('🏰 Ash Vault selected: Dark obsidian fungal cellar engaged.');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                currentTheme === 'aged-gruyere'
                  ? 'bg-amber-950/90 text-amber-200 border border-amber-500/40 shadow-md shadow-amber-950/60'
                  : 'text-stone-400 hover:text-amber-300'
              }`}
              title="Ash & Spore Vault (Charcoal Cellar Crypt)"
            >
              <span>🏰</span>
              <span className="hidden md:inline">Ash Vault</span>
            </button>
          </div>

          {/* Nibble Mode Button */}
          <button
            onClick={() => {
              const next = !nibbleMode;
              setNibbleMode(next);
              if (next) {
                showToast('🐭 Nibble Mode ON! Click anywhere on the moldy cheese to take a bite.');
                playCheeseNibble();
              }
            }}
            className={`px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              nibbleMode
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white animate-pulse border border-emerald-300'
                : 'bg-stone-900 text-stone-300 hover:text-emerald-300 border border-stone-800'
            }`}
            title="Click to toggle interactive cheese bite mode"
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nibble:</span>
            <span>{crumbs}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-all ${
              soundActive
                ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                : 'bg-stone-900 border-stone-800 text-stone-500'
            }`}
            title={soundActive ? 'Cheesy Sound FX: Enabled' : 'Cheesy Sound FX: Muted'}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-[#17241c] text-emerald-200 font-bold text-xs shadow-2xl shadow-black/80 border border-emerald-500/40 flex items-center gap-2"
          >
            <span>🧀</span>
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
