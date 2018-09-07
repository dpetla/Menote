import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
  user: any;

  constructor(private router: Router) {}

  subscribeToAuthState() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      const path = localStorage.getItem('menote-nav-hist') || '/notes';
      this.router.navigate([path]);
    });
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => this.router.navigate(['/notes']))
          .catch(error => console.log(error));
      });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        localStorage.setItem('menote-nav-hist', '/');
        this.router.navigate(['/']);
      })
      .catch(error => console.log(`Error while logging out. ERROR: ${error}`));
  }

  isAuthenticated() {
    return this.user != null;
  }
}
