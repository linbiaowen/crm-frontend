import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { OfferCustomerSegmentDetailComponent } from 'app/entities/offer-customer-segment/offer-customer-segment-detail.component';
import { OfferCustomerSegment } from 'app/shared/model/offer-customer-segment.model';

describe('Component Tests', () => {
  describe('OfferCustomerSegment Management Detail Component', () => {
    let comp: OfferCustomerSegmentDetailComponent;
    let fixture: ComponentFixture<OfferCustomerSegmentDetailComponent>;
    const route = ({ data: of({ offerCustomerSegment: new OfferCustomerSegment('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [OfferCustomerSegmentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OfferCustomerSegmentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OfferCustomerSegmentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load offerCustomerSegment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.offerCustomerSegment).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
