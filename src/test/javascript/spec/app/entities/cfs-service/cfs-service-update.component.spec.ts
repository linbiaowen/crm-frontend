import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { CfsServiceUpdateComponent } from 'app/entities/cfs-service/cfs-service-update.component';
import { CfsServiceService } from 'app/entities/cfs-service/cfs-service.service';
import { CfsService } from 'app/shared/model/cfs-service.model';

describe('Component Tests', () => {
  describe('CfsService Management Update Component', () => {
    let comp: CfsServiceUpdateComponent;
    let fixture: ComponentFixture<CfsServiceUpdateComponent>;
    let service: CfsServiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [CfsServiceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CfsServiceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CfsServiceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CfsServiceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CfsService('123');
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
        const entity = new CfsService();
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
