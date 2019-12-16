import { createAction, props } from '@ngrx/store';

export const showSideMenu = createAction('[View] Show side menu', props<{ show: boolean }>());

export const toggleSideMenu = createAction('[View] Toggle side menu');

export const largeScreen = createAction('[View] Large screen');

export const smallScreen = createAction('[View] Small screen');
