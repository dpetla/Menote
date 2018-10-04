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
  imports: [...materialModules],
  declarations: [],
  exports: [...materialModules]
})
export class MaterialModule {}
