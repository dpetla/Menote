import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewService } from '../../shared/view.service';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('notes')
  notes: Observable<Note[]>;
  innerWidth = window.innerWidth;

  constructor(private notesService: NotesService, private viewService: ViewService) {}

  onCreateNote(e: Event) {
    e.stopPropagation();
    this.notesService.createNote(false);
  }

  onSelectNote() {
    this.viewService.showSideMenu = false;
  }

  // getTimeCreated(note: Note) {
  //   return note.dateCreated.getTime();
  // }
}
