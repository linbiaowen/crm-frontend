import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOffer, Offer } from 'app/shared/model/offer.model';
import { OfferService } from './offer.service';

@Component({
  selector: 'jhi-offer-update',
  templateUrl: './offer-update.component.html'
})
export class OfferUpdateComponent implements OnInit {
  isSaving = false;
  offers: IOffer[] = [];

  editForm = this.fb.group({
    id: [],
    offerId: [null, [Validators.required]],
    offerExternalId: [],
    offerName: [null, [Validators.required]],
    offerNameChi: [],
    offerDesc: [],
    offerDescChi: [],
    offerType: [],
    offerPrice: [],
    tempCustomerSegments: [],
    tempCustomerClasses: [],
    tempSalesChannels: [],
    startDate: [],
    endDate: [],
    tempChildOfferIds: [],
    tempProductIds: [],
    tempAdvancePaymentIds: [],
    tempPromoCodes: [],
    tempDiscountCodes: [],
    tempImageIds: [],
    limitedActivationPeriod: [],
    allowedActivationStartDate: [],
    allowedActivationEndDate: [],
    isGroupSharingOffer: [],
    isMnpOffer: [],
    autoRenewal: [],
    transferAllowed: [],
    infoSharingAllowed: [],
    infoSharingOptions: [],
    offerPeriod: [],
    offerPeriodTerm: [],
    paymentType: [],
    priority: [],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]],
    parentOffers: []
  });

  constructor(protected offerService: OfferService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offer }) => {
      if (!offer.id) {
        const today = moment().startOf('day');
        offer.startDate = today;
        offer.endDate = today;
        offer.allowedActivationStartDate = today;
        offer.allowedActivationEndDate = today;
        offer.createdDate = today;
        offer.lastUpdatedDate = today;
      }

      this.updateForm(offer);

      this.offerService.query().subscribe((res: HttpResponse<IOffer[]>) => (this.offers = res.body || []));
    });
  }

  updateForm(offer: IOffer): void {
    this.editForm.patchValue({
      id: offer.id,
      offerId: offer.offerId,
      offerExternalId: offer.offerExternalId,
      offerName: offer.offerName,
      offerNameChi: offer.offerNameChi,
      offerDesc: offer.offerDesc,
      offerDescChi: offer.offerDescChi,
      offerType: offer.offerType,
      offerPrice: offer.offerPrice,
      tempCustomerSegments: offer.tempCustomerSegments,
      tempCustomerClasses: offer.tempCustomerClasses,
      tempSalesChannels: offer.tempSalesChannels,
      startDate: offer.startDate ? offer.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: offer.endDate ? offer.endDate.format(DATE_TIME_FORMAT) : null,
      tempChildOfferIds: offer.tempChildOfferIds,
      tempProductIds: offer.tempProductIds,
      tempAdvancePaymentIds: offer.tempAdvancePaymentIds,
      tempPromoCodes: offer.tempPromoCodes,
      tempDiscountCodes: offer.tempDiscountCodes,
      tempImageIds: offer.tempImageIds,
      limitedActivationPeriod: offer.limitedActivationPeriod,
      allowedActivationStartDate: offer.allowedActivationStartDate ? offer.allowedActivationStartDate.format(DATE_TIME_FORMAT) : null,
      allowedActivationEndDate: offer.allowedActivationEndDate ? offer.allowedActivationEndDate.format(DATE_TIME_FORMAT) : null,
      isGroupSharingOffer: offer.isGroupSharingOffer,
      isMnpOffer: offer.isMnpOffer,
      autoRenewal: offer.autoRenewal,
      transferAllowed: offer.transferAllowed,
      infoSharingAllowed: offer.infoSharingAllowed,
      infoSharingOptions: offer.infoSharingOptions,
      offerPeriod: offer.offerPeriod,
      offerPeriodTerm: offer.offerPeriodTerm,
      paymentType: offer.paymentType,
      priority: offer.priority,
      lockCount: offer.lockCount,
      createdDate: offer.createdDate ? offer.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: offer.createdBy,
      lastUpdatedDate: offer.lastUpdatedDate ? offer.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: offer.lastUpdatedBy,
      tenantId: offer.tenantId,
      parentOffers: offer.parentOffers
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offer = this.createFromForm();
    if (offer.id !== undefined) {
      this.subscribeToSaveResponse(this.offerService.update(offer));
    } else {
      this.subscribeToSaveResponse(this.offerService.create(offer));
    }
  }

  private createFromForm(): IOffer {
    return {
      ...new Offer(),
      id: this.editForm.get(['id'])!.value,
      offerId: this.editForm.get(['offerId'])!.value,
      offerExternalId: this.editForm.get(['offerExternalId'])!.value,
      offerName: this.editForm.get(['offerName'])!.value,
      offerNameChi: this.editForm.get(['offerNameChi'])!.value,
      offerDesc: this.editForm.get(['offerDesc'])!.value,
      offerDescChi: this.editForm.get(['offerDescChi'])!.value,
      offerType: this.editForm.get(['offerType'])!.value,
      offerPrice: this.editForm.get(['offerPrice'])!.value,
      tempCustomerSegments: this.editForm.get(['tempCustomerSegments'])!.value,
      tempCustomerClasses: this.editForm.get(['tempCustomerClasses'])!.value,
      tempSalesChannels: this.editForm.get(['tempSalesChannels'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      tempChildOfferIds: this.editForm.get(['tempChildOfferIds'])!.value,
      tempProductIds: this.editForm.get(['tempProductIds'])!.value,
      tempAdvancePaymentIds: this.editForm.get(['tempAdvancePaymentIds'])!.value,
      tempPromoCodes: this.editForm.get(['tempPromoCodes'])!.value,
      tempDiscountCodes: this.editForm.get(['tempDiscountCodes'])!.value,
      tempImageIds: this.editForm.get(['tempImageIds'])!.value,
      limitedActivationPeriod: this.editForm.get(['limitedActivationPeriod'])!.value,
      allowedActivationStartDate: this.editForm.get(['allowedActivationStartDate'])!.value
        ? moment(this.editForm.get(['allowedActivationStartDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      allowedActivationEndDate: this.editForm.get(['allowedActivationEndDate'])!.value
        ? moment(this.editForm.get(['allowedActivationEndDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      isGroupSharingOffer: this.editForm.get(['isGroupSharingOffer'])!.value,
      isMnpOffer: this.editForm.get(['isMnpOffer'])!.value,
      autoRenewal: this.editForm.get(['autoRenewal'])!.value,
      transferAllowed: this.editForm.get(['transferAllowed'])!.value,
      infoSharingAllowed: this.editForm.get(['infoSharingAllowed'])!.value,
      infoSharingOptions: this.editForm.get(['infoSharingOptions'])!.value,
      offerPeriod: this.editForm.get(['offerPeriod'])!.value,
      offerPeriodTerm: this.editForm.get(['offerPeriodTerm'])!.value,
      paymentType: this.editForm.get(['paymentType'])!.value,
      priority: this.editForm.get(['priority'])!.value,
      lockCount: this.editForm.get(['lockCount'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      createdBy: this.editForm.get(['createdBy'])!.value,
      lastUpdatedDate: this.editForm.get(['lastUpdatedDate'])!.value
        ? moment(this.editForm.get(['lastUpdatedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastUpdatedBy: this.editForm.get(['lastUpdatedBy'])!.value,
      tenantId: this.editForm.get(['tenantId'])!.value,
      parentOffers: this.editForm.get(['parentOffers'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOffer>>): void {
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

  getSelected(selectedVals: IOffer[], option: IOffer): IOffer {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
