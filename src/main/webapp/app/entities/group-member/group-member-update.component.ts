import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IGroupMember, GroupMember } from 'app/shared/model/group-member.model';
import { GroupMemberService } from './group-member.service';
import { ISubscriptionGroup } from 'app/shared/model/subscription-group.model';
import { SubscriptionGroupService } from 'app/entities/subscription-group/subscription-group.service';

@Component({
  selector: 'jhi-group-member-update',
  templateUrl: './group-member-update.component.html'
})
export class GroupMemberUpdateComponent implements OnInit {
  isSaving = false;
  subscriptiongroups: ISubscriptionGroup[] = [];

  editForm = this.fb.group({
    id: [],
    groupMemberId: [null, [Validators.required]],
    groupId: [null, [Validators.required]],
    msisdn: [null, [Validators.required]],
    groupRole: [null, [Validators.required]],
    endReasonCode: [],
    remarks: [],
    startDate: [],
    endDate: [],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]],
    subscriptionGroup: []
  });

  constructor(
    protected groupMemberService: GroupMemberService,
    protected subscriptionGroupService: SubscriptionGroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupMember }) => {
      if (!groupMember.id) {
        const today = moment().startOf('day');
        groupMember.startDate = today;
        groupMember.endDate = today;
        groupMember.createdDate = today;
        groupMember.lastUpdatedDate = today;
      }

      this.updateForm(groupMember);

      this.subscriptionGroupService
        .query()
        .subscribe((res: HttpResponse<ISubscriptionGroup[]>) => (this.subscriptiongroups = res.body || []));
    });
  }

  updateForm(groupMember: IGroupMember): void {
    this.editForm.patchValue({
      id: groupMember.id,
      groupMemberId: groupMember.groupMemberId,
      groupId: groupMember.groupId,
      msisdn: groupMember.msisdn,
      groupRole: groupMember.groupRole,
      endReasonCode: groupMember.endReasonCode,
      remarks: groupMember.remarks,
      startDate: groupMember.startDate ? groupMember.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: groupMember.endDate ? groupMember.endDate.format(DATE_TIME_FORMAT) : null,
      lockCount: groupMember.lockCount,
      createdDate: groupMember.createdDate ? groupMember.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: groupMember.createdBy,
      lastUpdatedDate: groupMember.lastUpdatedDate ? groupMember.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: groupMember.lastUpdatedBy,
      tenantId: groupMember.tenantId,
      subscriptionGroup: groupMember.subscriptionGroup
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const groupMember = this.createFromForm();
    if (groupMember.id !== undefined) {
      this.subscribeToSaveResponse(this.groupMemberService.update(groupMember));
    } else {
      this.subscribeToSaveResponse(this.groupMemberService.create(groupMember));
    }
  }

  private createFromForm(): IGroupMember {
    return {
      ...new GroupMember(),
      id: this.editForm.get(['id'])!.value,
      groupMemberId: this.editForm.get(['groupMemberId'])!.value,
      groupId: this.editForm.get(['groupId'])!.value,
      msisdn: this.editForm.get(['msisdn'])!.value,
      groupRole: this.editForm.get(['groupRole'])!.value,
      endReasonCode: this.editForm.get(['endReasonCode'])!.value,
      remarks: this.editForm.get(['remarks'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      lockCount: this.editForm.get(['lockCount'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      createdBy: this.editForm.get(['createdBy'])!.value,
      lastUpdatedDate: this.editForm.get(['lastUpdatedDate'])!.value
        ? moment(this.editForm.get(['lastUpdatedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastUpdatedBy: this.editForm.get(['lastUpdatedBy'])!.value,
      tenantId: this.editForm.get(['tenantId'])!.value,
      subscriptionGroup: this.editForm.get(['subscriptionGroup'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupMember>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISubscriptionGroup): any {
    return item.id;
  }
}
