import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';

import { selectRouteId, AppState } from '../../reducers';
import { showSideMenu } from '../../store/view.actions';
import { selectIsLargeScreen } from '../../store/view.selectors';
import { Note } from '../../types/note.interface';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListItemComponent implements OnDestroy {
  @Input() public note: Note;

  public id$ = this.store.select(selectRouteId);
  private unsubscribe$ = new Subject<void>();
  private _selectNote$ = new Subject<void>();
  public selectNote$ = this._selectNote$.asObservable().pipe(
    takeUntil(this.unsubscribe$),
    withLatestFrom(this.store.select(selectIsLargeScreen)),
    map(([_, isLargeScreen]) => this.store.dispatch(showSideMenu({ show: isLargeScreen }))),
  );

  constructor(private store: Store<AppState>) {}

  public onSelectNote() {
    this._selectNote$.next();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
