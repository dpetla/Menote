import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectRouteId, AppState } from '../../reducers';
import { ViewService } from '../../shared/view.service';
import { Note } from '../../types/note.interface';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListItemComponent {
  @Input() public note: Note;
  public id$ = this.store.select(selectRouteId);

  constructor(private store: Store<AppState>, private viewService: ViewService) {}

  public onSelectNote() {
    this.viewService.showSideMenu = this.viewService.isLargeScreen();
  }
}
