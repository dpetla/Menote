import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  user: any;

  constructor(private router: Router) {}

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => this.router.navigate(['/notes']))
      .catch(error => console.log(`Error while logging in. ERROR: ${error}`));
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        localStorage.removeItem('menote-user-token');
        this.router.navigate(['/']);
      })
      .catch(error => console.log(`Error while logging out. ERROR: ${error}`));
  }

  isAuthenticated() {
    return this.user != null || !!localStorage.getItem('menote-user-token');
  }
}
