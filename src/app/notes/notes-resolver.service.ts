import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Injectable({
  providedIn: 'root'
})
export class NotesResolverService
  implements Resolve<AngularFirestoreCollection<Note>> {
  constructor(
    private db: AngularFirestore,
    private notesService: NotesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): AngularFirestoreCollection<Note> | Observable<any> {
    const uid = localStorage.getItem('menote-uid');

    this.notesService.notesRef = this.db.collection('notes', ref =>
      ref.where('uid', '==', uid).orderBy('dateCreated', 'desc')
    );

    const notes$ = this.notesService.notesRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(action => {
          const data = action.payload.doc.data() as Note;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    return notes$.pipe(first());
  }
}
