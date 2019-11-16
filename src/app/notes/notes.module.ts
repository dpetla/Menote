import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { MaterialModule } from '../material/material.module';

import { NoteDetailComponent } from './note-detail/note-detail.component';
import { FilterPipe } from './note-list/filter.pipe';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteStartComponent } from './note-start/note-start.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';

@NgModule({
  declarations: [
    NotesComponent,
    NoteStartComponent,
    NoteListComponent,
    NoteDetailComponent,
    SimpleDialogComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NotesRoutingModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MaterialModule
  ],
  exports: [NotesRoutingModule],
  entryComponents: [SimpleDialogComponent]
})
export class NotesModule {}
