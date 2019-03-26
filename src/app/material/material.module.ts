import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

const materialModules = [
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTooltipModule
];
@NgModule({
  imports: [...materialModules, CommonModule],
  declarations: [LoadingSpinnerComponent],
  exports: [...materialModules, LoadingSpinnerComponent]
})
export class MaterialModule {}
