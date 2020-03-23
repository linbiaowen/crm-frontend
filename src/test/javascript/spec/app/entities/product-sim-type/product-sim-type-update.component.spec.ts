import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { ProductSimTypeUpdateComponent } from 'app/entities/product-sim-type/product-sim-type-update.component';
import { ProductSimTypeService } from 'app/entities/product-sim-type/product-sim-type.service';
import { ProductSimType } from 'app/shared/model/product-sim-type.model';

describe('Component Tests', () => {
  describe('ProductSimType Management Update Component', () => {
    let comp: ProductSimTypeUpdateComponent;
    let fixture: ComponentFixture<ProductSimTypeUpdateComponent>;
    let service: ProductSimTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [ProductSimTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductSimTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductSimTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductSimTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductSimType('123');
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
        const entity = new ProductSimType();
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
