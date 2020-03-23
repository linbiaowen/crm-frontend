import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOfferCustomerClass } from 'app/shared/model/offer-customer-class.model';

type EntityResponseType = HttpResponse<IOfferCustomerClass>;
type EntityArrayResponseType = HttpResponse<IOfferCustomerClass[]>;

@Injectable({ providedIn: 'root' })
export class OfferCustomerClassService {
  public resourceUrl = SERVER_API_URL + 'api/offer-customer-classes';

  constructor(protected http: HttpClient) {}

  create(offerCustomerClass: IOfferCustomerClass): Observable<EntityResponseType> {
    return this.http.post<IOfferCustomerClass>(this.resourceUrl, offerCustomerClass, { observe: 'response' });
  }

  update(offerCustomerClass: IOfferCustomerClass): Observable<EntityResponseType> {
    return this.http.put<IOfferCustomerClass>(this.resourceUrl, offerCustomerClass, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IOfferCustomerClass>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOfferCustomerClass[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
