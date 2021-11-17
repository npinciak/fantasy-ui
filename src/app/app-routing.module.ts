import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { TeamComponent } from '@mlb/pages/team/team.component';
import { UrlFragments, UrlParams } from './@shared/url-builder';

import { HomeComponent as MLBHomeComponent } from '@mlb/pages/home/home.component';
import { HomeComponent as NFLHomeComponent } from '@espn/nfl/pages/home/home.component';
import { HomeComponent as MLBDfsHomeComponent } from './dfs/mlb/pages/home/home.component';
import { HomeComponent as NFLDfsHomeComponent } from './dfs/nfl/pages/home/home.component';

import { NFLDfsResolver } from './dfs/nfl/resolvers/dfs.resolver';
import { MLBDfsResolver } from './dfs/mlb/resolvers/dfs.resolver';

const leagueId = environment.production ? '' : environment.leagueId;

const routes: Routes = [
  {
    path: UrlFragments.Empty,
    children: [
      {
        path: UrlFragments.Dfs,
        children: [
          { path: UrlFragments.MLB, resolve: { dfs: MLBDfsResolver }, component: MLBDfsHomeComponent },
          { path: UrlFragments.NFL, resolve: { dfs: NFLDfsResolver }, component: NFLDfsHomeComponent },
        ],
      },
      {
        path: UrlFragments.Espn,
        children: [
          {
            path: UrlFragments.MLB,
            children: [
              {
                path: UrlParams.LeagueId,
                component: MLBHomeComponent,
                children: [{ path: UrlFragments.Team, children: [{ path: UrlParams.TeamId, component: TeamComponent }] }],
              },
            ],
          },
          {
            path: UrlFragments.NFL,
            children: [
              {
                path: UrlParams.LeagueId,
                component: NFLHomeComponent,
                children: [{ path: UrlFragments.Team, children: [{ path: UrlParams.TeamId, component: TeamComponent }] }],
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: `${UrlFragments.Espn}/${UrlFragments.MLB}/${leagueId}`, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
