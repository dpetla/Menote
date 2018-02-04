// modules
import * as firebase from 'firebase';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// models
import { Note } from '../notes/note.model';
import { User } from '../auth/user.model';

// services
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataService {
  // users variables
  usersRef: AngularFirestoreCollection<User>;
  userRef: AngularFirestoreDocument<User>; // User??
  deletedUsersRef: AngularFirestoreCollection<User>;

  // notes variables
  notesRef: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;
  deletedNotesRef: AngularFirestoreCollection<Note[]>;

  constructor(private afs: AngularFirestore,
              private authService: AuthService) {

    // subscription to user auth state
    firebase.auth().onAuthStateChanged(user => {
      if (user) {

        this.authService.userAccount = user;
        user.getIdToken()
          .then(idToken => this.authService.idToken = idToken)
          .catch(error => console.log(error));

        // getting user's notes ref
        this.notesRef = this.afs.collection('notes', ref => {
          return ref
            .where('uid', '==', user.uid)
            .orderBy('dateCreated', 'desc');
        });

        // subscription to user's notes
        this.notes = this.notesRef.snapshotChanges().map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Note;
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        });

        // notes trash ref
        this.deletedNotesRef = this.afs.collection('notes-deleted');

        // users ref and current user ref
        this.usersRef = this.afs.collection('users');
        this.userRef = this.usersRef.doc(this.authService.userAccount.uid);

        // deactivated users ref
        this.deletedUsersRef = this.afs.collection('users-deactivated');
      }
    },
        error => console.log(error),
      () => console.log('completed')
      );
  }
}
