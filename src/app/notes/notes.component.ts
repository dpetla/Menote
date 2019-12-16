import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { largeScreen, smallScreen } from '../store/view.actions';
import { selectIsLargeScreen, selectShowSideMenu } from '../store/view.selectors';

// target width (in px) to hide/show side menu
const targetInnerWidth = 900;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  public isLargeScreen$ = this.store.select(selectIsLargeScreen);
  public showSideMenu$ = this.store.select(selectShowSideMenu);

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.setScreeSize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.setScreeSize(event.target.innerWidth);
  }

  private setScreeSize(innerWidth: number): void {
    this.store.dispatch(innerWidth <= targetInnerWidth ? smallScreen() : largeScreen());
  }
}
