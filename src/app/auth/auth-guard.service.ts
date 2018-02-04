import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authService.isAuthenticated();
    if (this.authService.isAuthenticated() || localStorage.getItem('ng-journal-user')) {
      return true;
    } else {
      return false;
    }
  }
}
