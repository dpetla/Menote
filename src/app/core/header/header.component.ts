// modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services
import { AuthService } from '../../auth/auth.service';
import { ViewService } from '../../shared/view.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private viewService: ViewService) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isLargeScreen() {
    return this.viewService.isLargeScreen();
  }

  toggleSideMenu() {
    this.viewService.showSideMenu = !this.viewService.showSideMenu;
  }
}
