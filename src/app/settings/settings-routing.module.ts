import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './settings.component';

const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [{ path: 'account', component: AccountComponent }],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class SettingsRoutingModule {}
