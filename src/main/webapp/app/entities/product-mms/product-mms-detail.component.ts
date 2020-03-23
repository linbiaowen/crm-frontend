import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductMms } from 'app/shared/model/product-mms.model';

@Component({
  selector: 'jhi-product-mms-detail',
  templateUrl: './product-mms-detail.component.html'
})
export class ProductMmsDetailComponent implements OnInit {
  productMms: IProductMms | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productMms }) => (this.productMms = productMms));
  }

  previousState(): void {
    window.history.back();
  }
}
