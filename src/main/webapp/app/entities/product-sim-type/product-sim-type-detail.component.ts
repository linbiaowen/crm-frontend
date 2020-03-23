import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductSimType } from 'app/shared/model/product-sim-type.model';

@Component({
  selector: 'jhi-product-sim-type-detail',
  templateUrl: './product-sim-type-detail.component.html'
})
export class ProductSimTypeDetailComponent implements OnInit {
  productSimType: IProductSimType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productSimType }) => (this.productSimType = productSimType));
  }

  previousState(): void {
    window.history.back();
  }
}
