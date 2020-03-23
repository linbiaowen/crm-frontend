import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGroupMember } from 'app/shared/model/group-member.model';

@Component({
  selector: 'jhi-group-member-detail',
  templateUrl: './group-member-detail.component.html'
})
export class GroupMemberDetailComponent implements OnInit {
  groupMember: IGroupMember | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupMember }) => (this.groupMember = groupMember));
  }

  previousState(): void {
    window.history.back();
  }
}
