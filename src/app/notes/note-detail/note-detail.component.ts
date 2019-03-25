import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';
import { froalaOptions } from './editor-options';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  readonly tagsMax = 10;
  noteDoc: AngularFirestoreDocument<{}>;
  id$: Observable<string>;
  note$: Observable<{}>;
  tagEditable: boolean;
  isTagsFull: boolean;
  froalaOptions: Object = froalaOptions;

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id$ = this.route.params.pipe(
      map(params => params['id']),
      tap(id => (this.noteDoc = this.notesService.getNote(id)))
    );

    this.note$ = this.id$.pipe(
      switchMap(() =>
        this.noteDoc.valueChanges().pipe(
          filter(note => note != null),
          map((note: Note) => {
            note.tags = this.tagsToArray(note.tags);
            return note;
          }),
          tap(note => this.setNoteFlags(note.tags), error => console.log(error))
        )
      )
    );
  }

  tagsToArray(tagsObj: {}) {
    const tags = [];
    if (tagsObj) {
      const keys = Object.keys(tagsObj);
      const values = Object.values(tagsObj);
      values.forEach((value, index) => value && tags.push(keys[index]));
    }
    return tags;
  }

  setNoteFlags(tags) {
    this.isTagsFull = tags.length >= this.tagsMax;
    this.tagEditable = false;
  }

  onTitleChange(event) {
    this.noteDoc
      .update({ title: event })
      .then(() => this.updateDate())
      .catch(error => console.log(error));
  }

  onContentChange(event) {
    this.noteDoc
      .update({ content: event })
      .then(() => this.updateDate())
      .catch(error => console.log(error));
  }

  onSaveTag(event: any) {
    const newTag = event.target.value;

    this.note$
      .pipe(
        take(1),
        filter((note: Note) => note.tags.length < this.tagsMax),
        map((note: Note) => {
          note.tags.push(newTag);
          const tagObj = this.tagsToObject(note.tags);
          return tagObj;
        })
      )
      .subscribe(
        tags => this.pushTagsToDatabase(tags),
        err => console.log('Error saving tag', err)
      );
    this.toggleTagEdit();
  }

  tagsToObject(tags: Array<string>) {
    return tags.reduce((tags, key) => {
      if (!tags[key]) {
        tags[key] = true;
      }
      return tags;
    }, {});
  }

  pushTagsToDatabase(tags: {}) {
    this.noteDoc
      .update({
        tags: tags
      })
      .then(() => this.updateDate())
      .catch(error => console.log(error));
  }

  toggleTagEdit() {
    this.tagEditable = !this.tagEditable;
  }

  onRemoveTag(tag: string) {
    this.noteDoc
      .update({
        ['tags.' + tag]: firebase.firestore.FieldValue.delete()
      })
      .then(() => this.updateDate())
      .catch(error => console.log(error));
  }

  updateDate() {
    this.noteDoc.update({
      dateUpdated: new Date()
    });
  }

  onDeleteNote() {
    const dialogRef = this.dialog.open(SimpleDialogComponent, {
      width: '350px',
      data: {
        text: 'Delete note?',
        confirmBtn: 'Delete',
        cancelBtn: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(isDelete => {
      if (isDelete) {
        this.noteDoc
          .delete()
          .catch(error => console.log('Error deleting note.', error));
        this.router.navigate(['/notes']);
      }
    });
  }
}
