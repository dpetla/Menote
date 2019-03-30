import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalInfoService } from '../shared/local-info.service';
import { WeatherApiResponse } from '../shared/WeatherApiResponse.model';
import { AuthService } from './../auth/auth.service';
import * as noteTemplate from './note-templates';
import { Note } from './note.model';

interface apiData {
  weatherDesc: string;
  temp: string;
  city: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesRef: AngularFirestoreCollection<Note>;
  notes$: Observable<Note[]>;
  newNote: Note = noteTemplate.newNote;

  constructor(
    private localInfoService: LocalInfoService,
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {
    this.notesRef = this.getNotesRef();

    this.notes$ = this.notesRef
      .snapshotChanges()
      .pipe(map(this.convertPayloadToNotes));

    this.createWelcomeNoteForNewUser();
  }

  getNotesRef(): AngularFirestoreCollection<Note> {
    const uid = localStorage.getItem('menote-uid') || this.authService.user.uid;
    return this.db.collection('notes', ref =>
      ref.where('uid', '==', uid).orderBy('dateCreated', 'desc')
    );
  }

  convertPayloadToNotes(actions) {
    return actions.map(action => {
      const data = action.payload.doc.data();
      const id = action.payload.doc.id;
      return { id, ...data } as Note;
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

  createNote() {
    this.localInfoService
      .getLocalInfo()
      .pipe(
        map((data: WeatherApiResponse) => {
          return {
            weatherDesc: data.weather[0].description,
            temp: this.formatTempString(data.main.temp),
            city: data.name,
            country: data.sys.country
          };
        })
      )
      .subscribe((apiData: apiData) => this.populateInitialFields(apiData));
  }

  formatTempString(temp: number): string {
    return Math.round(temp) + String.fromCharCode(176) + 'C';
  }

  populateInitialFields(apiData: apiData) {
    // enter note data
    this.newNote.uid = this.authService.user.uid;
    this.newNote.location = `${apiData.city}, ${apiData.country}`;
    this.newNote.title = new Date().toDateString();
    this.newNote.dateCreated = new Date();
    this.newNote.weather = `${apiData.temp} ${apiData.weatherDesc}`;

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
  }
}
