import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageTitleService } from '../../shared/services/page-title.service';
import { ProfileComponent } from "./profile";

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterModule, ProfileComponent],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  pageTitleService=inject(PageTitleService)
  isLeftSidebarCollapsed = input.required<boolean>();
  screenWidth = input.required<number>();
  sizeClass = computed(() => {
    const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed();
    if (isLeftSidebarCollapsed) {
      return '';
    }
    return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  });

  
}