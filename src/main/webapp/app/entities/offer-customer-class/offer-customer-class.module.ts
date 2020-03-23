import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmwebSharedModule } from 'app/shared/shared.module';
import { OfferCustomerClassComponent } from './offer-customer-class.component';
import { OfferCustomerClassDetailComponent } from './offer-customer-class-detail.component';
import { OfferCustomerClassUpdateComponent } from './offer-customer-class-update.component';
import { OfferCustomerClassDeleteDialogComponent } from './offer-customer-class-delete-dialog.component';
import { offerCustomerClassRoute } from './offer-customer-class.route';

@NgModule({
  imports: [CrmwebSharedModule, RouterModule.forChild(offerCustomerClassRoute)],
  declarations: [
    OfferCustomerClassComponent,
    OfferCustomerClassDetailComponent,
    OfferCustomerClassUpdateComponent,
    OfferCustomerClassDeleteDialogComponent
  ],
  entryComponents: [OfferCustomerClassDeleteDialogComponent]
})
export class CrmwebOfferCustomerClassModule {}
