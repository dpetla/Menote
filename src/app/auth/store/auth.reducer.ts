import { createReducer, on, Action } from '@ngrx/store';

import { getTokenSuccess, loginSuccess, logoutSuccess } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: any;
  isNewUser: boolean;
  token: string;
}

export const initialState: AuthState = {
  user: null,
  isNewUser: null,
  token: null,
};

const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user, isNewUser }) => ({
    ...state,
    user,
    isNewUser,
  })),
  on(getTokenSuccess, (state, { token }) => ({ ...state, token })),
  on(logoutSuccess, state => ({
    ...state,
    user: null,
    isNewUser: null,
    token: null,
  })),
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
