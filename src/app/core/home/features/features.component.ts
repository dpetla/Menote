import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent {
  public features: { name: string; desc: string; icon: string }[] = [
    {
      name: 'Rich text editor',
      desc: 'Simple but powerful rich text editor to have your notes your way.',
      icon: 'font',
    },
    {
      name: 'Cloud',
      desc: 'Secure cloud storage to keep all your notes protected.',
      icon: 'cloud',
    },
    {
      name: 'AutoSave',
      desc: "We save your notes so you don't have to!",
      icon: 'save',
    },
    {
      name: 'Tags',
      desc: 'Create your own tags to organize and add more detail to your notes.',
      icon: 'tags',
    },
    {
      name: 'Location & Weather',
      desc: 'Automatically capture and add location and current weather conditions to your notes.',
      icon: 'compass',
    },
    {
      name: 'Images',
      desc: 'Make your notes come to life adding images of your important moments.',
      icon: 'picture-o',
    },
  ];
}
