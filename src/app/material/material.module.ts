import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

const materialModules = [
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatSnackBarModule
];
@NgModule({
  imports: [...materialModules, CommonModule],
  declarations: [LoadingSpinnerComponent],
  exports: [...materialModules, LoadingSpinnerComponent]
})
export class MaterialModule {}
