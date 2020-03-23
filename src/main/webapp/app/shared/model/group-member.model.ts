import { Moment } from 'moment';
import { ISubscriptionGroup } from 'app/shared/model/subscription-group.model';
import { GroupRole } from 'app/shared/model/enumerations/group-role.model';

export interface IGroupMember {
  id?: string;
  groupMemberId?: number;
  groupId?: number;
  msisdn?: string;
  groupRole?: GroupRole;
  endReasonCode?: string;
  remarks?: string;
  startDate?: Moment;
  endDate?: Moment;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  subscriptionGroup?: ISubscriptionGroup;
}

export class GroupMember implements IGroupMember {
  constructor(
    public id?: string,
    public groupMemberId?: number,
    public groupId?: number,
    public msisdn?: string,
    public groupRole?: GroupRole,
    public endReasonCode?: string,
    public remarks?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public subscriptionGroup?: ISubscriptionGroup
  ) {}
}
