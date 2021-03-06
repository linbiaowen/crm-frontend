import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubsPurchaseControl } from 'app/shared/model/subs-purchase-control.model';

type EntityResponseType = HttpResponse<ISubsPurchaseControl>;
type EntityArrayResponseType = HttpResponse<ISubsPurchaseControl[]>;

@Injectable({ providedIn: 'root' })
export class SubsPurchaseControlService {
  public resourceUrl = SERVER_API_URL + 'api/subs-purchase-controls';

  constructor(protected http: HttpClient) {}

  create(subsPurchaseControl: ISubsPurchaseControl): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subsPurchaseControl);
    return this.http
      .post<ISubsPurchaseControl>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(subsPurchaseControl: ISubsPurchaseControl): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subsPurchaseControl);
    return this.http
      .put<ISubsPurchaseControl>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ISubsPurchaseControl>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISubsPurchaseControl[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(subsPurchaseControl: ISubsPurchaseControl): ISubsPurchaseControl {
    const copy: ISubsPurchaseControl = Object.assign({}, subsPurchaseControl, {
      startDate:
        subsPurchaseControl.startDate && subsPurchaseControl.startDate.isValid() ? subsPurchaseControl.startDate.toJSON() : undefined,
      endDate: subsPurchaseControl.endDate && subsPurchaseControl.endDate.isValid() ? subsPurchaseControl.endDate.toJSON() : undefined,
      createdDate:
        subsPurchaseControl.createdDate && subsPurchaseControl.createdDate.isValid() ? subsPurchaseControl.createdDate.toJSON() : undefined,
      lastUpdatedDate:
        subsPurchaseControl.lastUpdatedDate && subsPurchaseControl.lastUpdatedDate.isValid()
          ? subsPurchaseControl.lastUpdatedDate.toJSON()
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastUpdatedDate = res.body.lastUpdatedDate ? moment(res.body.lastUpdatedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((subsPurchaseControl: ISubsPurchaseControl) => {
        subsPurchaseControl.startDate = subsPurchaseControl.startDate ? moment(subsPurchaseControl.startDate) : undefined;
        subsPurchaseControl.endDate = subsPurchaseControl.endDate ? moment(subsPurchaseControl.endDate) : undefined;
        subsPurchaseControl.createdDate = subsPurchaseControl.createdDate ? moment(subsPurchaseControl.createdDate) : undefined;
        subsPurchaseControl.lastUpdatedDate = subsPurchaseControl.lastUpdatedDate ? moment(subsPurchaseControl.lastUpdatedDate) : undefined;
      });
    }
    return res;
  }
}
