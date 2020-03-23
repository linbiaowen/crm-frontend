import { Moment } from 'moment';
import { ICustDocument } from 'app/shared/model/cust-document.model';
import { ICustCommOptoutMaster } from 'app/shared/model/cust-comm-optout-master.model';
import { ISubscriptionDetails } from 'app/shared/model/subscription-details.model';
import { ISupremeMaster } from 'app/shared/model/supreme-master.model';
import { ICustContact } from 'app/shared/model/cust-contact.model';
import { ICustAddress } from 'app/shared/model/cust-address.model';
import { IOrderMaster } from 'app/shared/model/order-master.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { SubscriptionStatus } from 'app/shared/model/enumerations/subscription-status.model';

export interface ICustSubscription {
  id?: string;
  subscriptionId?: string;
  activationDate?: Moment;
  subsEndDate?: Moment;
  subsPurchaseDate?: Moment;
  origServiceStartDate?: Moment;
  status?: SubscriptionStatus;
  primarySubsInd?: boolean;
  subsLastStatusCode?: string;
  lastStatusUpdatedDate?: Moment;
  custAcctId?: string;
  billingAcctId?: string;
  billCycleId?: number;
  orderId?: string;
  matrixxObjectId?: string;
  subscriberName?: string;
  subsDeptName?: string;
  selfCarePassword?: string;
  subsCategory?: string;
  tempSubsDetailIds?: string;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  custDocuments?: ICustDocument[];
  custCommOptouts?: ICustCommOptoutMaster[];
  subscriptionDetails?: ISubscriptionDetails[];
  supremeMasters?: ISupremeMaster[];
  custContacts?: ICustContact[];
  custAddresses?: ICustAddress[];
  orderMasters?: IOrderMaster[];
  customer?: ICustomer;
}

export class CustSubscription implements ICustSubscription {
  constructor(
    public id?: string,
    public subscriptionId?: string,
    public activationDate?: Moment,
    public subsEndDate?: Moment,
    public subsPurchaseDate?: Moment,
    public origServiceStartDate?: Moment,
    public status?: SubscriptionStatus,
    public primarySubsInd?: boolean,
    public subsLastStatusCode?: string,
    public lastStatusUpdatedDate?: Moment,
    public custAcctId?: string,
    public billingAcctId?: string,
    public billCycleId?: number,
    public orderId?: string,
    public matrixxObjectId?: string,
    public subscriberName?: string,
    public subsDeptName?: string,
    public selfCarePassword?: string,
    public subsCategory?: string,
    public tempSubsDetailIds?: string,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public custDocuments?: ICustDocument[],
    public custCommOptouts?: ICustCommOptoutMaster[],
    public subscriptionDetails?: ISubscriptionDetails[],
    public supremeMasters?: ISupremeMaster[],
    public custContacts?: ICustContact[],
    public custAddresses?: ICustAddress[],
    public orderMasters?: IOrderMaster[],
    public customer?: ICustomer
  ) {
    this.primarySubsInd = this.primarySubsInd || false;
  }
}
