import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsComponent } from './tv-shows.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TvShowsComponent],
  imports: [CommonModule, TvShowsRoutingModule, SharedModule]
})
export class TvShowsModule {}
