import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProductSimType, ProductSimType } from 'app/shared/model/product-sim-type.model';
import { ProductSimTypeService } from './product-sim-type.service';

@Component({
  selector: 'jhi-product-sim-type-update',
  templateUrl: './product-sim-type-update.component.html'
})
export class ProductSimTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    simType: [null, [Validators.required]],
    imsiRangeFrom: [],
    imsiRangeTo: [],
    simRepositoryRef: [],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]]
  });

  constructor(protected productSimTypeService: ProductSimTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productSimType }) => {
      if (!productSimType.id) {
        const today = moment().startOf('day');
        productSimType.createdDate = today;
        productSimType.lastUpdatedDate = today;
      }

      this.updateForm(productSimType);
    });
  }

  updateForm(productSimType: IProductSimType): void {
    this.editForm.patchValue({
      id: productSimType.id,
      simType: productSimType.simType,
      imsiRangeFrom: productSimType.imsiRangeFrom,
      imsiRangeTo: productSimType.imsiRangeTo,
      simRepositoryRef: productSimType.simRepositoryRef,
      lockCount: productSimType.lockCount,
      createdDate: productSimType.createdDate ? productSimType.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: productSimType.createdBy,
      lastUpdatedDate: productSimType.lastUpdatedDate ? productSimType.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: productSimType.lastUpdatedBy,
      tenantId: productSimType.tenantId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productSimType = this.createFromForm();
    if (productSimType.id !== undefined) {
      this.subscribeToSaveResponse(this.productSimTypeService.update(productSimType));
    } else {
      this.subscribeToSaveResponse(this.productSimTypeService.create(productSimType));
    }
  }

  private createFromForm(): IProductSimType {
    return {
      ...new ProductSimType(),
      id: this.editForm.get(['id'])!.value,
      simType: this.editForm.get(['simType'])!.value,
      imsiRangeFrom: this.editForm.get(['imsiRangeFrom'])!.value,
      imsiRangeTo: this.editForm.get(['imsiRangeTo'])!.value,
      simRepositoryRef: this.editForm.get(['simRepositoryRef'])!.value,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductSimType>>): void {
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
