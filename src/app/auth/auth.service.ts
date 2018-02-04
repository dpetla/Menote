import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { User } from './user.model';


@Injectable()
export class AuthService {
  uid: string;
  idToken: string;
  userAccount: any;
  errorMsg = '';

  constructor(private router: Router) {
  }

  emailSignup(user: User): Promise<any> {
    return new Promise(resolve => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch(
          error => console.log(error)
        );
    });
  }

  emailSignin(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        user => {
          user.getIdToken()
            .then(
              (token: string) => this.idToken = token
            );
          localStorage.setItem('ng-journal-user', user.uid);
          this.router.navigate(['/notes']);
        }
      )
      .catch(
        error => {
          console.log(error);
          this.errorMsg = error.message;
          setTimeout(() => this.errorMsg = '', 20000);
        }
      );
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        // firebase.auth().signOut();
        localStorage.removeItem('ng-journal-user');
        this.idToken = null;
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log('logout error: ' + err);
      });
  }

  getIdToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        token => this.idToken = token
      );
    return this.idToken;
  }

  isAuthenticated() {
    return this.idToken != null;
  }
}
