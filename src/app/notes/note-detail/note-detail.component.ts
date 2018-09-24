import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { froalaOptions } from './editor-options';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit, OnDestroy {
  readonly tagsMax = 10;
  // local variables
  noteDoc: AngularFirestoreDocument<{}>;
  id: string;
  note: Note;
  subscription: Subscription;
  tags$: Array<string>;
  tagEditable: boolean;
  isTagsFull: boolean;
  froalaOptions: Object = froalaOptions;

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // get note id from url param
    this.subscription = this.route.params.subscribe(
      params => {
        // get note document with with ID passed through the URL
        this.id = params['id'];
        this.noteDoc = this.notesService.getNote(this.id);

        // subscribing to the firebase document (note)
        this.noteDoc.valueChanges().subscribe(
          data => {
            // deleted note -> do nothing
            if (!data) {
              return;
            }
            // store data note in local variable
            this.note = data as Note;

            // get keys and values from tag object
            if (this.note['tags']) {
              this.tags$ = [];
              const keys = Object.keys(this.note['tags']);
              const values = Object.values(this.note['tags']);

              // add tag to local array if value true
              values.forEach((value, index) => value && this.tags$.push(keys[index]));
            }

            // set flags
            this.isTagsFull = this.tags$.length >= this.tagsMax;
            this.tagEditable = false;
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
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

  toggleTagEdit() {
    this.tagEditable = !this.tagEditable;
  }

  onSaveTag(event) {
    const tag = event.target.value;
    const initVal = {};

    // add to local tags arrays
    if (this.tags$.length < this.tagsMax) {
      this.tags$.push(tag);

      // convert tags array to object
      const tagObj = this.tags$.reduce((tags, key) => {
        if (!tags[key]) {
          tags[key] = true;
        }
        return tags;
      }, initVal);

      // load tags to db
      this.noteDoc
        .update({
          tags: tagObj
        })
        .then(() => this.updateDate())
        .catch(error => console.log(error));
    }
    this.toggleTagEdit();
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
    if (window.confirm('Do you want to delete this note?')) {
      this.noteDoc.delete().catch(error => console.log(error));
      this.router.navigate(['/notes']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
