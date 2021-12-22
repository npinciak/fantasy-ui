import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlFragments } from '@app/@shared/url-builder';

import { HomeComponent as NFLHomeComponent } from '../dfs/nfl/pages/home/home.component';
import { NFLDfsResolver } from './nfl/resolvers/dfs.resolver';

export const routes: Routes = [
  {
    path: UrlFragments.Empty,
    component: NFLHomeComponent,
    resolve: { dfs: NFLDfsResolver },
  },
  { path: '**', redirectTo: UrlFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DfsRoutingModule {}
