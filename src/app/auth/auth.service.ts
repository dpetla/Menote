import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  isNewUser = false;
  jwtHelper = new JwtHelperService();

  constructor(private router: Router, private ngZone: NgZone) {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      this.user = user;
      if (user) {
        user
          .getIdToken()
          .then((token: string) => localStorage.setItem('menote-token', token))
          .then(() => {
            const path = localStorage.getItem('menote-nav-hist') || '/notes';
            this.ngZone.run(() => this.router.navigate([path]));
          });
      }
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
          .then(result => {
            this.user = result.user;
            this.isNewUser = result.additionalUserInfo.isNewUser;
            this.ngZone.run(() => this.router.navigate(['/notes']));
          })
          .catch(error =>
            console.log('Error while logginh with Google.', error)
          );
      });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        localStorage.removeItem('menote-token');
        localStorage.setItem('menote-nav-hist', '/');
        this.router.navigate(['/']);
      })
      .catch(error => console.log(`Error while logging out. ERROR: ${error}`));
  }

  isAuthenticated() {
    return (
      this.user != null ||
      this.isTokenValid(localStorage.getItem('menote-token'))
    );
  }

  isTokenValid(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const isExpired = this.jwtHelper.isTokenExpired(token);
    return decodedToken && !isExpired;
  }
}
