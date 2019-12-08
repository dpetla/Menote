import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { AppState } from '../../reducers';
import { Note } from '../../types/note.interface';
import { showDeleteNoteModal, updateNote } from '../store/notes.actions';
import { selectNote } from '../store/notes.selectors';

import { froalaOptions } from './editor-options';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
})
export class NoteDetailComponent {
  public readonly tagsMax = 10;
  public noteDoc: AngularFirestoreDocument<{}>; // TODO: delete
  public note$: Observable<Note> = this.store.select(selectNote).pipe(tap(note => this.setNoteFlags(note.tags)));
  public tagEditable: boolean;
  public isTagsFull: boolean;
  public froalaOptions: Object = froalaOptions;

  constructor(private store: Store<AppState>) {}

  public setNoteFlags(tags) {
    this.isTagsFull = tags.length >= this.tagsMax;
    this.tagEditable = false;
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

  public pushTagsToDatabase(value: {}) {
    this.store.dispatch(updateNote({ key: 'tags', value }));
  }

  public onRemoveTag(tag: string) {
    this.store.dispatch(updateNote({ key: 'tags.' + tag, value: firebase.firestore.FieldValue.delete() }));
  }

  /*  TODO: refactor Tag managment */
  public onSaveTag(event: any) {
    const newTag = event.target.value;
    this.note$
      .pipe(
        take(1),
        filter((note: Note) => note.tags.length < this.tagsMax),
        map((note: Note) => {
          note.tags.push(newTag);
          const tagObj = note.tags.reduce((acc, key) => {
            if (!acc[key]) {
              acc[key] = true;
            }
            return acc;
          }, {});
          return tagObj;
        }),
      )
      .subscribe(tags => this.pushTagsToDatabase(tags));
    this.toggleTagEdit();
  }
}
