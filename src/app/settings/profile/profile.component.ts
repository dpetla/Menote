import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../../shared/data.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDoc: Observable<User>;
  user: User;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.userDoc = this.dataService.userRef.valueChanges();
  }

  onSubmit(form: NgForm) {
    this.dataService.userRef
      .update({
      name: form.value.name,
      email: form.value.email
      })
      .then(data => console.log(data)) // TODO confirmation message
      .catch(reason => console.log(reason));
  }

  onLoadProfileImage() {
    alert('Select a new profile picture');
  }

}
