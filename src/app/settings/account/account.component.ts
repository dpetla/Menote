import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectUser } from '../../auth/store/auth.selectors';
import { AppState } from '../../reducers';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  public user$ = this.store.select(selectUser);
  public deactivateConfirmed = false;

  constructor(private store: Store<AppState>) {}
}
