import { Moment } from 'moment';
import { IGroupMember } from 'app/shared/model/group-member.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { RecordStatus } from 'app/shared/model/enumerations/record-status.model';

export interface ISubscriptionGroup {
  id?: string;
  groupId?: number;
  custAcctId?: string;
  groupType?: string;
  groupName?: string;
  tempGroupMemberIds?: string;
  status?: RecordStatus;
  startDate?: Moment;
  endDate?: Moment;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  groupMembers?: IGroupMember[];
  customer?: ICustomer;
}

export class SubscriptionGroup implements ISubscriptionGroup {
  constructor(
    public id?: string,
    public groupId?: number,
    public custAcctId?: string,
    public groupType?: string,
    public groupName?: string,
    public tempGroupMemberIds?: string,
    public status?: RecordStatus,
    public startDate?: Moment,
    public endDate?: Moment,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public groupMembers?: IGroupMember[],
    public customer?: ICustomer
  ) {}
}
