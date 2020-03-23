import { IOffer } from 'app/shared/model/offer.model';

export interface IOfferCustomerClass {
  id?: string;
  customerClass?: string;
  offer?: IOffer;
}

export class OfferCustomerClass implements IOfferCustomerClass {
  constructor(public id?: string, public customerClass?: string, public offer?: IOffer) {}
}
