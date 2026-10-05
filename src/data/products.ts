import { Product } from '../types/store';
import heroCampaignImg from '../assets/images/hero_fashion_editorial_1791194308281.jpg';
import blazerImg from '../assets/images/product_wool_blazer_1791194322675.jpg';
import dressImg from '../assets/images/product_knit_dress_1791194336695.jpg';
import denimImg from '../assets/images/product_selvedge_denim_1791194348690.jpg';
import cashmereImg from '../assets/images/product_cashmere_knit_1791194360457.jpg';

export const HERO_CAMPAIGN_IMAGE = heroCampaignImg;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-blazer-01',
    name: 'Architectural Wool Double-Breasted Blazer',
    category: 'tailoring',
    price: 480,
    originalPrice: 540,
    image: blazerImg,
    material: '100% Virgin Merino Wool (420 GSM)',
    origin: 'Biella, Northern Italy',
    description: 'Constructed with a structured shoulder, extended lapel, and subtle boxy drape. Cut from heavyweight virgin merino wool woven by heritage mills in Biella. Features hand-stitched horn buttons and double back vents.',
    details: [
      'Half-canvassed chest construction for natural mold over time',
      'Double back vents and interior jet pockets with pen sleeve',
      'Genuine matte buffalo horn buttons sustainably sourced',
      'Cupro breathable lining with internal welt pockets'
    ],
    care: 'Dry clean only with eco-friendly hydrocarbon solvent. Press with low steam.',
    colors: [
      { name: 'Charcoal Melange', hex: '#292524', inStock: true },
      { name: 'Midnight Onyx', hex: '#0C0A09', inStock: true },
      { name: 'Raw Umber', hex: '#44403C', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 1 }
    ],
    isNew: true,
    isLimited: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'prod-dress-02',
    name: 'Ribbed Tactile Knit Column Dress',
    category: 'dresses',
    price: 360,
    image: dressImg,
    material: '70% Organic Mercerized Cotton, 30% Fine Silk',
    origin: 'Kyoto, Japan',
    description: 'An elongated column silhouette featuring seamless 3D knit engineering. The ribbed gauge offers flexible body-contouring without constriction, finished with a subtle side split for fluid movement.',
    details: [
      'Seamless whole-garment 3D knit technology produces zero yarn waste',
      'Refined architectural scoop collar with reinforced binding',
      'Mid-calf length with clean 12cm left-side mobility vent',
      'Silky cool-touch finish suitable for all-season layering'
    ],
    care: 'Hand wash cold with gentle wool detergent. Lay flat on dry towel to shape.',
    colors: [
      { name: 'Sand Travertine', hex: '#E7E5E4', inStock: true },
      { name: 'Warm Alabaster', hex: '#F5F5F4', inStock: true },
      { name: 'Earthy Clay', hex: '#A8A29E', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 6 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 0 }
    ],
    isNew: true,
    isLimited: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 'prod-denim-03',
    name: 'Relaxed Wide-Leg 14oz Selvedge Denim',
    category: 'denim',
    price: 290,
    image: denimImg,
    material: '100% Long-Staple Zimbabwe Cotton (14oz Raw)',
    origin: 'Kojima, Okayama Prefecture',
    description: 'Woven on vintage 1960s Toyoda shuttle looms with a distinctive pink-line selvedge ticker. High-rise waist with an architectural straight leg that drapes cleanly over heavy footwear.',
    details: [
      '14oz unsanforized red-line selvedge denim woven at low tension',
      'Solid copper donut buttons and hidden pocket back-rivets',
      'Deep indigo rope-dye process yielding high-contrast fades',
      'Chainstitched hem finished with vintage Union Special 43200G'
    ],
    care: 'Wear for 6 months before first wash. Soak inside-out in cold water with sea salt.',
    colors: [
      { name: 'Raw Deep Indigo', hex: '#1E293B', inStock: true },
      { name: 'Cast Black Selvedge', hex: '#18181B', inStock: true }
    ],
    sizes: [
      { size: '28', stock: 3 },
      { size: '30', stock: 7 },
      { size: '32', stock: 6 },
      { size: '34', stock: 4 },
      { size: '36', stock: 2 }
    ],
    isNew: false,
    isLimited: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 64
  },
  {
    id: 'prod-cashmere-04',
    name: 'Subtle Gauge Cashmere Mockneck Sweater',
    category: 'knitwear',
    price: 420,
    image: cashmereImg,
    material: '100% Grade-A Mongolian Cashmere (2-ply 12-gauge)',
    origin: 'Inner Mongolia & Hawick, Scotland',
    description: 'Spun from the finest underfleece fibers with an average micron diameter of 15.2µm. Designed with dropped shoulder lines and a self-holding mock collar that will never lose its tension.',
    details: [
      'Two-ply yarn construction prevents pilling and maintains tensile memory',
      'Ribbed seamless cuffs and hem tailored for effortless tucking',
      'Certified sustainable herding through the Sustainable Fibre Alliance',
      'Washed in soft Scottish border waters for supreme natural loft'
    ],
    care: 'Hand wash cold with cashmere wash. Dry flat. Cedar block storage recommended.',
    colors: [
      { name: 'Oatmeal Heather', hex: '#D6D3D1', inStock: true },
      { name: 'Raw Ecru', hex: '#FAF5EE', inStock: true },
      { name: 'Deep Espresso', hex: '#2E221E', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 4 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 2 }
    ],
    isNew: true,
    isLimited: true,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'prod-trench-05',
    name: 'Storm-Flap Belted Gabardine Trench',
    category: 'outerwear',
    price: 680,
    image: heroCampaignImg,
    material: '100% Compact Egyptian Cotton Gabardine (Water-Repellent)',
    origin: 'Lancashire, England',
    description: 'An expansive long-line silhouette with raglan sleeves and storm yoke shielding against wet winds. Tight micro-twill weave naturally sheds rain without synthetic membrane coatings.',
    details: [
      'Naturally water-repellent dense weave with PFC-free wax finish',
      'Leather-wrapped buckles on storm cuffs and removable waist belt',
      'Deep dual storm gun-flaps and inverted back pleat for stride length',
      'Detachable throat latch stored under collar'
    ],
    care: 'Specialist wet cleaning or sponge clean with cold water.',
    colors: [
      { name: 'Desert Khaki', hex: '#C2B69D', inStock: true },
      { name: 'Ink Navy', hex: '#172554', inStock: true }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 1 }
    ],
    isNew: true,
    isLimited: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 19
  },
  {
    id: 'prod-trouser-06',
    name: 'Forward-Pleat Tropical Wool Trousers',
    category: 'tailoring',
    price: 340,
    image: blazerImg,
    material: '100% High-Twist Tropical Wool (Crease-Resistant)',
    origin: 'Porto, Portugal',
    description: 'Tailored with dual deep forward pleats and extended side tabs, removing the need for a belt. The high-twist yarn breathes effortlessly in warm weather and naturally resists wrinkling during travel.',
    details: [
      'Continuous Hollywood waistband with brass side adjusters',
      'Curved slant front pockets and horn-buttoned rear welt pockets',
      'Unfinished hem length (36") for bespoke tailoring to your inseam',
      'Interior curtain waistband engineered for comfort when seated'
    ],
    care: 'Steam to remove travel creases. Dry clean only when soiled.',
    colors: [
      { name: 'Charcoal Slate', hex: '#334155', inStock: true },
      { name: 'Olive Drab', hex: '#3F3F34', inStock: true },
      { name: 'Chalk White', hex: '#F8FAFC', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 7 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 2 }
    ],
    isNew: false,
    isLimited: false,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 22
  },
  {
    id: 'prod-dress-07',
    name: 'Minimalist Raw Silk Wrap Shirtdress',
    category: 'dresses',
    price: 395,
    image: dressImg,
    material: '100% Unbleached Mulberry Raw Silk (Noil)',
    origin: 'Lyon, France',
    description: 'Cut from matte textured raw silk noil with distinctive organic slubs. Features an adjustable interior tie and asymmetrical outer belt that wraps organically around the waistline.',
    details: [
      'Textured matte silk slub that softens dramatically with every wear',
      'Concealed mother-of-pearl button placket and band collar',
      'Generous inseam side pockets and curved shirt-tail hem',
      'French seamed interior throughout for enduring longevity'
    ],
    care: 'Dry clean or cold delicate wash with silk-specific pH neutral wash.',
    colors: [
      { name: 'Chalk Ecru', hex: '#EDE8DF', inStock: true },
      { name: 'Washed Black', hex: '#27272A', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 6 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 1 }
    ],
    isNew: false,
    isLimited: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 15
  },
  {
    id: 'prod-knit-08',
    name: 'Chunky Heavyweight Alpaca Fisherman Cardigan',
    category: 'knitwear',
    price: 460,
    image: cashmereImg,
    material: '80% Baby Alpaca, 20% Recycled Polyamide',
    origin: 'Arequipa, Peru',
    description: 'An architectural take on traditional Andean maritime knits. Knit in 5-gauge cable patterns with insulating hollow alpaca fibers that provide immense warmth at a fraction of sheep wool weight.',
    details: [
      'Sustainably hand-shorn Peruvian baby alpaca fleece',
      'Thick ribbed shawl collar with throat horn fastening button',
      'Deep dual patch front pockets with reinforced binding',
      'Naturally hypoallergenic with zero lanolin content'
    ],
    care: 'Aerate between wears. Spot clean. Dry clean once per season.',
    colors: [
      { name: 'Natural Oatmeal', hex: '#E2DBD2', inStock: true },
      { name: 'Charcoal Melange', hex: '#262626', inStock: true }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 2 }
    ],
    isNew: true,
    isLimited: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 31
  }
];
