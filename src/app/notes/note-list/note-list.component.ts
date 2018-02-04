import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { ViewService } from '../../shared/view.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Observable<Note[]>;
  innerWidth = window.innerWidth;
  selectedNote: Note;

  constructor(private notesService: NotesService,
              private viewService: ViewService) {
  }

  ngOnInit() {
    this.notes = this.notesService.getNotes();
  }

  onCreateNote() {
    this.notesService.createNote();
  }

  onSelectNote(note: Note) {
    this.selectedNote = note;
    this.viewService.showSideMenu = false;
  }

}
