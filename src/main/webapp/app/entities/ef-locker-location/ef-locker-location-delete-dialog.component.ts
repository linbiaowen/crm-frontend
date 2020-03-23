import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEfLockerLocation } from 'app/shared/model/ef-locker-location.model';
import { EfLockerLocationService } from './ef-locker-location.service';

@Component({
  templateUrl: './ef-locker-location-delete-dialog.component.html'
})
export class EfLockerLocationDeleteDialogComponent {
  efLockerLocation?: IEfLockerLocation;

  constructor(
    protected efLockerLocationService: EfLockerLocationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.efLockerLocationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('efLockerLocationListModification');
      this.activeModal.close();
    });
  }
}
