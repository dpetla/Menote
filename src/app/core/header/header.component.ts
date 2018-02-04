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
  // userDoc: Observable<User>;

  constructor(private authService: AuthService,
              private router: Router,
              private viewService: ViewService) { }

  ngOnInit() {
    // this.userDoc = this.dataService.userRef.valueChanges();
    // if (this.isAuthenticated()) {
    //   this.router.navigate(['/notes']);
    // }
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
