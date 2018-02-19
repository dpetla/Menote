// modules
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
      desc: 'We save your notes so you don\'t have to!',
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

}
