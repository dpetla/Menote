import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

// models
import { Note } from './note.model';

// services
import { DataService } from '../shared/data.service';
import { LocalInfoService } from '../shared/local-info.service';

@Injectable()
export class NotesService {

  // note template used for creating notes
  newNote: Note = {
    uid: '',
    title: new Date().toDateString(),
    content: '',
    dateCreated: null,
    dateUpdated: null,
    location: '',
    weather: '',
    mood: '',
    tags: { },
    images: [],
  };

  constructor(private dataService: DataService,
              private localInfoService: LocalInfoService) {
  }

  // Get all notes
  getNotes() {
    return this.dataService.notes;
  }

  // get note by id
  getNote(id: string) {
    return this.dataService.notesRef.doc(id);
  }

  // get location data then gather data to create note
  createNote() {
    this.localInfoService.getLocalInfo(
      () => {
        // enter note data
        this.newNote.uid = firebase.auth().currentUser.uid;
        this.newNote.location = this.localInfoService.city + ', ' + this.localInfoService.country;
        this.newNote.dateCreated = new Date();
        this.newNote.weather = this.localInfoService.temp + ' ' + this.localInfoService.weatherDesc;

        // create note document in db
        this.dataService.notesRef.add(this.newNote)
          .then(() => {
            console.log('note created!');
          })
          .catch(error => console.log(error));
      });
  }
}
