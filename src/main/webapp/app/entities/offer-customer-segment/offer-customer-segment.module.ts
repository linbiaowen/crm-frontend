import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmwebSharedModule } from 'app/shared/shared.module';
import { OfferCustomerSegmentComponent } from './offer-customer-segment.component';
import { OfferCustomerSegmentDetailComponent } from './offer-customer-segment-detail.component';
import { OfferCustomerSegmentUpdateComponent } from './offer-customer-segment-update.component';
import { OfferCustomerSegmentDeleteDialogComponent } from './offer-customer-segment-delete-dialog.component';
import { offerCustomerSegmentRoute } from './offer-customer-segment.route';

@NgModule({
  imports: [CrmwebSharedModule, RouterModule.forChild(offerCustomerSegmentRoute)],
  declarations: [
    OfferCustomerSegmentComponent,
    OfferCustomerSegmentDetailComponent,
    OfferCustomerSegmentUpdateComponent,
    OfferCustomerSegmentDeleteDialogComponent
  ],
  entryComponents: [OfferCustomerSegmentDeleteDialogComponent]
})
export class CrmwebOfferCustomerSegmentModule {}
