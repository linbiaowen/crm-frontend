import { Moment } from 'moment';

export interface IOfferProduct {
  id?: string;
  recSeqId?: number;
  productId?: string;
  offerId?: string;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
}

export class OfferProduct implements IOfferProduct {
  constructor(
    public id?: string,
    public recSeqId?: number,
    public productId?: string,
    public offerId?: string,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string
  ) {}
}
