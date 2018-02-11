import {Component, HostListener, OnInit} from '@angular/core';

import { ViewService } from '../shared/view.service';
import {NotesService} from './notes.service';
import {Observable} from 'rxjs/Observable';
import {Note} from './note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Observable<Note[]>;

  constructor(private viewService: ViewService,
              private notesService: NotesService) {
  }

  // get list of notes
  ngOnInit() {
    this.notes = this.notesService.getNotes();
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
