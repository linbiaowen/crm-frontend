import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { ResourceType } from 'app/shared/model/enumerations/resource-type.model';

export interface IResourceSpecification {
  id?: string;
  resourceSpecId?: string;
  resourceType?: ResourceType;
  serviceId?: string;
  rfs?: string;
  rfsParms?: string;
  remarks?: string;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  product?: IProduct;
}

export class ResourceSpecification implements IResourceSpecification {
  constructor(
    public id?: string,
    public resourceSpecId?: string,
    public resourceType?: ResourceType,
    public serviceId?: string,
    public rfs?: string,
    public rfsParms?: string,
    public remarks?: string,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public product?: IProduct
  ) {}
}
