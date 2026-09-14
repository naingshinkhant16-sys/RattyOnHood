import React from 'react';

interface CheeseDividerProps {
  flip?: boolean;
  className?: string;
  fillColor?: string;
  accentColor?: string;
}

export const CheeseDivider: React.FC<CheeseDividerProps> = ({
  flip = false,
  className = '',
  fillColor = '#100e0a',
  accentColor = '#47634f',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none relative z-20 ${
        flip ? 'rotate-180 -mb-1' : '-mt-1'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-10 md:h-16 block text-current"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`cheeseDripGrad-${flip ? 'flip' : 'norm'}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fillColor} />
            <stop offset="60%" stopColor={fillColor} />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Thick Molten Cheese Curvature */}
        <path
          d="M0,0 C140,48 260,68 380,42 C500,16 560,78 680,62 C800,46 860,18 980,38 C1100,58 1220,74 1340,32 C1390,12 1420,26 1440,36 L1440,96 L0,96 Z"
          fill={`url(#cheeseDripGrad-${flip ? 'flip' : 'norm'})`}
        />

        {/* Cheese Drip 1 - Deep Melt */}
        <path
          d="M210,38 C204,65 204,78 210,88 C216,78 216,65 210,38 Z"
          fill={fillColor}
        />
        <circle cx="210" cy="92" r="4.5" fill={accentColor} opacity="0.8" />

        {/* Cheese Drip 2 - Long Gooey Strand */}
        <path
          d="M510,24 C504,56 504,74 510,86 C516,74 516,56 510,24 Z"
          fill={fillColor}
        />
        <circle cx="510" cy="90" r="5" fill="#fbbf24" opacity="0.85" />

        {/* Cheese Drip 3 */}
        <path
          d="M870,28 C864,58 864,72 870,82 C876,72 876,58 870,28 Z"
          fill={fillColor}
        />
        <circle cx="870" cy="86" r="4" fill={accentColor} opacity="0.75" />

        {/* Cheese Drip 4 */}
        <path
          d="M1220,36 C1214,64 1214,78 1220,88 C1226,78 1226,64 1220,36 Z"
          fill={fillColor}
        />
        <circle cx="1220" cy="92" r="4.5" fill="#f59e0b" opacity="0.8" />

        {/* Cheese hole cutouts inside the molten crust */}
        <circle cx="340" cy="62" r="6" fill="#080605" opacity="0.4" />
        <circle cx="730" cy="68" r="8" fill="#080605" opacity="0.4" />
        <circle cx="1060" cy="60" r="7" fill="#080605" opacity="0.4" />
      </svg>
    </div>
  );
};
