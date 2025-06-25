import { Component, Input } from '@angular/core';
import { AuthService } from '../../helper/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterModule],
  template: `
    <button
      class="btn rounded-circle profile-btn p-0 position-relative"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
    >
      <div class="profile-img-container">
        <img src="{{imgUrl}}" alt="Profile" class="profile-img">
        <div class="profile-hover-overlay d-flex justify-content-center align-items-center">
          <i class="fa-solid fa-bars text-white"></i>
        </div>
      </div>
    </button>
    
    <div
      class="offcanvas offcanvas-end shadow-lg"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header bg-primary bg-gradient text-white">
        <div class="d-flex align-items-center">
          <div class="position-relative me-3">
            <img src={{imgUrl}} alt="Profile" class="profile-detail-img">
            <span class="position-absolute bottom-0 end-0 p-1 bg-success rounded-circle">
              <span class="visually-hidden">Online</span>
            </span>
          </div>
          <div>
            <h5 class="fw-bold mb-1" id="offcanvasRightLabel">{{name}}</h5>
            <p class="text-white-50 mb-0"><i class="fa-solid fa-phone me-2"></i>{{phone}}</p>
          </div>
        </div>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      
      <div class="offcanvas-body p-0 z-3">
        <div class="list-group list-group-flush">
          <a routerLink="/admin/dashboard" class="list-group-item list-group-item-action py-3 px-4 d-flex align-items-center">
            <i class="fa-solid fa-gauge-high me-3 text-primary"></i> 
            <span>Dashboard</span>
            <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
          </a>
          <a routerLink="/admin/profile" class="list-group-item list-group-item-action py-3 px-4 d-flex align-items-center">
            <i class="fa-solid fa-user me-3 text-primary"></i> 
            <span>Your Profile</span>
            <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
          </a>
          <a href="#" class="list-group-item list-group-item-action py-3 px-4 d-flex align-items-center">
            <i class="fa-solid fa-calendar-check me-3 text-primary"></i> 
            <span>Your Bookings</span>
            <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
          </a>
          <div class="p-3 mt-3" (click)="logout()">
            <a href="#" class="btn btn-danger w-100 py-2 d-flex align-items-center justify-content-center">
              <i class="fa-solid fa-right-from-bracket me-2"></i> Sign Out
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .profile-btn {
      transition: all 0.3s ease;
      border: none;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .profile-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 15px rgba(0,0,0,0.2);
    }
    
    .profile-img-container {
      width: 75px;
      height: 75px;
      position: relative;
      overflow: hidden;
    }
    
    .profile-img, .profile-detail-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      border: 3px solid var(--bs-primary);
      transition: all 0.3s ease;
    }
    
    .profile-detail-img {
      width: 80px;
      height: 80px;
    }
    
    .profile-hover-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(13, 110, 253, 0.7);
      opacity: 0;
      transition: all 0.3s ease;
      border-radius: 50%;
    }
    
    .profile-img-container:hover .profile-hover-overlay {
      opacity: 1;
    }
    
    .list-group-item-action {
      
      border-left: 0px solid var(--bs-primary);
    }
    
    .list-group-item-action:hover {
      background-color: #f8f9fa;
      border-left: 5px solid var(--bs-primary);
      padding-left: calc(1.5rem - 5px) !important;
    }
  `,
})
export class ProfileComponent {
  constructor(private authService:AuthService){}
  @Input() phone = "0965799628";
  @Input() name = "phone number owner"
  @Input() imgUrl = 'https://images.pexels.com/photos/492228/pexels-photo-492228.jpeg'

  logout(){
    this.authService.logout();
  }
}
