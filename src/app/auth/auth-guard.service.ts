import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';

import { selectIsAuthenticated } from './store/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.store.select(selectIsAuthenticated);
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.canActivate(route, state);
  }
}
