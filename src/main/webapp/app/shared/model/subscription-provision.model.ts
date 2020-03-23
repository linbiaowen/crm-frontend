import { Moment } from 'moment';
import { ISubscriptionProduct } from 'app/shared/model/subscription-product.model';

export interface ISubscriptionProvision {
  id?: string;
  provisionSeqId?: string;
  subscriptionId?: string;
  orderId?: string;
  productId?: string;
  msisdn?: string;
  iccid?: string;
  imsi?: string;
  serviceSpecId?: string;
  resourceSpecId?: string;
  rfs?: string;
  provisionStatus?: string;
  provisionStatusDesc?: string;
  provisionResponse?: string;
  startDate?: Moment;
  endDate?: Moment;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  subscriptionProduct?: ISubscriptionProduct;
}

export class SubscriptionProvision implements ISubscriptionProvision {
  constructor(
    public id?: string,
    public provisionSeqId?: string,
    public subscriptionId?: string,
    public orderId?: string,
    public productId?: string,
    public msisdn?: string,
    public iccid?: string,
    public imsi?: string,
    public serviceSpecId?: string,
    public resourceSpecId?: string,
    public rfs?: string,
    public provisionStatus?: string,
    public provisionStatusDesc?: string,
    public provisionResponse?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public subscriptionProduct?: ISubscriptionProduct
  ) {}
}
