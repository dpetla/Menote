import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalInfoService } from '../shared/local-info.service';
import { AuthService } from './../auth/auth.service';
import { Note } from './note.model';

@Injectable()
export class NotesService {
  notesRef: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;
  deletedNotesRef: AngularFirestoreCollection<Note[]>;

  // note template used for creating notes
  newNote: Note = {
    uid: '',
    title: '',
    content: '',
    dateCreated: null,
    dateUpdated: null,
    location: '',
    weather: '',
    mood: '',
    tags: {},
    images: []
  };

  constructor(
    private localInfoService: LocalInfoService,
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.authService.user) {
        // getting user's notes ref
        this.notesRef = this.db.collection('notes', ref => {
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
        this.deletedNotesRef = this.db.collection('notes-deleted');

        resolve(this.notes);
      } else {
        // this.router.navigate(['/']);
        reject();
      }
    });
  }

  // Get all notes
  getNotes() {
    return this.notes;
  }

  // get note by id
  getNote(id: string) {
    return this.notesRef.doc(id);
  }

  // get location data then gather data to create note
  createNote(isFirstNote = false) {
    this.localInfoService.getLocalInfo(() => {
      // enter note data
      this.newNote.uid = firebase.auth().currentUser.uid;
      this.newNote.location = this.localInfoService.city + ', ' + this.localInfoService.country;
      this.newNote.title = new Date().toDateString();
      this.newNote.dateCreated = new Date();
      this.newNote.weather = this.localInfoService.temp + ' ' + this.localInfoService.weatherDesc;

      // create instruction note when signing up new user
      if (isFirstNote) {
        this.newNote.title = 'Welcome to menote!';
        this.newNote.content =
          '<h1>How to use menote!</h1><p>With <span style="color: rgb(44, 130, 201);"><strong>menote</strong></span> is simple and easy to capture each important part of your day. We want you to focus on your life and the moments you live, and let us take care of the rest. Write the story about yourself and let take care you things like:</p><ul><li>Saving. With our <strong>AutoSave</strong> feature, your notes are always saved to the cloud ☁</li><li>Keeping the note date</li><li>Getting your current location&nbsp;</li><li>Logging the current weather condition ☂</li></ul><p><br></p><p>Our rich text editor allows you customize your notes or journal entries to match your style or a specific write style. You can use <strong>Bold</strong>, <em>Italic</em>, <u>underline,</u> <span style="font-family: Arial, Helvetica, sans-serif;">change</span> <span style="font-family: Georgia, serif;">the</span> <span style="font-family: Impact, Charcoal, sans-serif;">font</span><span style="font-family: Times New Roman,Times,serif,-webkit-standard;">&nbsp;</span><span style="font-family: Tahoma, Geneva, sans-serif;">to 6</span><span style="font-family: Times New Roman,Times,serif,-webkit-standard;">&nbsp;different&nbsp;</span><span style="font-family: Verdana, Geneva, sans-serif;">options, <span style="font-size: 10px;">edit</span> <span style="font-size: 12px;">the</span> <span style="font-size: 18px;">font</span> <span style="font-size: 24px;">size</span>,&nbsp;</span><span style="font-family: Arial, Helvetica, sans-serif;"><span style="color: rgb(97, 189, 109);">pick</span> <span style="color: rgb(226, 80, 65);">font</span> <span style="color: rgb(44, 130, 201);">color</span>, and much more.</span></p><p><br></p><p>Under the location and weather condition, the is a plus(+) button you can use to add tags and organize the add more details to your notes.</p><p><br></p><p>By clicking the profile picture in the top right corner you can:</p><ol><li>Settings<ol><li>Account</li><li>Profile</li><li>Security</li></ol></li><li>Sign out</li><li>About</li></ol><p><br></p><p>We hope you enjoy your experience with menote and don&#39;t forget to let us know what you think about it.</p>';
      }

      // create note document in db
      this.notesRef
        .add(this.newNote)
        .then(note => this.router.navigate([note.path]))
        .catch(error => console.log(error));
    });
  }
}
