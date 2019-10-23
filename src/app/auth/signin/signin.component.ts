import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { loginWithPopUp } from '../auth.actions';
import { AuthState } from '../auth.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private store: Store<AuthState>) {}

  public onLoginWithGoogle() {
    this.store.dispatch(loginWithPopUp());
  }
}
