import { createReducer, on, Action } from '@ngrx/store';

import { loginSuccess } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: any;
  isNewUser: boolean;
}

export const initialState: AuthState = {
  user: null,
  isNewUser: null
};

const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user, isNewUser }) => ({
    ...state,
    user: user,
    isNewUser: isNewUser
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
