import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email = '';
  message = '';

  features = [
    {
      name: 'Rich text editor',
      desc: 'Simple but powerful rich text editor to have your notes your way.',
      icon: 'font'
    },
    {
      name: 'Cloud',
      desc: 'Secure cloud storage to keep all your notes protected.',
      icon: 'cloud'
    },
    {
      name: 'AutoSave',
      desc: "We save your notes so you don't have to!",
      icon: 'save'
    },
    {
      name: 'Tags',
      desc: 'Create your own tags to organize and add more detail to your notes.',
      icon: 'tags'
    },
    {
      name: 'Location & Weather',
      desc: 'Automatically capture and add location and current weather conditions to your notes.',
      icon: 'compass'
    },
    {
      name: 'Images',
      desc: 'Make your notes come to life adding images of your important moments.',
      icon: 'picture-o'
    }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.isAuthenticated()) {
      const path = localStorage.getItem('menote-nav-hist') || '/notes';
      this.router.navigate([path]);
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onSend(f: NgForm) {
    const isFormEmpty = f.value.email === '' || f.value.message === '';
    if (f.dirty && !isFormEmpty) {
      window.location.href =
        'mailto:dpetla%40gmail.com?subject=Menote%20question/suggestion&body=' +
        f.value.message +
        '%0D%0Amessage from:' +
        f.value.email +
        '';
    }
  }
}
