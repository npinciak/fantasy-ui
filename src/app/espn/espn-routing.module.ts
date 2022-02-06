import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlFragments, UrlParams } from '@app/@shared/url-builder';
import { HomeComponent as MlbHomeComponent } from './mlb/pages/home/home.component';
import { HomeComponent as NflHomeComponent } from './nfl/pages/home/home.component';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';
import { EspnResolver } from './resolvers/espn.resolver';

export const routes: Routes = [
  {
    path: UrlFragments.Empty,
    component: EspnHomeComponent,
    resolve: [EspnResolver],
  },
  {
    path: UrlFragments.NFL,
    children: [
      {
        path: UrlFragments.Empty,
        component: NflHomeComponent,
      },
      {
        path: UrlParams.LeagueId,
        component: NflHomeComponent,
        resolve: [],
      },
    ],
  },
  {
    path: UrlFragments.MLB,
    children: [
      {
        path: UrlFragments.Empty,
        component: MlbHomeComponent,
      },
      {
        path: UrlParams.LeagueId,
        component: MlbHomeComponent,
      },
    ],
  },
  { path: '**', redirectTo: UrlFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspnRoutingModule {}
