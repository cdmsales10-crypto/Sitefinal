export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  benefits: string[];
  sizes: { id: string; label: string; price: number }[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  price: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'clay-bar',
    name: 'Clay Bar Kit',
    description: 'Professional detailing clay bar kit removes bonded contaminants for a smooth, defect-free surface prior to polishing or coating.',
    image: '/products/clay-bar.jpg',
    benefits: ['Removes bonded contaminants', 'Improves surface smoothness', 'Preps for polishing/coating', 'Safe on clear coat'],
    sizes: [
      { id: '1pc', label: '1 Piece', price: 299 },
      { id: '3pc', label: '3 Pack', price: 799 }
    ]
  },
  {
    id: 'polish-compound',
    name: 'Polish Compound — Cut & Finish',
    description: 'Two-stage polish compound engineered for professional correction and gloss restoration on automotive paint.',
    image: '/products/polish-compound.jpg',
    benefits: ['High cut & gloss', 'Swirl reduction', 'Fast finishing', 'Long-lasting shine'],
    sizes: [
      { id: '250ml', label: '250 ml', price: 899 },
      { id: '1l', label: '1 L', price: 2499 }
    ]
  },
  {
    id: 'all-purpose-degreaser',
    name: 'All-Purpose Degreaser',
    description: 'Concentrated degreaser for heavy soils, safe for exterior trim and wheels when diluted according to instructions.',
    image: '/products/all-purpose-degreaser.jpg',
    benefits: ['Powerful soil removal', 'Dilutable for economy', 'Safe on most surfaces', 'Ideal for wheels & engines'],
    sizes: [
      { id: '500ml', label: '500 ml', price: 499 },
      { id: '5l', label: '5 L', price: 2499 }
    ]
  }
];
 
