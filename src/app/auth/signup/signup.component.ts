// modules
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

// services
import { AuthService } from '../auth.service';
import { UserService } from '../../shared/user.service';

// models
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = {
    userId: '',
    name: '',
    email: '',
    password: '',
    profileUrl: '',
    status: true
  };

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
  }

  onEmailSignup(form: NgForm) {
    this.user.name = form.value.name;
    this.user.email = form.value.email;
    this.user.password = form.value.password;
    this.user.userId = firebase.auth().currentUser.uid;
    this.authService.emailSignup(this.user)
      .then(() => {
        this.userService.createUser(this.user);
      });
  }

}
