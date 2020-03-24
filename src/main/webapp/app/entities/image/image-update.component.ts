import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IImage, Image } from 'app/shared/model/image.model';
import { ImageService } from './image.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IOffer } from 'app/shared/model/offer.model';
import { OfferService } from 'app/entities/offer/offer.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

type SelectableEntity = IOffer | IProduct;

@Component({
  selector: 'jhi-image-update',
  templateUrl: './image-update.component.html'
})
export class ImageUpdateComponent implements OnInit {
  isSaving = false;
  offers: IOffer[] = [];
  products: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    imageId: [null, [Validators.required]],
    imageType: [],
    image: [],
    imageContentType: [],
    remark: [],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]],
    offer: [],
    product: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected imageService: ImageService,
    protected offerService: OfferService,
    protected productService: ProductService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ image }) => {
      if (!image.id) {
        const today = moment().startOf('day');
        image.createdDate = today;
        image.lastUpdatedDate = today;
      }

      this.updateForm(image);

      this.offerService.query().subscribe((res: HttpResponse<IOffer[]>) => (this.offers = res.body || []));

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    });
  }

  updateForm(image: IImage): void {
    this.editForm.patchValue({
      id: image.id,
      imageId: image.imageId,
      imageType: image.imageType,
      image: image.image,
      imageContentType: image.imageContentType,
      remark: image.remark,
      lockCount: image.lockCount,
      createdDate: image.createdDate ? image.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: image.createdBy,
      lastUpdatedDate: image.lastUpdatedDate ? image.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: image.lastUpdatedBy,
      tenantId: image.tenantId,
      offer: image.offer,
      product: image.product
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('crmwebApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const image = this.createFromForm();
    if (image.id !== undefined) {
      this.subscribeToSaveResponse(this.imageService.update(image));
    } else {
      this.subscribeToSaveResponse(this.imageService.create(image));
    }
  }

  private createFromForm(): IImage {
    return {
      ...new Image(),
      id: this.editForm.get(['id'])!.value,
      imageId: this.editForm.get(['imageId'])!.value,
      imageType: this.editForm.get(['imageType'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      remark: this.editForm.get(['remark'])!.value,
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
      offer: this.editForm.get(['offer'])!.value,
      product: this.editForm.get(['product'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImage>>): void {
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
