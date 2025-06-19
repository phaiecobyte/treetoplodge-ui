import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CardComponent } from "../../shared/components/card";
import { InputComponent } from "../../shared/components/input";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  role: 'admin' | 'customer';
  joinDate: Date;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  preferences?: {
    newsletter: boolean;
    specialOffers: boolean;
    roomPreference?: string;
  };
  // Admin-specific properties
  department?: string;
  position?: string;
  // Customer-specific properties
  loyaltyPoints?: number;
  lastStay?: Date;
  upcomingReservations?: number;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CardComponent, InputComponent],
  template: `
    <div class="container py-5">
      <div class="row">
        <!-- Left Column - Profile Summary -->
        <div class="col-lg-4 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-primary text-white text-center p-4">
              <div class="position-relative mx-auto mb-3">
                <img 
                  [src]="userProfile.profileImage || 'assets/images/default-profile.jpg'" 
                  class="rounded-circle img-thumbnail" 
                  alt="Profile image"
                  width="120" 
                  height="120">
                <button class="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle p-1" data-bs-toggle="modal" data-bs-target="#uploadPhotoModal">
                  <i class="bi bi-camera"></i>
                </button>
              </div>
              <h4 class="mb-0">{{ userProfile.firstName }} {{ userProfile.lastName }}</h4>
              <p class="small mb-0">{{ userProfile.email }}</p>
              <span class="badge" 
                    [ngClass]="{'bg-info': userProfile.role === 'admin', 'bg-secondary': userProfile.role === 'customer'}">
                {{ userProfile.role === 'admin' ? 'Administrator' : 'Customer' }}
              </span>
            </div>
            <div class="card-body">
              <div *ngIf="userProfile.role === 'admin'" class="py-2">
                <h6>Department</h6>
                <p class="text-muted">{{ userProfile.department || 'Not specified' }}</p>
                <h6>Position</h6>
                <p class="text-muted">{{ userProfile.position || 'Not specified' }}</p>
              </div>
              
              <div *ngIf="userProfile.role === 'customer'" class="py-2">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 class="mb-0">Loyalty Points</h6>
                  <span class="badge bg-success">{{ userProfile.loyaltyPoints || 0 }} points</span>
                </div>
                
                <div *ngIf="userProfile.lastStay" class="mb-3">
                  <h6>Last Stay</h6>
                  <p class="text-muted mb-0">{{ userProfile.lastStay | date:'mediumDate' }}</p>
                </div>
                
                <div *ngIf="userProfile.upcomingReservations" class="mb-3">
                  <h6>Upcoming Reservations</h6>
                  <a routerLink="/reservations" class="btn btn-sm btn-outline-primary">
                    View {{ userProfile.upcomingReservations }} reservation(s)
                  </a>
                </div>
              </div>
              
              <hr>
              
              <div class="py-2">
                <h6>Member Since</h6>
                <p class="text-muted">{{ userProfile.joinDate | date:'mediumDate' }}</p>
                
                <h6>Contact</h6>
                <p class="text-muted mb-1">
                  <i class="bi bi-envelope me-2"></i>{{ userProfile.email }}
                </p>
                <p class="text-muted">
                  <i class="bi bi-telephone me-2"></i>{{ userProfile.phone || 'Not specified' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Column - Edit Profile -->
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-light p-3">
              <h5 class="mb-0">Profile Information</h5>
            </div>
            <div class="card-body">
              <form [formGroup]="profileForm" (ngSubmit)="saveProfile()">
                <div class="row mb-3">
                  <div class="col-md-6 mb-3 mb-md-0">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="firstName" formControlName="firstName">
                    <div *ngIf="submitted && f['firstName'].errors" class="text-danger small mt-1">
                      <div *ngIf="f['firstName'].errors['required']">First name is required</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastName" formControlName="lastName">
                    <div *ngIf="submitted && f['lastName'].errors" class="text-danger small mt-1">
                      <div *ngIf="f['lastName'].errors['required']">Last name is required</div>
                    </div>
                  </div>
                </div>
                
                <div class="row mb-3">
                  <div class="col-md-6 mb-3 mb-md-0">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" formControlName="email">
                    <div *ngIf="submitted && f['email'].errors" class="text-danger small mt-1">
                      <div *ngIf="f['email'].errors['required']">Email is required</div>
                      <div *ngIf="f['email'].errors['email']">Enter a valid email</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" id="phone" formControlName="phone">
                  </div>
                </div>
                
                <div *ngIf="userProfile.role === 'admin'" class="row mb-3">
                  <div class="col-md-6 mb-3 mb-md-0">
                    <label for="department" class="form-label">Department</label>
                    <input type="text" class="form-control" id="department" formControlName="department">
                  </div>
                  <div class="col-md-6">
                    <label for="position" class="form-label">Position</label>
                    <input type="text" class="form-control" id="position" formControlName="position">
                  </div>
                </div>
                
                <h6 class="mt-4 mb-3">Address</h6>
                <div class="row mb-3">
                  <div class="col-12 mb-3">
                    <label for="street" class="form-label">Street Address</label>
                    <input type="text" class="form-control" id="street" formControlName="street">
                  </div>
                  <div class="col-md-6 mb-3 mb-md-0">
                    <label for="city" class="form-label">City</label>
                    <input type="text" class="form-control" id="city" formControlName="city">
                  </div>
                  <div class="col-md-6">
                    <label for="state" class="form-label">State/Province</label>
                    <input type="text" class="form-control" id="state" formControlName="state">
                  </div>
                </div>
                
                <div class="row mb-3">
                  <div class="col-md-6 mb-3 mb-md-0">
                    <label for="zip" class="form-label">Postal Code</label>
                    <input type="text" class="form-control" id="zip" formControlName="zip">
                  </div>
                  <div class="col-md-6">
                    <label for="country" class="form-label">Country</label>
                    <select class="form-select" id="country" formControlName="country">
                      <option value="Cambodia">Cambodia</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <!-- Add more countries as needed -->
                    </select>
                  </div>
                </div>
                
                <div *ngIf="userProfile.role === 'customer'" class="mt-4 mb-3">
                  <h6 class="mb-3">Preferences</h6>
                  
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="newsletter" formControlName="newsletter">
                    <label class="form-check-label" for="newsletter">
                      Receive newsletters and updates
                    </label>
                  </div>
                  
                  <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="specialOffers" formControlName="specialOffers">
                    <label class="form-check-label" for="specialOffers">
                      Receive special offers and promotions
                    </label>
                  </div>
                  
                  <div class="mb-3">
                    <label for="roomPreference" class="form-label">Room Preference</label>
                    <select class="form-select" id="roomPreference" formControlName="roomPreference">
                      <option value="">No preference</option>
                      <option value="Canopy Suite">Canopy Suite</option>
                      <option value="Forest Cabin">Forest Cabin</option>
                      <option value="Family Treehouse">Family Treehouse</option>
                    </select>
                  </div>
                </div>
                
                <div *ngIf="saveError" class="alert alert-danger mt-3">{{ saveError }}</div>
                <div *ngIf="saveSuccess" class="alert alert-success mt-3">{{ saveSuccess }}</div>
                
                <div class="d-flex justify-content-end mt-4">
                  <button type="button" class="btn btn-outline-secondary me-2" (click)="resetForm()">Cancel</button>
                  <button type="submit" class="btn btn-primary" [disabled]="saving">
                    <span *ngIf="saving" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <!-- Change Password Card -->
          <!-- <div class="card border-0 shadow-sm">
            <div class="card-header bg-light p-3">
              <h5 class="mb-0">Change Password</h5>
            </div>
            <div class="card-body">
              <form [formGroup]="passwordForm" (ngSubmit)="changePassword()">
                <div class="mb-3">
                  <label for="currentPassword" class="form-label">Current Password</label>
                  <input type="password" class="form-control" id="currentPassword" formControlName="currentPassword">
                  <div *ngIf="passwordSubmitted && p['currentPassword'].errors" class="text-danger small mt-1">
                    <div *ngIf="p['currentPassword'].errors['required']">Current password is required</div>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="newPassword" class="form-label">New Password</label>
                  <input type="password" class="form-control" id="newPassword" formControlName="newPassword">
                  <div *ngIf="passwordSubmitted && p['newPassword'].errors" class="text-danger small mt-1">
                    <div *ngIf="p['newPassword'].errors['required']">New password is required</div>
                    <div *ngIf="p['newPassword'].errors['minlength']">Password must be at least 8 characters</div>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm New Password</label>
                  <input type="password" class="form-control" id="confirmPassword" formControlName="confirmPassword">
                  <div *ngIf="passwordSubmitted && p['confirmPassword'].errors" class="text-danger small mt-1">
                    <div *ngIf="p['confirmPassword'].errors['required']">Please confirm your password</div>
                    <div *ngIf="p['confirmPassword'].errors['mustMatch']">Passwords must match</div>
                  </div>
                </div>
                
                <div *ngIf="passwordError" class="alert alert-danger mt-3">{{ passwordError }}</div>
                <div *ngIf="passwordSuccess" class="alert alert-success mt-3">{{ passwordSuccess }}</div>
                
                <div class="d-flex justify-content-end mt-4">
                  <button type="button" class="btn btn-outline-secondary me-2" (click)="resetPasswordForm()">Cancel</button>
                  <button type="submit" class="btn btn-primary" [disabled]="changingPassword">
                    <span *ngIf="changingPassword" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div> -->
        
          <app-card
            feature="Change Password"
          >
            <app-input
                label="Current Password"
                type="password"
                suffixIcon="fa-regular fa-eye"
            />
            <app-input
                label="New Password"
                type="password"
            />
            <app-input
                label="Confirm New Password"
                type="password"
            />
                <div class="d-flex justify-content-end mt-4">
                  <button type="button" class="btn btn-outline-secondary me-2" (click)="resetPasswordForm()">Cancel</button>
                  <button type="submit" class="btn btn-primary" [disabled]="changingPassword">
                    <span *ngIf="changingPassword" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Update Password
                  </button>
                </div>
          </app-card>
        </div>
      </div>
      
    </div>
    
    
    <!-- Photo Upload Modal -->
    <div class="modal fade" id="uploadPhotoModal" tabindex="-1" aria-labelledby="uploadPhotoModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="uploadPhotoModalLabel">Update Profile Photo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-4">
              <img 
                [src]="previewImage || userProfile.profileImage || 'assets/images/default-profile.jpg'" 
                class="rounded-circle img-thumbnail mb-3" 
                alt="Profile preview"
                width="150" 
                height="150">
            </div>
            
            <div class="mb-3">
              <label for="profilePhoto" class="form-label">Choose a new photo</label>
              <input class="form-control" type="file" id="profilePhoto" (change)="onFileChange($event)">
              <div class="form-text">Recommended: Square image, at least 300x300 pixels.</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" [disabled]="!selectedFile" (click)="uploadPhoto()">Upload Photo</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UserProfileComponent implements OnInit {
  @Input() userId: string = ''; 
  userProfile: UserProfile = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+855 12 345 678',
    profileImage: 'assets/images/default-profile.jpg',
    role: 'customer', // Change to 'admin' to test admin view
    joinDate: new Date('2023-01-15'),
    address: {
      street: '123 Forest Way',
      city: 'Siem Reap',
      state: 'Siem Reap Province',
      zip: '17000',
      country: 'Cambodia'
    },
    preferences: {
      newsletter: true,
      specialOffers: false,
      roomPreference: 'Canopy Suite'
    },
    department: 'Management',
    position: 'Supervisor',
    loyaltyPoints: 250,
    lastStay: new Date('2023-05-20'),
    upcomingReservations: 1
  };
  
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  submitted = false;
  passwordSubmitted = false;
  saving = false;
  changingPassword = false;
  saveError = '';
  saveSuccess = '';
  passwordError = '';
  passwordSuccess = '';
  
  selectedFile: File | null = null;
  previewImage: string | null = null;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.initializeForms();
    // In a real app, you would fetch the user profile based on userId
    // this.fetchUserProfile(this.userId);
  }
  
  initializeForms(): void {
    // Profile form
    this.profileForm = this.fb.group({
      firstName: [this.userProfile.firstName, Validators.required],
      lastName: [this.userProfile.lastName, Validators.required],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
      phone: [this.userProfile.phone],
      department: [this.userProfile.department],
      position: [this.userProfile.position],
      street: [this.userProfile.address?.street],
      city: [this.userProfile.address?.city],
      state: [this.userProfile.address?.state],
      zip: [this.userProfile.address?.zip],
      country: [this.userProfile.address?.country],
      newsletter: [this.userProfile.preferences?.newsletter],
      specialOffers: [this.userProfile.preferences?.specialOffers],
      roomPreference: [this.userProfile.preferences?.roomPreference],
    });
    
    // Password form
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('newPassword', 'confirmPassword')
    });
  }
  
  get f() { return this.profileForm.controls; }
  get p() { return this.passwordForm.controls; }
  
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  
  saveProfile(): void {
    this.submitted = true;
    this.saveError = '';
    this.saveSuccess = '';
    
    if (this.profileForm.invalid) {
      return;
    }
    
    this.saving = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Update userProfile object with form values
        this.userProfile = {
          ...this.userProfile,
          firstName: this.f['firstName'].value,
          lastName: this.f['lastName'].value,
          email: this.f['email'].value,
          phone: this.f['phone'].value,
          department: this.f['department']?.value,
          position: this.f['position']?.value,
          address: {
            street: this.f['street'].value,
            city: this.f['city'].value,
            state: this.f['state'].value,
            zip: this.f['zip'].value,
            country: this.f['country'].value
          },
          preferences: {
            newsletter: this.f['newsletter'].value,
            specialOffers: this.f['specialOffers'].value,
            roomPreference: this.f['roomPreference'].value
          }
        };
        
        this.saveSuccess = 'Profile updated successfully!';
        this.submitted = false;
      } catch (error) {
        this.saveError = 'Failed to update profile. Please try again.';
        console.error('Profile update error:', error);
      } finally {
        this.saving = false;
      }
    }, 1000);
  }
  
  changePassword(): void {
    this.passwordSubmitted = true;
    this.passwordError = '';
    this.passwordSuccess = '';
    
    if (this.passwordForm.invalid) {
      return;
    }
    
    this.changingPassword = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // In a real app, you would send this to your API
        console.log('Password change payload:', {
          currentPassword: this.p['currentPassword'].value,
          newPassword: this.p['newPassword'].value
        });
        
        this.passwordSuccess = 'Password changed successfully!';
        this.resetPasswordForm();
      } catch (error) {
        this.passwordError = 'Failed to change password. Please verify your current password.';
        console.error('Password change error:', error);
      } finally {
        this.changingPassword = false;
      }
    }, 1000);
  }
  
  resetForm(): void {
    this.submitted = false;
    this.saveError = '';
    this.saveSuccess = '';
    this.initializeForms();
  }
  
  resetPasswordForm(): void {
    this.passwordSubmitted = false;
    this.passwordError = '';
    this.passwordSuccess = '';
    this.passwordForm.reset();
  }
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  uploadPhoto(): void {
    if (!this.selectedFile) return;
    
    // In a real app, you would upload the file to your server
    // Here we're just updating the local state for demo purposes
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.userProfile.profileImage = e.target.result;
      this.selectedFile = null;
      
      // Close modal programmatically
      const modalElement = document.getElementById('uploadPhotoModal');
      if (modalElement) {
        // Using Bootstrap's Modal API would be better in a real app
        // but for this example, we'll just add the .hide-modal class to trigger hiding
        modalElement.classList.add('hide-modal');
      }
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

// (no rusable component) 651