import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';

export interface IProductVoice {
  id?: string;
  voiceId?: string;
  productId?: string;
  unit?: string;
  volume?: number;
  roamingFlag?: boolean;
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

export class ProductVoice implements IProductVoice {
  constructor(
    public id?: string,
    public voiceId?: string,
    public productId?: string,
    public unit?: string,
    public volume?: number,
    public roamingFlag?: boolean,
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
    this.roamingFlag = this.roamingFlag || false;
  }
}
