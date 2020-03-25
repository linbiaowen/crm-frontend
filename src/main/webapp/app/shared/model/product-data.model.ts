import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';

export interface IProductData {
  id?: string;
  dataId?: string;
  productId?: string;
  unit?: string;
  volume?: number;
  dataSlab?: string;
  dataSpeedCategory?: string;
  specicalPackType?: string;
  dataServiceType?: string;
  roamingRegions?: string;
  roamingCountries?: string;
  roamingDayPassType?: string;
  roamingPackValidPeriodType?: string;
  roamingPackPeriod?: number;
  roamingPackTerm?: string;
  minTransferQuota?: number;
  maxTransferQuota?: number;
  minRetentionQuota?: number;
  minTpTransferQuota?: number;
  maxTpTransferQuota?: number;
  minTpRetentionQuota?: number;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  product?: IProduct;
}

export class ProductData implements IProductData {
  constructor(
    public id?: string,
    public dataId?: string,
    public productId?: string,
    public unit?: string,
    public volume?: number,
    public dataSlab?: string,
    public dataSpeedCategory?: string,
    public specicalPackType?: string,
    public dataServiceType?: string,
    public roamingRegions?: string,
    public roamingCountries?: string,
    public roamingDayPassType?: string,
    public roamingPackValidPeriodType?: string,
    public roamingPackPeriod?: number,
    public roamingPackTerm?: string,
    public minTransferQuota?: number,
    public maxTransferQuota?: number,
    public minRetentionQuota?: number,
    public minTpTransferQuota?: number,
    public maxTpTransferQuota?: number,
    public minTpRetentionQuota?: number,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public product?: IProduct
  ) {}
}
