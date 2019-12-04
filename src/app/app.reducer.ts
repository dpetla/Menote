import { createReducer, on, Action } from '@ngrx/store';

import { retrieveLocalWeatherSuccess } from './app.actions';
import { WeatherApiResponse } from './types/WeatherApiResponse.model';

export const mainFeatureKey = 'main';

export interface MainState {
  currentWeather: WeatherApiResponse;
}

export const initialState: MainState = {
  currentWeather: null,
};

const mianReducer = createReducer(
  initialState,
  on(retrieveLocalWeatherSuccess, (state, { currentWeather }) => ({
    ...state,
    currentWeather,
  })),
);

export function reducer(state: MainState | undefined, action: Action) {
  return mianReducer(state, action);
}
