import { HornaryMasterpiece } from '../types';

// Example image import from src/assets/images:
import lot1SampleImg from '../assets/images/Caominhweb3.PNG';
import lot2SampleImg from '../assets/images/Meek.PNG';
import lot3SampleImg from '../assets/images/HOldsats.PNG';
import lot4SampleImg from '../assets/images/Leomaxi.PNG';

/**
 * HORNARY GALLERY - MASTERPIECE ART VAULT (FOR SPECIAL BUYERS)
 * Total Lots: 15 Masterpiece 1-of-1 Artworks
 *
 * HOW TO ADD YOUR ARTWORK AND TITLE:
 * 1. Put your image into `src/assets/images/` (e.g., `my_art_lot_1.jpg`)
 * 2. Import it at the top of this file:
 *      import lot1Img from '../assets/images/my_art_lot_1.jpg';
 * 3. Assign it and its name in `HORNARY_CONFIG` below:
 *      1: { image: lot1Img, title: 'The Golden Rodent Supreme', valuation: '1.2 ETH' }
 *
 * (You can also use URL strings or files in `public/` like '/hornary/lot-01.png')
 */

export interface HornaryLotCustomData {
  title?: string;
  image?: string | null;
  valuation?: string;
  medium?: string;
  curatorNotes?: string;
}

export const HORNARY_CONFIG: Record<number, HornaryLotCustomData> = {
  1: {
    title: 'Caominhweb3',
    image: lot1SampleImg,
    valuation: '??? ETH',
    medium: 'Archival Oil & 24K Aged Leaf',
    curatorNotes: 'First unveiled masterpiece of the Hornary Vault. Infused with centuries-aged Gruyère pigments.',
  },
  2: { title: 'Meek',
    image: lot2SampleImg,
    valuation: '??? ETH',
    medium: 'Archival Oil & 24K Aged Leaf',
    curatorNotes: 'First unveiled masterpiece of the Hornary Vault. Infused with centuries-aged Gruyère pigments.', 
  },
  3: { title: 'H0ld.sats',
    image: lot3SampleImg,
    valuation: '??? ETH',
    medium: 'Archival Oil & 24K Aged Leaf',
    curatorNotes: 'First unveiled masterpiece of the Hornary Vault. Infused with centuries-aged Gruyère pigments.',
  },
  4: { title: 'leomaxi',
    image: lot4SampleImg,
    valuation: '??? ETH',
    medium: 'Archival Oil & 24K Aged Leaf',
    curatorNotes: 'First unveiled masterpiece of the Hornary Vault. Infused with centuries-aged Gruyère pigments.', 
  },
  5: { title: '???', image: null, valuation: '??? ETH' },
  6: { title: '???', image: null, valuation: '??? ETH' },
  7: { title: '???', image: null, valuation: '??? ETH' },
  8: { title: '???', image: null, valuation: '??? ETH' },
  9: { title: '???', image: null, valuation: '??? ETH' },
  10: { title: '???', image: null, valuation: '??? ETH' },
  11: { title: '???', image: null, valuation: '??? ETH' },
  12: { title: '???', image: null, valuation: '??? ETH' },
  13: { title: '???', image: null, valuation: '??? ETH' },
  14: { title: '???', image: null, valuation: '??? ETH' },
  15: { title: '???', image: null, valuation: '??? ETH' },
};

// Backward-compatible image alias
export const HORNARY_IMAGES: Record<number, string | null> = Object.fromEntries(
  Object.entries(HORNARY_CONFIG).map(([k, v]) => [Number(k), v.image ?? null])
);

export const HORNARY_MASTERPIECES: HornaryMasterpiece[] = Array.from({ length: 15 }, (_, index) => {
  const lotNum = index + 1;
  const lotFormatted = lotNum < 10 ? `0${lotNum}` : `${lotNum}`;
  const custom = HORNARY_CONFIG[lotNum] || {};

  return {
    id: `hornary-${lotFormatted}`,
    lotNumber: lotNum,
    lotCode: `LOT #${lotFormatted}`,
    title: custom.title || '???',
    image: custom.image || null,
    status: 'Private Reserve • Special Buyer Allocation',
    curatorNotes: custom.curatorNotes || '???',
    specs: {
      medium: custom.medium || '???',
      dimensions: '???',
      rarity: 'VIP Masterpiece 1-of-1 (???)',
      reserveValuation: custom.valuation || '??? ETH',
      edition: '1 of 1 (Exclusive Special Buyer Allotment)',
      cheeseCure: '???',
      provenance: '???',
      smartContract: `ERC-721A Hornary Vault [Lot #${lotFormatted}]`,
    },
    attributes: [
      { traitType: 'Masterpiece Tier', value: '???' },
      { traitType: 'Visual Medium', value: '???' },
      { traitType: 'Cheese Relic Matrix', value: '???' },
      { traitType: 'Curd Crystallization', value: '???' },
      { traitType: 'Bespoke Patron Trait', value: '???' },
      { traitType: 'High Council Provenance', value: '???' },
    ],
    specialBuyerPerks: [
      'Private 1-on-1 art curation & bespoke naming session with creator',
      'Museum-quality physical archival print with engraved cryptographic NFC plaque',
      'Lifetime VIP voting seat in the Cheddar Syndicate High Council',
      'Zero-gas priority allocation for all subsequent private drops',
    ],
  };
});

