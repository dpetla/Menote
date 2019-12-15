import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, pluck, startWith } from 'rxjs/operators';

import { selectIsAuthenticated, selectUser } from '../../../app/auth/store/auth.selectors';
import { logout } from '../../auth/store/auth.actions';
import { selectCurrentUrl, AppState } from '../../reducers';
import { toggleSideMenu } from '../../store/view.actions';

const defaultAvatar = '../../../assets/images/account-profile-user-icon.png';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isAuthenticated$ = this.store.select(selectIsAuthenticated);
  public isNotesPage$ = this.store.select(selectCurrentUrl).pipe(
    filter(url => typeof url !== 'undefined'),
    map(url => url.split('/').includes('notes')),
  );
  public userPhotoUrl$ = this.store.select(selectUser).pipe(
    filter(url => url !== null),
    startWith(defaultAvatar),
    pluck('photoURL'),
  );

  constructor(private store: Store<AppState>) {}

  public onLogout() {
    this.store.dispatch(logout());
  }

  public toggleSideMenu() {
    this.store.dispatch(toggleSideMenu());
  }
}
