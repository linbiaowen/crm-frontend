import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductMms } from 'app/shared/model/product-mms.model';
import { ProductMmsService } from './product-mms.service';

@Component({
  templateUrl: './product-mms-delete-dialog.component.html'
})
export class ProductMmsDeleteDialogComponent {
  productMms?: IProductMms;

  constructor(
    protected productMmsService: ProductMmsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.productMmsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productMmsListModification');
      this.activeModal.close();
    });
  }
}
