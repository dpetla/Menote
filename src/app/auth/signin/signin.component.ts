import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { login } from '../store/auth.actions';
import { AuthState } from '../store/auth.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private store: Store<AuthState>) {}

  public onLoginWithGoogle() {
    this.store.dispatch(login());
  }
}
