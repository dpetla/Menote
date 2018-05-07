import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { ViewService } from '../../shared/view.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {
  @Input('notes') notes: Observable<Note[]>;
  innerWidth = window.innerWidth;

  constructor(private notesService: NotesService, private viewService: ViewService) {}

  onCreateNote() {
    this.notesService.createNote(false);
  }

  onSelectNote() {
    this.viewService.showSideMenu = false;
  }
}
