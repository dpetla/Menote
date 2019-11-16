import { Injectable } from '@angular/core';

// target width (in px) to hide/show side menu
const targetWidth = 900;

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  public innerWidth = window.innerWidth;
  public showSideMenu = true;

  // checks if screen width is less than or equal target
  public isLargeScreen() {
    return this.innerWidth >= targetWidth;
  }
}
