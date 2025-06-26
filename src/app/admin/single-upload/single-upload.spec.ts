import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUpload } from './single-upload';

describe('SingleUpload', () => {
  let component: SingleUpload;
  let fixture: ComponentFixture<SingleUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
