import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public deactivateConfirmed = false;

  constructor(private authService: AuthService) {}

  public ngOnInit() {}

  public getAccountCreation() {
    const options = {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    };
    return new Date(this.authService.user.metadata.creationTime).toLocaleString(
      'en-US',
      options
    );
  }
  public getLastSignin() {
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
    return new Date(
      this.authService.user.metadata.lastSignInTime
    ).toLocaleString('en-US', options);
  }

  public getDisplayName() {
    return this.authService.user.displayName;
  }

  public getUserName() {
    return this.authService.user.email;
  }

  public isEmailVerified() {
    return this.authService.user.emailVerified;
  }

  public getProvider() {
    return this.authService.user.providerData[0].providerId;
  }

  public onConfirmDeactivation() {
    return (this.deactivateConfirmed = !this.deactivateConfirmed);
  }
}
