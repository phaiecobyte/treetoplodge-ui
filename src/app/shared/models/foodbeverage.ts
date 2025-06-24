export interface FoodBeverage {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  description: string;
  dietaryInfo?: string[];
  isSpecial?: boolean;
  rating?: number;
  reviewCount?: number;
  available: boolean;
}