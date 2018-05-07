import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(public router: Router) {
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBcC9pbQu9Xb6nmfs5WhpSB_1aWX6syQdU',
      authDomain: 'ng-journal-app.firebaseapp.com'
    });

    this.subscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => window.scroll(0, 0));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


