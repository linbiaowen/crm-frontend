import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { GroupMemberUpdateComponent } from 'app/entities/group-member/group-member-update.component';
import { GroupMemberService } from 'app/entities/group-member/group-member.service';
import { GroupMember } from 'app/shared/model/group-member.model';

describe('Component Tests', () => {
  describe('GroupMember Management Update Component', () => {
    let comp: GroupMemberUpdateComponent;
    let fixture: ComponentFixture<GroupMemberUpdateComponent>;
    let service: GroupMemberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [GroupMemberUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GroupMemberUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GroupMemberUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupMemberService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GroupMember('123');
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
        const entity = new GroupMember();
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
