import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmwebSharedModule } from 'app/shared/shared.module';
import { ProductSimTypeComponent } from './product-sim-type.component';
import { ProductSimTypeDetailComponent } from './product-sim-type-detail.component';
import { ProductSimTypeUpdateComponent } from './product-sim-type-update.component';
import { ProductSimTypeDeleteDialogComponent } from './product-sim-type-delete-dialog.component';
import { productSimTypeRoute } from './product-sim-type.route';

@NgModule({
  imports: [CrmwebSharedModule, RouterModule.forChild(productSimTypeRoute)],
  declarations: [
    ProductSimTypeComponent,
    ProductSimTypeDetailComponent,
    ProductSimTypeUpdateComponent,
    ProductSimTypeDeleteDialogComponent
  ],
  entryComponents: [ProductSimTypeDeleteDialogComponent]
})
export class CrmwebProductSimTypeModule {}
