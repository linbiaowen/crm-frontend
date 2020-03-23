import { Moment } from 'moment';

export interface IBlackListMaster {
  id?: string;
  blackListCode?: string;
  blackListReason?: string;
  startDate?: Moment;
  endDate?: Moment;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
}

export class BlackListMaster implements IBlackListMaster {
  constructor(
    public id?: string,
    public blackListCode?: string,
    public blackListReason?: string,
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
