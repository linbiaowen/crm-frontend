import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { EfLockerLocationDetailComponent } from 'app/entities/ef-locker-location/ef-locker-location-detail.component';
import { EfLockerLocation } from 'app/shared/model/ef-locker-location.model';

describe('Component Tests', () => {
  describe('EfLockerLocation Management Detail Component', () => {
    let comp: EfLockerLocationDetailComponent;
    let fixture: ComponentFixture<EfLockerLocationDetailComponent>;
    const route = ({ data: of({ efLockerLocation: new EfLockerLocation('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [EfLockerLocationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EfLockerLocationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EfLockerLocationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load efLockerLocation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.efLockerLocation).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
