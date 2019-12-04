import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { initApp } from './app.actions';
import { loginSuccess } from './auth/store/auth.actions';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isLoading$: Observable<boolean>;

  constructor(public router: Router, private store: Store<AppState>) {}

  public ngOnInit() {
    this.store.dispatch(initApp());
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.store.dispatch(loginSuccess({ user, isNewUser: false }));
      }
    });

    this.isLoading$ = this.router.events.pipe(
      map(event => {
        switch (true) {
          case event instanceof NavigationStart: {
            return true;
          }
          case event instanceof NavigationEnd: {
            this.setNavigationHistory(event as NavigationEnd);
          }
          // tslint:disable-next-line: no-switch-case-fall-through
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            return false;
          }
          default: {
            break;
          }
        }
      }),
    );
  }

  public setNavigationHistory(event: NavigationEnd) {
    window.scroll(0, 0);
    const path = event.url !== '/signin' ? event.url : '/notes';
    localStorage.setItem('menote-nav-hist', path);
  }
}
