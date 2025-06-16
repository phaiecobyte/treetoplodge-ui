import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private _pageTitle = signal('Page Title');
  
  get pageTitle() {
    return this._pageTitle;
  }
  
  setPageTitle(title: string) {
    this._pageTitle.set(title);
  }
}