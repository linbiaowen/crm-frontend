import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOfferCustomerClass } from 'app/shared/model/offer-customer-class.model';
import { OfferCustomerClassService } from './offer-customer-class.service';

@Component({
  templateUrl: './offer-customer-class-delete-dialog.component.html'
})
export class OfferCustomerClassDeleteDialogComponent {
  offerCustomerClass?: IOfferCustomerClass;

  constructor(
    protected offerCustomerClassService: OfferCustomerClassService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.offerCustomerClassService.delete(id).subscribe(() => {
      this.eventManager.broadcast('offerCustomerClassListModification');
      this.activeModal.close();
    });
  }
}
