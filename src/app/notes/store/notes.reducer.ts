import { createReducer, on, Action } from '@ngrx/store';

import { Note } from '../../types/note.interface';
import { WeatherApiResponse } from '../../types/WeatherApiResponse.model';

import {
  retrieveLocalWeatherSuccess,
  retrieveNotesSuccess,
  updateNote,
  updateNoteFailure,
  updateNoteSuccess,
} from './notes.actions';

export const notesFeatureKey = 'notes';

export interface NotesState {
  saving: boolean;
  currentWeather: WeatherApiResponse;
  notes: Note[];
  selectedId: string;
}

export const initialState: NotesState = {
  saving: null,
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
  on(updateNote, (state, { key }) => ({
    ...state,
    saving: true,
  })),
  on(updateNoteSuccess, (state, { key }) => ({
    ...state,
    saving: false,
    dateUpdated: new Date(),
  })),
  on(updateNoteFailure, (state, { error }) => ({
    ...state,
    saving: false,
  })),
);

export function reducer(state: NotesState | undefined, action: Action) {
  return mianReducer(state, action);
}
