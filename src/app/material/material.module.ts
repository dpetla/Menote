import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatMenuModule
];
@NgModule({
  imports: [...materialModules],
  declarations: [],
  exports: [...materialModules]
})
export class MaterialModule {}
