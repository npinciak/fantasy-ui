import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlFragments } from '@app/@shared/url-builder';

import { HomeComponent as DfsHomeComponent } from './pages/home/home.component';
import { DfsResolver } from './resolvers/dfs.resolver';

export const routes: Routes = [
  {
    path: UrlFragments.Empty,
    component: DfsHomeComponent,
    resolve: { dfs: DfsResolver },
  },
  { path: '**', redirectTo: UrlFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DfsRoutingModule {}
