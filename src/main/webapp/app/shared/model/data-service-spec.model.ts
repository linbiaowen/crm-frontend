import { Moment } from 'moment';
import { ICfsService } from 'app/shared/model/cfs-service.model';

export interface IDataServiceSpec {
  id?: string;
  dataSpecId?: string;
  serviceId?: string;
  maxEntitlement?: string;
  maxAccessSpeed?: string;
  throttledSpeed?: string;
  upstreamSpeed?: string;
  downstreamSpeed?: string;
  socialSites?: string;
  entertainmentPackOptions?: string;
  roamingDataSpeed?: string;
  roamingDataVolume?: string;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  cfsService?: ICfsService;
}

export class DataServiceSpec implements IDataServiceSpec {
  constructor(
    public id?: string,
    public dataSpecId?: string,
    public serviceId?: string,
    public maxEntitlement?: string,
    public maxAccessSpeed?: string,
    public throttledSpeed?: string,
    public upstreamSpeed?: string,
    public downstreamSpeed?: string,
    public socialSites?: string,
    public entertainmentPackOptions?: string,
    public roamingDataSpeed?: string,
    public roamingDataVolume?: string,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public cfsService?: ICfsService
  ) {}
}
