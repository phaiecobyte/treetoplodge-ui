import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodBeverage } from './food-beverage';

describe('FoodBeverage', () => {
  let component: FoodBeverage;
  let fixture: ComponentFixture<FoodBeverage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodBeverage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodBeverage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
