import { Moment } from 'moment';
import { ISubscriptionProduct } from 'app/shared/model/subscription-product.model';
import { IOrderMaster } from 'app/shared/model/order-master.model';
import { Language } from 'app/shared/model/enumerations/language.model';
import { ServiceType } from 'app/shared/model/enumerations/service-type.model';

export interface ISubsOrderDetails {
  id?: string;
  subsOrderDetailSeqId?: number;
  subscriptionId?: string;
  startDate?: Moment;
  endDate?: Moment;
  orderId?: string;
  ssaNbr?: string;
  primaryMsisdn?: string;
  iccid?: string;
  imsi?: string;
  simVerified?: boolean;
  simVerifiedDate?: Moment;
  billingAcctId?: string;
  billCycleId?: number;
  mnpRequestedDate?: Moment;
  mnpTicket?: string;
  mnpPortInSession?: string;
  mnpOriginalId?: string;
  mnpCustName?: string;
  mnpIdNbr?: string;
  mnpIdType?: string;
  hthkMsisdn?: boolean;
  lang?: Language;
  offerId?: string;
  offerName?: string;
  matrixxCatalogId?: string;
  matrixxResourceId?: string;
  matrixxObjectId?: string;
  tempSubscriptionProductSeqIds?: string;
  salesChannel?: string;
  advancePaymentMonths?: number;
  offerPrice?: number;
  networkType?: string;
  servicetype?: ServiceType;
  offerPlanCode?: string;
  serviceInPerson?: string;
  fcmToken?: string;
  remarks?: string;
  cdVersion?: string;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  subscriptionProducts?: ISubscriptionProduct[];
  orderMaster?: IOrderMaster;
}

export class SubsOrderDetails implements ISubsOrderDetails {
  constructor(
    public id?: string,
    public subsOrderDetailSeqId?: number,
    public subscriptionId?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public orderId?: string,
    public ssaNbr?: string,
    public primaryMsisdn?: string,
    public iccid?: string,
    public imsi?: string,
    public simVerified?: boolean,
    public simVerifiedDate?: Moment,
    public billingAcctId?: string,
    public billCycleId?: number,
    public mnpRequestedDate?: Moment,
    public mnpTicket?: string,
    public mnpPortInSession?: string,
    public mnpOriginalId?: string,
    public mnpCustName?: string,
    public mnpIdNbr?: string,
    public mnpIdType?: string,
    public hthkMsisdn?: boolean,
    public lang?: Language,
    public offerId?: string,
    public offerName?: string,
    public matrixxCatalogId?: string,
    public matrixxResourceId?: string,
    public matrixxObjectId?: string,
    public tempSubscriptionProductSeqIds?: string,
    public salesChannel?: string,
    public advancePaymentMonths?: number,
    public offerPrice?: number,
    public networkType?: string,
    public servicetype?: ServiceType,
    public offerPlanCode?: string,
    public serviceInPerson?: string,
    public fcmToken?: string,
    public remarks?: string,
    public cdVersion?: string,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public subscriptionProducts?: ISubscriptionProduct[],
    public orderMaster?: IOrderMaster
  ) {
    this.simVerified = this.simVerified || false;
    this.hthkMsisdn = this.hthkMsisdn || false;
  }
}
