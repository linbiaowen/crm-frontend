import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEfLockerLocation } from 'app/shared/model/ef-locker-location.model';

type EntityResponseType = HttpResponse<IEfLockerLocation>;
type EntityArrayResponseType = HttpResponse<IEfLockerLocation[]>;

@Injectable({ providedIn: 'root' })
export class EfLockerLocationService {
  public resourceUrl = SERVER_API_URL + 'api/ef-locker-locations';

  constructor(protected http: HttpClient) {}

  create(efLockerLocation: IEfLockerLocation): Observable<EntityResponseType> {
    return this.http.post<IEfLockerLocation>(this.resourceUrl, efLockerLocation, { observe: 'response' });
  }

  update(efLockerLocation: IEfLockerLocation): Observable<EntityResponseType> {
    return this.http.put<IEfLockerLocation>(this.resourceUrl, efLockerLocation, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEfLockerLocation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEfLockerLocation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
