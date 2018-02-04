import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBcC9pbQu9Xb6nmfs5WhpSB_1aWX6syQdU',
      authDomain: 'ng-journal-app.firebaseapp.com'
    });
  }
}


