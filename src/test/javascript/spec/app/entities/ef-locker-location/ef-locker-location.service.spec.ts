import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EfLockerLocationService } from 'app/entities/ef-locker-location/ef-locker-location.service';
import { IEfLockerLocation, EfLockerLocation } from 'app/shared/model/ef-locker-location.model';

describe('Service Tests', () => {
  describe('EfLockerLocation Service', () => {
    let injector: TestBed;
    let service: EfLockerLocationService;
    let httpMock: HttpTestingController;
    let elemDefault: IEfLockerLocation;
    let expectedResult: IEfLockerLocation | IEfLockerLocation[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EfLockerLocationService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new EfLockerLocation('ID', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a EfLockerLocation', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EfLockerLocation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EfLockerLocation', () => {
        const returnedFromService = Object.assign(
          {
            efLockerCode: 'BBBBBB',
            regionEng: 'BBBBBB',
            areaEng: 'BBBBBB',
            fullAddressEng: 'BBBBBB',
            regionChi: 'BBBBBB',
            areaChi: 'BBBBBB',
            fullAddressChi: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EfLockerLocation', () => {
        const returnedFromService = Object.assign(
          {
            efLockerCode: 'BBBBBB',
            regionEng: 'BBBBBB',
            areaEng: 'BBBBBB',
            fullAddressEng: 'BBBBBB',
            regionChi: 'BBBBBB',
            areaChi: 'BBBBBB',
            fullAddressChi: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a EfLockerLocation', () => {
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
