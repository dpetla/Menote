import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as firebase from 'firebase/app';
import { from, of } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import * as authActions from './auth.actions';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  loginWithPopUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginWithPopUp),
      distinctUntilChanged(),
      switchMap(action =>
        from(this.authService.signUpWithPopUp()).pipe(
          map((result: firebase.auth.UserCredential) =>
            authActions.loginSuccess({
              user: result.user,
              isNewUser: result.additionalUserInfo.isNewUser
            })
          ),
          tap(() => this.router.navigate(['/notes'])),
          catchError(() => of(authActions.loginFail()))
        )
      )
    )
  );
}
