import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroupMember } from 'app/shared/model/group-member.model';
import { GroupMemberService } from './group-member.service';

@Component({
  templateUrl: './group-member-delete-dialog.component.html'
})
export class GroupMemberDeleteDialogComponent {
  groupMember?: IGroupMember;

  constructor(
    protected groupMemberService: GroupMemberService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.groupMemberService.delete(id).subscribe(() => {
      this.eventManager.broadcast('groupMemberListModification');
      this.activeModal.close();
    });
  }
}
