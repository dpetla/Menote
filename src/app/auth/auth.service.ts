import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  isNewUser = false;
  jwtHelper = new JwtHelperService();
  user$: Observable<Object>;

  constructor(private router: Router) {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      this.user$ = Observable.create((observer: Observer<any>) =>
        observer.next(this.user)
      );
      if (this.user) {
        user
          .getIdToken()
          .then(token => localStorage.setItem('menote-token', token));
      }
      const path = localStorage.getItem('menote-nav-hist') || '/notes';
      this.router.navigate([path]);
    });
    // this.init();
  }

  // init() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     this.user = user;
  //     this.user$ = Observable.create((observer: Observer<any>) => observer.next(this.user));
  //     if (this.user) {
  //       user.getIdToken().then(token => localStorage.setItem('menote-token', token));
  //     }
  //     const path = localStorage.getItem('menote-nav-hist') || '/notes';
  //     this.router.navigate([path]);
  //   });
  // }

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
            this.router.navigate(['/notes']);
          })
          .catch(error => console.log(error));
      });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        localStorage.setItem('menote-nav-hist', '/');
        localStorage.removeItem('menote-token');
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
