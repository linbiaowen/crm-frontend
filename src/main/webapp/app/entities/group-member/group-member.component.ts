import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGroupMember } from 'app/shared/model/group-member.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { GroupMemberService } from './group-member.service';
import { GroupMemberDeleteDialogComponent } from './group-member-delete-dialog.component';

@Component({
  selector: 'jhi-group-member',
  templateUrl: './group-member.component.html'
})
export class GroupMemberComponent implements OnInit, OnDestroy {
  groupMembers?: IGroupMember[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected groupMemberService: GroupMemberService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.groupMemberService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IGroupMember[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInGroupMembers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGroupMember): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGroupMembers(): void {
    this.eventSubscriber = this.eventManager.subscribe('groupMemberListModification', () => this.loadPage());
  }

  delete(groupMember: IGroupMember): void {
    const modalRef = this.modalService.open(GroupMemberDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.groupMember = groupMember;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IGroupMember[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/group-member'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.groupMembers = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
