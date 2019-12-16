import { createReducer, on, Action } from '@ngrx/store';

import { initApp } from '../notes/store/notes.actions';

import { largeScreen, showSideMenu, smallScreen, toggleSideMenu } from './view.actions';

export const viewFeatureKey = 'view';

export interface ViewState {
  showSideMenu: boolean;
  isLargeScreen: boolean;
}

export const inititalState = {
  showSideMenu: null,
  isLargeScreen: null,
};

export const viewReducer = createReducer(
  inititalState,
  on(initApp, state => ({ ...state, showSideMenu: true, isLargeScreen: true })),
  on(showSideMenu, (state, { show }) => ({ ...state, showSideMenu: show })),
  on(toggleSideMenu, state => ({ ...state, showSideMenu: !state.showSideMenu })),
  on(largeScreen, state => ({ ...state, isLargeScreen: true, showSideMenu: true })),
  on(smallScreen, state => ({ ...state, isLargeScreen: false, showSideMenu: false })),
);

export function reducer(state: ViewState | undefined, action: Action) {
  return viewReducer(state, action);
}
