import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOfferSalesChannel } from 'app/shared/model/offer-sales-channel.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { OfferSalesChannelService } from './offer-sales-channel.service';
import { OfferSalesChannelDeleteDialogComponent } from './offer-sales-channel-delete-dialog.component';

@Component({
  selector: 'jhi-offer-sales-channel',
  templateUrl: './offer-sales-channel.component.html'
})
export class OfferSalesChannelComponent implements OnInit, OnDestroy {
  offerSalesChannels?: IOfferSalesChannel[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected offerSalesChannelService: OfferSalesChannelService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.offerSalesChannelService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IOfferSalesChannel[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInOfferSalesChannels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOfferSalesChannel): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOfferSalesChannels(): void {
    this.eventSubscriber = this.eventManager.subscribe('offerSalesChannelListModification', () => this.loadPage());
  }

  delete(offerSalesChannel: IOfferSalesChannel): void {
    const modalRef = this.modalService.open(OfferSalesChannelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.offerSalesChannel = offerSalesChannel;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IOfferSalesChannel[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/offer-sales-channel'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.offerSalesChannels = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
