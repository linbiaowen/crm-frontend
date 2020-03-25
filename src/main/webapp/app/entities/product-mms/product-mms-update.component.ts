import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProductMms, ProductMms } from 'app/shared/model/product-mms.model';
import { ProductMmsService } from './product-mms.service';

@Component({
  selector: 'jhi-product-mms-update',
  templateUrl: './product-mms-update.component.html'
})
export class ProductMmsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    mmsId: [null, [Validators.required]],
    productId: [],
    unit: [null, [Validators.required]],
    volume: [null, [Validators.required]],
    mmsType: [],
    roamingAllowed: [],
    minTransferQuota: [],
    maxTransferQuota: [],
    minRetentionQuota: [],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]]
  });

  constructor(protected productMmsService: ProductMmsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productMms }) => {
      if (!productMms.id) {
        const today = moment().startOf('day');
        productMms.createdDate = today;
        productMms.lastUpdatedDate = today;
      }

      this.updateForm(productMms);
    });
  }

  updateForm(productMms: IProductMms): void {
    this.editForm.patchValue({
      id: productMms.id,
      mmsId: productMms.mmsId,
      productId: productMms.productId,
      unit: productMms.unit,
      volume: productMms.volume,
      mmsType: productMms.mmsType,
      roamingAllowed: productMms.roamingAllowed,
      minTransferQuota: productMms.minTransferQuota,
      maxTransferQuota: productMms.maxTransferQuota,
      minRetentionQuota: productMms.minRetentionQuota,
      lockCount: productMms.lockCount,
      createdDate: productMms.createdDate ? productMms.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: productMms.createdBy,
      lastUpdatedDate: productMms.lastUpdatedDate ? productMms.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: productMms.lastUpdatedBy,
      tenantId: productMms.tenantId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productMms = this.createFromForm();
    if (productMms.id !== undefined) {
      this.subscribeToSaveResponse(this.productMmsService.update(productMms));
    } else {
      this.subscribeToSaveResponse(this.productMmsService.create(productMms));
    }
  }

  private createFromForm(): IProductMms {
    return {
      ...new ProductMms(),
      id: this.editForm.get(['id'])!.value,
      mmsId: this.editForm.get(['mmsId'])!.value,
      productId: this.editForm.get(['productId'])!.value,
      unit: this.editForm.get(['unit'])!.value,
      volume: this.editForm.get(['volume'])!.value,
      mmsType: this.editForm.get(['mmsType'])!.value,
      roamingAllowed: this.editForm.get(['roamingAllowed'])!.value,
      minTransferQuota: this.editForm.get(['minTransferQuota'])!.value,
      maxTransferQuota: this.editForm.get(['maxTransferQuota'])!.value,
      minRetentionQuota: this.editForm.get(['minRetentionQuota'])!.value,
      lockCount: this.editForm.get(['lockCount'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      createdBy: this.editForm.get(['createdBy'])!.value,
      lastUpdatedDate: this.editForm.get(['lastUpdatedDate'])!.value
        ? moment(this.editForm.get(['lastUpdatedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastUpdatedBy: this.editForm.get(['lastUpdatedBy'])!.value,
      tenantId: this.editForm.get(['tenantId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductMms>>): void {
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
}
