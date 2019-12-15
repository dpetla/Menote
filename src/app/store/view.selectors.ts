import { createSelector } from '@ngrx/store';

import { selectViewState } from '../reducers';

export const selectShowSideMenu = createSelector(selectViewState, state => state.showSideMenu);

export const selectIsLargeScreen = createSelector(selectViewState, state => state.isLargeScreen);
