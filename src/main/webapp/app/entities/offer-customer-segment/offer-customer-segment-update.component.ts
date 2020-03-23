import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOfferCustomerSegment, OfferCustomerSegment } from 'app/shared/model/offer-customer-segment.model';
import { OfferCustomerSegmentService } from './offer-customer-segment.service';
import { IOffer } from 'app/shared/model/offer.model';
import { OfferService } from 'app/entities/offer/offer.service';

@Component({
  selector: 'jhi-offer-customer-segment-update',
  templateUrl: './offer-customer-segment-update.component.html'
})
export class OfferCustomerSegmentUpdateComponent implements OnInit {
  isSaving = false;
  offers: IOffer[] = [];

  editForm = this.fb.group({
    id: [],
    customerSegment: [],
    offer: []
  });

  constructor(
    protected offerCustomerSegmentService: OfferCustomerSegmentService,
    protected offerService: OfferService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offerCustomerSegment }) => {
      this.updateForm(offerCustomerSegment);

      this.offerService.query().subscribe((res: HttpResponse<IOffer[]>) => (this.offers = res.body || []));
    });
  }

  updateForm(offerCustomerSegment: IOfferCustomerSegment): void {
    this.editForm.patchValue({
      id: offerCustomerSegment.id,
      customerSegment: offerCustomerSegment.customerSegment,
      offer: offerCustomerSegment.offer
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offerCustomerSegment = this.createFromForm();
    if (offerCustomerSegment.id !== undefined) {
      this.subscribeToSaveResponse(this.offerCustomerSegmentService.update(offerCustomerSegment));
    } else {
      this.subscribeToSaveResponse(this.offerCustomerSegmentService.create(offerCustomerSegment));
    }
  }

  private createFromForm(): IOfferCustomerSegment {
    return {
      ...new OfferCustomerSegment(),
      id: this.editForm.get(['id'])!.value,
      customerSegment: this.editForm.get(['customerSegment'])!.value,
      offer: this.editForm.get(['offer'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOfferCustomerSegment>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IOffer): any {
    return item.id;
  }
}
