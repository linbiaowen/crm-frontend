import { Moment } from 'moment';
import { ISubscriptionProvision } from 'app/shared/model/subscription-provision.model';
import { ISubsItemDelivery } from 'app/shared/model/subs-item-delivery.model';
import { ISubsOrderDetails } from 'app/shared/model/subs-order-details.model';

export interface ISubscriptionProduct {
  id?: string;
  subscriptionProductSeqId?: number;
  orderId?: string;
  subscriptionId?: string;
  productId?: string;
  productName?: string;
  deviceType?: string;
  deviceModel?: string;
  deviceSerialNbr?: string;
  imei?: string;
  productTheme?: string;
  activationDate?: Moment;
  endDate?: Moment;
  secondMsisdn?: string;
  secondImsi?: string;
  quantity?: number;
  terminationReasonCode?: string;
  offerId?: string;
  offerName?: string;
  offerType?: string;
  matrixxCatalogId?: string;
  matrixxResourceId?: string;
  matrixxObjectId?: string;
  salesChannel?: string;
  contractId?: string;
  autoRenewal?: boolean;
  autoPay?: boolean;
  remarks?: string;
  vendorProvisionInd?: boolean;
  tempProvisionSeqIds?: string;
  tempDeliveryIds?: string;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  subscriptionProvisions?: ISubscriptionProvision[];
  subsItemDeliverys?: ISubsItemDelivery[];
  subsOrderDetail?: ISubsOrderDetails;
}

export class SubscriptionProduct implements ISubscriptionProduct {
  constructor(
    public id?: string,
    public subscriptionProductSeqId?: number,
    public orderId?: string,
    public subscriptionId?: string,
    public productId?: string,
    public productName?: string,
    public deviceType?: string,
    public deviceModel?: string,
    public deviceSerialNbr?: string,
    public imei?: string,
    public productTheme?: string,
    public activationDate?: Moment,
    public endDate?: Moment,
    public secondMsisdn?: string,
    public secondImsi?: string,
    public quantity?: number,
    public terminationReasonCode?: string,
    public offerId?: string,
    public offerName?: string,
    public offerType?: string,
    public matrixxCatalogId?: string,
    public matrixxResourceId?: string,
    public matrixxObjectId?: string,
    public salesChannel?: string,
    public contractId?: string,
    public autoRenewal?: boolean,
    public autoPay?: boolean,
    public remarks?: string,
    public vendorProvisionInd?: boolean,
    public tempProvisionSeqIds?: string,
    public tempDeliveryIds?: string,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public subscriptionProvisions?: ISubscriptionProvision[],
    public subsItemDeliverys?: ISubsItemDelivery[],
    public subsOrderDetail?: ISubsOrderDetails
  ) {
    this.autoRenewal = this.autoRenewal || false;
    this.autoPay = this.autoPay || false;
    this.vendorProvisionInd = this.vendorProvisionInd || false;
  }
}
