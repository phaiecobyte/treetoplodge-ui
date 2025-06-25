export interface Accommodation {
  id: number;
  accommodationId?:string;
  name: string;
  mainImgUrl: string;
  pricePerNight: number;
  maxGuests: number;
  beds:number;
  bedrooms: number;
  bathrooms: number;
  type?: string;
  description: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  features?: string[];
  additionalImgUrls?:string[];
}
// export const accommodations: Accommodation[] = [
//   {
//     id: 1,
//     name: 'Sunset Treehouse',
//     mainImgUrl: '/assets/images/accommodations/treehouse1.jpg',
//     pricePerNight: 249,
//     maxGuests: 4,
//     bedrooms: 2,
//     bathrooms: 1,
//     type: 'Mountain',
//     description: 'Cozy treehouse with stunning sunset types over the mountains.',
//     rating: 4.8,
//     reviewCount: 125,
//     available: true,
//     features: ['Wi-Fi', 'Fireplace', 'Private deck', 'Mini kitchen']
//   },
//   {
//     id: 2,
//     name: 'Forest Cabin',
//     mainImgUrl: '/assets/images/accommodations/cabin1.jpg',
//     pricePerNight: 199,
//     maxGuests: 2,
//     bedrooms: 1,
//     bathrooms: 1,
//     type: 'Forest',
//     description: 'Intimate cabin surrounded by ancient trees, perfect for couples.',
//     rating: 4.7,
//     reviewCount: 98,
//     available: true,
//     features: ['Hot tub', 'King bed', 'Bluetooth speaker', 'Coffee maker']
//   },
//   {
//     id: 3,
//     name: 'River Lodge',
//     mainImgUrl: '/assets/images/accommodations/lodge1.jpg',
//     pricePerNight: 349,
//     maxGuests: 6,
//     bedrooms: 3,
//     bathrooms: 2,
//     type: 'River',
//     description: 'Spacious lodge with river access and outdoor entertainment area.',
//     rating: 4.9,
//     reviewCount: 87,
//     available: false,
//     features: ['Full kitchen', 'BBQ grill', 'Fire pit', 'Fishing access', 'Laundry']
//   }
// ];


















// export interface Accommodation {
//   id: number
//   accommodationId: string
//   name: string
//   type: string
//   description: string
//   mainImgUrl: string
//   additionalImgUrls: string[]
//   pricePerNight: number
//   maxGuests: number
//   bedrooms: number
//   bathrooms: number
//   features: string[]
//   available: boolean
//   rating: number
//   reviewCount: number;
// }