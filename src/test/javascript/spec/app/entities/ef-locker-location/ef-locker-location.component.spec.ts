import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { CrmwebTestModule } from '../../../test.module';
import { EfLockerLocationComponent } from 'app/entities/ef-locker-location/ef-locker-location.component';
import { EfLockerLocationService } from 'app/entities/ef-locker-location/ef-locker-location.service';
import { EfLockerLocation } from 'app/shared/model/ef-locker-location.model';

describe('Component Tests', () => {
  describe('EfLockerLocation Management Component', () => {
    let comp: EfLockerLocationComponent;
    let fixture: ComponentFixture<EfLockerLocationComponent>;
    let service: EfLockerLocationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [EfLockerLocationComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(EfLockerLocationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EfLockerLocationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EfLockerLocationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EfLockerLocation('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.efLockerLocations && comp.efLockerLocations[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EfLockerLocation('123')],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.efLockerLocations && comp.efLockerLocations[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
