import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// module and components
import { SettingsRoutingModule } from './settings-routing.module';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AccountComponent,
    ProfileComponent,
    SecurityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule
  ],
  exports: [
    SettingsRoutingModule,
    AccountComponent,
    ProfileComponent,
    SecurityComponent
  ]
})
export class SettingsModule { }
