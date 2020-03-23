import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmwebSharedModule } from 'app/shared/shared.module';
import { ProductMmsComponent } from './product-mms.component';
import { ProductMmsDetailComponent } from './product-mms-detail.component';
import { ProductMmsUpdateComponent } from './product-mms-update.component';
import { ProductMmsDeleteDialogComponent } from './product-mms-delete-dialog.component';
import { productMmsRoute } from './product-mms.route';

@NgModule({
  imports: [CrmwebSharedModule, RouterModule.forChild(productMmsRoute)],
  declarations: [ProductMmsComponent, ProductMmsDetailComponent, ProductMmsUpdateComponent, ProductMmsDeleteDialogComponent],
  entryComponents: [ProductMmsDeleteDialogComponent]
})
export class CrmwebProductMmsModule {}
