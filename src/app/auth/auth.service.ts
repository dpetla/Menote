import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any;
  public isNewUser = false;
  public jwtHelper = new JwtHelperService();

  constructor(private router: Router, private ngZone: NgZone) {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      this.user = user;
      if (user) {
        this.saveUserUid(user);
        this.getUserToken(user);
      }
    });
  }

  public getUserToken(user: any) {
    user
      .getIdToken()
      .then((token: string) => localStorage.setItem('menote-token', token))
      .then(() => {
        const path = localStorage.getItem('menote-nav-hist') || '/notes';
        this.ngZone.run(() => this.router.navigate([path]));
      });
  }

  public saveUserUid(user: any) {
    localStorage.setItem('menote-uid', user.uid);
  }

  public loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.setSessionPersistence().then(() => this.signUpWithPopUp(provider));
  }

  public setSessionPersistence(): Promise<void> {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

  public signUpWithPopUp(provider: any) {
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

  public logout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        this.resetLocalStorage();
        this.router.navigate(['/']);
      })
      .catch(error => console.log(`Error while logging out. ERROR: ${error}`));
  }

  public resetLocalStorage() {
    localStorage.removeItem('menote-token');
    localStorage.setItem('menote-nav-hist', '/');
  }

  public isAuthenticated() {
    return (
      this.user != null ||
      this.isTokenValid(localStorage.getItem('menote-token'))
    );
  }

  public isTokenValid(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const isExpired = this.jwtHelper.isTokenExpired(token);
    return decodedToken && !isExpired;
  }
}
