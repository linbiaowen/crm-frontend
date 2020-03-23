import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { OfferCustomerSegmentUpdateComponent } from 'app/entities/offer-customer-segment/offer-customer-segment-update.component';
import { OfferCustomerSegmentService } from 'app/entities/offer-customer-segment/offer-customer-segment.service';
import { OfferCustomerSegment } from 'app/shared/model/offer-customer-segment.model';

describe('Component Tests', () => {
  describe('OfferCustomerSegment Management Update Component', () => {
    let comp: OfferCustomerSegmentUpdateComponent;
    let fixture: ComponentFixture<OfferCustomerSegmentUpdateComponent>;
    let service: OfferCustomerSegmentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [OfferCustomerSegmentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OfferCustomerSegmentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OfferCustomerSegmentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OfferCustomerSegmentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OfferCustomerSegment('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new OfferCustomerSegment();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
