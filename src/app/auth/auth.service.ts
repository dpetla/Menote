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
        this.saveUserUid(user);
        this.getUserToken(user);
      }
    });
  }

  getUserToken(user: any) {
    user
      .getIdToken()
      .then((token: string) => localStorage.setItem('menote-token', token))
      .then(() => {
        const path = localStorage.getItem('menote-nav-hist') || '/notes';
        this.ngZone.run(() => this.router.navigate([path]));
      });
  }

  saveUserUid(user: any) {
    localStorage.setItem('menote-uid', user.uid);
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.setSessionPersistence().then(() => this.signUpWithPopUp(provider));
  }

  setSessionPersistence(): Promise<void> {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

  signUpWithPopUp(provider: any) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.user = result.user;
        this.isNewUser = result.additionalUserInfo.isNewUser;
        this.ngZone.run(() => this.router.navigate(['/notes']));
      })
      .catch(error => console.log('Error while logginh with Google.', error));
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        this.resetLocalStorage();
        this.router.navigate(['/']);
      })
      .catch(error => console.log(`Error while logging out. ERROR: ${error}`));
  }

  resetLocalStorage() {
    localStorage.removeItem('menote-token');
    localStorage.setItem('menote-nav-hist', '/');
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
