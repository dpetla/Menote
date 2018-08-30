import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../../auth/auth.service';
import { ViewService } from '../../shared/view.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIcon = '../../../assets/images/account-profile-user-icon.png';

  constructor(private authService: AuthService, private viewService: ViewService) {}

  ngOnInit() {
    // subscription to user auth state
    firebase.auth().onAuthStateChanged(user => {
      this.authService.user = user;
      console.log(user);
      // manage token in local storage
      if (this.authService.user) {
        this.authService.user
          .getIdToken()
          .then(token => localStorage.setItem('menote-user-token', token));
      } else {
        localStorage.removeItem('menote-user-token');
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUserPhotoURL() {
    return this.authService.user ? this.authService.user.photoURL : this.userIcon;
  }

  isLargeScreen() {
    return this.viewService.isLargeScreen();
  }

  toggleSideMenu() {
    this.viewService.showSideMenu = !this.viewService.showSideMenu;
  }
}
