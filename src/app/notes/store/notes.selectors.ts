import { createSelector } from '@ngrx/store';

import { selectNotesState, selectRouteId } from '../../reducers';
import { Note } from '../../types/note.interface';
import { formatTempString } from '../../utils/utils';

export const selectNotes = createSelector(selectNotesState, state => state.notes);

export const selectNote = createSelector(selectNotesState, selectRouteId, (state, id) =>
  state.notes ? state.notes.find(note => note.id === id) : ({} as Note),
);

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
