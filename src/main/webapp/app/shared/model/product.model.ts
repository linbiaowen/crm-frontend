import { Moment } from 'moment';
import { IProductVoice } from 'app/shared/model/product-voice.model';
import { IProductData } from 'app/shared/model/product-data.model';
import { IProductSms } from 'app/shared/model/product-sms.model';
import { IProductMms } from 'app/shared/model/product-mms.model';
import { ICfsService } from 'app/shared/model/cfs-service.model';
import { IDeliveryOption } from 'app/shared/model/delivery-option.model';
import { IResourceSpecification } from 'app/shared/model/resource-specification.model';
import { IImage } from 'app/shared/model/image.model';
import { IOffer } from 'app/shared/model/offer.model';
import { ProductCate } from 'app/shared/model/enumerations/product-cate.model';
import { ProductNature } from 'app/shared/model/enumerations/product-nature.model';
import { ProductFamily } from 'app/shared/model/enumerations/product-family.model';
import { ProductType } from 'app/shared/model/enumerations/product-type.model';
import { ProductSpecType } from 'app/shared/model/enumerations/product-spec-type.model';
import { SkuType } from 'app/shared/model/enumerations/sku-type.model';
import { SimType } from 'app/shared/model/enumerations/sim-type.model';
import { BoxType } from 'app/shared/model/enumerations/box-type.model';

export interface IProduct {
  id?: string;
  productId?: string;
  productName?: string;
  productNameChi?: string;
  productDesc?: string;
  productDescChi?: string;
  productCate?: ProductCate;
  productNature?: ProductNature;
  productFamily?: ProductFamily;
  productType?: ProductType;
  modelCode?: string;
  tempServiceId?: string;
  tempResourceSpecIds?: string;
  productSpecType?: ProductSpecType;
  skuType?: SkuType;
  simType?: SimType;
  boxType?: BoxType;
  shippable?: boolean;
  tempDeliveryOptions?: string;
  tempVoiceIds?: string;
  tempDataIds?: string;
  tempSmsIds?: string;
  tempMmsIds?: string;
  tempImageIds?: string;
  startDate?: Moment;
  endDate?: Moment;
  independentlyOrderable?: boolean;
  networkProvisionRequired?: boolean;
  changeEntitlementAllowed?: boolean;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  productVoice?: IProductVoice;
  productData?: IProductData;
  productSms?: IProductSms;
  productMms?: IProductMms;
  cfsService?: ICfsService;
  deliveryOptions?: IDeliveryOption[];
  resourceSpecifications?: IResourceSpecification[];
  images?: IImage[];
  offer?: IOffer;
}

export class Product implements IProduct {
  constructor(
    public id?: string,
    public productId?: string,
    public productName?: string,
    public productNameChi?: string,
    public productDesc?: string,
    public productDescChi?: string,
    public productCate?: ProductCate,
    public productNature?: ProductNature,
    public productFamily?: ProductFamily,
    public productType?: ProductType,
    public modelCode?: string,
    public tempServiceId?: string,
    public tempResourceSpecIds?: string,
    public productSpecType?: ProductSpecType,
    public skuType?: SkuType,
    public simType?: SimType,
    public boxType?: BoxType,
    public shippable?: boolean,
    public tempDeliveryOptions?: string,
    public tempVoiceIds?: string,
    public tempDataIds?: string,
    public tempSmsIds?: string,
    public tempMmsIds?: string,
    public tempImageIds?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public independentlyOrderable?: boolean,
    public networkProvisionRequired?: boolean,
    public changeEntitlementAllowed?: boolean,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public productVoice?: IProductVoice,
    public productData?: IProductData,
    public productSms?: IProductSms,
    public productMms?: IProductMms,
    public cfsService?: ICfsService,
    public deliveryOptions?: IDeliveryOption[],
    public resourceSpecifications?: IResourceSpecification[],
    public images?: IImage[],
    public offer?: IOffer
  ) {
    this.shippable = this.shippable || false;
    this.independentlyOrderable = this.independentlyOrderable || false;
    this.networkProvisionRequired = this.networkProvisionRequired || false;
    this.changeEntitlementAllowed = this.changeEntitlementAllowed || false;
  }
}
