import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductSimType, ProductSimType } from 'app/shared/model/product-sim-type.model';
import { ProductSimTypeService } from './product-sim-type.service';
import { ProductSimTypeComponent } from './product-sim-type.component';
import { ProductSimTypeDetailComponent } from './product-sim-type-detail.component';
import { ProductSimTypeUpdateComponent } from './product-sim-type-update.component';

@Injectable({ providedIn: 'root' })
export class ProductSimTypeResolve implements Resolve<IProductSimType> {
  constructor(private service: ProductSimTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductSimType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productSimType: HttpResponse<ProductSimType>) => {
          if (productSimType.body) {
            return of(productSimType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductSimType());
  }
}

export const productSimTypeRoute: Routes = [
  {
    path: '',
    component: ProductSimTypeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'crmwebApp.productSimType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductSimTypeDetailComponent,
    resolve: {
      productSimType: ProductSimTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.productSimType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductSimTypeUpdateComponent,
    resolve: {
      productSimType: ProductSimTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.productSimType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductSimTypeUpdateComponent,
    resolve: {
      productSimType: ProductSimTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmwebApp.productSimType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
