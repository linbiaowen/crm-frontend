import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOfferSalesChannel, OfferSalesChannel } from 'app/shared/model/offer-sales-channel.model';
import { OfferSalesChannelService } from './offer-sales-channel.service';
import { IOffer } from 'app/shared/model/offer.model';
import { OfferService } from 'app/entities/offer/offer.service';

@Component({
  selector: 'jhi-offer-sales-channel-update',
  templateUrl: './offer-sales-channel-update.component.html'
})
export class OfferSalesChannelUpdateComponent implements OnInit {
  isSaving = false;
  offers: IOffer[] = [];

  editForm = this.fb.group({
    id: [],
    salesChannel: [],
    offer: []
  });

  constructor(
    protected offerSalesChannelService: OfferSalesChannelService,
    protected offerService: OfferService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offerSalesChannel }) => {
      this.updateForm(offerSalesChannel);

      this.offerService.query().subscribe((res: HttpResponse<IOffer[]>) => (this.offers = res.body || []));
    });
  }

  updateForm(offerSalesChannel: IOfferSalesChannel): void {
    this.editForm.patchValue({
      id: offerSalesChannel.id,
      salesChannel: offerSalesChannel.salesChannel,
      offer: offerSalesChannel.offer
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offerSalesChannel = this.createFromForm();
    if (offerSalesChannel.id !== undefined) {
      this.subscribeToSaveResponse(this.offerSalesChannelService.update(offerSalesChannel));
    } else {
      this.subscribeToSaveResponse(this.offerSalesChannelService.create(offerSalesChannel));
    }
  }

  private createFromForm(): IOfferSalesChannel {
    return {
      ...new OfferSalesChannel(),
      id: this.editForm.get(['id'])!.value,
      salesChannel: this.editForm.get(['salesChannel'])!.value,
      offer: this.editForm.get(['offer'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOfferSalesChannel>>): void {
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
