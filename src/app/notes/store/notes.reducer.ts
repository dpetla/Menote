import { createReducer, on, Action } from '@ngrx/store';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

import { Note } from '../../types/note.interface';
import { WeatherApiResponse } from '../../types/WeatherApiResponse.model';

import { retrieveLocalWeatherSuccess } from './notes.actions';

export const notesFeatureKey = 'notes';

export interface NotesState {
  currentWeather: WeatherApiResponse;
  notes: Note[];
  notesRef: AngularFirestoreCollection<Note>;
}

export const initialState: NotesState = {
  currentWeather: null,
  notes: null,
  notesRef: null,
};

const mianReducer = createReducer(
  initialState,
  on(retrieveLocalWeatherSuccess, (state, { currentWeather }) => ({
    ...state,
    currentWeather,
  })),
);

export function reducer(state: NotesState | undefined, action: Action) {
  return mianReducer(state, action);
}
