import { createSelector } from '@ngrx/store';

import { selectNotesState } from '../../reducers';
import { formatTempString } from '../../utils/utils';

export const selectNotes = createSelector(selectNotesState, state => state.notes);

export const selectCurrentWeather = createSelector(selectNotesState, state => state.currentWeather);

export const selectNoteWeatherData = createSelector(
  selectCurrentWeather,
  state =>
    (state
      ? {
          weatherDesc: state.weather[0].description,
          temp: formatTempString(state.main.temp),
          city: state.name,
          country: state.sys.country,
        }
      : {}) as NoteWeatherData,
);
