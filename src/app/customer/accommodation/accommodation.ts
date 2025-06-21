import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Accommodation {
  id: number;
  name: string;
  imageUrl: string;
  pricePerNight: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  view: string;
  shortDescription: string;
  rating: number;
  reviewCount: number;
  available: boolean;
}

interface FilterOptions {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  view: string;
}

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accommodation.html',
  styleUrl: './accommodation.scss'
})
export class AccommodationComponent implements OnInit {
  accommodations: Accommodation[] = [];
  filters: FilterOptions = {
    checkIn: null,
    checkOut: null,
    guests: 2,
    view: 'all'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // In a real app, this would come from a service
    this.accommodations = [
      {
        id: 1,
        name: 'Eagle\'s Nest Treehouse',
        imageUrl: 'assets/images/treehouse1.jpg',
        pricePerNight: 299,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        view: 'Valley',
        shortDescription: 'Romantic treehouse with panoramic valley views, perfect for couples.',
        rating: 4.9,
        reviewCount: 124,
        available: true
      },
      {
        id: 2,
        name: 'Forest Canopy Suite',
        imageUrl: 'assets/images/treehouse2.jpg',
        pricePerNight: 349,
        capacity: 4,
        bedrooms: 2,
        bathrooms: 1,
        view: 'Forest',
        shortDescription: 'Spacious treehouse nestled among ancient trees with a private hot tub.',
        rating: 4.8,
        reviewCount: 98,
        available: true
      },
      {
        id: 3,
        name: 'Lakeside Treehouse',
        imageUrl: 'assets/images/treehouse3.jpg',
        pricePerNight: 399,
        capacity: 4,
        bedrooms: 2,
        bathrooms: 2,
        view: 'Lake',
        shortDescription: 'Modern treehouse with private deck overlooking pristine mountain lake.',
        rating: 4.9,
        reviewCount: 87,
        available: true
      },
      {
        id: 4,
        name: 'Family Tree Lodge',
        imageUrl: 'assets/images/treehouse4.jpg',
        pricePerNight: 499,
        capacity: 6,
        bedrooms: 3,
        bathrooms: 2,
        view: 'Forest',
        shortDescription: 'Our largest treehouse with multiple connected platforms for the whole family.',
        rating: 4.7,
        reviewCount: 65,
        available: true
      }
    ];
  }

  applyFilters(): void {
    // In a real app, this would filter results from backend API
    console.log('Applying filters:', this.filters);
    // Filter logic would go here
  }

  viewDetails(id: number): void {
    this.router.navigate(['/accommodations', id]);
  }
}
