import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  email = '';
  message = '';

  constructor() {}

  ngOnInit() {}

  onSend(f: NgForm) {
    window.location.href =
      'mailto:contact%40menote.ca?subject=Menote%20question/suggestion&body=' +
      f.value.message +
      '%0D%0Amessage from: ' +
      f.value.email +
      '';
  }
}
