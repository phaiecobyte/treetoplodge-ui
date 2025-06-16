import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselItem {
  id: string | number;
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="carousel-{{ carouselId }}" class="carousel slide" [class.carousel-fade]="fadeEffect" [attr.data-bs-ride]="autoPlay ? 'carousel' : null">
      <!-- Indicators -->
      <div *ngIf="showIndicators" class="carousel-indicators">
        <button 
          *ngFor="let item of items; let i = index" 
          type="button" 
          [attr.data-bs-target]="'#carousel-' + carouselId" 
          [attr.data-bs-slide-to]="i" 
          [class.active]="i === 0" 
          [attr.aria-current]="i === 0 ? 'true' : null"
          [attr.aria-label]="'Slide ' + (i + 1)">
        </button>
      </div>

      <!-- Slides -->
      <div class="carousel-inner rounded-4 overflow-hidden" [ngClass]="{'shadow-lg': addShadow}">
        <div 
          *ngFor="let item of items; let i = index" 
          class="carousel-item" 
          [class.active]="i === 0"
          [style.height]="height">
          <img 
            [src]="item.imageSrc" 
            [alt]="item.imageAlt || 'Slide ' + (i + 1)" 
            class="d-block w-100"
            [class.h-100]="coverMode"
            [style.object-fit]="coverMode ? 'cover' : 'contain'">
          
          <div *ngIf="item.title || item.description" 
               class="carousel-caption" 
               [class.d-none]="!showCaptions"
               [class.d-md-block]="showCaptionsOnlyOnMd">
            <h3 *ngIf="item.title">{{ item.title }}</h3>
            <p *ngIf="item.description">{{ item.description }}</p>
            <a *ngIf="item.buttonText && item.buttonLink" 
               [href]="item.buttonLink" 
               class="btn btn-primary">
               {{ item.buttonText }}
            </a>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <button *ngIf="showControls" class="carousel-control-prev" type="button" [attr.data-bs-target]="'#carousel-' + carouselId" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button *ngIf="showControls" class="carousel-control-next" type="button" [attr.data-bs-target]="'#carousel-' + carouselId" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `,
})
export class CarouselComponent implements OnInit {
  @Input() items: CarouselItem[] = [];
  @Input() carouselId: string = 'main-carousel';
  @Input() showControls: boolean = true;
  @Input() showIndicators: boolean = true;
  @Input() showCaptions: boolean = true;
  @Input() showCaptionsOnlyOnMd: boolean = false;
  @Input() autoPlay: boolean = true;
  @Input() interval: number = 5000; // in milliseconds
  @Input() fadeEffect: boolean = false;
  @Input() coverMode: boolean = true;
  @Input() height: string = 'auto';
  @Input() addShadow: boolean = false;

  ngOnInit() {
    if (!this.items || this.items.length === 0) {
      console.warn('No items provided for carousel. The carousel will be empty.');
    }
    
    // Initialize Bootstrap carousel
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        const carousel = document.getElementById(`carousel-${this.carouselId}`);
        if (carousel) {
          // Using window.bootstrap if available (when Bootstrap JS is loaded)
          if ((window as any).bootstrap && (window as any).bootstrap.Carousel) {
            new (window as any).bootstrap.Carousel(carousel, {
              interval: this.autoPlay ? this.interval : false,
              ride: this.autoPlay ? 'carousel' : false
            });
          } else {
            console.warn('Bootstrap JavaScript is not loaded. Carousel may not function properly.');
          }
        }
      }
    }, 0);
  }
}
