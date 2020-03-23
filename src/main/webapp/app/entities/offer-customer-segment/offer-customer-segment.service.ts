import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOfferCustomerSegment } from 'app/shared/model/offer-customer-segment.model';

type EntityResponseType = HttpResponse<IOfferCustomerSegment>;
type EntityArrayResponseType = HttpResponse<IOfferCustomerSegment[]>;

@Injectable({ providedIn: 'root' })
export class OfferCustomerSegmentService {
  public resourceUrl = SERVER_API_URL + 'api/offer-customer-segments';

  constructor(protected http: HttpClient) {}

  create(offerCustomerSegment: IOfferCustomerSegment): Observable<EntityResponseType> {
    return this.http.post<IOfferCustomerSegment>(this.resourceUrl, offerCustomerSegment, { observe: 'response' });
  }

  update(offerCustomerSegment: IOfferCustomerSegment): Observable<EntityResponseType> {
    return this.http.put<IOfferCustomerSegment>(this.resourceUrl, offerCustomerSegment, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IOfferCustomerSegment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOfferCustomerSegment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
