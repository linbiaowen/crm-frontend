import { Moment } from 'moment';
import { IEfLockerLocation } from 'app/shared/model/ef-locker-location.model';
import { ICustAddress } from 'app/shared/model/cust-address.model';
import { ISubscriptionProduct } from 'app/shared/model/subscription-product.model';
import { DeliverOptions } from 'app/shared/model/enumerations/deliver-options.model';

export interface ISubsItemDelivery {
  id?: string;
  deliveryId?: number;
  deliveryStatus?: string;
  deliveryOption?: DeliverOptions;
  tempEfLockerCode?: string;
  tempAddressId?: string;
  deliveryRefCode?: string;
  fileGenerationDate?: Moment;
  fileReceivedDate?: Moment;
  deliveryDate?: Moment;
  remarks?: string;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  efLockerLocation?: IEfLockerLocation;
  custAddress?: ICustAddress;
  subscriptionProduct?: ISubscriptionProduct;
}

export class SubsItemDelivery implements ISubsItemDelivery {
  constructor(
    public id?: string,
    public deliveryId?: number,
    public deliveryStatus?: string,
    public deliveryOption?: DeliverOptions,
    public tempEfLockerCode?: string,
    public tempAddressId?: string,
    public deliveryRefCode?: string,
    public fileGenerationDate?: Moment,
    public fileReceivedDate?: Moment,
    public deliveryDate?: Moment,
    public remarks?: string,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public efLockerLocation?: IEfLockerLocation,
    public custAddress?: ICustAddress,
    public subscriptionProduct?: ISubscriptionProduct
  ) {}
}
