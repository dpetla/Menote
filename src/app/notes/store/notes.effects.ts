import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { WeatherApiResponse } from '../../types/WeatherApiResponse.model';

import {
  initApp,
  retrieveCoordinates,
  retrieveCoordinatesFailure,
  retrieveLocalWeather,
  retrieveLocalWeatherFailure,
  retrieveLocalWeatherSuccess,
  updateAppFailure,
  updateAppSuccess,
  updateAvailable,
} from './notes.actions';

@Injectable()
export class NotesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar,
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
            map(() => window.location.reload()),
            map(() => updateAppSuccess()),
            catchError(() => of(updateAppFailure())),
          ),
      ),
    ),
  );

  public retrieveCoordinates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveCoordinates, initApp),
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
}
