import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Note } from '../notes/note.model';

@Injectable()
export class DataService {
  // users variables
  usersRef: AngularFirestoreCollection<User>;
  userRef: AngularFirestoreDocument<User>;
  deletedUsersRef: AngularFirestoreCollection<User>;
  // notes variables
  notesRef: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;
  deletedNotesRef: AngularFirestoreCollection<Note[]>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.user) {
      // getting user's notes ref
      this.notesRef = this.afs.collection('notes', ref => {
        return ref.where('uid', '==', this.authService.user.uid).orderBy('dateCreated', 'desc');
      });

      // subscription to user's notes
      this.notes = this.notesRef.snapshotChanges().pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Note;
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      // notes trash ref
      this.deletedNotesRef = this.afs.collection('notes-deleted');

      // users ref and current user ref
      this.usersRef = this.afs.collection('users');
      this.userRef = this.usersRef.doc(this.authService.user.uid);

      // deactivated users ref
      this.deletedUsersRef = this.afs.collection('users-deactivated');
    } else {
      // go to home when not authenticated
      this.router.navigate(['/']);
    }
  }
}
