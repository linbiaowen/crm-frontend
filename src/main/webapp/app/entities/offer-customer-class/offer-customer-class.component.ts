import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOfferCustomerClass } from 'app/shared/model/offer-customer-class.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { OfferCustomerClassService } from './offer-customer-class.service';
import { OfferCustomerClassDeleteDialogComponent } from './offer-customer-class-delete-dialog.component';

@Component({
  selector: 'jhi-offer-customer-class',
  templateUrl: './offer-customer-class.component.html'
})
export class OfferCustomerClassComponent implements OnInit, OnDestroy {
  offerCustomerClasses?: IOfferCustomerClass[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected offerCustomerClassService: OfferCustomerClassService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.offerCustomerClassService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IOfferCustomerClass[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInOfferCustomerClasses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOfferCustomerClass): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOfferCustomerClasses(): void {
    this.eventSubscriber = this.eventManager.subscribe('offerCustomerClassListModification', () => this.loadPage());
  }

  delete(offerCustomerClass: IOfferCustomerClass): void {
    const modalRef = this.modalService.open(OfferCustomerClassDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.offerCustomerClass = offerCustomerClass;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IOfferCustomerClass[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/offer-customer-class'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.offerCustomerClasses = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
