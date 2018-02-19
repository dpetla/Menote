// modules
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// components
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { SecurityComponent } from './security/security.component';

// services
import { AuthGuard } from '../auth/auth-guard.service';

const settingsRoutes: Routes = [
  { path: '', component: SettingsComponent, children: [
    { path: 'account', component: AccountComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'security', component: SecurityComponent }
  ], canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class SettingsRoutingModule {

}
