import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { checkAppUpdate, updateAppFailure, updateAppSuccess, updateAvailable } from './app.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private swUpdate: SwUpdate, private snackbar: MatSnackBar) {}

  public checkAppUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAppUpdate),
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
            map(() => window.location.reload()),
            map(() => updateAppSuccess()),
            catchError(() => of(updateAppFailure())),
          ),
      ),
    ),
  );
}
