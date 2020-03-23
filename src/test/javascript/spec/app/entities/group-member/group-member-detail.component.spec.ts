import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { GroupMemberDetailComponent } from 'app/entities/group-member/group-member-detail.component';
import { GroupMember } from 'app/shared/model/group-member.model';

describe('Component Tests', () => {
  describe('GroupMember Management Detail Component', () => {
    let comp: GroupMemberDetailComponent;
    let fixture: ComponentFixture<GroupMemberDetailComponent>;
    const route = ({ data: of({ groupMember: new GroupMember('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [GroupMemberDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GroupMemberDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GroupMemberDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load groupMember on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.groupMember).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
