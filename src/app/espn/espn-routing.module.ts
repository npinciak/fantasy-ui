import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlFragments } from '@app/@shared/url-builder';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';
import { EspnResolver } from './resolvers/espn.resolver';

export const routes: Routes = [
  {
    path: UrlFragments.Empty,
    component: EspnHomeComponent,
    resolve: [EspnResolver],
  },
  { path: '**', redirectTo: UrlFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspnRoutingModule {}
