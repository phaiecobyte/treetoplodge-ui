import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './single-upload.html',
  styleUrl: './single-upload.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleUpload),
      multi: true
    }
  ]
})
export class SingleUpload implements OnInit, ControlValueAccessor {
  file = signal<File | null>(null);
  btnUploadVisible = signal<boolean>(true);
  imageUrl = signal<string | null>(null);
  
  @Input() label: string = 'Label';
  
  // ControlValueAccessor implementation
  private onChange: any = () => {};
  private onTouched: any = () => {};
  
  constructor(
    private toastr: ToastrService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {}

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.imageUrl.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleSelectedFile(input.files[0]);
      this.onTouched();
    }
  }

  handleSelectedFile(file: File) {
    if (!file.type.startsWith('image/')) {
      this.toastr.error("Only image files are allowed", "Error");
      return;
    }
    this.file.set(file);
    this.btnUploadVisible.set(false);
  }

  onUpload() {
    const file = this.file();
    if (!file) {
      this.toastr.warning("No file is selected", "Warning");
      return;
    }

    this.uploadService.singleUpload(file, 'accommodation').subscribe({
      next: (res: any) => {
        console.log(res);
        if (res && res.url) {
          this.imageUrl.set(res.url);
          this.onChange(res.url); // Update form control value
          this.toastr.success('Upload successfully', 'Success');
        } else {
          this.toastr.warning('Upload response incomplete', 'Warning');
        }
      },
      error: (err) => {
        console.log('Upload error details:', err);
        this.toastr.error(err.message || JSON.stringify(err), 'Error');
      }
    });
  }
}
