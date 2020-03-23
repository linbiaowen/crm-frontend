import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmwebSharedModule } from 'app/shared/shared.module';
import { GroupMemberComponent } from './group-member.component';
import { GroupMemberDetailComponent } from './group-member-detail.component';
import { GroupMemberUpdateComponent } from './group-member-update.component';
import { GroupMemberDeleteDialogComponent } from './group-member-delete-dialog.component';
import { groupMemberRoute } from './group-member.route';

@NgModule({
  imports: [CrmwebSharedModule, RouterModule.forChild(groupMemberRoute)],
  declarations: [GroupMemberComponent, GroupMemberDetailComponent, GroupMemberUpdateComponent, GroupMemberDeleteDialogComponent],
  entryComponents: [GroupMemberDeleteDialogComponent]
})
export class CrmwebGroupMemberModule {}
