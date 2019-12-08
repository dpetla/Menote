import { createReducer, on, Action } from '@ngrx/store';

import { Note } from '../../types/note.interface';
import { WeatherApiResponse } from '../../types/WeatherApiResponse.model';

import { retrieveLocalWeatherSuccess, retrieveNotesSuccess, updateNoteSuccess } from './notes.actions';

export const notesFeatureKey = 'notes';

export interface NotesState {
  currentWeather: WeatherApiResponse;
  notes: Note[];
  selectedId: string;
}

export const initialState: NotesState = {
  currentWeather: null,
  notes: null,
  selectedId: null,
};

const mianReducer = createReducer(
  initialState,
  on(retrieveLocalWeatherSuccess, (state, { currentWeather }) => ({
    ...state,
    currentWeather,
  })),
  on(retrieveNotesSuccess, (state, { notes }) => ({
    ...state,
    notes,
  })),
  on(updateNoteSuccess, (state, { key }) => ({
    ...state,
    dateUpdated: new Date(),
  })),
);

export function reducer(state: NotesState | undefined, action: Action) {
  return mianReducer(state, action);
}
