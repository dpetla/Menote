import { createAction, props } from '@ngrx/store';

export const loginWithPopUp = createAction('[SIGN IN] Login with pop up');
export const loginSuccess = createAction(
  '[SIGN IN] Login Success',
  props<{ user: any; isNewUser: boolean }>()
);
export const loginFail = createAction('[SIGN IN] Login Fail');

export const logout = createAction('[????] Logout');
export const looutSuccess = createAction('[???] Logout Success');
export const logoutFail = createAction(
  '[????] Login Fail',
  props<{ error: any }>()
);
