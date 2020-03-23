import { IOffer } from 'app/shared/model/offer.model';

export interface IOfferSalesChannel {
  id?: string;
  salesChannel?: string;
  offer?: IOffer;
}

export class OfferSalesChannel implements IOfferSalesChannel {
  constructor(public id?: string, public salesChannel?: string, public offer?: IOffer) {}
}
