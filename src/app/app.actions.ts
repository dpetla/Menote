import { createAction } from '@ngrx/store';

export const checkAppUpdate = createAction('[APP] Check app update');

export const updateAvailable = createAction('[APP] Update available');

export const updateAppSuccess = createAction('[APP] Update app success');

export const updateAppFailure = createAction('[APP] Update app failure');
