import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OfferService } from 'app/entities/offer/offer.service';
import { IOffer, Offer } from 'app/shared/model/offer.model';
import { OfferType } from 'app/shared/model/enumerations/offer-type.model';

describe('Service Tests', () => {
  describe('Offer Service', () => {
    let injector: TestBed;
    let service: OfferService;
    let httpMock: HttpTestingController;
    let elemDefault: IOffer;
    let expectedResult: IOffer | IOffer[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OfferService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Offer(
        'ID',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        OfferType.BASE,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        currentDate,
        currentDate,
        false,
        false,
        false,
        false,
        false,
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        currentDate,
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
            allowedActivationStartDate: currentDate.format(DATE_TIME_FORMAT),
            allowedActivationEndDate: currentDate.format(DATE_TIME_FORMAT),
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Offer', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
            allowedActivationStartDate: currentDate.format(DATE_TIME_FORMAT),
            allowedActivationEndDate: currentDate.format(DATE_TIME_FORMAT),
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
            allowedActivationStartDate: currentDate,
            allowedActivationEndDate: currentDate,
            createdDate: currentDate,
            lastUpdatedDate: currentDate
          },
          returnedFromService
        );

        service.create(new Offer()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Offer', () => {
        const returnedFromService = Object.assign(
          {
            offerId: 'BBBBBB',
            offerExternalId: 'BBBBBB',
            offerName: 'BBBBBB',
            offerNameChi: 'BBBBBB',
            offerDesc: 'BBBBBB',
            offerDescChi: 'BBBBBB',
            offerType: 'BBBBBB',
            offerPrice: 1,
            tempCustomerSegments: 'BBBBBB',
            tempCustomerClasses: 'BBBBBB',
            tempSalesChannels: 'BBBBBB',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
            tempChildOfferIds: 'BBBBBB',
            tempProductIds: 'BBBBBB',
            tempAdvancePaymentIds: 'BBBBBB',
            tempPromoCodes: 'BBBBBB',
            tempDiscountCodes: 'BBBBBB',
            tempImageIds: 'BBBBBB',
            limitedActivationPeriod: true,
            allowedActivationStartDate: currentDate.format(DATE_TIME_FORMAT),
            allowedActivationEndDate: currentDate.format(DATE_TIME_FORMAT),
            isGroupSharingOffer: true,
            isMnpOffer: true,
            autoRenewal: true,
            transferAllowed: true,
            infoSharingAllowed: true,
            infoSharingOptions: 'BBBBBB',
            offerPeriod: 1,
            offerPeriodTerm: 'BBBBBB',
            paymentType: 'BBBBBB',
            priority: 1,
            lockCount: 1,
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            createdBy: 'BBBBBB',
            lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT),
            lastUpdatedBy: 'BBBBBB',
            tenantId: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
            allowedActivationStartDate: currentDate,
            allowedActivationEndDate: currentDate,
            createdDate: currentDate,
            lastUpdatedDate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Offer', () => {
        const returnedFromService = Object.assign(
          {
            offerId: 'BBBBBB',
            offerExternalId: 'BBBBBB',
            offerName: 'BBBBBB',
            offerNameChi: 'BBBBBB',
            offerDesc: 'BBBBBB',
            offerDescChi: 'BBBBBB',
            offerType: 'BBBBBB',
            offerPrice: 1,
            tempCustomerSegments: 'BBBBBB',
            tempCustomerClasses: 'BBBBBB',
            tempSalesChannels: 'BBBBBB',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
            tempChildOfferIds: 'BBBBBB',
            tempProductIds: 'BBBBBB',
            tempAdvancePaymentIds: 'BBBBBB',
            tempPromoCodes: 'BBBBBB',
            tempDiscountCodes: 'BBBBBB',
            tempImageIds: 'BBBBBB',
            limitedActivationPeriod: true,
            allowedActivationStartDate: currentDate.format(DATE_TIME_FORMAT),
            allowedActivationEndDate: currentDate.format(DATE_TIME_FORMAT),
            isGroupSharingOffer: true,
            isMnpOffer: true,
            autoRenewal: true,
            transferAllowed: true,
            infoSharingAllowed: true,
            infoSharingOptions: 'BBBBBB',
            offerPeriod: 1,
            offerPeriodTerm: 'BBBBBB',
            paymentType: 'BBBBBB',
            priority: 1,
            lockCount: 1,
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            createdBy: 'BBBBBB',
            lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT),
            lastUpdatedBy: 'BBBBBB',
            tenantId: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
            allowedActivationStartDate: currentDate,
            allowedActivationEndDate: currentDate,
            createdDate: currentDate,
            lastUpdatedDate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Offer', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
