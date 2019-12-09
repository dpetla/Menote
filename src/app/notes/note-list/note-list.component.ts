import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../reducers';
import { Note } from '../../types/note.interface';
import { createNote } from '../store/notes.actions';
import { selectNotes } from '../store/notes.selectors';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListComponent {
  public notes$: Observable<Note[]> = this.store.select(selectNotes);
  public searchText = '';

  constructor(private store: Store<AppState>) {}

  public onCreateNote() {
    this.store.dispatch(createNote());
  }
}
