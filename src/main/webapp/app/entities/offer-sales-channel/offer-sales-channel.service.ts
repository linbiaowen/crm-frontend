import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOfferSalesChannel } from 'app/shared/model/offer-sales-channel.model';

type EntityResponseType = HttpResponse<IOfferSalesChannel>;
type EntityArrayResponseType = HttpResponse<IOfferSalesChannel[]>;

@Injectable({ providedIn: 'root' })
export class OfferSalesChannelService {
  public resourceUrl = SERVER_API_URL + 'api/offer-sales-channels';

  constructor(protected http: HttpClient) {}

  create(offerSalesChannel: IOfferSalesChannel): Observable<EntityResponseType> {
    return this.http.post<IOfferSalesChannel>(this.resourceUrl, offerSalesChannel, { observe: 'response' });
  }

  update(offerSalesChannel: IOfferSalesChannel): Observable<EntityResponseType> {
    return this.http.put<IOfferSalesChannel>(this.resourceUrl, offerSalesChannel, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IOfferSalesChannel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOfferSalesChannel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
