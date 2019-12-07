import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Note } from '../../types/note.interface';
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

export const retrieveNotesRef = createAction('[Notes] Retrieve NotesRef');

export const retrieveNotes = createAction('[Notes] Retrieve Notes');

export const retrieveNotesSuccess = createAction('[Notes] Retrieve Notes Success', props<{ notes: Note[] }>());

export const retrieveNotesFailure = createAction(
  '[Notes] Retrieve Notes Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const selectNote = createAction('[Notes] Select Note', props<{ selectedId: string }>());

export const createNote = createAction('[Notes] Create Note');

export const createNoteSuccess = createAction(
  '[Notes] Create Note Success',
  props<{ note: firebase.firestore.DocumentReference }>(),
);

export const createNoteFailure = createAction('[Notes] Create Note Failure', props<{ error: HttpErrorResponse }>());
