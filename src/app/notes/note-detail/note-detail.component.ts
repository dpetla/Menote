import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState } from '../../reducers';
import { Note } from '../../types/note.interface';
import { showDeleteNoteModal, updateNote } from '../store/notes.actions';
import { selectNote } from '../store/notes.selectors';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailComponent {
  public readonly tagsMax = 10;
  public note$: Observable<Note> = this.store.select(selectNote).pipe(tap(note => this.setNoteFlags(note)));
  public tagEditable: boolean;
  public isTagsFull: boolean;
  public froalaOptions = {
    placeholderText: 'Describe your day ...',
  };

  constructor(private store: Store<AppState>) {}

  public setNoteFlags(note) {
    if (note && note.tags) {
      this.isTagsFull = note.tags.length >= this.tagsMax;
      this.tagEditable = false;
    }
  }

  public onTitleChange(value) {
    this.store.dispatch(updateNote({ key: 'title', value }));
  }

  public onContentChange(value) {
    this.store.dispatch(updateNote({ key: 'content', value }));
  }

  public onDeleteNote() {
    this.store.dispatch(showDeleteNoteModal());
  }

  public toggleTagEdit() {
    this.tagEditable = !this.tagEditable;
  }

  public onRemoveTag(tag: string) {
    this.store.dispatch(updateNote({ key: 'tags' + tag, value: firebase.firestore.FieldValue.arrayRemove(tag) }));
  }

  public onSaveTag(event: any) {
    this.store.dispatch(
      updateNote({ key: 'tags', value: firebase.firestore.FieldValue.arrayUnion(event.target.value) }),
    );
    this.toggleTagEdit();
  }
}
