import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmwebSharedModule } from 'app/shared/shared.module';
import { EfLockerLocationComponent } from './ef-locker-location.component';
import { EfLockerLocationDetailComponent } from './ef-locker-location-detail.component';
import { EfLockerLocationUpdateComponent } from './ef-locker-location-update.component';
import { EfLockerLocationDeleteDialogComponent } from './ef-locker-location-delete-dialog.component';
import { efLockerLocationRoute } from './ef-locker-location.route';

@NgModule({
  imports: [CrmwebSharedModule, RouterModule.forChild(efLockerLocationRoute)],
  declarations: [
    EfLockerLocationComponent,
    EfLockerLocationDetailComponent,
    EfLockerLocationUpdateComponent,
    EfLockerLocationDeleteDialogComponent
  ],
  entryComponents: [EfLockerLocationDeleteDialogComponent]
})
export class CrmwebEfLockerLocationModule {}
