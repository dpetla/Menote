import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent, AccountComponent, ProfileComponent, SecurityComponent],
  imports: [CommonModule, FormsModule, SettingsRoutingModule],
  exports: [SettingsRoutingModule, AccountComponent, ProfileComponent, SecurityComponent]
})
export class SettingsModule {}
