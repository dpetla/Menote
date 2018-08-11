import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService implements OnInit {
  token: string;
  auth: any;
  user: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.auth = firebase.auth();
  }

  isLoggedIn() {
    return this.user !== null;
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.addScope('profile');
    provider.addScope('email');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        result.user.getIdToken().then(token => (this.token = token));
        this.user = result.user;
        this.router.navigate(['/notes']);
      });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('signout completed ...');
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }

  isAuthenticated() {
    return this.token != null;
  }
}
