import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOfferSalesChannel, OfferSalesChannel } from 'app/shared/model/offer-sales-channel.model';
import { OfferSalesChannelService } from './offer-sales-channel.service';
import { OfferSalesChannelComponent } from './offer-sales-channel.component';
import { OfferSalesChannelDetailComponent } from './offer-sales-channel-detail.component';
import { OfferSalesChannelUpdateComponent } from './offer-sales-channel-update.component';

@Injectable({ providedIn: 'root' })
export class OfferSalesChannelResolve implements Resolve<IOfferSalesChannel> {
  constructor(private service: OfferSalesChannelService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOfferSalesChannel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((offerSalesChannel: HttpResponse<OfferSalesChannel>) => {
          if (offerSalesChannel.body) {
            return of(offerSalesChannel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OfferSalesChannel());
  }
}

export const offerSalesChannelRoute: Routes = [
  {
    path: '',
    component: OfferSalesChannelComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'crmwebApp.offerSalesChannel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OfferSalesChannelDetailComponent,
    resolve: {
      offerSalesChannel: OfferSalesChannelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.offerSalesChannel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OfferSalesChannelUpdateComponent,
    resolve: {
      offerSalesChannel: OfferSalesChannelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.offerSalesChannel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OfferSalesChannelUpdateComponent,
    resolve: {
      offerSalesChannel: OfferSalesChannelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.offerSalesChannel.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
