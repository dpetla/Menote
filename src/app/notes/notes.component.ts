import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewService } from '../shared/view.service';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes$: Observable<Note[]>;

  constructor(
    private viewService: ViewService,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    this.notes$ = this.notesService.getNotes();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewService.innerWidth = event.target.innerWidth;
    if (!this.viewService.showSideMenu && this.viewService.isLargeScreen()) {
      this.viewService.showSideMenu = this.viewService.isLargeScreen();
    }
  }

  isLargeScreen() {
    return this.viewService.isLargeScreen();
  }

  showSideMenu() {
    return this.viewService.showSideMenu;
  }
}
