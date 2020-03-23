import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOfferCustomerClass, OfferCustomerClass } from 'app/shared/model/offer-customer-class.model';
import { OfferCustomerClassService } from './offer-customer-class.service';
import { IOffer } from 'app/shared/model/offer.model';
import { OfferService } from 'app/entities/offer/offer.service';

@Component({
  selector: 'jhi-offer-customer-class-update',
  templateUrl: './offer-customer-class-update.component.html'
})
export class OfferCustomerClassUpdateComponent implements OnInit {
  isSaving = false;
  offers: IOffer[] = [];

  editForm = this.fb.group({
    id: [],
    customerClass: [],
    offer: []
  });

  constructor(
    protected offerCustomerClassService: OfferCustomerClassService,
    protected offerService: OfferService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offerCustomerClass }) => {
      this.updateForm(offerCustomerClass);

      this.offerService.query().subscribe((res: HttpResponse<IOffer[]>) => (this.offers = res.body || []));
    });
  }

  updateForm(offerCustomerClass: IOfferCustomerClass): void {
    this.editForm.patchValue({
      id: offerCustomerClass.id,
      customerClass: offerCustomerClass.customerClass,
      offer: offerCustomerClass.offer
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offerCustomerClass = this.createFromForm();
    if (offerCustomerClass.id !== undefined) {
      this.subscribeToSaveResponse(this.offerCustomerClassService.update(offerCustomerClass));
    } else {
      this.subscribeToSaveResponse(this.offerCustomerClassService.create(offerCustomerClass));
    }
  }

  private createFromForm(): IOfferCustomerClass {
    return {
      ...new OfferCustomerClass(),
      id: this.editForm.get(['id'])!.value,
      customerClass: this.editForm.get(['customerClass'])!.value,
      offer: this.editForm.get(['offer'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOfferCustomerClass>>): void {
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
