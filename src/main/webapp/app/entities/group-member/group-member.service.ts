import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGroupMember } from 'app/shared/model/group-member.model';

type EntityResponseType = HttpResponse<IGroupMember>;
type EntityArrayResponseType = HttpResponse<IGroupMember[]>;

@Injectable({ providedIn: 'root' })
export class GroupMemberService {
  public resourceUrl = SERVER_API_URL + 'api/group-members';

  constructor(protected http: HttpClient) {}

  create(groupMember: IGroupMember): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(groupMember);
    return this.http
      .post<IGroupMember>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(groupMember: IGroupMember): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(groupMember);
    return this.http
      .put<IGroupMember>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IGroupMember>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGroupMember[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(groupMember: IGroupMember): IGroupMember {
    const copy: IGroupMember = Object.assign({}, groupMember, {
      startDate: groupMember.startDate && groupMember.startDate.isValid() ? groupMember.startDate.toJSON() : undefined,
      endDate: groupMember.endDate && groupMember.endDate.isValid() ? groupMember.endDate.toJSON() : undefined,
      createdDate: groupMember.createdDate && groupMember.createdDate.isValid() ? groupMember.createdDate.toJSON() : undefined,
      lastUpdatedDate:
        groupMember.lastUpdatedDate && groupMember.lastUpdatedDate.isValid() ? groupMember.lastUpdatedDate.toJSON() : undefined
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
      res.body.forEach((groupMember: IGroupMember) => {
        groupMember.startDate = groupMember.startDate ? moment(groupMember.startDate) : undefined;
        groupMember.endDate = groupMember.endDate ? moment(groupMember.endDate) : undefined;
        groupMember.createdDate = groupMember.createdDate ? moment(groupMember.createdDate) : undefined;
        groupMember.lastUpdatedDate = groupMember.lastUpdatedDate ? moment(groupMember.lastUpdatedDate) : undefined;
      });
    }
    return res;
  }
}
