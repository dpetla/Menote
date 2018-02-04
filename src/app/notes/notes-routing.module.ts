import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './notes.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteStartComponent } from './note-start/note-start.component';
import { AuthGuard } from '../auth/auth-guard.service';

const notesRoute: Routes = [
  { path: '', component: NotesComponent, children: [
    { path: '', component: NoteStartComponent },
    { path: ':id', component: NoteDetailComponent }
  ], canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(notesRoute)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class NotesRoutingModule {

}
