import { IOffer } from 'app/shared/model/offer.model';

export interface IOfferCustomerSegment {
  id?: string;
  customerSegment?: string;
  offer?: IOffer;
}

export class OfferCustomerSegment implements IOfferCustomerSegment {
  constructor(public id?: string, public customerSegment?: string, public offer?: IOffer) {}
}
