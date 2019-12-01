import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Subscription } from 'rxjs';

import { loginSuccess } from './auth/store/auth.actions';
import { AppState } from './reducers';
import { UpdateService } from './shared/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public isLoading = false;

  constructor(
    public router: Router,
    private updateService: UpdateService,
    private store: Store<AppState>
  ) {}

  public ngOnInit() {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.store.dispatch(loginSuccess({ user, isNewUser: false }));
      }
    });
    this.subscription = this.subscribeToRouterEvents();
  }

  public subscribeToRouterEvents() {
    return this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }

        case event instanceof NavigationEnd: {
          this.setNavigationHistory(event as NavigationEnd);
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  public setNavigationHistory(event: NavigationEnd) {
    window.scroll(0, 0);
    const path = event.url !== '/signin' ? event.url : '/notes';
    localStorage.setItem('menote-nav-hist', path);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
