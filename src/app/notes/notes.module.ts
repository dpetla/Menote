import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { MaterialModule } from '../material/material.module';

import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { FilterPipe } from './note-list/filter.pipe';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteStartComponent } from './note-start/note-start.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import * as fromNotes from './store/notes.reducer';

@NgModule({
  declarations: [
    NotesComponent,
    NoteStartComponent,
    NoteListComponent,
    NoteDetailComponent,
    FilterPipe,
    NoteListItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NotesRoutingModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MaterialModule,
    StoreModule.forFeature(fromNotes.notesFeatureKey, fromNotes.reducer),
  ],
  exports: [NotesRoutingModule],
})
export class NotesModule {}
