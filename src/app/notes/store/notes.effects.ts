import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { from, of, Observable } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { getTokenFailure } from '../../auth/store/auth.actions';
import { selectIsNewUser, selectUser } from '../../auth/store/auth.selectors';
import { AppState } from '../../reducers';
import { Note } from '../../types/note.interface';
import { WeatherApiResponse } from '../../types/WeatherApiResponse.model';
import { convertPayloadToNotes } from '../../utils/utils';
import * as noteTemplate from '../note-templates';

import {
  createNote,
  createNoteFailure,
  createNoteSuccess,
  initApp,
  retrieveCoordinates,
  retrieveCoordinatesFailure,
  retrieveLocalWeather,
  retrieveLocalWeatherFailure,
  retrieveLocalWeatherSuccess,
  retrieveNotes,
  retrieveNotesFailure,
  retrieveNotesRef,
  retrieveNotesSuccess,
  updateAppFailure,
  updateAppSuccess,
  updateAvailable,
} from './notes.actions';
import { selectNoteWeatherData } from './notes.selectors';

@Injectable()
export class NotesEffects {
  private notesRef: AngularFirestoreCollection<Note>;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar,
    private db: AngularFirestore,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  public checkAppUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initApp),
      switchMap(() => this.swUpdate.available.pipe(map(() => updateAvailable()))),
    ),
  );

  public updateAvailable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAvailable),
      switchMap(() =>
        this.snackbar
          .open('Update Available', 'Reload', { duration: 6000 })
          .onAction()
          .pipe(
            tap(() => window.location.reload()),
            map(() => updateAppSuccess()),
            catchError(() => of(updateAppFailure())),
          ),
      ),
    ),
  );

  public retrieveCoordinates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveCoordinates, initApp, createNote),
      switchMap(() =>
        new Observable(obs => {
          navigator.geolocation.getCurrentPosition(
            success => {
              obs.next(success);
              obs.complete();
            },
            error => obs.error(error),
          );
        }).pipe(
          map(({ coords }) => retrieveLocalWeather({ coords })),
          catchError(error => of(retrieveCoordinatesFailure({ error }))),
        ),
      ),
    ),
  );

  public retrieveLocalWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveLocalWeather),
      switchMap(({ coords }) =>
        this.http
          .get<WeatherApiResponse>(
            `${environment.openWeatherMap.url}lat=${coords.latitude}&lon=${coords.longitude}&APPID=${environment.openWeatherMap.appId}&units=metric`,
          )
          .pipe(
            map(currentWeather => retrieveLocalWeatherSuccess({ currentWeather })),
            catchError(error => of(retrieveLocalWeatherFailure({ error }))),
          ),
      ),
    ),
  );

  public retrieveNotesRef$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveNotesRef),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([_, { uid }]) =>
        of(
          this.db.collection<Note>('notes', ref => ref.where('uid', '==', uid).orderBy('dateCreated', 'desc')),
        ),
      ),
      tap(notesRef => (this.notesRef = notesRef)),
      map(() => retrieveNotes()),
      catchError(error => of(retrieveNotesFailure({ error }))),
    ),
  );

  public invalidateNotesRef$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getTokenFailure),
        tap(() => (this.notesRef = null)),
      ),
    { dispatch: false },
  );

  public retrieveNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveNotes),
      switchMap(() => this.notesRef.snapshotChanges().pipe(map(convertPayloadToNotes))),
      map(notes => retrieveNotesSuccess({ notes })),
      catchError(error => of(retrieveNotesFailure({ error }))),
    ),
  );

  public createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNote),
      withLatestFrom(
        this.store.select(selectNoteWeatherData),
        this.store.select(selectUser),
        this.store.select(selectIsNewUser),
      ),
      map(([_, weatherData, user, isNewUser]) => {
        const fields = {
          uid: user.uid,
          location: `${weatherData.city}, ${weatherData.country}`,
          title: isNewUser ? 'Welcome to menote!' : new Date().toDateString(),
          dateCreated: new Date(),
          weather: `${weatherData.temp} ${weatherData.weatherDesc}`,
          content: isNewUser ? noteTemplate.firstNoteContent : '',
        };
        return Object.assign(noteTemplate.newNote, fields);
      }),
      switchMap(note =>
        from(this.notesRef.add(note)).pipe(
          map(note => createNoteSuccess({ note })),
          catchError(error => of(createNoteFailure({ error }))),
        ),
      ),
    ),
  );

  public createNoteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createNoteSuccess),
        map(({ note }) => this.router.navigate([note.path])),
      ),
    { dispatch: false },
  );

  public createNoteFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createNoteFailure),
        switchMap(({ error }) => this.snackbar.open(error.message, null, { duration: 6000 }).onAction()),
      ),
    { dispatch: false },
  );
}
