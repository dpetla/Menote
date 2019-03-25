import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ViewService } from '../shared/view.service';
import { Note } from './note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes$: Observable<Note[]>;

  constructor(
    private viewService: ViewService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.notes$ = this.activatedRoute.data.pipe(
      switchMap((data: any) => [data.notes])
    );
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
