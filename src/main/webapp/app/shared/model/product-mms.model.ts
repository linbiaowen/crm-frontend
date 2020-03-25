import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { MmsType } from 'app/shared/model/enumerations/mms-type.model';

export interface IProductMms {
  id?: string;
  mmsId?: string;
  productId?: string;
  unit?: string;
  volume?: number;
  mmsType?: MmsType;
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

export class ProductMms implements IProductMms {
  constructor(
    public id?: string,
    public mmsId?: string,
    public productId?: string,
    public unit?: string,
    public volume?: number,
    public mmsType?: MmsType,
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
