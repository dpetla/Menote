import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  user: any;

  constructor(private router: Router) {}

  subscribeToAuthState() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.user = user;
      const path = this.user ? '/notes' : '/';
      this.router.navigate([path]);
    });
  }

  loginWithGoogle() {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => this.router.navigate(['/notes']))
          .catch(error => console.log(`Error while logging in. ERROR: ${error}`));
      });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        this.router.navigate(['/']);
      })
      .catch(error => console.log(`Error while logging out. ERROR: ${error}`));
  }

  isAuthenticated() {
    return this.user != null;
  }
}
