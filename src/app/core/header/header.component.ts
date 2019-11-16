import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { ViewService } from '../../shared/view.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userIcon = '../../../assets/images/account-profile-user-icon.png';

  constructor(
    private authService: AuthService,
    private viewService: ViewService,
    private router: Router
  ) {}

  public ngOnInit() {}

  public onLogout() {
    this.authService.logout();
  }

  public isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  public getUserPhotoURL() {
    return this.authService.user
      ? this.authService.user.photoURL
      : this.userIcon;
  }

  public isLargeScreen() {
    return this.viewService.isLargeScreen();
  }

  public toggleSideMenu() {
    this.viewService.showSideMenu = !this.viewService.showSideMenu;
  }

  public isNotesPage() {
    return this.router.url.indexOf('/notes') >= 0;
  }
}
