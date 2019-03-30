import { Component, Input, OnInit } from '@angular/core';
import { ViewService } from '../../shared/view.service';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @Input() notes: Note[];
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
