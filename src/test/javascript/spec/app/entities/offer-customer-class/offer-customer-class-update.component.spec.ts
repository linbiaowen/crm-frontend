import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { OfferCustomerClassUpdateComponent } from 'app/entities/offer-customer-class/offer-customer-class-update.component';
import { OfferCustomerClassService } from 'app/entities/offer-customer-class/offer-customer-class.service';
import { OfferCustomerClass } from 'app/shared/model/offer-customer-class.model';

describe('Component Tests', () => {
  describe('OfferCustomerClass Management Update Component', () => {
    let comp: OfferCustomerClassUpdateComponent;
    let fixture: ComponentFixture<OfferCustomerClassUpdateComponent>;
    let service: OfferCustomerClassService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [OfferCustomerClassUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OfferCustomerClassUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OfferCustomerClassUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OfferCustomerClassService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OfferCustomerClass('123');
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
        const entity = new OfferCustomerClass();
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
