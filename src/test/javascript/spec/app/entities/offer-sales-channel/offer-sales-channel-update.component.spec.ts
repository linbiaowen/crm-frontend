import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { OfferSalesChannelUpdateComponent } from 'app/entities/offer-sales-channel/offer-sales-channel-update.component';
import { OfferSalesChannelService } from 'app/entities/offer-sales-channel/offer-sales-channel.service';
import { OfferSalesChannel } from 'app/shared/model/offer-sales-channel.model';

describe('Component Tests', () => {
  describe('OfferSalesChannel Management Update Component', () => {
    let comp: OfferSalesChannelUpdateComponent;
    let fixture: ComponentFixture<OfferSalesChannelUpdateComponent>;
    let service: OfferSalesChannelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [OfferSalesChannelUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OfferSalesChannelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OfferSalesChannelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OfferSalesChannelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OfferSalesChannel('123');
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
        const entity = new OfferSalesChannel();
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
