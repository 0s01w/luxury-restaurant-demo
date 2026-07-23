export type MenuCategory = 'tasting' | 'starters' | 'mains' | 'desserts' | 'cellar' | 'cocktails';

export interface MenuItem {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  category: MenuCategory;
  tags: string[];
  image: string;
  allergens?: string[];
  winePairingSuggestion?: string;
  calories?: string;
  isChefSpecial?: boolean;
}

export interface ServiceExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceRange: string;
  capacity: string;
  image: string;
  features: string[];
  iconName: string;
}

export interface Testimonial {
  id: string;
  author: string;
  title: string;
  source: string;
  quote: string;
  rating: number;
  year: string;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  category: 'reservations' | 'dress-code' | 'dietary' | 'private-events';
  question: string;
  answer: string;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
  dietaryNotes: string;
  specialRequests: string;
}

export interface SommelierPairingResult {
  wineRecommendation: string;
  region: string;
  tastingNotes: string;
  pairingRationale: string;
  chefTip: string;
}
