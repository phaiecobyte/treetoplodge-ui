import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleUpload } from './multiple-upload';

describe('MultipleUpload', () => {
  let component: MultipleUpload;
  let fixture: ComponentFixture<MultipleUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
