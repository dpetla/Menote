import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent, AccountComponent],
  imports: [CommonModule, FormsModule, SettingsRoutingModule],
  exports: [SettingsRoutingModule, AccountComponent]
})
export class SettingsModule {}
