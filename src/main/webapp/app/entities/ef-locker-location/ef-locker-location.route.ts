import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEfLockerLocation, EfLockerLocation } from 'app/shared/model/ef-locker-location.model';
import { EfLockerLocationService } from './ef-locker-location.service';
import { EfLockerLocationComponent } from './ef-locker-location.component';
import { EfLockerLocationDetailComponent } from './ef-locker-location-detail.component';
import { EfLockerLocationUpdateComponent } from './ef-locker-location-update.component';

@Injectable({ providedIn: 'root' })
export class EfLockerLocationResolve implements Resolve<IEfLockerLocation> {
  constructor(private service: EfLockerLocationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEfLockerLocation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((efLockerLocation: HttpResponse<EfLockerLocation>) => {
          if (efLockerLocation.body) {
            return of(efLockerLocation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EfLockerLocation());
  }
}

export const efLockerLocationRoute: Routes = [
  {
    path: '',
    component: EfLockerLocationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'crmwebApp.efLockerLocation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EfLockerLocationDetailComponent,
    resolve: {
      efLockerLocation: EfLockerLocationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.efLockerLocation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EfLockerLocationUpdateComponent,
    resolve: {
      efLockerLocation: EfLockerLocationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.efLockerLocation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EfLockerLocationUpdateComponent,
    resolve: {
      efLockerLocation: EfLockerLocationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.efLockerLocation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
