import { Component, HostListener } from '@angular/core';

import { ViewService } from '../shared/view.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  constructor(private viewService: ViewService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewService.innerWidth = event.target.innerWidth;
  }

  isLargeScreen() {
    return this.viewService.isLargeScreen();
  }

  showSideMenu() {
    return this.viewService.showSideMenu;
  }
}
