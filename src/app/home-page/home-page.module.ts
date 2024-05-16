import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HomePageRoutingModule } from './home-page-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SearchBarComponent } from './layout/search-bar/search-bar.component';
import { mediaReducer } from '../store/media.reducer';

@NgModule({
  declarations: [LayoutComponent, NavbarComponent, SearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule
    // StoreModule.forFeature('media', mediaReducer)
  ]
})
export class HomePageModule {}
