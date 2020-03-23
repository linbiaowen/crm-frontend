import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOfferCustomerClass, OfferCustomerClass } from 'app/shared/model/offer-customer-class.model';
import { OfferCustomerClassService } from './offer-customer-class.service';
import { OfferCustomerClassComponent } from './offer-customer-class.component';
import { OfferCustomerClassDetailComponent } from './offer-customer-class-detail.component';
import { OfferCustomerClassUpdateComponent } from './offer-customer-class-update.component';

@Injectable({ providedIn: 'root' })
export class OfferCustomerClassResolve implements Resolve<IOfferCustomerClass> {
  constructor(private service: OfferCustomerClassService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOfferCustomerClass> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((offerCustomerClass: HttpResponse<OfferCustomerClass>) => {
          if (offerCustomerClass.body) {
            return of(offerCustomerClass.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OfferCustomerClass());
  }
}

export const offerCustomerClassRoute: Routes = [
  {
    path: '',
    component: OfferCustomerClassComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'crmwebApp.offerCustomerClass.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OfferCustomerClassDetailComponent,
    resolve: {
      offerCustomerClass: OfferCustomerClassResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.offerCustomerClass.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OfferCustomerClassUpdateComponent,
    resolve: {
      offerCustomerClass: OfferCustomerClassResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.offerCustomerClass.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OfferCustomerClassUpdateComponent,
    resolve: {
      offerCustomerClass: OfferCustomerClassResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.offerCustomerClass.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
