import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ProfileComponent } from '../../admin/main/profile';
import { AuthService } from '../../helper/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, RouterModule, CommonModule,ProfileComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private authService: AuthService){}
  isMenuOpen = false;
  
  items = [
    {
      label: 'Home',
      icon: 'home',
      routeLink: '/home'
    },
    {
      label: 'Accommodation',
      icon: 'hotel',
      routeLink: 'accommodation', 
    },
    {
      label: 'Food & Beverage',
      icon: 'restaurant',
      routeLink: 'food-beverage'
    },
    {
      label: 'About Us',
      icon: 'info',
      routeLink: 'about'
    },
    {
      label: 'Gallery',
      icon: 'photo_library',
      routeLink: 'galary'
    }
  ];
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isLogined(): boolean {
    return this.authService.isAuthenticated();
  }

}
