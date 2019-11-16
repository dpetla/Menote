import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    if (this.authService.isAuthenticated()) {
      const path = localStorage.getItem('menote-nav-hist') || '/notes';
      this.router.navigate([path]);
    }
  }
}
