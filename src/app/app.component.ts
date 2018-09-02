import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(public router: Router) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: environment.firebase.apiKey,
      authDomain: environment.firebase.authDomain
    });

    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        window.scroll(0, 0);
        const path = event.url !== '/signin' ? event.url : '/notes';
        localStorage.setItem('menote-nav-hist', path);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
