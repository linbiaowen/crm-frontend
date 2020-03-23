import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';

export interface ICfsService {
  id?: string;
  serviceId?: string;
  serviceName?: string;
  tempVoiceSpecIds?: string;
  tempDataSpecIds?: string;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  product?: IProduct;
}

export class CfsService implements ICfsService {
  constructor(
    public id?: string,
    public serviceId?: string,
    public serviceName?: string,
    public tempVoiceSpecIds?: string,
    public tempDataSpecIds?: string,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public product?: IProduct
  ) {}
}
