import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDeliveryOption, DeliveryOption } from 'app/shared/model/delivery-option.model';
import { DeliveryOptionService } from './delivery-option.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-delivery-option-update',
  templateUrl: './delivery-option-update.component.html'
})
export class DeliveryOptionUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    deliveryOption: [],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]],
    product: []
  });

  constructor(
    protected deliveryOptionService: DeliveryOptionService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryOption }) => {
      if (!deliveryOption.id) {
        const today = moment().startOf('day');
        deliveryOption.createdDate = today;
        deliveryOption.lastUpdatedDate = today;
      }

      this.updateForm(deliveryOption);

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    });
  }

  updateForm(deliveryOption: IDeliveryOption): void {
    this.editForm.patchValue({
      id: deliveryOption.id,
      deliveryOption: deliveryOption.deliveryOption,
      lockCount: deliveryOption.lockCount,
      createdDate: deliveryOption.createdDate ? deliveryOption.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: deliveryOption.createdBy,
      lastUpdatedDate: deliveryOption.lastUpdatedDate ? deliveryOption.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: deliveryOption.lastUpdatedBy,
      tenantId: deliveryOption.tenantId,
      product: deliveryOption.product
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliveryOption = this.createFromForm();
    if (deliveryOption.id !== undefined) {
      this.subscribeToSaveResponse(this.deliveryOptionService.update(deliveryOption));
    } else {
      this.subscribeToSaveResponse(this.deliveryOptionService.create(deliveryOption));
    }
  }

  private createFromForm(): IDeliveryOption {
    return {
      ...new DeliveryOption(),
      id: this.editForm.get(['id'])!.value,
      deliveryOption: this.editForm.get(['deliveryOption'])!.value,
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
      product: this.editForm.get(['product'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryOption>>): void {
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

  trackById(index: number, item: IProduct): any {
    return item.id;
  }
}
