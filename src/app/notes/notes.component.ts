import { Component, HostListener } from '@angular/core';

import { ViewService } from '../shared/view.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
  constructor(private viewService: ViewService) {}

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.viewService.innerWidth = event.target.innerWidth;
    if (!this.viewService.showSideMenu && this.viewService.isLargeScreen()) {
      this.viewService.showSideMenu = this.viewService.isLargeScreen();
    }
  }

  public isLargeScreen() {
    return this.viewService.isLargeScreen();
  }

  public showSideMenu() {
    return this.viewService.showSideMenu;
  }
}
