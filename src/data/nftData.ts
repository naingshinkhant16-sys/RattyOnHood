import { NFTItem, RoadmapPhase, SyndicateStat } from '../types';


import swissCheeseBg from '../assets/images/swiss_cheese_texture_1788962836664.jpg';
import rat1 from '../assets/images/art1.png';
import rat2 from '../assets/images/art2.png';
import rat3 from '../assets/images/art3.png';
import rat4 from '../assets/images/art4.png';
import rat5 from '../assets/images/art5.png';
import rat6 from '../assets/images/art6.png';
import rat7 from '../assets/images/art7.png';
import rat8 from '../assets/images/art8.png';
import rat9 from '../assets/images/art9.png';
import rat10 from '../assets/images/art10.png';

export {  swissCheeseBg };

export const SYNDICATE_STATS: SyndicateStat[] = [
  {
    label: 'Collection Supply',
    value: '4,444',
    subtext: 'Algorithmically unique rodents',
    accent: 'from-amber-400 to-yellow-500',
  },
  {
    label: 'GTD Price',
    value: '0.00016 ETH',
    subtext: 'Guaranteed mint allocation',
    accent: 'from-yellow-400 to-amber-500',
  },
  {
    label: 'FCFS Price',
    value: '0.00036 ETH',
    subtext: 'First-come, first-served tier',
    accent: 'from-amber-300 to-yellow-400',
  },
];

