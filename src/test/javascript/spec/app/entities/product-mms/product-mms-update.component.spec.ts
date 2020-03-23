import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { ProductMmsUpdateComponent } from 'app/entities/product-mms/product-mms-update.component';
import { ProductMmsService } from 'app/entities/product-mms/product-mms.service';
import { ProductMms } from 'app/shared/model/product-mms.model';

describe('Component Tests', () => {
  describe('ProductMms Management Update Component', () => {
    let comp: ProductMmsUpdateComponent;
    let fixture: ComponentFixture<ProductMmsUpdateComponent>;
    let service: ProductMmsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [ProductMmsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductMmsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductMmsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductMmsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductMms('123');
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
        const entity = new ProductMms();
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
