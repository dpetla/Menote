import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDoc: Observable<User>;
  user: User;
  displayConfirmation = false;
  displayError = false;

  constructor(private dataService: DataService, private authService: AuthService) {}

  ngOnInit() {
    this.userDoc = this.dataService.userRef.valueChanges();
  }

  onSubmit(form: NgForm) {
    // update users db
    this.dataService.userRef
      .update({
        name: form.value.name,
        email: form.value.email
      })
      .then(() => {
        // update firebase authentication account
        this.authService.user.updateEmail(form.value.email).then(() => {
          this.authService.user.sendEmailVerification();
          // display confirmation message
          this.displayConfirmation = true;
          setTimeout(() => (this.displayConfirmation = false), 5000);
        });
      })
      .catch(reason => {
        console.log(reason);
        // display error message
        this.displayError = true;
        setTimeout(() => (this.displayError = false), 5000);
      });
  }

  onLoadProfileImage() {
    alert('Select a new profile picture');
  }
}
