import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  features = [
    {
      name: 'Rich text editor',
      icon: 'font'
    },
    {
      name: 'Date and location',
      icon: 'compass'
    },
    {
      name: 'Tags',
      icon: 'tags'
    },
    {
      name: 'Weather conditions',
      icon: 'sun-o'
    },
    {
      name: 'Images',
      icon: 'picture-o'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
