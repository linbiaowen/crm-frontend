import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductMms } from 'app/shared/model/product-mms.model';

type EntityResponseType = HttpResponse<IProductMms>;
type EntityArrayResponseType = HttpResponse<IProductMms[]>;

@Injectable({ providedIn: 'root' })
export class ProductMmsService {
  public resourceUrl = SERVER_API_URL + 'api/product-mms';

  constructor(protected http: HttpClient) {}

  create(productMms: IProductMms): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productMms);
    return this.http
      .post<IProductMms>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productMms: IProductMms): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productMms);
    return this.http
      .put<IProductMms>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IProductMms>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductMms[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(productMms: IProductMms): IProductMms {
    const copy: IProductMms = Object.assign({}, productMms, {
      createdDate: productMms.createdDate && productMms.createdDate.isValid() ? productMms.createdDate.toJSON() : undefined,
      lastUpdatedDate: productMms.lastUpdatedDate && productMms.lastUpdatedDate.isValid() ? productMms.lastUpdatedDate.toJSON() : undefined
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
      res.body.forEach((productMms: IProductMms) => {
        productMms.createdDate = productMms.createdDate ? moment(productMms.createdDate) : undefined;
        productMms.lastUpdatedDate = productMms.lastUpdatedDate ? moment(productMms.lastUpdatedDate) : undefined;
      });
    }
    return res;
  }
}
