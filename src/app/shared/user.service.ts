import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataService } from './data.service';

@Injectable()
export class UserService {
  constructor(private dataService: DataService, private authService: AuthService) {}

  // create user entry in db
  createUser(user: User) {
    this.dataService.usersRef
      .add(user)
      // this.afs.collection('users').add(user)
      .then(() => console.log('user created!'))
      .catch(error => console.log(error));
  }

  // 'delete' user data from db and inactivate account
  deactivateAccount() {
    this.dataService.userRef
      .valueChanges()
      .subscribe(data => this.dataService.deletedUsersRef.add(data));

    // TODO remove user data from active user collection
    this.dataService.usersRef
      .doc(this.authService.user.uid)
      .delete()
      .then(() => {
        // TODO disable firestore account
        firebase
          .auth()
          .currentUser.delete()
          .then(() => this.authService.logout())
          .catch(error => console.log(error));
      })
      .catch(reason => console.log(reason));
  }
}
