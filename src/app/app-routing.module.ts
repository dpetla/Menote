import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'notes',
    loadChildren: () => import(`./notes/notes.module`).then(m => m.NotesModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import(`./settings/settings.module`).then(m => m.SettingsModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
