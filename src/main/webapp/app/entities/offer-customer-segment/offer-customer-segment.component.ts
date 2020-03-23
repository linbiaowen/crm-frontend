import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOfferCustomerSegment } from 'app/shared/model/offer-customer-segment.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { OfferCustomerSegmentService } from './offer-customer-segment.service';
import { OfferCustomerSegmentDeleteDialogComponent } from './offer-customer-segment-delete-dialog.component';

@Component({
  selector: 'jhi-offer-customer-segment',
  templateUrl: './offer-customer-segment.component.html'
})
export class OfferCustomerSegmentComponent implements OnInit, OnDestroy {
  offerCustomerSegments?: IOfferCustomerSegment[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected offerCustomerSegmentService: OfferCustomerSegmentService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.offerCustomerSegmentService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IOfferCustomerSegment[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInOfferCustomerSegments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOfferCustomerSegment): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOfferCustomerSegments(): void {
    this.eventSubscriber = this.eventManager.subscribe('offerCustomerSegmentListModification', () => this.loadPage());
  }

  delete(offerCustomerSegment: IOfferCustomerSegment): void {
    const modalRef = this.modalService.open(OfferCustomerSegmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.offerCustomerSegment = offerCustomerSegment;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IOfferCustomerSegment[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/offer-customer-segment'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.offerCustomerSegments = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
