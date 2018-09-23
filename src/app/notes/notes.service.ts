import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalInfoService } from '../shared/local-info.service';
import { AuthService } from './../auth/auth.service';
import * as noteTemplate from './note-templates';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesRef: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;
  deletedNotesRef: AngularFirestoreCollection<Note[]>;

  // note template used for creating notes
  newNote: Note = noteTemplate.newNote;

  constructor(
    private localInfoService: LocalInfoService,
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.authService.user) {
        // getting user's notes ref
        this.notesRef = this.db.collection('notes', ref => {
          return ref.where('uid', '==', this.authService.user.uid).orderBy('dateCreated', 'desc');
        });

        // subscription to user's notes
        this.notes = this.notesRef.snapshotChanges().pipe(
          map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as Note;
              const id = action.payload.doc.id;
              return { id, ...data };
            });
          })
        );

        // notes trash ref
        this.deletedNotesRef = this.db.collection('notes-deleted');

        resolve(this.notes);
      } else {
        // this.router.navigate(['/']);
        reject();
      }
    });
  }

  // Get all notes
  getNotes() {
    return this.notes;
  }

  // get note by id
  getNote(id: string) {
    return this.notesRef.doc(id);
  }

  // get location data then gather data to create note
  createNote(isFirstNote = false) {
    this.localInfoService.getLocalInfo(() => {
      // enter note data
      this.newNote.uid = this.authService.user.uid;
      this.newNote.location = `${this.localInfoService.city}, ${this.localInfoService.country}`;
      this.newNote.title = new Date().toDateString();
      this.newNote.dateCreated = new Date();
      this.newNote.weather = `${this.localInfoService.temp} ${this.localInfoService.weatherDesc}`;

      // create instruction note when signing up new user
      if (isFirstNote) {
        this.newNote.title = 'Welcome to menote!';
        this.newNote.content = noteTemplate.firstNoteContent;
      }

      // create note document in db
      this.notesRef
        .add(this.newNote)
        .then(note => this.router.navigate([note.path]))
        .catch(error => console.log(error));
    });
  }
}
