import { Component, Input, OnInit } from '@angular/core';

import { ViewService } from '../../shared/view.service';
import { Note } from '../../types/note.interface';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  @Input() public notes: Note[];
  public searchText = '';

  constructor(private notesService: NotesService, private viewService: ViewService) {}

  public ngOnInit() {}

  public onCreateNote(e: Event) {
    e.stopPropagation();
    this.notesService.createNote();
  }

  public onSelectNote() {
    this.viewService.showSideMenu = this.viewService.isLargeScreen();
  }

  public resetNoteList() {
    this.searchText = '';
  }
}
