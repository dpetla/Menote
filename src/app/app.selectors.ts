import { createSelector } from '@ngrx/store';

import { selectMainState } from './reducers';
import { formatTempString } from './utils/utils';

export const selectCurrentWeather = createSelector(selectMainState, state => state.currentWeather);

export const selectNoteWeatherData = createSelector(
  selectCurrentWeather,
  state =>
    ({
      weatherDesc: state.weather[0].description,
      temp: formatTempString(state.main.temp),
      city: state.name,
      country: state.sys.country,
    } as NoteWeatherData),
);
