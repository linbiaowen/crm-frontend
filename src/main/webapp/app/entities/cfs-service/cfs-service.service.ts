import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICfsService } from 'app/shared/model/cfs-service.model';

type EntityResponseType = HttpResponse<ICfsService>;
type EntityArrayResponseType = HttpResponse<ICfsService[]>;

@Injectable({ providedIn: 'root' })
export class CfsServiceService {
  public resourceUrl = SERVER_API_URL + 'api/cfs-services';

  constructor(protected http: HttpClient) {}

  create(cfsService: ICfsService): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cfsService);
    return this.http
      .post<ICfsService>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cfsService: ICfsService): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cfsService);
    return this.http
      .put<ICfsService>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ICfsService>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICfsService[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cfsService: ICfsService): ICfsService {
    const copy: ICfsService = Object.assign({}, cfsService, {
      createdDate: cfsService.createdDate && cfsService.createdDate.isValid() ? cfsService.createdDate.toJSON() : undefined,
      lastUpdatedDate: cfsService.lastUpdatedDate && cfsService.lastUpdatedDate.isValid() ? cfsService.lastUpdatedDate.toJSON() : undefined
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
      res.body.forEach((cfsService: ICfsService) => {
        cfsService.createdDate = cfsService.createdDate ? moment(cfsService.createdDate) : undefined;
        cfsService.lastUpdatedDate = cfsService.lastUpdatedDate ? moment(cfsService.lastUpdatedDate) : undefined;
      });
    }
    return res;
  }
}