export const NFT_COLLECTION: NFTItem[] = [
  {
    id: 'rat-0001',
    tokenId: 1,
    name: 'Don Formaggio',
    tier: 'Golden Swiss 1-of-1',
    estimatedPriceETH: 0.25,
    rarityRank: 1,
    image: rat1, // Blank: insert your local image file here (e.g. '/art/1.png')
    cheeseType: '24-Month Emmental Sovereign',
    quote: 'In this city, respect is measured in curd density and gold weight.',
    description: 'The supreme patriarch of the Cheddar Syndicate. Crowned with 24k forged dairy gold and draped in tailored obsidian velvet, Don Formaggio commands the subterranean vaults with an iron paw.',
    traits: [
      { category: 'Headgear', name: '24K Golden Fondue Tiara', rarityPct: 0.02 },
      { category: 'Eyes', name: 'Gilded Diamond Monocle', rarityPct: 0.18 },
      { category: 'Fur', name: 'Royal Obsidian Black', rarityPct: 0.45 },
      { category: 'Apparel', name: 'Embossed Syndicate Tuxedo', rarityPct: 0.35 },
      { category: 'Held Relic', name: 'Luminescent Swiss Core', rarityPct: 0.05 },
      { category: 'Aura', name: 'Imperial Amber Flare', rarityPct: 0.1 },
    ],
    isFeatured: true,
  },
  {
    id: 'rat-0042',
    tokenId: 42,
    name: 'Cypher Skimmer',
    tier: 'Smoked Gouda',
    estimatedPriceETH: 0.045,
    rarityRank: 420,
    image: rat2, // Blank: insert your local image file here
    cheeseType: 'Smoked Hickory Gouda',
    quote: 'Firewalls are just processed cheese slices waiting to melt.',
    description: 'Lead infiltrator of the Neo-Boroughs. Equipped with cheese-wavelength optics and a prototype curd-fusion canister, Cypher breaches high-security refrigerators before the sensors even ping.',
    traits: [
      { category: 'Headgear', name: 'Cheddar HUD Visor v4', rarityPct: 2.1 },
      { category: 'Fur', name: 'Smoked Ash Grey', rarityPct: 11.4 },
      { category: 'Apparel', name: 'Perforated Tactical Bomber', rarityPct: 3.8 },
      { category: 'Held Relic', name: 'Pressurized Curd Battery', rarityPct: 1.9 },
      { category: 'Mouth', name: 'Titanium Whiskers', rarityPct: 4.2 },
      { category: 'Aura', name: 'Neon Cyber Glow', rarityPct: 5.6 },
    ],
    isFeatured: true,
  },
  {
    id: 'rat-0108',
    tokenId: 108,
    name: 'Baron Von Roquefort',
    tier: 'Truffle Brie',
    estimatedPriceETH: 0.08,
    rarityRank: 88,
    image: rat3, // Blank: insert your local image file here
    cheeseType: 'Black Truffle Infused Brie',
    quote: 'True refinement requires patience, culture, and high-altitude cellars.',
    description: 'An aristocrat who turned fine dining into high finance. The Baron sponsors the underground heist network from his plush parlor while savoring vintage rinds aged under private subterranean security.',
    traits: [
      { category: 'Headgear', name: 'Silk Aristocrat Tophat', rarityPct: 1.4 },
      { category: 'Eyes', name: 'Gilded Spec Glass', rarityPct: 3.2 },
      { category: 'Fur', name: 'Ermine White Curd', rarityPct: 2.8 },
      { category: 'Apparel', name: 'Velvet Tailcoat with Melt Filigree', rarityPct: 1.1 },
      { category: 'Held Relic', name: 'Aged Truffle Brie Wedge', rarityPct: 0.9 },
      { category: 'Aura', name: 'Noble Golden Shimmer', rarityPct: 4.0 },
    ],
    isFeatured: true,
  },
  {
    id: 'rat-0777',
    tokenId: 777,
    name: 'Ronin Cheddarblade',
    tier: 'Aged Cheddar',
    estimatedPriceETH: 0.065,
    rarityRank: 177,
    image: rat4, // Blank: insert your local image file here
    cheeseType: '5-Year Sharp English Cheddar',
    quote: 'The blade cuts clean, like wire through chilled cheddar.',
    description: 'A masterless enforcer wandering the damp alleys of Curd City. His legendary cheese-edge katana is forged from hyper-condensed whey crystals sharp enough to slice through vault titanium.',
    traits: [
      { category: 'Headgear', name: 'Curd Straw Kasa', rarityPct: 2.6 },
      { category: 'Fur', name: 'Battle-Hardened Russet', rarityPct: 7.9 },
      { category: 'Weapon', name: 'Cheddar-Forged Katana', rarityPct: 0.8 },
      { category: 'Apparel', name: 'Syndicate Streetwear Gi', rarityPct: 3.5 },
      { category: 'Accessory', name: 'Melting Gold Amulet', rarityPct: 2.0 },
      { category: 'Aura', name: 'Molten Amber Ember Sparks', rarityPct: 1.7 },
    ],
    isFeatured: true,
  },
  {
    id: 'rat-1204',
    tokenId: 1204,
    name: 'Madame Gruyère',
    tier: 'Truffle Brie',
    estimatedPriceETH: 0.075,
    rarityRank: 112,
    image: rat5, // Blank: insert your local image file here
    cheeseType: 'Cave-Aged Gruyère Reserve',
    quote: 'Information is like ripe cheese—richer when kept in the dark.',
    description: 'Broker of secrets and black-market wheel exchanges. She controls the subterranean pneumatic tubes delivering encrypted recipes and security bypass codes to the Syndicate operatives.',
    traits: [
      { category: 'Headgear', name: 'Embroidered Veil', rarityPct: 2.4 },
      { category: 'Fur', name: 'Platinum Silver Frost', rarityPct: 4.1 },
      { category: 'Apparel', name: 'Gold Brocade Gown', rarityPct: 1.6 },
      { category: 'Held Relic', name: 'Antique Gruyère Wheel', rarityPct: 1.2 },
      { category: 'Aura', name: 'Pale Amber Halo', rarityPct: 3.5 },
    ],
  },
  {
    id: 'rat-2490',
    tokenId: 2490,
    name: 'Spike Mozzarella',
    tier: 'Smoked Gouda',
    estimatedPriceETH: 0.045,
    rarityRank: 590,
    image: rat6, // Blank: insert your local image file here
    cheeseType: 'Stretched Curd Mozzarella',
    quote: 'When things get heated, we stretch—we never snap.',
    description: 'Getaway driver for the midnight curd convoy. Able to slide through the tightest sewer pipelines and ventilation shafts with elastic agility and nerves of cold steel.',
    traits: [
      { category: 'Headgear', name: 'Racer Helm Visor', rarityPct: 4.7 },
      { category: 'Fur', name: 'Industrial Slate', rarityPct: 14.2 },
      { category: 'Apparel', name: 'Kevlar Track Jacket', rarityPct: 6.8 },
      { category: 'Accessory', name: 'Melting Wheel Keychain', rarityPct: 5.1 },
      { category: 'Aura', name: 'Turbo Yellow Exhaust', rarityPct: 4.9 },
    ],
  },
  {
    id: 'rat-3312',
    tokenId: 3312,
    name: 'Parmesan Pete',
    tier: 'Aged Cheddar',
    estimatedPriceETH: 0.052,
    rarityRank: 280,
    image: rat7, // Blank: insert your local image file here
    cheeseType: '36-Month Parmigiano Reggiano',
    quote: 'Hard as granite, salty as the sea, and aged to perfection.',
    description: 'The Syndicate master safe-cracker. Pete uses acoustic resonance tools to listen to the lock tumblers of subterranean bank vaults while chewing on aged parmesan crystals.',
    traits: [
      { category: 'Headgear', name: 'Wool Beanie & Stethoscope', rarityPct: 3.3 },
      { category: 'Fur', name: 'Granite Charcoal', rarityPct: 9.1 },
      { category: 'Apparel', name: 'Utility Tool Harness', rarityPct: 4.5 },
      { category: 'Weapon', name: 'Diamond Wheel Drill', rarityPct: 2.3 },
      { category: 'Aura', name: 'Golden Dust Fallout', rarityPct: 3.8 },
    ],
  },
  {
    id: 'rat-5555',
    tokenId: 5555,
    name: 'The Golden Sovereign',
    tier: 'Golden Swiss 1-of-1',
    estimatedPriceETH: 0.35,
    rarityRank: 2,
    image: rat8, // Blank: insert your local image file here
    cheeseType: 'Pure Molten Gold Curd',
    quote: 'The legend is true. The vault was never empty.',
    description: 'The mythical progenitor of the entire rat lineage. Whispered to dwell in the central core where geothermal heat keeps a perpetual river of fondue flowing eternally.',
    traits: [
      { category: 'Special', name: '1-of-1 Genesis Sovereign', rarityPct: 0.018 },
      { category: 'Core', name: 'Liquid Gold Fondue Aura', rarityPct: 0.018 },
      { category: 'Crown', name: 'Crown of the Five Wheels', rarityPct: 0.018 },
      { category: 'Pedigree', name: 'Alpha Syndicate Bloodline', rarityPct: 0.018 },
    ],
  },
  {
    id: 'rat-4114',
    tokenId: 4114,
    name: 'Sgt. Colby Jack',
    tier: 'Smoked Gouda',
    estimatedPriceETH: 0.048,
    rarityRank: 642,
    image: rat9, // Blank: insert your local image file here
    cheeseType: 'Pepper Jack & Smoked Colby',
    quote: 'Security perimeter holds until the curd goes cold.',
    description: 'Veteran perimeter scout of the sewer junctions. Equipped with night-vision lenses and reinforced cheddar armor, Colby Jack directs supply convoys away from street patrol lines.',
    traits: [
      { category: 'Headgear', name: 'Tactical Recon Visor', rarityPct: 5.2 },
      { category: 'Fur', name: 'Midnight Charcoal', rarityPct: 12.8 },
      { category: 'Apparel', name: 'Flak Harness with Cheese Pouches', rarityPct: 4.1 },
      { category: 'Accessory', name: 'Molten Gouda Flare Gun', rarityPct: 2.9 },
      { category: 'Aura', name: 'Amber Scanner Beams', rarityPct: 3.4 },
    ],
  },
  {
    id: 'rat-0888',
    tokenId: 888,
    name: 'Lord Gorgonzola',
    tier: 'Aged Cheddar',
    estimatedPriceETH: 0.07,
    rarityRank: 154,
    image: rat10, // Blank: insert your local image file here
    cheeseType: 'Cave-Matured Mountain Gorgonzola',
    quote: 'Patience and veins of blue mold turn ordinary curd into an empire.',
    description: 'Ancient strategist and mountain clan elder. His armor bears the crystalline engravings of century-old cheese presses, radiating sovereign dignity across the grand tasting hall.',
    traits: [
      { category: 'Headgear', name: 'Gilded Kabuto Helm', rarityPct: 1.8 },
      { category: 'Fur', name: 'Mountain Frost Ash', rarityPct: 6.4 },
      { category: 'Weapon', name: 'Dual Rind Daggers', rarityPct: 1.5 },
      { category: 'Apparel', name: 'Silk Embroidered Haori', rarityPct: 2.7 },
      { category: 'Aura', name: 'Glacial Blue Vein Glow', rarityPct: 2.2 },
    ],
  },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    number: '01',
    tag: 'The Collection',
    title: 'RATTY Website & NFT Launch',
    lead: 'A curated collection of 4,444 hand-drawn artworks, created as an art showcase for collectors who appreciate originality, character, and artistic detail.',
    detail: 'The official RATTY website will serve as the home of the collection, its story, and everything that follows.',
  },
  {
    number: '02',
    tag: 'The Experience',
    title: 'Staking & Point Rewards',
    lead: 'A staking experience designed to deepen collector participation.',
    detail: 'Holders will be able to earn RATTY Points, creating a pathway to exclusive artistic benefits and future collector experiences.',
  },
  {
    number: '03',
    tag: 'The Benefits',
    title: 'Artistic Benefits & Commissions',
    lead: 'RATTY Points will unlock access to a growing range of art-related benefits and commission services.',
    detail: 'Available services and categories will be introduced progressively, allowing the ecosystem to expand with intention while maintaining a strong focus on art.',
  },
  {
    number: '04',
    tag: 'The Collectors',
    title: 'Exclusive Holder Experiences',
    lead: 'Our top holders will receive access to exclusive 1:1 artworks and complimentary art pieces.',
    detail: 'These benefits are designed to celebrate the collectors who contribute to the RATTY community and its artistic journey.',
    chapterNote: {
      heading: 'A New Chapter After Mint',
      body1: 'The full holding requirements, point system, and reward mechanics will be revealed after the mint.',
      body2: 'The details will unfold in time.',
      closing: 'These benefits are designed to celebrate the collectors who contribute to the RATTY community and its artistic journey.',
    },
  },
];

