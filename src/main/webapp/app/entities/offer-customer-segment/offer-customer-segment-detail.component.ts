import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOfferCustomerSegment } from 'app/shared/model/offer-customer-segment.model';

@Component({
  selector: 'jhi-offer-customer-segment-detail',
  templateUrl: './offer-customer-segment-detail.component.html'
})
export class OfferCustomerSegmentDetailComponent implements OnInit {
  offerCustomerSegment: IOfferCustomerSegment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offerCustomerSegment }) => (this.offerCustomerSegment = offerCustomerSegment));
  }

  previousState(): void {
    window.history.back();
  }
}
