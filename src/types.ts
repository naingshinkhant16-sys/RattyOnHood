export type RarityTier = 'Golden Swiss 1-of-1' | 'Truffle Brie' | 'Aged Cheddar' | 'Smoked Gouda';

export type CheeseTheme = 'swiss-gold' | 'cheddar-fondue' | 'aged-gruyere';

export interface Trait {
  category: string;
  name: string;
  rarityPct: number;
}

export interface NFTItem {
  id: string;
  tokenId: number;
  name: string;
  tier: RarityTier;
  estimatedPriceETH: number;
  rarityRank: number;
  image: string;
  cheeseType: string;
  quote: string;
  description: string;
  traits: Trait[];
  isFeatured?: boolean;
}

export interface RoadmapPhase {
  number: string;
  tag: string;
  title: string;
  lead: string;
  detail: string;
  chapterNote?: {
    heading: string;
    body1: string;
    body2: string;
    closing: string;
  };
}

export interface FAQItem {
  id: string;
  category: 'Mint & Drop' | 'Art & Reveal' | 'Security & OpenSea' | 'Community';
  question: string;
  answer: string;
}

export interface HornaryTrait {
  traitType: string;
  value: string;
}

export interface HornaryMasterpiece {
  id: string;
  lotNumber: number;
  lotCode: string;
  title: string;
  image: string | null;
  status: string;
  curatorNotes: string;
  specs: {
    medium: string;
    dimensions: string;
    rarity: string;
    reserveValuation: string;
    edition: string;
    cheeseCure: string;
    provenance: string;
    smartContract: string;
  };
  attributes: HornaryTrait[];
  specialBuyerPerks: string[];
}

export interface SyndicateStat {
  label: string;
  value: string;
  subtext: string;
  accent?: string;
}
