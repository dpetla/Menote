import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { WeatherApiResponse } from '../../types/WeatherApiResponse.model';

export const initApp = createAction('[Notes] Init App');

export const updateAvailable = createAction('[Notes] Update available');

export const updateAppSuccess = createAction('[Notes] Update app success');

export const updateAppFailure = createAction('[Notes] Update app failure');

export const retrieveCoordinates = createAction('[Notes] Retrieve coordinates');

export const retrieveCoordinatesFailure = createAction(
  '[Notes] Retrieve coordinates failure',
  props<{ error: HttpErrorResponse }>(),
);

export const retrieveLocalWeather = createAction(
  '[Notes] Retrieve local weather',
  props<{ coords: { latitude: string; longitude: string } }>(),
);

export const retrieveLocalWeatherSuccess = createAction(
  '[Notes] Retrieve local weather success',
  props<{ currentWeather: WeatherApiResponse }>(),
);

export const retrieveLocalWeatherFailure = createAction(
  '[Notes] Retrieve local weather success failure',
  props<{ error: HttpErrorResponse }>(),
);