export const LORE_CHAPTERS = [
  {
    id: 'origins',
    title: 'Chapter I: The Subterranean Vaults',
    tag: 'ORIGIN STORY',
    summary: 'Centuries ago, beneath the sprawling cobblestones of Neo-Fromage, the city\'s wealthiest dairy barons built labyrinthine vaults to age their most prized cheeses.',
    text: 'When the city above automated its food grids and locked the subterranean tunnels, thousands of clever rodents adapted. They didn\'t just survive—they organized. Under the glow of bioluminescent amber yeast and dripping copper pipes, the rodents formed the Cheddar Syndicate: an elite fraternity of thieves, alchemists, and sentinels sworn to protect the ancient recipes.',
  },
  {
    id: 'heist',
    title: 'Chapter II: The Great Curd Heist',
    tag: 'THE MISSION',
    summary: 'The Imperial Vault is rumored to house the "Primordial Wheel"—a legendary block of crystalline gold cheese aged for over a century.',
    text: 'Every operative in the Syndicate has a role: Cypher Skimmers bypass acoustic alarms; Ronin blades carve escape passages through cold-storage grates; and Aristocrat financiers launder the stolen rind into subterranean bullion. The 4,444 rats assemble for the largest coordinated heist in rodent history.',
  },
  {
    id: 'code',
    title: 'Chapter III: The Gouda Code of Honor',
    tag: 'FACTION ETHICS',
    summary: 'Loyalty in the dark alleys is as unbreakable as triple-aged rind. Those who share the curd survive together.',
    text: '"Never drop the rind. Never poison the fondue. Share the spoils with the nest." These three tenets govern every street corner of Curd City. As the OpenSea drop approaches, every holder becomes an honorary made-member of the Syndicate, with a seat at the Grand Tasting Table.',
  },
];
