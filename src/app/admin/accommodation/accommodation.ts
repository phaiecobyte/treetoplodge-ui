import { Component, OnInit, signal, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { UploadService } from '../../services/upload.service';
import { SingleUpload } from "../single-upload/single-upload";
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-accommodation',
  imports: [
    AccommodationCard,
    StaticBackDropModal,
    ReactiveFormsModule,
    InputComponent,
    CommonModule,
    BtnTriggerComponent,
    SingleUpload,
    NgxDropzoneModule
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
  selectedFile = signal<File | null> (null);

  //Dependecy injection
  private fb = inject(FormBuilder);
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
    this.service.create(formValue).subscribe({
      next:()=>{
        this.loading.set(false);
        this.fetchData(this.currentPage());
      },
      error:(err)=>{
        this.loading.set(false);
        console.error('Error creating accommodation', err);
      },
      complete:()=>{
        this.alertService.showAddSuccess();
        this.closeModal();
        this.resetForm();
      }
    })
  }

  closeModal() {
    const modal = document.getElementById('modalCreate');
    if (modal) {
      // @ts-ignore - accessing the Bootstrap modal instance
      const bsModal = bootstrap.Modal.getInstance(modal);
      bsModal?.hide();
    }
    this.alertService.showAddSuccess();
  }


  resetForm(): void {
    this.frm.reset({
      id: 0,
      mainImgUrl:null,
      available: true,
      rating: 0,
      reviewCount: 0,
      pricePerNight: 1,
      maxGuests: 1,
      beds: 1,
      bedrooms: 1,
      bathrooms: 1,
    });
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
