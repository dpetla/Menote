// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';

// feature modules
import { NotesRoutingModule } from './notes-routing.module';

// components
import { NotesComponent } from './notes.component';
import { NoteStartComponent } from './note-start/note-start.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

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
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  exports: [
    NotesRoutingModule
  ]
})
export class NotesModule { }
