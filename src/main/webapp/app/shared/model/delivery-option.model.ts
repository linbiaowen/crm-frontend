import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { DeliverOptions } from 'app/shared/model/enumerations/deliver-options.model';

export interface IDeliveryOption {
  id?: string;
  deliveryOption?: DeliverOptions;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  product?: IProduct;
}

export class DeliveryOption implements IDeliveryOption {
  constructor(
    public id?: string,
    public deliveryOption?: DeliverOptions,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public product?: IProduct
  ) {}
}
