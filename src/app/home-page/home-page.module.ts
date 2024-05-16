import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-page-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SearchBarComponent } from './layout/search-bar/search-bar.component';

@NgModule({
  declarations: [LayoutComponent, NavbarComponent, SearchBarComponent],
  imports: [CommonModule, FormsModule, HomePageRoutingModule]
})
export class HomePageModule {}
