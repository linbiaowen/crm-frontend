import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductSimType } from 'app/shared/model/product-sim-type.model';

type EntityResponseType = HttpResponse<IProductSimType>;
type EntityArrayResponseType = HttpResponse<IProductSimType[]>;

@Injectable({ providedIn: 'root' })
export class ProductSimTypeService {
  public resourceUrl = SERVER_API_URL + 'api/product-sim-types';

  constructor(protected http: HttpClient) {}

  create(productSimType: IProductSimType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productSimType);
    return this.http
      .post<IProductSimType>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productSimType: IProductSimType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productSimType);
    return this.http
      .put<IProductSimType>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IProductSimType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductSimType[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(productSimType: IProductSimType): IProductSimType {
    const copy: IProductSimType = Object.assign({}, productSimType, {
      createdDate: productSimType.createdDate && productSimType.createdDate.isValid() ? productSimType.createdDate.toJSON() : undefined,
      lastUpdatedDate:
        productSimType.lastUpdatedDate && productSimType.lastUpdatedDate.isValid() ? productSimType.lastUpdatedDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastUpdatedDate = res.body.lastUpdatedDate ? moment(res.body.lastUpdatedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((productSimType: IProductSimType) => {
        productSimType.createdDate = productSimType.createdDate ? moment(productSimType.createdDate) : undefined;
        productSimType.lastUpdatedDate = productSimType.lastUpdatedDate ? moment(productSimType.lastUpdatedDate) : undefined;
      });
    }
    return res;
  }
}
