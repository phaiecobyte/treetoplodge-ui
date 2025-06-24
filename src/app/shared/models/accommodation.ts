export interface Accommodation {
  id: number;
  name: string;
  imageUrl: string;
  pricePerNight: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  view?: string;
  shortDescription: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  amenities?: string[];
}