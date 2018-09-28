import { NgModule } from '@angular/core';
import { MatButtonModule, MatListModule, MatSidenavModule } from '@angular/material';

const materialModules = [MatButtonModule, MatSidenavModule, MatListModule];
@NgModule({
  imports: [...materialModules],
  declarations: [],
  exports: [...materialModules]
})
export class MaterialModule {}
