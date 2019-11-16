import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private authService: AuthService) {}

  public onLoginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
