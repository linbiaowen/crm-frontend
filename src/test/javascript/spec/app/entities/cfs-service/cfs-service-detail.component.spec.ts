import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { CfsServiceDetailComponent } from 'app/entities/cfs-service/cfs-service-detail.component';
import { CfsService } from 'app/shared/model/cfs-service.model';

describe('Component Tests', () => {
  describe('CfsService Management Detail Component', () => {
    let comp: CfsServiceDetailComponent;
    let fixture: ComponentFixture<CfsServiceDetailComponent>;
    const route = ({ data: of({ cfsService: new CfsService('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [CfsServiceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CfsServiceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CfsServiceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cfsService on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cfsService).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
