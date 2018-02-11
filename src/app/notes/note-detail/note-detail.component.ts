import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { Subscription } from 'rxjs/Subscription';

// constants
const tagsMax = 10;

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  // local variables
  noteDoc: AngularFirestoreDocument<{}>;
  id: string;
  note: Note;
  subscription: Subscription;
  tags$: Array<string>;
  tagEditable: boolean;
  isTagsFull: boolean;
  froalaOptions: Object = {
    // #general
    placeholderText: 'Describe your day ...',
    charCounterCount: false,
    // multiline: true,
    // scrollableContainer: '#my_scrollable_container',
    // htmlAllowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    // fullPage: false,
    // #dimensions
    // height: 300,
    // heightMax: 500,
    // heightMin: 200,
    // width: 800,
    // indentMargin: 10,

    // #style
    colorsBackground: [
      '#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC',
      '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000',
      '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF',
      '#FAC51C', '#F37934', '#D14841', '#B8312F', '#7C706B', '#D1D5D8', 'REMOVE'
    ],
    colorsText: [
      '#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC',
      '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000',
      '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF',
      '#FAC51C', '#F37934', '#D14841', '#B8312F', '#7C706B', '#D1D5D8', 'REMOVE'
    ],
    // editorClass: 'custom-class',

    // #toolbar
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle',
      '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote',  'insertLink', 'insertImage',
      'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', '|', 'print', 'spellChecker', 'help', '|', 'undo', 'redo'],
    toolbarButtonsMD: ['fullscreen', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'color', '|', 'paragraphFormat', 'align',
      'formatOL', 'formatUL', 'insertLink', 'insertImage', 'insertTable', 'undo', 'redo'],
    toolbarButtonsSM: ['fullscreen', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'color', '|', 'paragraphFormat', 'align',
      'formatOL', 'formatUL', 'insertLink', 'insertImage', 'insertTable', 'undo', 'redo'],
    toolbarButtonsXS: ['bold', 'italic', 'fontFamily', 'fontSize', 'formatOL', 'formatUL', 'undo', 'redo'],
    // toolbarContainer: '#toolbarContainer',
    // toolbarInline: true,
    // toolbarBottom: false,
    // toolbarSticky: false,
    // toolbarStickyOffset: 50,
    // toolbarVisibleWithoutSelection: true,
    codeView: false,


    // #images
    // imageDefaultWidth: 200,
    // imageEditButtons: ['imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'],
    // imageMaxSize: 1024 * 1024 * 10,
    // imageMinWidth: 16,
    imageMove: true,
    imagePaste: true,
    imageUpload: true,
  };

  constructor(private notesService: NotesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // get note id from url param
    this.subscription = this.route.params.subscribe(params => {
        this.id = params['id'];
        this.noteDoc = this.notesService.getNote(this.id);
        this.noteDoc.valueChanges().subscribe(
          data => {
            // store data note locally
            this.note = data as Note;

            // get keys and values from tag object
            if (this.note['tags']) {
              this.tags$ = [];
              const keys = Object.keys(this.note['tags']);
              const values = Object.values(this.note['tags']);

              // add tag to local array if value true
              for (let i = 0; i < values.length; i++) {
                if (values[i]) {
                  this.tags$.push(keys[i]);
                }
              }
            }
            this.isTagsFull = this.tags$.length >= tagsMax;
            this.tagEditable = false;
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

  onTitleChange(event) {
    this.noteDoc.update({ 'title': event })
      .then(() => this.updateDate())
      .catch(reason => console.log(reason));
  }

  onContentChange(event) {
    this.noteDoc.update({ 'content': event })
      .then(() => this.updateDate())
      .catch(reason => console.log(reason));
  }

  toggleTagEdit() {
    this.tagEditable = !this.tagEditable;
  }

  onSaveTag(event) {
    const tag = event.target.value;
    const initVal = {};

    // add to local tags arrays
    if (this.tags$.length < tagsMax) {
      this.tags$.push(tag);

      // convert tags array to object
      const tagObj = this.tags$.reduce((tags, key) => {
        if (!tags[key]) {
          tags[key] = true;
        }
        return tags;
      }, initVal);

      // load tags to db
      this.noteDoc.update({
        tags : tagObj
      })
        .then(() => this.updateDate())
        .catch(reason => console.log(reason));
    }
    this.toggleTagEdit();
  }

  onRemoveTag(tag: string) {
    this.noteDoc.update({
      ['tags.' + tag]: firebase.firestore.FieldValue.delete()
    })
      .then(() => this.updateDate())
      .catch(reason => console.log(reason));
  }

  updateDate() {
    this.noteDoc.update({
      dateUpdated: new Date()
    });
  }

  onDeleteNote() {
    if (window.confirm('Do you want to delete this note?')) {
      // TODO add confirmation and notification at completion or/and processing spinner
      this.noteDoc.delete()
        .catch(reason => console.log(reason));
      this.router.navigate(['/notes'])
        .then(() => {
          // TODO select first note of the list
        });
    }
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  //   console.log('subscription destroyed');
  // }
}
