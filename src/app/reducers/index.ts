import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromNotes from '../notes/store/notes.reducer';

export interface AppState {
  notes: fromNotes.NotesState;
  router: fromRouter.RouterReducerState<any>;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  notes: fromNotes.reducer,
  router: fromRouter.routerReducer,
  auth: fromAuth.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectNotesState = createFeatureSelector<AppState, fromNotes.NotesState>(fromNotes.notesFeatureKey);

export const selectRouter = createFeatureSelector<AppState, fromRouter.RouterReducerState<any>>('router');

export const selectAuthState = createFeatureSelector<AppState, fromAuth.AuthState>(fromAuth.authFeatureKey);

const {
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectRouteId = selectRouteParam('id');
export const selectStatus = selectQueryParam('status');

export const getRouterState = (state: AppState) => state.router;

export const getCurrentUrl = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState) => state.state && state.state.url,
);
