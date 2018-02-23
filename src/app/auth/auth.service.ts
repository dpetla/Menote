// modules
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable, OnInit } from '@angular/core';

// models
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService implements OnInit {
  uid: string;
  idToken: string;
  auth: any;
  userAccount: any;
  errorMsg = '';
  user: Observable<firebase.User>;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.auth = firebase.auth();
  }

  // isLoggedIn() {
  //   if (this.userDetails == null ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  emailSignup(user: User): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          this.router.navigate(['/notes']);
          firebase.auth().currentUser.sendEmailVerification();
        })
        .catch(error => console.log(error));
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

  // signInWithGoogle() {
  //   return new firebase.auth.GoogleAuthProvider();
  // }

  logout() {
    firebase.auth().signOut()
      .then(() => {
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
