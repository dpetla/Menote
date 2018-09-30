import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewService } from '../shared/view.service';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Observable<Note[]>;

  constructor(private viewService: ViewService, private notesService: NotesService) {}

  // get list of notes
  ngOnInit() {
    this.notesService
      .initialize()
      .then(notes => (this.notes = notes))
      .catch(error => console.log(error));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewService.innerWidth = event.target.innerWidth;
    if (!this.viewService.showSideMenu && this.viewService.isLargeScreen()) {
      this.viewService.showSideMenu = this.viewService.isLargeScreen();
    }
  }

  isLargeScreen() {
    return this.viewService.isLargeScreen();
  }

  showSideMenu() {
    return this.viewService.showSideMenu;
  }
}
