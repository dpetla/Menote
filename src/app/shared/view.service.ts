import { Injectable, OnInit } from '@angular/core';

// target width (in px) to hide/show side menu
const targetWidth = 900;

@Injectable({
  providedIn: 'root'
})
export class ViewService implements OnInit {
  innerWidth = window.innerWidth;
  showSideMenu: boolean;

  ngOnInit() {
    // initialize variable
    this.showSideMenu = this.isLargeScreen();
  }

  // checks if screen width is less than or equal target
  isLargeScreen() {
    return this.innerWidth >= targetWidth;
  }
}
