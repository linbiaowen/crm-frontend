import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOfferSalesChannel } from 'app/shared/model/offer-sales-channel.model';
import { OfferSalesChannelService } from './offer-sales-channel.service';

@Component({
  templateUrl: './offer-sales-channel-delete-dialog.component.html'
})
export class OfferSalesChannelDeleteDialogComponent {
  offerSalesChannel?: IOfferSalesChannel;

  constructor(
    protected offerSalesChannelService: OfferSalesChannelService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.offerSalesChannelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('offerSalesChannelListModification');
      this.activeModal.close();
    });
  }
}
