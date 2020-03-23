import { Moment } from 'moment';

export interface IGroupEndReason {
  id?: string;
  endReasonCode?: string;
  endReason?: string;
  startDate?: Moment;
  endDate?: Moment;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
}

export class GroupEndReason implements IGroupEndReason {
  constructor(
    public id?: string,
    public endReasonCode?: string,
    public endReason?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string
  ) {}
}
