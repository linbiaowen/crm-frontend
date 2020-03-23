import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductMms, ProductMms } from 'app/shared/model/product-mms.model';
import { ProductMmsService } from './product-mms.service';
import { ProductMmsComponent } from './product-mms.component';
import { ProductMmsDetailComponent } from './product-mms-detail.component';
import { ProductMmsUpdateComponent } from './product-mms-update.component';

@Injectable({ providedIn: 'root' })
export class ProductMmsResolve implements Resolve<IProductMms> {
  constructor(private service: ProductMmsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductMms> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productMms: HttpResponse<ProductMms>) => {
          if (productMms.body) {
            return of(productMms.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductMms());
  }
}

export const productMmsRoute: Routes = [
  {
    path: '',
    component: ProductMmsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'crmwebApp.productMms.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductMmsDetailComponent,
    resolve: {
      productMms: ProductMmsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.productMms.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductMmsUpdateComponent,
    resolve: {
      productMms: ProductMmsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.productMms.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductMmsUpdateComponent,
    resolve: {
      productMms: ProductMmsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.productMms.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
