import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOfferCustomerSegment } from 'app/shared/model/offer-customer-segment.model';
import { OfferCustomerSegmentService } from './offer-customer-segment.service';

@Component({
  templateUrl: './offer-customer-segment-delete-dialog.component.html'
})
export class OfferCustomerSegmentDeleteDialogComponent {
  offerCustomerSegment?: IOfferCustomerSegment;

  constructor(
    protected offerCustomerSegmentService: OfferCustomerSegmentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.offerCustomerSegmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('offerCustomerSegmentListModification');
      this.activeModal.close();
    });
  }
}
