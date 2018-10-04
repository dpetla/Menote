import { Injectable } from '@angular/core';

// target width (in px) to hide/show side menu
const targetWidth = 900;

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  innerWidth = window.innerWidth;
  showSideMenu = true;

  // checks if screen width is less than or equal target
  isLargeScreen() {
    return this.innerWidth >= targetWidth;
  }
}
