import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AuthService implements OnInit, OnDestroy {
  token: string;
  auth: any;
  user: any;
  userFB: Observable<firebase.User>;
  subscription: Subscription;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
    // this.auth = firebase.auth();
  }

  async isLoggedIn() {
    return (await this.user) !== null;
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        result.user.getIdToken().then(token => (this.token = token));
        this.subscription = this.userFB.subscribe(user => {
          this.user = user;
          console.log(this.user);
        });
        this.router.navigate(['/notes']);
      })
      .catch(error => console.log(`Error while logging in. ERROR: ${error}`));
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(result => this.router.navigate(['/']))
      .catch(error => console.log(`Error while logging out. ERROR: ${error}`));
  }

  // login() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //   provider.addScope('profile');
  //   provider.addScope('email');
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then(result => {
  //       console.log(result);
  //       result.user.getIdToken().then(token => (this.token = token));
  //       this.user = result.user;
  //       this.router.navigate(['/notes']);
  //     });
  // }

  // logout() {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       console.log('signout completed ...');
  //       this.router.navigate(['/']);
  //     })
  //     .catch(error => console.log(error));
  // }

  isAuthenticated() {
    return this.token != null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
