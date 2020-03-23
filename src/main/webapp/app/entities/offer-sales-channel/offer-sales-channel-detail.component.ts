import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOfferSalesChannel } from 'app/shared/model/offer-sales-channel.model';

@Component({
  selector: 'jhi-offer-sales-channel-detail',
  templateUrl: './offer-sales-channel-detail.component.html'
})
export class OfferSalesChannelDetailComponent implements OnInit {
  offerSalesChannel: IOfferSalesChannel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offerSalesChannel }) => (this.offerSalesChannel = offerSalesChannel));
  }

  previousState(): void {
    window.history.back();
  }
}
