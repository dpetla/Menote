import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, FormsModule, AuthRoutingModule],
  exports: [SigninComponent, AuthRoutingModule]
})
export class AuthModule {}
