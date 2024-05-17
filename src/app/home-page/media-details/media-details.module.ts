import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaDetailsRoutingModule } from './media-details-routing.module';
import { MediaDetailsComponent } from './media-details.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MediaDetailsComponent],
  imports: [CommonModule, MediaDetailsRoutingModule, SharedModule]
})
export class MediaDetailsModule {}
