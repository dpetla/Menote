import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onEmailSignin(form: NgForm) {
    this.email = form.value.email;
    const password = form.value.password;
    this.authService.emailSignin(this.email, password);
  }

  getErrorMsg() {
    return this.authService.errorMsg;
  }
}
