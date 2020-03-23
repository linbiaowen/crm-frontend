import { Moment } from 'moment';

export interface IOrderProcessConfig {
  id?: string;
  orderType?: string;
  subOrderType?: string;
  orderNature?: string;
  processName?: string;
  childProcessName?: string;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
}

export class OrderProcessConfig implements IOrderProcessConfig {
  constructor(
    public id?: string,
    public orderType?: string,
    public subOrderType?: string,
    public orderNature?: string,
    public processName?: string,
    public childProcessName?: string,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string
  ) {}
}
