import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICfsService } from 'app/shared/model/cfs-service.model';
import { CfsServiceService } from './cfs-service.service';

@Component({
  templateUrl: './cfs-service-delete-dialog.component.html'
})
export class CfsServiceDeleteDialogComponent {
  cfsService?: ICfsService;

  constructor(
    protected cfsServiceService: CfsServiceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.cfsServiceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cfsServiceListModification');
      this.activeModal.close();
    });
  }
}
