import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICfsService, CfsService } from 'app/shared/model/cfs-service.model';
import { CfsServiceService } from './cfs-service.service';
import { CfsServiceComponent } from './cfs-service.component';
import { CfsServiceDetailComponent } from './cfs-service-detail.component';
import { CfsServiceUpdateComponent } from './cfs-service-update.component';

@Injectable({ providedIn: 'root' })
export class CfsServiceResolve implements Resolve<ICfsService> {
  constructor(private service: CfsServiceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICfsService> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cfsService: HttpResponse<CfsService>) => {
          if (cfsService.body) {
            return of(cfsService.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CfsService());
  }
}

export const cfsServiceRoute: Routes = [
  {
    path: '',
    component: CfsServiceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'crmwebApp.cfsService.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CfsServiceDetailComponent,
    resolve: {
      cfsService: CfsServiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.cfsService.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CfsServiceUpdateComponent,
    resolve: {
      cfsService: CfsServiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.cfsService.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CfsServiceUpdateComponent,
    resolve: {
      cfsService: CfsServiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.cfsService.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
