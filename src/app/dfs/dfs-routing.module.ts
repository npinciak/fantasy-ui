import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPathFragments } from '@app/@core/store/router/url-builder';
import { DfsNbaHomeComponent } from './nba/pages/dfs-nba-home/dfs-nba-home.component';
import { DfsNflHomeComponent } from './nfl/pages/dfs-nfl-home/dfs-nfl-home.component';
import { DfsResolver } from './resolvers/dfs.resolver';

export const routes: Routes = [
  {
    path: UrlPathFragments.Empty,
    component: DfsNflHomeComponent,
    resolve: [DfsResolver],
  },
  {
    path: UrlPathFragments.NBA,
    data: { sport: UrlPathFragments.NBA },
    component: DfsNbaHomeComponent,
    resolve: [DfsResolver],
  },
  {
    path: UrlPathFragments.NFL,
    data: { sport: UrlPathFragments.NFL },
    component: DfsNflHomeComponent,
    resolve: [DfsResolver],
  },
  {
    path: UrlPathFragments.MLB,
    data: { sport: UrlPathFragments.MLB },
    // component: DfsNflHomeComponent,
    // resolve: [DfsResolver],
  },
  { path: '**', redirectTo: UrlPathFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DfsRoutingModule {}
