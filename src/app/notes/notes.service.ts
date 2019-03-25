import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { LocalInfoService } from '../shared/local-info.service';
import { AuthService } from './../auth/auth.service';
import * as noteTemplate from './note-templates';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesRef: AngularFirestoreCollection<Note>;
  notes$: Observable<Note[]>;
  deletedNotesRef: AngularFirestoreCollection<Note[]>;
  newNote: Note = noteTemplate.newNote;

  constructor(
    private localInfoService: LocalInfoService,
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {
    this.createWelcomeNoteForNewUser();
  }

  getNotesRef(): AngularFirestoreCollection<Note> {
    return this.db.collection('notes', ref => {
      return ref
        .where('uid', '==', this.authService.user.uid)
        .orderBy('dateCreated', 'desc');
    });
  }

  createWelcomeNoteForNewUser() {
    if (this.authService.isNewUser) {
      this.createNote();
    }
  }

  getNotes() {
    return this.notes$;
  }

  getNote(id: string) {
    return this.notesRef.doc(id);
  }

  // get location data then gather data to create note
  createNote() {
    this.localInfoService.getLocalInfo(() => {
      // enter note data
      this.newNote.uid = this.authService.user.uid;
      this.newNote.location = `${this.localInfoService.city}, ${
        this.localInfoService.country
      }`;
      this.newNote.title = new Date().toDateString();
      this.newNote.dateCreated = new Date();
      this.newNote.weather = `${this.localInfoService.temp} ${
        this.localInfoService.weatherDesc
      }`;

      // create instruction note when signing up new user
      if (this.authService.isNewUser) {
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
