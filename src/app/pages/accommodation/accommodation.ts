import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccommodationCard } from '../../shared/components/accommodation-card/accommodation-card';
import { AccommodationService } from '../../services/accommodation.service';

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

export interface FilterOptions {
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

  constructor(private router: Router, private service:AccommodationService) {}

  ngOnInit(): void {
    this.fetchData(0);
    // In a real app, this would come from a service
    this.accommodations = [
      {
        id: 1,
        name: 'Eagle\'s Nest Treehouse',
        imageUrl: 'https://images.pexels.com/photos/492228/pexels-photo-492228.jpeg',
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
        imageUrl: 'https://images.pexels.com/photos/32633161/pexels-photo-32633161.png',
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
        imageUrl: 'https://images.pexels.com/photos/492228/pexels-photo-492228.jpeg',
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
        imageUrl: 'https://images.pexels.com/photos/492228/pexels-photo-492228.jpeg',
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

  bookAccommodation(id:number=1){

  }
  viewAccommodationDetails(id:number=1){

  }

  list:any;
  currentPage = 0;
  totalPages = 0;
  fetchData(page:number){
    return this.service.findAll(page,10,'name,asc').subscribe(res=>{
      this.list = res.content;
      this.currentPage = res.number;
      this.totalPages = res.totalPages;
      console.log("accommodation data", this.list)
    })
  }

}
