import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IImage } from 'app/shared/model/image.model';

type EntityResponseType = HttpResponse<IImage>;
type EntityArrayResponseType = HttpResponse<IImage[]>;

@Injectable({ providedIn: 'root' })
export class ImageService {
  public resourceUrl = SERVER_API_URL + 'api/images';

  constructor(protected http: HttpClient) {}

  create(image: IImage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(image);
    return this.http
      .post<IImage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(image: IImage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(image);
    return this.http
      .put<IImage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IImage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IImage[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(image: IImage): IImage {
    const copy: IImage = Object.assign({}, image, {
      createdDate: image.createdDate && image.createdDate.isValid() ? image.createdDate.toJSON() : undefined,
      lastUpdatedDate: image.lastUpdatedDate && image.lastUpdatedDate.isValid() ? image.lastUpdatedDate.toJSON() : undefined
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
      res.body.forEach((image: IImage) => {
        image.createdDate = image.createdDate ? moment(image.createdDate) : undefined;
        image.lastUpdatedDate = image.lastUpdatedDate ? moment(image.lastUpdatedDate) : undefined;
      });
    }
    return res;
  }
}
