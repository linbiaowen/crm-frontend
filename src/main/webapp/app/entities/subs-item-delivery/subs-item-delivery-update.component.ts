import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISubsItemDelivery, SubsItemDelivery } from 'app/shared/model/subs-item-delivery.model';
import { SubsItemDeliveryService } from './subs-item-delivery.service';
import { IEfLockerLocation } from 'app/shared/model/ef-locker-location.model';
import { EfLockerLocationService } from 'app/entities/ef-locker-location/ef-locker-location.service';
import { ICustAddress } from 'app/shared/model/cust-address.model';
import { CustAddressService } from 'app/entities/cust-address/cust-address.service';
import { ISubscriptionProduct } from 'app/shared/model/subscription-product.model';
import { SubscriptionProductService } from 'app/entities/subscription-product/subscription-product.service';

type SelectableEntity = IEfLockerLocation | ICustAddress | ISubscriptionProduct;

@Component({
  selector: 'jhi-subs-item-delivery-update',
  templateUrl: './subs-item-delivery-update.component.html'
})
export class SubsItemDeliveryUpdateComponent implements OnInit {
  isSaving = false;
  eflockerlocations: IEfLockerLocation[] = [];
  custaddresses: ICustAddress[] = [];
  subscriptionproducts: ISubscriptionProduct[] = [];

  editForm = this.fb.group({
    id: [],
    deliveryId: [null, [Validators.required]],
    deliveryStatus: [null, [Validators.required]],
    deliveryOption: [null, [Validators.required]],
    tempEfLockerCode: [],
    tempAddressId: [],
    deliveryRefCode: [],
    fileGenerationDate: [],
    fileReceivedDate: [],
    deliveryDate: [],
    remarks: [],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]],
    efLockerLocation: [],
    custAddress: [],
    subscriptionProduct: []
  });

  constructor(
    protected subsItemDeliveryService: SubsItemDeliveryService,
    protected efLockerLocationService: EfLockerLocationService,
    protected custAddressService: CustAddressService,
    protected subscriptionProductService: SubscriptionProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subsItemDelivery }) => {
      if (!subsItemDelivery.id) {
        const today = moment().startOf('day');
        subsItemDelivery.fileGenerationDate = today;
        subsItemDelivery.fileReceivedDate = today;
        subsItemDelivery.deliveryDate = today;
        subsItemDelivery.createdDate = today;
        subsItemDelivery.lastUpdatedDate = today;
      }

      this.updateForm(subsItemDelivery);

      this.efLockerLocationService
        .query({ filter: 'subsitemdelivery-is-null' })
        .pipe(
          map((res: HttpResponse<IEfLockerLocation[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEfLockerLocation[]) => {
          if (!subsItemDelivery.efLockerLocation || !subsItemDelivery.efLockerLocation.id) {
            this.eflockerlocations = resBody;
          } else {
            this.efLockerLocationService
              .find(subsItemDelivery.efLockerLocation.id)
              .pipe(
                map((subRes: HttpResponse<IEfLockerLocation>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEfLockerLocation[]) => (this.eflockerlocations = concatRes));
          }
        });

      this.custAddressService
        .query({ filter: 'subsitemdelivery-is-null' })
        .pipe(
          map((res: HttpResponse<ICustAddress[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICustAddress[]) => {
          if (!subsItemDelivery.custAddress || !subsItemDelivery.custAddress.id) {
            this.custaddresses = resBody;
          } else {
            this.custAddressService
              .find(subsItemDelivery.custAddress.id)
              .pipe(
                map((subRes: HttpResponse<ICustAddress>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICustAddress[]) => (this.custaddresses = concatRes));
          }
        });

      this.subscriptionProductService
        .query()
        .subscribe((res: HttpResponse<ISubscriptionProduct[]>) => (this.subscriptionproducts = res.body || []));
    });
  }

  updateForm(subsItemDelivery: ISubsItemDelivery): void {
    this.editForm.patchValue({
      id: subsItemDelivery.id,
      deliveryId: subsItemDelivery.deliveryId,
      deliveryStatus: subsItemDelivery.deliveryStatus,
      deliveryOption: subsItemDelivery.deliveryOption,
      tempEfLockerCode: subsItemDelivery.tempEfLockerCode,
      tempAddressId: subsItemDelivery.tempAddressId,
      deliveryRefCode: subsItemDelivery.deliveryRefCode,
      fileGenerationDate: subsItemDelivery.fileGenerationDate ? subsItemDelivery.fileGenerationDate.format(DATE_TIME_FORMAT) : null,
      fileReceivedDate: subsItemDelivery.fileReceivedDate ? subsItemDelivery.fileReceivedDate.format(DATE_TIME_FORMAT) : null,
      deliveryDate: subsItemDelivery.deliveryDate ? subsItemDelivery.deliveryDate.format(DATE_TIME_FORMAT) : null,
      remarks: subsItemDelivery.remarks,
      lockCount: subsItemDelivery.lockCount,
      createdDate: subsItemDelivery.createdDate ? subsItemDelivery.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: subsItemDelivery.createdBy,
      lastUpdatedDate: subsItemDelivery.lastUpdatedDate ? subsItemDelivery.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: subsItemDelivery.lastUpdatedBy,
      tenantId: subsItemDelivery.tenantId,
      efLockerLocation: subsItemDelivery.efLockerLocation,
      custAddress: subsItemDelivery.custAddress,
      subscriptionProduct: subsItemDelivery.subscriptionProduct
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subsItemDelivery = this.createFromForm();
    if (subsItemDelivery.id !== undefined) {
      this.subscribeToSaveResponse(this.subsItemDeliveryService.update(subsItemDelivery));
    } else {
      this.subscribeToSaveResponse(this.subsItemDeliveryService.create(subsItemDelivery));
    }
  }

  private createFromForm(): ISubsItemDelivery {
    return {
      ...new SubsItemDelivery(),
      id: this.editForm.get(['id'])!.value,
      deliveryId: this.editForm.get(['deliveryId'])!.value,
      deliveryStatus: this.editForm.get(['deliveryStatus'])!.value,
      deliveryOption: this.editForm.get(['deliveryOption'])!.value,
      tempEfLockerCode: this.editForm.get(['tempEfLockerCode'])!.value,
      tempAddressId: this.editForm.get(['tempAddressId'])!.value,
      deliveryRefCode: this.editForm.get(['deliveryRefCode'])!.value,
      fileGenerationDate: this.editForm.get(['fileGenerationDate'])!.value
        ? moment(this.editForm.get(['fileGenerationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fileReceivedDate: this.editForm.get(['fileReceivedDate'])!.value
        ? moment(this.editForm.get(['fileReceivedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      deliveryDate: this.editForm.get(['deliveryDate'])!.value
        ? moment(this.editForm.get(['deliveryDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      remarks: this.editForm.get(['remarks'])!.value,
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
      efLockerLocation: this.editForm.get(['efLockerLocation'])!.value,
      custAddress: this.editForm.get(['custAddress'])!.value,
      subscriptionProduct: this.editForm.get(['subscriptionProduct'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubsItemDelivery>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
