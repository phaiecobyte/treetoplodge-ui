import { Component, HostListener, signal } from "@angular/core";
import { LeftSidebar } from "./left-sidebar/left-sidebar";
import { Main } from "./main/main";

@Component({
    selector:'app-admin',
    standalone:true,
    template:`
        <app-left-sidebar
        [isLeftSidebarCollapsed]="isLeftSidebarCollapsed()"
        (changeIsLeftSidebarCollapsed)="changeIsLeftSidebarCollapsed($event)"
        />

        <app-main
        [isLeftSidebarCollapsed]="isLeftSidebarCollapsed()"
        [screenWidth]="screenWidth()"
        />
    `,
    imports:[LeftSidebar,Main],
})

export class Admin{
isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }   
}