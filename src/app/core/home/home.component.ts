import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectIsAuthenticated } from '../../auth/store/auth.selectors';
import { AppState } from '../../reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(private store: Store<AppState>) {}
}
