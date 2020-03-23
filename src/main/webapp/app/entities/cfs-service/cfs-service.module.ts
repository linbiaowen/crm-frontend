import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmwebSharedModule } from 'app/shared/shared.module';
import { CfsServiceComponent } from './cfs-service.component';
import { CfsServiceDetailComponent } from './cfs-service-detail.component';
import { CfsServiceUpdateComponent } from './cfs-service-update.component';
import { CfsServiceDeleteDialogComponent } from './cfs-service-delete-dialog.component';
import { cfsServiceRoute } from './cfs-service.route';

@NgModule({
  imports: [CrmwebSharedModule, RouterModule.forChild(cfsServiceRoute)],
  declarations: [CfsServiceComponent, CfsServiceDetailComponent, CfsServiceUpdateComponent, CfsServiceDeleteDialogComponent],
  entryComponents: [CfsServiceDeleteDialogComponent]
})
export class CrmwebCfsServiceModule {}
