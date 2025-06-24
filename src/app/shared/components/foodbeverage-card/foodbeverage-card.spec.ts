import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodbeverageCard } from './foodbeverage-card';

describe('FoodbeverageCard', () => {
  let component: FoodbeverageCard;
  let fixture: ComponentFixture<FoodbeverageCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodbeverageCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodbeverageCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
