import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ViewService } from '../../shared/view.service';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @Input('notes') notes$: Observable<Note[]>;
  notes: Note[];
  notesResult: Note[];
  searchText = '';

  constructor(
    private notesService: NotesService,
    private viewService: ViewService
  ) {}

  ngOnInit() {}

  onCreateNote(e: Event) {
    e.stopPropagation();
    this.notesService.createNote();
  }

  onSelectNote() {
    this.viewService.showSideMenu = this.viewService.isLargeScreen();
  }

  resetNoteList() {
    this.searchText = '';
  }
}
