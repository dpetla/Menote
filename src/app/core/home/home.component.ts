import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { selectIsAuthenticated } from '../../auth/store/auth.selectors';
import { AppState } from '../../reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public isAuthenticated$ = this.store.select(selectIsAuthenticated);
  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private store: Store<AppState>) {}

  public ngOnInit() {
    this.isAuthenticated$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      const path = localStorage.getItem('menote-nav-hist') || '/notes';
      this.router.navigate([path]);
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
