import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Accommodation } from '../../models/accommodation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accommodation-card',
  imports: [CommonModule],
  templateUrl: './accommodation-card.html',
  styleUrl: './accommodation-card.scss'
})
export class AccommodationCard {
    @Input() accommodation!: Accommodation;
    @Output() book = new EventEmitter<number>();
    @Output() viewDetails = new EventEmitter<number>();
    
    onBook(id: number): void {
        this.book.emit(id);
    }
    
    onViewDetails(id: number): void {
        this.viewDetails.emit(id);
    }
}
