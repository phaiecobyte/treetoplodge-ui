import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaryComponent } from './galary';

describe('Galary', () => {
  let component: GalaryComponent;
  let fixture: ComponentFixture<GalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
