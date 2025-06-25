import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AccommodationService } from '../../services/accommodation.service';
import { PageTitleService } from '../../shared/services/page-title.service';
import { AccommodationCard } from "../../shared/components/accommodation-card/accommodation-card";
import { StaticBackDropModal } from "../../shared/components/static-backdrop-modal";
import { InputComponent } from "../../shared/components/input";
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BtnTriggerComponent } from "../../shared/components/btn-modal-trigger";
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-accommodation',
  imports: [
    AccommodationCard,
    StaticBackDropModal,
    ReactiveFormsModule,
    InputComponent,
    CommonModule,
    BtnTriggerComponent,
  ],
  templateUrl: './accommodation.html',
  styleUrl: './accommodation.scss',
})
export class AccommodationComponent implements OnInit {
  //Fields
  items = signal<any[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  loading = signal(false);
  frm!: FormGroup;
  mainImageFile: File | null = null;

  //Dependecy injection
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private service = inject(AccommodationService);
  private pageTitleService = inject(PageTitleService);
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.fetchData(0);
    this.pageTitleService.setPageTitle('Manage Accommodation');
    this.initForm();
  }

  initForm(): void {
    this.frm = this.fb.group({
      id: [0],
      accommodationId: [''],
      name: [''],
      mainImgUrl: [''],
      pricePerNight: [1],
      maxGuests: [1],
      beds: [1],
      bedrooms: [1],
      bathrooms: [1],
      type: [''],
      description: [''],
      features: [''],
      available: [true],
      rating: [0],
      reviewCount: [0],
      additionalImgUrls: [[]],
    });
  }

  // Handle file selection
  onMainImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.mainImageFile = input.files[0];
    }
  }

  // Upload and submit in one clean operation
  createAccommodation(): void {
    if (this.frm.invalid) {
      this.frm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const formValue = { ...this.frm.value };

    // Process features into array
    formValue.features = formValue.features
      ? formValue.features
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

    // If we have a main image, upload it first, then submit form
    if (this.mainImageFile) {
      this.uploadMainImage(this.mainImageFile)
        .pipe(
          tap((url) => (formValue.mainImgUrl = url)),
          switchMap((url) => this.service.create(formValue))
        )
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.fetchData(this.currentPage());
            this.resetForm();
            this.closeModal();
          },
          error: (err) => {
            this.loading.set(false);
            console.error('Error creating accommodation', err);
          },
        });
    } else {
      // No image to upload, directly submit
      console.log('form value', formValue);
      this.service.create(formValue).subscribe({
        next: () => {
          this.loading.set(false);
          this.fetchData(this.currentPage());
          this.resetForm();
          this.closeModal();
        },
        error: (err) => {
          this.loading.set(false);
          console.error('Error creating accommodation', err);
        },
      });
    }
  }

  closeModal() {
    const modal = document.getElementById('modalCreate');
    // Use Bootstrap's modal API to properly close the modal
    if (modal) {
      // @ts-ignore - accessing the Bootstrap modal instance
      const bsModal = bootstrap.Modal.getInstance(modal);
      bsModal?.hide();
    }
    this.alertService.showAddSuccess();
  }

  uploadMainImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<{ url: string }>(
        'http://localhost:8081/api/v1/upload/single?directory=accommodation',
        formData
      )
      .pipe(map((res) => res.url));
  }

  resetForm(): void {
    this.frm.reset({
      id: 0,
      available: true,
      rating: 0,
      reviewCount: 0,
      pricePerNight: 1,
      maxGuests: 1,
      beds: 1,
      bedrooms: 1,
      bathrooms: 1,
    });
    this.mainImageFile = null;
  }

  fetchData(page: number) {
    this.loading.set(true);
    this.service.findAll(page, 10, 'name,asc').subscribe({
      next: (res) => {
        this.items.set(res.content);
        this.currentPage.set(res.number);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching accommodations', err);
        this.loading.set(false);
      },
    });
  }

  bookAccommodation(id: number) {}
  viewAccommodationDetails(id: number) {}
}
