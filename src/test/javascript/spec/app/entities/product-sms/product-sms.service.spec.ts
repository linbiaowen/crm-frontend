import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProductSmsService } from 'app/entities/product-sms/product-sms.service';
import { IProductSms, ProductSms } from 'app/shared/model/product-sms.model';
import { SmsType } from 'app/shared/model/enumerations/sms-type.model';

describe('Service Tests', () => {
  describe('ProductSms Service', () => {
    let injector: TestBed;
    let service: ProductSmsService;
    let httpMock: HttpTestingController;
    let elemDefault: IProductSms;
    let expectedResult: IProductSms | IProductSms[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProductSmsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ProductSms(
        'ID',
        'AAAAAAA',
        0,
        'AAAAAAA',
        0,
        SmsType.LOCAL,
        false,
        0,
        0,
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

      it('should create a ProductSms', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate,
            lastUpdatedDate: currentDate
          },
          returnedFromService
        );

        service.create(new ProductSms()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProductSms', () => {
        const returnedFromService = Object.assign(
          {
            smsId: 'BBBBBB',
            productSpecId: 1,
            unit: 'BBBBBB',
            volume: 1,
            smsType: 'BBBBBB',
            roamingAllowed: true,
            minTransferQuota: 1,
            maxTransferQuota: 1,
            minRetentionQuota: 1,
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

      it('should return a list of ProductSms', () => {
        const returnedFromService = Object.assign(
          {
            smsId: 'BBBBBB',
            productSpecId: 1,
            unit: 'BBBBBB',
            volume: 1,
            smsType: 'BBBBBB',
            roamingAllowed: true,
            minTransferQuota: 1,
            maxTransferQuota: 1,
            minRetentionQuota: 1,
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

      it('should delete a ProductSms', () => {
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
