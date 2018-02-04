import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// modules and components
import { NotesRoutingModule } from './notes-routing.module';
// import { CKEditorModule } from 'ng2-ckeditor';
import { NotesComponent } from './notes.component';
import { NoteStartComponent } from './note-start/note-start.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [
    NotesComponent,
    NoteStartComponent,
    NoteListComponent,
    NoteDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NotesRoutingModule,
    // CKEditorModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  exports: [
    NotesRoutingModule
  ]
})
export class NotesModule { }
