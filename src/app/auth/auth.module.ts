import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// feature modules
import { AuthRoutingModule } from './auth-routing.module';

// components
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  exports: [
    SigninComponent,
    SignupComponent,
    AuthRoutingModule
  ]
})
export class AuthModule {

}
