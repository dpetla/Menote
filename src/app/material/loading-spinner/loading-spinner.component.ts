import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() public showLabel = false;
  @Input() public label = 'Loading...';

  constructor() {}

  public ngOnInit() {}
}
