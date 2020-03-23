import { Moment } from 'moment';
import { IOfferCustomerSegment } from 'app/shared/model/offer-customer-segment.model';
import { IOfferCustomerClass } from 'app/shared/model/offer-customer-class.model';
import { IOfferSalesChannel } from 'app/shared/model/offer-sales-channel.model';
import { IProduct } from 'app/shared/model/product.model';
import { IOfferAdvancePayment } from 'app/shared/model/offer-advance-payment.model';
import { IOfferPromotion } from 'app/shared/model/offer-promotion.model';
import { IOfferDiscount } from 'app/shared/model/offer-discount.model';
import { OfferType } from 'app/shared/model/enumerations/offer-type.model';

export interface IOffer {
  id?: string;
  offerId?: string;
  offerExternalId?: string;
  offerName?: string;
  offerNameChi?: string;
  offerType?: OfferType;
  offerPrice?: number;
  tempCustomerSegments?: string;
  tempCustomerClasses?: string;
  tempSalesChannels?: string;
  startDate?: Moment;
  endDate?: Moment;
  tempChildOfferIds?: string;
  tempProductIds?: string;
  tempAdvancePaymentIds?: string;
  tempPromoCodes?: string;
  tempDiscountCodes?: string;
  limitedActivationPeriod?: boolean;
  allowedActivationStartDate?: Moment;
  allowedActivationEndDate?: Moment;
  isGroupSharingOffer?: boolean;
  isMnpOffer?: boolean;
  autoRenewal?: boolean;
  transferAllowed?: boolean;
  infoSharingAllowed?: boolean;
  infoSharingOptions?: string;
  offerPeriod?: number;
  offerPeriodTerm?: string;
  paymentType?: string;
  priority?: number;
  lockCount?: number;
  createdDate?: Moment;
  createdBy?: string;
  lastUpdatedDate?: Moment;
  lastUpdatedBy?: string;
  tenantId?: string;
  customerSegments?: IOfferCustomerSegment[];
  customerClasses?: IOfferCustomerClass[];
  salesChannels?: IOfferSalesChannel[];
  products?: IProduct[];
  offerAdvancePayments?: IOfferAdvancePayment[];
  offerPromotions?: IOfferPromotion[];
  offerDiscounts?: IOfferDiscount[];
  parentOffers?: IOffer[];
  childOffers?: IOffer[];
}

export class Offer implements IOffer {
  constructor(
    public id?: string,
    public offerId?: string,
    public offerExternalId?: string,
    public offerName?: string,
    public offerNameChi?: string,
    public offerType?: OfferType,
    public offerPrice?: number,
    public tempCustomerSegments?: string,
    public tempCustomerClasses?: string,
    public tempSalesChannels?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public tempChildOfferIds?: string,
    public tempProductIds?: string,
    public tempAdvancePaymentIds?: string,
    public tempPromoCodes?: string,
    public tempDiscountCodes?: string,
    public limitedActivationPeriod?: boolean,
    public allowedActivationStartDate?: Moment,
    public allowedActivationEndDate?: Moment,
    public isGroupSharingOffer?: boolean,
    public isMnpOffer?: boolean,
    public autoRenewal?: boolean,
    public transferAllowed?: boolean,
    public infoSharingAllowed?: boolean,
    public infoSharingOptions?: string,
    public offerPeriod?: number,
    public offerPeriodTerm?: string,
    public paymentType?: string,
    public priority?: number,
    public lockCount?: number,
    public createdDate?: Moment,
    public createdBy?: string,
    public lastUpdatedDate?: Moment,
    public lastUpdatedBy?: string,
    public tenantId?: string,
    public customerSegments?: IOfferCustomerSegment[],
    public customerClasses?: IOfferCustomerClass[],
    public salesChannels?: IOfferSalesChannel[],
    public products?: IProduct[],
    public offerAdvancePayments?: IOfferAdvancePayment[],
    public offerPromotions?: IOfferPromotion[],
    public offerDiscounts?: IOfferDiscount[],
    public parentOffers?: IOffer[],
    public childOffers?: IOffer[]
  ) {
    this.limitedActivationPeriod = this.limitedActivationPeriod || false;
    this.isGroupSharingOffer = this.isGroupSharingOffer || false;
    this.isMnpOffer = this.isMnpOffer || false;
    this.autoRenewal = this.autoRenewal || false;
    this.transferAllowed = this.transferAllowed || false;
    this.infoSharingAllowed = this.infoSharingAllowed || false;
  }
}
