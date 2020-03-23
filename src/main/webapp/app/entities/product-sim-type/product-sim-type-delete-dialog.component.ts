import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductSimType } from 'app/shared/model/product-sim-type.model';
import { ProductSimTypeService } from './product-sim-type.service';

@Component({
  templateUrl: './product-sim-type-delete-dialog.component.html'
})
export class ProductSimTypeDeleteDialogComponent {
  productSimType?: IProductSimType;

  constructor(
    protected productSimTypeService: ProductSimTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.productSimTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productSimTypeListModification');
      this.activeModal.close();
    });
  }
}
