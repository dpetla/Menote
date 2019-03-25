import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteStartComponent } from './note-start/note-start.component';
import { NotesResolverService } from './notes-resolver.service';
import { NotesComponent } from './notes.component';

const notesRoute: Routes = [
  {
    path: '',
    component: NotesComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: NoteStartComponent },
      {
        path: ':id',
        component: NoteDetailComponent
      }
    ],
    resolve: { notes: NotesResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(notesRoute)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class NotesRoutingModule {}
