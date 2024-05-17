import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tv-shows',
        loadChildren: () => import('./tv-shows/tv-shows.module').then((m) => m.TvShowsModule)
      },
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then((m) => m.MoviesModule)
      },
      { path: '', redirectTo: '/tv-shows', pathMatch: 'full' }
    ]
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./media-details/media-details.module').then((m) => m.MediaDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
