import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { EfLockerLocationUpdateComponent } from 'app/entities/ef-locker-location/ef-locker-location-update.component';
import { EfLockerLocationService } from 'app/entities/ef-locker-location/ef-locker-location.service';
import { EfLockerLocation } from 'app/shared/model/ef-locker-location.model';

describe('Component Tests', () => {
  describe('EfLockerLocation Management Update Component', () => {
    let comp: EfLockerLocationUpdateComponent;
    let fixture: ComponentFixture<EfLockerLocationUpdateComponent>;
    let service: EfLockerLocationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [EfLockerLocationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EfLockerLocationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EfLockerLocationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EfLockerLocationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EfLockerLocation('123');
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
        const entity = new EfLockerLocation();
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
