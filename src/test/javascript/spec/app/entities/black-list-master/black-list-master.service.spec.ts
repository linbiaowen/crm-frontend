import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BlackListMasterService } from 'app/entities/black-list-master/black-list-master.service';
import { IBlackListMaster, BlackListMaster } from 'app/shared/model/black-list-master.model';

describe('Service Tests', () => {
  describe('BlackListMaster Service', () => {
    let injector: TestBed;
    let service: BlackListMasterService;
    let httpMock: HttpTestingController;
    let elemDefault: IBlackListMaster;
    let expectedResult: IBlackListMaster | IBlackListMaster[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BlackListMasterService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new BlackListMaster(
        'ID',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
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

      it('should create a BlackListMaster', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
            createdDate: currentDate,
            lastUpdatedDate: currentDate
          },
          returnedFromService
        );

        service.create(new BlackListMaster()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a BlackListMaster', () => {
        const returnedFromService = Object.assign(
          {
            blackListCode: 'BBBBBB',
            blackListReason: 'BBBBBB',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
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

      it('should return a list of BlackListMaster', () => {
        const returnedFromService = Object.assign(
          {
            blackListCode: 'BBBBBB',
            blackListReason: 'BBBBBB',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
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

      it('should delete a BlackListMaster', () => {
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
