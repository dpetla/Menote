import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, pluck, startWith } from 'rxjs/operators';

import { selectIsAuthenticated, selectUser } from '../../../app/auth/store/auth.selectors';
import { logout } from '../../auth/store/auth.actions';
import { AppState } from '../../reducers';
import { ViewService } from '../../shared/view.service';

const defaultAvatar = '../../../assets/images/account-profile-user-icon.png';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isAuthenticated$ = this.store.select(selectIsAuthenticated);
  public userPhotoUrl$ = this.store.select(selectUser).pipe(
    filter(url => url !== null),
    startWith(defaultAvatar),
    pluck('photoURL'),
  );

  constructor(private viewService: ViewService, private router: Router, private store: Store<AppState>) {}

  public onLogout() {
    this.store.dispatch(logout());
  }

  public toggleSideMenu() {
    this.viewService.showSideMenu = !this.viewService.showSideMenu;
  }

  public isNotesPage() {
    return this.router.url.indexOf('/notes') >= 0;
  }
}
