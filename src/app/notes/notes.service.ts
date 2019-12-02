import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { selectIsNewUser, selectUser } from '../auth/store/auth.selectors';
import { AppState } from '../reducers';
import { LocalInfoService } from '../shared/local-info.service';
import { WeatherApiResponse } from '../shared/WeatherApiResponse.model';

import * as noteTemplate from './note-templates';
import { Note } from './note.model';

interface ApiData {
  weatherDesc: string;
  temp: string;
  city: string;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService implements OnDestroy {
  public notesRef: AngularFirestoreCollection<Note>;
  public notes$: Observable<Note[]>;
  public newNote: Note = noteTemplate.newNote;
  private isNewUser: boolean;
  private unsubscribe$ = new Subject<void>();
  private uid: string;

  constructor(
    private localInfoService: LocalInfoService,
    private db: AngularFirestore,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.notesRef = this.getNotesRef();

    this.notes$ = this.notesRef.snapshotChanges().pipe(map(this.convertPayloadToNotes));

    this.store
      .select(selectIsNewUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isNewUser => {
        this.isNewUser = isNewUser;
        this.createWelcomeNoteForNewUser();
      });
    this.store
      .select(selectUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ uid }) => (this.uid = uid));
  }

  public getNotesRef(): AngularFirestoreCollection<Note> {
    const uid = localStorage.getItem('menote-uid') || this.uid;
    return this.db.collection('notes', ref => ref.where('uid', '==', uid).orderBy('dateCreated', 'desc'));
  }

  public convertPayloadToNotes(actions) {
    return actions.map(action => {
      const data = action.payload.doc.data();
      const id = action.payload.doc.id;
      return { id, ...data } as Note;
    });
  }

  public createWelcomeNoteForNewUser() {
    if (this.isNewUser) {
      this.createNote();
    }
  }

  public getNotes() {
    return this.notes$;
  }

  public getNote(id: string) {
    return this.notesRef.doc(id);
  }

  public createNote() {
    this.localInfoService
      .getLocalInfo()
      .pipe(
        map((data: WeatherApiResponse) => {
          return {
            weatherDesc: data.weather[0].description,
            temp: this.formatTempString(data.main.temp),
            city: data.name,
            country: data.sys.country,
          };
        }),
      )
      .subscribe((apiData: ApiData) => this.populateInitialFields(apiData));
  }

  public formatTempString(temp: number): string {
    return Math.round(temp) + String.fromCharCode(176) + 'C';
  }

  public populateInitialFields(apiData: ApiData) {
    this.populateStandardFields(apiData);
    this.populateNewUserNote();
    this.addNoteToFirebase(this.newNote);
  }

  public populateStandardFields(apiData) {
    const fields = {
      uid: this.uid,
      location: `${apiData.city}, ${apiData.country}`,
      title: new Date().toDateString(),
      dateCreated: new Date(),
      weather: `${apiData.temp} ${apiData.weatherDesc}`,
    };
    Object.assign(this.newNote, fields);
  }

  public populateNewUserNote() {
    if (this.isNewUser) {
      this.newNote.title = 'Welcome to menote!';
      this.newNote.content = noteTemplate.firstNoteContent;
    }
  }

  public addNoteToFirebase(newNote: Note) {
    this.notesRef
      .add(newNote)
      .then(note => this.router.navigate([note.path]))
      .catch(error => console.log(error));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
