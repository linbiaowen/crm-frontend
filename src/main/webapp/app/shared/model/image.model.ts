import { Moment } from 'moment';
import { IOffer } from 'app/shared/model/offer.model';
import { IProduct } from 'app/shared/model/product.model';
import { ImageType } from 'app/shared/model/enumerations/image-type.model';

export interface IImage {
  id?: string;
  imageId?: number;
  imageType?: ImageType;
  displaySeq?: number;
  imageContentType?: string;
  image?: any;
  remark?: string;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  offer?: IOffer;
  product?: IProduct;
}

export class Image implements IImage {
  constructor(
    public id?: string,
    public imageId?: number,
    public imageType?: ImageType,
    public displaySeq?: number,
    public imageContentType?: string,
    public image?: any,
    public remark?: string,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public offer?: IOffer,
    public product?: IProduct
  ) {}
}
