import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISubscriptionProduct, SubscriptionProduct } from 'app/shared/model/subscription-product.model';
import { SubscriptionProductService } from './subscription-product.service';
import { ISubsOrderDetails } from 'app/shared/model/subs-order-details.model';
import { SubsOrderDetailsService } from 'app/entities/subs-order-details/subs-order-details.service';

@Component({
  selector: 'jhi-subscription-product-update',
  templateUrl: './subscription-product-update.component.html'
})
export class SubscriptionProductUpdateComponent implements OnInit {
  isSaving = false;
  subsorderdetails: ISubsOrderDetails[] = [];

  editForm = this.fb.group({
    id: [],
    subscriptionProductSeqId: [null, [Validators.required]],
    orderId: [null, [Validators.required]],
    subscriptionId: [null, [Validators.required]],
    productId: [null, [Validators.required]],
    productName: [],
    deviceType: [],
    deviceModel: [],
    deviceSerialNbr: [],
    imei: [],
    productTheme: [],
    activationDate: [],
    endDate: [],
    secondMsisdn: [],
    secondImsi: [],
    quantity: [],
    terminationReasonCode: [],
    offerId: [null, [Validators.required]],
    offerName: [],
    offerType: [],
    matrixxCatalogId: [],
    matrixxResourceId: [],
    matrixxObjectId: [],
    salesChannel: [],
    contractId: [],
    autoRenewal: [],
    autoPay: [],
    remarks: [],
    vendorProvisionInd: [],
    tempProvisionSeqIds: [],
    tempDeliveryIds: [],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]],
    subsOrderDetail: []
  });

  constructor(
    protected subscriptionProductService: SubscriptionProductService,
    protected subsOrderDetailsService: SubsOrderDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptionProduct }) => {
      if (!subscriptionProduct.id) {
        const today = moment().startOf('day');
        subscriptionProduct.activationDate = today;
        subscriptionProduct.endDate = today;
        subscriptionProduct.createdDate = today;
        subscriptionProduct.lastUpdatedDate = today;
      }

      this.updateForm(subscriptionProduct);

      this.subsOrderDetailsService.query().subscribe((res: HttpResponse<ISubsOrderDetails[]>) => (this.subsorderdetails = res.body || []));
    });
  }

  updateForm(subscriptionProduct: ISubscriptionProduct): void {
    this.editForm.patchValue({
      id: subscriptionProduct.id,
      subscriptionProductSeqId: subscriptionProduct.subscriptionProductSeqId,
      orderId: subscriptionProduct.orderId,
      subscriptionId: subscriptionProduct.subscriptionId,
      productId: subscriptionProduct.productId,
      productName: subscriptionProduct.productName,
      deviceType: subscriptionProduct.deviceType,
      deviceModel: subscriptionProduct.deviceModel,
      deviceSerialNbr: subscriptionProduct.deviceSerialNbr,
      imei: subscriptionProduct.imei,
      productTheme: subscriptionProduct.productTheme,
      activationDate: subscriptionProduct.activationDate ? subscriptionProduct.activationDate.format(DATE_TIME_FORMAT) : null,
      endDate: subscriptionProduct.endDate ? subscriptionProduct.endDate.format(DATE_TIME_FORMAT) : null,
      secondMsisdn: subscriptionProduct.secondMsisdn,
      secondImsi: subscriptionProduct.secondImsi,
      quantity: subscriptionProduct.quantity,
      terminationReasonCode: subscriptionProduct.terminationReasonCode,
      offerId: subscriptionProduct.offerId,
      offerName: subscriptionProduct.offerName,
      offerType: subscriptionProduct.offerType,
      matrixxCatalogId: subscriptionProduct.matrixxCatalogId,
      matrixxResourceId: subscriptionProduct.matrixxResourceId,
      matrixxObjectId: subscriptionProduct.matrixxObjectId,
      salesChannel: subscriptionProduct.salesChannel,
      contractId: subscriptionProduct.contractId,
      autoRenewal: subscriptionProduct.autoRenewal,
      autoPay: subscriptionProduct.autoPay,
      remarks: subscriptionProduct.remarks,
      vendorProvisionInd: subscriptionProduct.vendorProvisionInd,
      tempProvisionSeqIds: subscriptionProduct.tempProvisionSeqIds,
      tempDeliveryIds: subscriptionProduct.tempDeliveryIds,
      lockCount: subscriptionProduct.lockCount,
      createdDate: subscriptionProduct.createdDate ? subscriptionProduct.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: subscriptionProduct.createdBy,
      lastUpdatedDate: subscriptionProduct.lastUpdatedDate ? subscriptionProduct.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: subscriptionProduct.lastUpdatedBy,
      tenantId: subscriptionProduct.tenantId,
      subsOrderDetail: subscriptionProduct.subsOrderDetail
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subscriptionProduct = this.createFromForm();
    if (subscriptionProduct.id !== undefined) {
      this.subscribeToSaveResponse(this.subscriptionProductService.update(subscriptionProduct));
    } else {
      this.subscribeToSaveResponse(this.subscriptionProductService.create(subscriptionProduct));
    }
  }

  private createFromForm(): ISubscriptionProduct {
    return {
      ...new SubscriptionProduct(),
      id: this.editForm.get(['id'])!.value,
      subscriptionProductSeqId: this.editForm.get(['subscriptionProductSeqId'])!.value,
      orderId: this.editForm.get(['orderId'])!.value,
      subscriptionId: this.editForm.get(['subscriptionId'])!.value,
      productId: this.editForm.get(['productId'])!.value,
      productName: this.editForm.get(['productName'])!.value,
      deviceType: this.editForm.get(['deviceType'])!.value,
      deviceModel: this.editForm.get(['deviceModel'])!.value,
      deviceSerialNbr: this.editForm.get(['deviceSerialNbr'])!.value,
      imei: this.editForm.get(['imei'])!.value,
      productTheme: this.editForm.get(['productTheme'])!.value,
      activationDate: this.editForm.get(['activationDate'])!.value
        ? moment(this.editForm.get(['activationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      secondMsisdn: this.editForm.get(['secondMsisdn'])!.value,
      secondImsi: this.editForm.get(['secondImsi'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      terminationReasonCode: this.editForm.get(['terminationReasonCode'])!.value,
      offerId: this.editForm.get(['offerId'])!.value,
      offerName: this.editForm.get(['offerName'])!.value,
      offerType: this.editForm.get(['offerType'])!.value,
      matrixxCatalogId: this.editForm.get(['matrixxCatalogId'])!.value,
      matrixxResourceId: this.editForm.get(['matrixxResourceId'])!.value,
      matrixxObjectId: this.editForm.get(['matrixxObjectId'])!.value,
      salesChannel: this.editForm.get(['salesChannel'])!.value,
      contractId: this.editForm.get(['contractId'])!.value,
      autoRenewal: this.editForm.get(['autoRenewal'])!.value,
      autoPay: this.editForm.get(['autoPay'])!.value,
      remarks: this.editForm.get(['remarks'])!.value,
      vendorProvisionInd: this.editForm.get(['vendorProvisionInd'])!.value,
      tempProvisionSeqIds: this.editForm.get(['tempProvisionSeqIds'])!.value,
      tempDeliveryIds: this.editForm.get(['tempDeliveryIds'])!.value,
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
      subsOrderDetail: this.editForm.get(['subsOrderDetail'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscriptionProduct>>): void {
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

  trackById(index: number, item: ISubsOrderDetails): any {
    return item.id;
  }
}
