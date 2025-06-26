import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-single-upload-copy',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: '',
  styleUrl: './single-upload.scss'
})
export class SingleUploadCopy implements OnInit {
  // Form and file references
  frm!: FormGroup;
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  isUploading = signal(false);
  isDragOver = signal(false);
  
  // Input/Output properties for parent component integration
  directory = input<string>('default');
  onSuccess = output<string>(); // Emits the URL of uploaded file
  
  // Reference to the file input element
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  // Services
  private fb = inject(FormBuilder);
  private service = inject(UploadService);
  private toastr = inject(ToastrService);
  
  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    this.frm = this.fb.group({

    });
  }
  
  // Trigger file input click when upload area is clicked
  triggerFileInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
  
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleSelectedFile(input.files[0]);
    }
  }
  
  handleSelectedFile(file: File): void {
    // Check file type
    if (!file.type.startsWith('image/')) {
      this.toastr.error('Only image files are allowed', 'Error');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 10 * 1024 * 1024) {
      this.toastr.error('File size should be less than 10MB', 'Error');
      return;
    }
    
    // Update state with selected file
    this.selectedFile.set(file);
    
    // Generate preview
    this.generatePreview(file);
  }
  onUpload(): void {
    const file = this.selectedFile();
    if (!file) {
      this.toastr.warning("No file is selected", "Warning");
      return;
    }
    
    this.isUploading.set(true);
    
    this.service.singleUpload(file, this.directory())
      .pipe(
        finalize(() => this.isUploading.set(false))
      )
      .subscribe((response: any) => {
          this.toastr.success("Upload successful!", "Success");
          this.onSuccess.emit(response.url);
        }
      );
  }
  generatePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  
  clearFile(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  
  
  
  // Drag and drop handlers
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }
  
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    
    if (event.dataTransfer?.files.length) {
      this.handleSelectedFile(event.dataTransfer.files[0]);
    }
  }
  
  // Helper methods
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// <div class="card shadow-sm">
//   <div class="card-body">
//     <form [formGroup]="frm" (ngSubmit)="onUpload()">
//       <!-- Upload area -->
//       <div 
//         class="upload-area mb-3 p-4 rounded d-flex flex-column align-items-center justify-content-center"
//         [class.has-image]="previewUrl()"
//         [class.drag-over]="isDragOver()"
//         (click)="triggerFileInput()"
//         (dragover)="onDragOver($event)"
//         (dragleave)="onDragLeave($event)"
//         (drop)="onDrop($event)">
        
//         <!-- Preview image -->
//         <div class="image-preview-container" *ngIf="previewUrl()">
//           <img [src]="previewUrl()" class="img-preview img-fluid rounded" alt="Preview">
//           <button type="button" class="btn-close position-absolute top-0 end-0 m-2" 
//                   (click)="clearFile($event)"></button>
//         </div>
        
//         <!-- Upload icon and instructions -->
//         <div class="text-center" *ngIf="!previewUrl()">
//           <i class="bi bi-cloud-arrow-up upload-icon"></i>
//           <h5 class="mt-3">Drag & Drop or Click to Browse</h5>
//           <p class="text-muted small">Supports: JPG, PNG, WebP</p>
//         </div>
        
//         <!-- Hidden file input -->
//         <input 
//           type="file" 
//           class="visually-hidden"
//           (change)="onFileChange($event)" 
//           accept="image/*"
//           #fileInput>
//       </div>
      
//       <!-- File info and upload button -->
//       <div class="d-flex justify-content-between align-items-center">
//         <!-- File name display -->
//         <div class="selected-file-info d-flex align-items-center" *ngIf="selectedFile()">
//           <i class="bi bi-image-fill me-2 text-primary"></i>
//           <span class="text-truncate">{{ selectedFile()?.name }}</span>
//           <span class="text-muted ms-2">({{ formatFileSize(selectedFile()?.size ?? 0) }})</span>
//         </div>
//         <span class="text-muted" *ngIf="!selectedFile()">No file selected</span>
        
//         <!-- Upload button -->
//         <button 
//           type="submit" 
//           class="btn btn-primary ms-3"
//           [disabled]="!selectedFile() || isUploading()">
//           <span *ngIf="isUploading()">
//             <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//             Uploading...
//           </span>
//           <span *ngIf="!isUploading()">
//             <i class="bi bi-upload me-2"></i>
//             Upload
//           </span>
//         </button>
//       </div>
//     </form>
//   </div>
// </div>