import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGroupMember, GroupMember } from 'app/shared/model/group-member.model';
import { GroupMemberService } from './group-member.service';
import { GroupMemberComponent } from './group-member.component';
import { GroupMemberDetailComponent } from './group-member-detail.component';
import { GroupMemberUpdateComponent } from './group-member-update.component';

@Injectable({ providedIn: 'root' })
export class GroupMemberResolve implements Resolve<IGroupMember> {
  constructor(private service: GroupMemberService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGroupMember> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((groupMember: HttpResponse<GroupMember>) => {
          if (groupMember.body) {
            return of(groupMember.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GroupMember());
  }
}

export const groupMemberRoute: Routes = [
  {
    path: '',
    component: GroupMemberComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'crmwebApp.groupMember.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GroupMemberDetailComponent,
    resolve: {
      groupMember: GroupMemberResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.groupMember.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GroupMemberUpdateComponent,
    resolve: {
      groupMember: GroupMemberResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.groupMember.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GroupMemberUpdateComponent,
    resolve: {
      groupMember: GroupMemberResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.groupMember.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
