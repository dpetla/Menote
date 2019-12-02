import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const login = createAction('[AUTH] Login');

export const loginWithPopUp = createAction('[SIGN IN] Login with pop up');

export const loginSuccess = createAction('[SIGN IN] Login Success', props<{ user: any; isNewUser: boolean }>());

export const loginFailure = createAction('[AUTH] Login Failure', props<{ error: HttpErrorResponse }>());

export const setSessionPersistence = createAction('[AUTH] Set Session Persistence');
export const setSessionPersistenceFailure = createAction(
  '[AUTH] Set Session Persistence Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const logout = createAction('[AUTH] Logout');

export const logoutSuccess = createAction('[AUTH] Logout Success');

export const logoutFailure = createAction('[AUTH] Login Fail', props<{ error: HttpErrorResponse }>());

export const getToken = createAction('[AUTH] Get Token');

export const getTokenSuccess = createAction('[AUTH] Get Token Success', props<{ token: string }>());

export const getTokenFailure = createAction('[AUTH] Get Token Failure', props<{ error: HttpErrorResponse }>());
