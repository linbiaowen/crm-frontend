import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IProductVoice } from 'app/shared/model/product-voice.model';
import { ProductVoiceService } from 'app/entities/product-voice/product-voice.service';
import { IProductData } from 'app/shared/model/product-data.model';
import { ProductDataService } from 'app/entities/product-data/product-data.service';
import { IProductSms } from 'app/shared/model/product-sms.model';
import { ProductSmsService } from 'app/entities/product-sms/product-sms.service';
import { IProductMms } from 'app/shared/model/product-mms.model';
import { ProductMmsService } from 'app/entities/product-mms/product-mms.service';
import { ICfsService } from 'app/shared/model/cfs-service.model';
import { CfsServiceService } from 'app/entities/cfs-service/cfs-service.service';
import { IOffer } from 'app/shared/model/offer.model';
import { OfferService } from 'app/entities/offer/offer.service';

type SelectableEntity = IProductVoice | IProductData | IProductSms | IProductMms | ICfsService | IOffer;

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  productvoices: IProductVoice[] = [];
  productdata: IProductData[] = [];
  productsms: IProductSms[] = [];
  productmms: IProductMms[] = [];
  cfsservices: ICfsService[] = [];
  offers: IOffer[] = [];

  editForm = this.fb.group({
    id: [],
    productId: [null, [Validators.required]],
    productName: [null, [Validators.required]],
    productNameChi: [],
    productDesc: [],
    productDescChi: [],
    productCate: [],
    productNature: [],
    productFamily: [],
    productType: [],
    modelCode: [],
    tempServiceId: [],
    tempResourceSpecIds: [],
    productSpecType: [],
    skuType: [],
    simType: [],
    boxType: [],
    shippable: [],
    tempDeliveryOptions: [],
    tempVoiceIds: [],
    tempDataIds: [],
    tempSmsIds: [],
    tempMmsIds: [],
    tempImageIds: [],
    startDate: [],
    endDate: [],
    independentlyOrderable: [],
    networkProvisionRequired: [],
    changeEntitlementAllowed: [],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]],
    productVoice: [],
    productData: [],
    productSms: [],
    productMms: [],
    cfsService: [],
    offer: []
  });

  constructor(
    protected productService: ProductService,
    protected productVoiceService: ProductVoiceService,
    protected productDataService: ProductDataService,
    protected productSmsService: ProductSmsService,
    protected productMmsService: ProductMmsService,
    protected cfsServiceService: CfsServiceService,
    protected offerService: OfferService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      if (!product.id) {
        const today = moment().startOf('day');
        product.startDate = today;
        product.endDate = today;
        product.createdDate = today;
        product.lastUpdatedDate = today;
      }

      this.updateForm(product);

      this.productVoiceService
        .query({ filter: 'product-is-null' })
        .pipe(
          map((res: HttpResponse<IProductVoice[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProductVoice[]) => {
          if (!product.productVoice || !product.productVoice.id) {
            this.productvoices = resBody;
          } else {
            this.productVoiceService
              .find(product.productVoice.id)
              .pipe(
                map((subRes: HttpResponse<IProductVoice>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProductVoice[]) => (this.productvoices = concatRes));
          }
        });

      this.productDataService
        .query({ filter: 'product-is-null' })
        .pipe(
          map((res: HttpResponse<IProductData[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProductData[]) => {
          if (!product.productData || !product.productData.id) {
            this.productdata = resBody;
          } else {
            this.productDataService
              .find(product.productData.id)
              .pipe(
                map((subRes: HttpResponse<IProductData>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProductData[]) => (this.productdata = concatRes));
          }
        });

      this.productSmsService
        .query({ filter: 'product-is-null' })
        .pipe(
          map((res: HttpResponse<IProductSms[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProductSms[]) => {
          if (!product.productSms || !product.productSms.id) {
            this.productsms = resBody;
          } else {
            this.productSmsService
              .find(product.productSms.id)
              .pipe(
                map((subRes: HttpResponse<IProductSms>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProductSms[]) => (this.productsms = concatRes));
          }
        });

      this.productMmsService
        .query({ filter: 'product-is-null' })
        .pipe(
          map((res: HttpResponse<IProductMms[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProductMms[]) => {
          if (!product.productMms || !product.productMms.id) {
            this.productmms = resBody;
          } else {
            this.productMmsService
              .find(product.productMms.id)
              .pipe(
                map((subRes: HttpResponse<IProductMms>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProductMms[]) => (this.productmms = concatRes));
          }
        });

      this.cfsServiceService
        .query({ filter: 'product-is-null' })
        .pipe(
          map((res: HttpResponse<ICfsService[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICfsService[]) => {
          if (!product.cfsService || !product.cfsService.id) {
            this.cfsservices = resBody;
          } else {
            this.cfsServiceService
              .find(product.cfsService.id)
              .pipe(
                map((subRes: HttpResponse<ICfsService>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICfsService[]) => (this.cfsservices = concatRes));
          }
        });

      this.offerService.query().subscribe((res: HttpResponse<IOffer[]>) => (this.offers = res.body || []));
    });
  }

  updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      productId: product.productId,
      productName: product.productName,
      productNameChi: product.productNameChi,
      productDesc: product.productDesc,
      productDescChi: product.productDescChi,
      productCate: product.productCate,
      productNature: product.productNature,
      productFamily: product.productFamily,
      productType: product.productType,
      modelCode: product.modelCode,
      tempServiceId: product.tempServiceId,
      tempResourceSpecIds: product.tempResourceSpecIds,
      productSpecType: product.productSpecType,
      skuType: product.skuType,
      simType: product.simType,
      boxType: product.boxType,
      shippable: product.shippable,
      tempDeliveryOptions: product.tempDeliveryOptions,
      tempVoiceIds: product.tempVoiceIds,
      tempDataIds: product.tempDataIds,
      tempSmsIds: product.tempSmsIds,
      tempMmsIds: product.tempMmsIds,
      tempImageIds: product.tempImageIds,
      startDate: product.startDate ? product.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: product.endDate ? product.endDate.format(DATE_TIME_FORMAT) : null,
      independentlyOrderable: product.independentlyOrderable,
      networkProvisionRequired: product.networkProvisionRequired,
      changeEntitlementAllowed: product.changeEntitlementAllowed,
      lockCount: product.lockCount,
      createdDate: product.createdDate ? product.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: product.createdBy,
      lastUpdatedDate: product.lastUpdatedDate ? product.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: product.lastUpdatedBy,
      tenantId: product.tenantId,
      productVoice: product.productVoice,
      productData: product.productData,
      productSms: product.productSms,
      productMms: product.productMms,
      cfsService: product.cfsService,
      offer: product.offer
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      productId: this.editForm.get(['productId'])!.value,
      productName: this.editForm.get(['productName'])!.value,
      productNameChi: this.editForm.get(['productNameChi'])!.value,
      productDesc: this.editForm.get(['productDesc'])!.value,
      productDescChi: this.editForm.get(['productDescChi'])!.value,
      productCate: this.editForm.get(['productCate'])!.value,
      productNature: this.editForm.get(['productNature'])!.value,
      productFamily: this.editForm.get(['productFamily'])!.value,
      productType: this.editForm.get(['productType'])!.value,
      modelCode: this.editForm.get(['modelCode'])!.value,
      tempServiceId: this.editForm.get(['tempServiceId'])!.value,
      tempResourceSpecIds: this.editForm.get(['tempResourceSpecIds'])!.value,
      productSpecType: this.editForm.get(['productSpecType'])!.value,
      skuType: this.editForm.get(['skuType'])!.value,
      simType: this.editForm.get(['simType'])!.value,
      boxType: this.editForm.get(['boxType'])!.value,
      shippable: this.editForm.get(['shippable'])!.value,
      tempDeliveryOptions: this.editForm.get(['tempDeliveryOptions'])!.value,
      tempVoiceIds: this.editForm.get(['tempVoiceIds'])!.value,
      tempDataIds: this.editForm.get(['tempDataIds'])!.value,
      tempSmsIds: this.editForm.get(['tempSmsIds'])!.value,
      tempMmsIds: this.editForm.get(['tempMmsIds'])!.value,
      tempImageIds: this.editForm.get(['tempImageIds'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      independentlyOrderable: this.editForm.get(['independentlyOrderable'])!.value,
      networkProvisionRequired: this.editForm.get(['networkProvisionRequired'])!.value,
      changeEntitlementAllowed: this.editForm.get(['changeEntitlementAllowed'])!.value,
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
      productVoice: this.editForm.get(['productVoice'])!.value,
      productData: this.editForm.get(['productData'])!.value,
      productSms: this.editForm.get(['productSms'])!.value,
      productMms: this.editForm.get(['productMms'])!.value,
      cfsService: this.editForm.get(['cfsService'])!.value,
      offer: this.editForm.get(['offer'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
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
