import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmwebSharedModule } from 'app/shared/shared.module';
import { ImageComponent } from './image.component';
import { ImageDetailComponent } from './image-detail.component';
import { ImageUpdateComponent } from './image-update.component';
import { ImageDeleteDialogComponent } from './image-delete-dialog.component';
import { imageRoute } from './image.route';

@NgModule({
  imports: [CrmwebSharedModule, RouterModule.forChild(imageRoute)],
  declarations: [ImageComponent, ImageDetailComponent, ImageUpdateComponent, ImageDeleteDialogComponent],
  entryComponents: [ImageDeleteDialogComponent]
})
export class CrmwebImageModule {}
