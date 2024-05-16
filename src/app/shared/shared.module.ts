import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './components/card/card.component';
import { NoResultsComponent } from './components/no-results/no-results.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardComponent, NoResultsComponent],
  exports: [CardComponent, NoResultsComponent],
  providers: []
})
export class SharedModule {}
