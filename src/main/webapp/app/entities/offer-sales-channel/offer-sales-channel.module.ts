import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmwebSharedModule } from 'app/shared/shared.module';
import { OfferSalesChannelComponent } from './offer-sales-channel.component';
import { OfferSalesChannelDetailComponent } from './offer-sales-channel-detail.component';
import { OfferSalesChannelUpdateComponent } from './offer-sales-channel-update.component';
import { OfferSalesChannelDeleteDialogComponent } from './offer-sales-channel-delete-dialog.component';
import { offerSalesChannelRoute } from './offer-sales-channel.route';

@NgModule({
  imports: [CrmwebSharedModule, RouterModule.forChild(offerSalesChannelRoute)],
  declarations: [
    OfferSalesChannelComponent,
    OfferSalesChannelDetailComponent,
    OfferSalesChannelUpdateComponent,
    OfferSalesChannelDeleteDialogComponent
  ],
  entryComponents: [OfferSalesChannelDeleteDialogComponent]
})
export class CrmwebOfferSalesChannelModule {}
