import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { SmsType } from 'app/shared/model/enumerations/sms-type.model';

export interface IProductSms {
  id?: string;
  smsId?: string;
  productId?: string;
  unit?: string;
  volume?: number;
  smsType?: SmsType;
  roamingAllowed?: boolean;
  minTransferQuota?: number;
  maxTransferQuota?: number;
  minRetentionQuota?: number;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  product?: IProduct;
}

export class ProductSms implements IProductSms {
  constructor(
    public id?: string,
    public smsId?: string,
    public productId?: string,
    public unit?: string,
    public volume?: number,
    public smsType?: SmsType,
    public roamingAllowed?: boolean,
    public minTransferQuota?: number,
    public maxTransferQuota?: number,
    public minRetentionQuota?: number,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public product?: IProduct
  ) {
    this.roamingAllowed = this.roamingAllowed || false;
  }
}
