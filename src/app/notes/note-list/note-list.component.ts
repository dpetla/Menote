import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ViewService } from '../../shared/view.service';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnChanges {
  @Input('notes')
  notes: Observable<Note[]>;
  _notes: Note[];
  _notesResult: Note[];
  searchString = '';
  // innerWidth = window.innerWidth;

  constructor(private notesService: NotesService, private viewService: ViewService) {}

  ngOnInit() {}

  // @Input("notes")
  // set notes($notes: Observable<Note[]>) {
  //   if (typeof $notes !== "undefined") {
  //     $notes.subscribe(notes => {
  //       this._notes = notes;
  //       this._notesResult = this._notes;
  //     });
  //   }
  // }

  ngOnChanges(changes) {
    if (changes['notes'] && this.notes) {
      this.notes.subscribe(notes => {
        this._notes = notes;
        this._notesResult = this._notes;
      });
    }
  }

  onCreateNote(e: Event) {
    e.stopPropagation();
    this.notesService.createNote();
  }

  onSelectNote() {
    this.viewService.showSideMenu = this.viewService.isLargeScreen();
  }

  // getTimeCreated(note: Note) {
  //   return note.dateCreated.getTime();
  // }

  onSearchList(searchString) {
    this.searchString = searchString;
    if (searchString === '') {
      this.resetNoteList();
    }
    if (!this._notes) {
      return;
    } else {
      const term = searchString.toLowerCase();
      this._notesResult = this._notes.filter(note => {
        const cleanContent = note.content.toLowerCase().replace(/<\/?[^>]+(>|$)/g, '');
        return (
          cleanContent.includes(term) ||
          note.title.toLowerCase().includes(term) ||
          note.location.toLowerCase().includes(term) ||
          Object.keys(note.tags).some(tag => tag.toLowerCase().indexOf(term) >= 0)
        );
      });
    }
  }

  resetNoteList() {
    this.searchString = '';
    this._notesResult = this._notes;
  }
}
