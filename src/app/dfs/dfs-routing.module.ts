import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlFragments } from '@app/@core/store/router/url-builder';
import { DailyFantasyNflHomeComponent } from './nfl/pages/daily-fantasy-nfl-home/daily-fantasy-nfl-home.component';
import { DfsResolver } from './resolvers/dfs.resolver';

export const routes: Routes = [
  {
    path: UrlFragments.Empty,
    component: DailyFantasyNflHomeComponent,
    resolve: [DfsResolver],
  },
  { path: '**', redirectTo: UrlFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DfsRoutingModule {}
