import { JwtHelperService } from '@auth0/angular-jwt';
import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../../../app/reducers/index';

const jwtHelper = new JwtHelperService();

export const selectUser = createSelector(selectAuthState, state => state.user);

export const selectIsNewUser = createSelector(
  selectAuthState,
  state => state.isNewUser
);

export const selectToken = createSelector(
  selectAuthState,
  state => state.token
);

export const selectIsTokenValid = createSelector(
  selectToken,
  token => jwtHelper.decodeToken(token) && !jwtHelper.isTokenExpired(token)
);

export const selectIsAuthenticated = createSelector(
  selectUser,
  selectIsTokenValid,
  (user, isTokenValid) => user != null || isTokenValid
);
