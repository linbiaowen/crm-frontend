import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { OfferCustomerClassDetailComponent } from 'app/entities/offer-customer-class/offer-customer-class-detail.component';
import { OfferCustomerClass } from 'app/shared/model/offer-customer-class.model';

describe('Component Tests', () => {
  describe('OfferCustomerClass Management Detail Component', () => {
    let comp: OfferCustomerClassDetailComponent;
    let fixture: ComponentFixture<OfferCustomerClassDetailComponent>;
    const route = ({ data: of({ offerCustomerClass: new OfferCustomerClass('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [OfferCustomerClassDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OfferCustomerClassDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OfferCustomerClassDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load offerCustomerClass on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.offerCustomerClass).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
