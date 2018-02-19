// component
import { Component, OnInit } from '@angular/core';

// services
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  deactivateConfirmed = false;

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
  }

  getAccountCreation() {
    const options = {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    };
    return new Date(this.authService.userAccount.metadata.creationTime)
      .toLocaleString('en-US', options);
  }
  getLastSignin() {
    const options = {
      hour12: false,
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    };
    return new Date(this.authService.userAccount.metadata.lastSignInTime)
      .toLocaleString('en-US', options);
  }

  getUserName() {
    return this.authService.userAccount.email;
  }

  isEmailVerified() {
    return this.authService.userAccount.emailVerified;
  }

  onDeactivateAccount() {
    this.userService.deactivateAccount();
  }

  onConfirmDeactivation() {
    return this.deactivateConfirmed = !this.deactivateConfirmed;
  }
}
