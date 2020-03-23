import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOfferCustomerSegment, OfferCustomerSegment } from 'app/shared/model/offer-customer-segment.model';
import { OfferCustomerSegmentService } from './offer-customer-segment.service';
import { OfferCustomerSegmentComponent } from './offer-customer-segment.component';
import { OfferCustomerSegmentDetailComponent } from './offer-customer-segment-detail.component';
import { OfferCustomerSegmentUpdateComponent } from './offer-customer-segment-update.component';

@Injectable({ providedIn: 'root' })
export class OfferCustomerSegmentResolve implements Resolve<IOfferCustomerSegment> {
  constructor(private service: OfferCustomerSegmentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOfferCustomerSegment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((offerCustomerSegment: HttpResponse<OfferCustomerSegment>) => {
          if (offerCustomerSegment.body) {
            return of(offerCustomerSegment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OfferCustomerSegment());
  }
}

export const offerCustomerSegmentRoute: Routes = [
  {
    path: '',
    component: OfferCustomerSegmentComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'crmwebApp.offerCustomerSegment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OfferCustomerSegmentDetailComponent,
    resolve: {
      offerCustomerSegment: OfferCustomerSegmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.offerCustomerSegment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OfferCustomerSegmentUpdateComponent,
    resolve: {
      offerCustomerSegment: OfferCustomerSegmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.offerCustomerSegment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OfferCustomerSegmentUpdateComponent,
    resolve: {
      offerCustomerSegment: OfferCustomerSegmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.offerCustomerSegment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
