import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubsOrderDetails } from 'app/shared/model/subs-order-details.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SubsOrderDetailsService } from './subs-order-details.service';
import { SubsOrderDetailsDeleteDialogComponent } from './subs-order-details-delete-dialog.component';

@Component({
  selector: 'jhi-subs-order-details',
  templateUrl: './subs-order-details.component.html'
})
export class SubsOrderDetailsComponent implements OnInit, OnDestroy {
  subsOrderDetails?: ISubsOrderDetails[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected subsOrderDetailsService: SubsOrderDetailsService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.subsOrderDetailsService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ISubsOrderDetails[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInSubsOrderDetails();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubsOrderDetails): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubsOrderDetails(): void {
    this.eventSubscriber = this.eventManager.subscribe('subsOrderDetailsListModification', () => this.loadPage());
  }

  delete(subsOrderDetails: ISubsOrderDetails): void {
    const modalRef = this.modalService.open(SubsOrderDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subsOrderDetails = subsOrderDetails;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ISubsOrderDetails[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/subs-order-details'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.subsOrderDetails = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
