import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { TeamComponent } from '@mlb/pages/team/team.component';
import { UrlFragments, UrlParams } from './@shared/urlBuilder';

import { HomeComponent as MLBHomeComponent } from '@mlb/pages/home/home.component';
import { HomeComponent as NFLHomeComponent } from '@espn/nfl/pages/home/home.component';
import { HomeComponent as MLBDfsHomeComponent } from './dfs/mlb/pages/home/home.component';
import { HomeComponent as NFLDfsHomeComponent } from './dfs/nfl/pages/home/home.component';

import { NFLDfsResolver } from './dfs/nfl/resolvers/dfs.resolver';
import { MLBDfsResolver } from './dfs/mlb/resolvers/dfs.resolver';

const leagueId = environment.production ? '' : environment.leagueId;

const routes: Routes = [
  {
    path: `${UrlFragments.Dfs}/mlb`,
    component: MLBDfsHomeComponent,
    resolve: { dfs: MLBDfsResolver },
    children: [{ path: UrlFragments.Empty, component: MLBDfsHomeComponent }],
  },
  {
    path: `${UrlFragments.Dfs}/nfl`,
    component: NFLDfsHomeComponent,
    resolve: { dfs: NFLDfsResolver },
    children: [{ path: UrlFragments.Empty, component: NFLDfsHomeComponent }],
  },

  { path: UrlFragments.Espn, component: MLBHomeComponent },
  {
    path: `${UrlFragments.Espn}/${UrlFragments.MLB}/${UrlParams.LeagueId}`,
    children: [
      { path: UrlFragments.Empty, component: MLBHomeComponent },
      { path: `${UrlFragments.Team}/${UrlParams.TeamId}`, component: TeamComponent },
    ],
  },
  {
    path: `${UrlFragments.Espn}/${UrlFragments.NFL}/${UrlParams.LeagueId}`,
    children: [{ path: UrlFragments.Empty, component: NFLHomeComponent }],
  },
  { path: '**', redirectTo: `${UrlFragments.Espn}/${UrlFragments.MLB}/${leagueId}`, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
