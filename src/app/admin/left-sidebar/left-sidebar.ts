import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss'
})
export class LeftSidebar {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
      { 
          label: 'Dashboard', 
          icon: 'fa-solid fa-home', 
          routeLink: '/admin/dashboard'
      },
      { 
          label: 'Food & Beverage', 
          icon: 'fa-solid fa-utensils', 
          routeLink: '/admin/members' 
      },
      { 
          label: 'Accommodation', 
          icon: 'fa-solid fa-person-booth', 
          routeLink: '/admin/settings' 
      },
      {
          label:'Manage Users',
          icon:'fa-solid fa-users',
          routeLink:'/admin/users'
      },
      {
        label:'Go Back',
        icon:'fa-solid fa-backward-step',
        routeLink:'/'
      }
    ]

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}