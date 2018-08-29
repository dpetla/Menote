import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthService implements OnInit, OnDestroy {
  token: string;
  auth: any;
  user: any;
  subscription: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => (this.user = user));
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.user = result.user;
        if (this.user) {
          this.user.getIdToken().then(token => localStorage.setItem('menote-user-token', token));
        } else {
          localStorage.removeItem('menote-user-token');
        }

        this.router.navigate(['/notes']);
      })
      .catch(error => console.log(`Error while logging in. ERROR: ${error}`));
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        this.user = null;
        localStorage.removeItem('menote-user-token');
        this.router.navigate(['/']);
      })
      .catch(error => console.log(`Error while logging out. ERROR: ${error}`));
  }

  isAuthenticated() {
    return this.user != null || !!localStorage.getItem('menote-user-token');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
