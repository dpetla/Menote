import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { WeatherApiResponse } from './types/WeatherApiResponse.model';

export const initApp = createAction('[APP] Init App');

export const updateAvailable = createAction('[APP] Update available');

export const updateAppSuccess = createAction('[APP] Update app success');

export const updateAppFailure = createAction('[APP] Update app failure');

export const retrieveCoordinates = createAction('[APP] Retrieve coordinates');

export const retrieveCoordinatesFailure = createAction(
  '[APP] Retrieve coordinates failure',
  props<{ error: HttpErrorResponse }>(),
);

export const retrieveLocalWeather = createAction(
  '[APP] Retrieve local weather',
  props<{ coords: { latitude: string; longitude: string } }>(),
);

export const retrieveLocalWeatherSuccess = createAction(
  '[APP] Retrieve local weather success',
  props<{ currentWeather: WeatherApiResponse }>(),
);

export const retrieveLocalWeatherFailure = createAction(
  '[APP] Retrieve local weather success failure',
  props<{ error: HttpErrorResponse }>(),
);
