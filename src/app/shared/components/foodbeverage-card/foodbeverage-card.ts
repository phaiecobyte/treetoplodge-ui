import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodBeverage } from '../../models/foodbeverage';

@Component({
  selector: 'app-foodbeverage-card',
  imports: [CommonModule],
  templateUrl: './foodbeverage-card.html',
  styleUrl: './foodbeverage-card.scss',
})
export class FoodbeverageCard {
  @Input() item!: FoodBeverage;
  @Output() order = new EventEmitter<number>();

  getCategoryClass(category: string): string {
    switch (category.toLowerCase()) {
      case 'breakfast':
        return 'bg-primary';
      case 'lunch':
        return 'bg-success';
      case 'dinner':
        return 'bg-info text-dark';
      case 'dessert':
        return 'bg-warning text-dark';
      case 'beverage':
        return 'bg-secondary';
      default:
        return 'bg-light text-dark';
    }
  }

  onOrder(id: number): void {
    this.order.emit(id);
  }
}
