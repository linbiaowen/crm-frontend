import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOfferCustomerClass } from 'app/shared/model/offer-customer-class.model';

@Component({
  selector: 'jhi-offer-customer-class-detail',
  templateUrl: './offer-customer-class-detail.component.html'
})
export class OfferCustomerClassDetailComponent implements OnInit {
  offerCustomerClass: IOfferCustomerClass | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offerCustomerClass }) => (this.offerCustomerClass = offerCustomerClass));
  }

  previousState(): void {
    window.history.back();
  }
}
