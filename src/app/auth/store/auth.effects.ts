import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { from, of } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  exhaustMap,
  first,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { AppState } from '../../../app/reducers';
import { initApp, retrieveNotesRef } from '../../notes/store/notes.actions';

import {
  getToken,
  getTokenFailure,
  getTokenSuccess,
  login,
  loginFailure,
  loginSuccess,
  loginWithPopUp,
  logout,
  logoutFailure,
  logoutSuccess,
  setSessionPersistence,
  setSessionPersistenceFailure,
} from './auth.actions';
import { selectIsAuthenticated, selectUser } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private store: Store<AppState>) {}

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      map(() => setSessionPersistence()),
      catchError(error => of(loginFailure({ error }))),
    ),
  );

  public setSessionPersistence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSessionPersistence),
      map(() => from(firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION))),
      map(() => loginWithPopUp()),
      catchError(error => of(setSessionPersistenceFailure({ error }))),
    ),
  );

  public loginWithPopUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginWithPopUp),
      distinctUntilChanged(),
      exhaustMap(() =>
        from(firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
          map((credential: firebase.auth.UserCredential) =>
            loginSuccess({
              user: credential.user,
              isNewUser: credential.additionalUserInfo.isNewUser,
            }),
          ),
          tap(() => this.router.navigate(['/notes'])),
          catchError(error => of(loginFailure({ error }))),
        ),
      ),
    ),
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        from(firebase.auth().signOut()).pipe(
          first(),
          map(() => logoutSuccess()),
          catchError(error => of(logoutFailure({ error }))),
        ),
      ),
    ),
  );

  public logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => {
          localStorage.removeItem('menote-token');
          localStorage.setItem('menote-nav-hist', '/');
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );

  public logoutFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutFailure),
        tap(({ error }) => console.log(`Error while logging out. ERROR: ${error}`)),
      ),
    { dispatch: false },
  );

  public getToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getToken, loginSuccess),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([_, user]) =>
        from((user as firebase.User).getIdToken()).pipe(
          switchMap((token: string) => [getTokenSuccess({ token }), retrieveNotesRef()]),
          catchError(error => of(getTokenFailure({ error }))),
        ),
      ),
    ),
  );

  public getTokenSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getTokenSuccess),
        map(({ token }) => {
          localStorage.setItem('menote-token', token);
          const path = localStorage.getItem('menote-nav-hist') || '/notes';
          this.router.navigate([path]);
        }),
      ),
    { dispatch: false },
  );

  public startNavigation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initApp),
        withLatestFrom(this.store.select(selectIsAuthenticated)),
        map(([_, isAuth]) => {
          if (isAuth) {
            const path = localStorage.getItem('menote-nav-hist') || '/notes';
            this.router.navigate([path]);
          }
        }),
      ),
    { dispatch: false },
  );
}
