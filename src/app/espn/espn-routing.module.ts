import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlFragments, UrlParams } from '@app/@shared/url-builder';
import { BaseballFreeAgentsComponent } from './mlb/pages/baseball-free-agents/baseball-free-agents.component';
import { BaseballHomeComponent } from './mlb/pages/baseball-home/baseball-home.component';
import { BaseballTeamComponent } from './mlb/pages/baseball-team/baseball-team.component';
import { FantasyBaseballResolver } from './mlb/resolvers/mlb.resolver';
import { FootballFreeAgentsComponent } from './nfl/pages/football-free-agents/football-free-agents.component';
import { FootballHomeComponent } from './nfl/pages/football-home/football-home.component';
import { FootballTeamComponent } from './nfl/pages/football-team/football-team.component';
import { FantasyFootballFreeAgentsResolver } from './nfl/resolvers/fantasy-football-free-agents.resolver';
import { FantasyFootballLeagueResolver } from './nfl/resolvers/fantasy-football-league.resolver';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';

const nflRoutes = {
  path: UrlFragments.NFL,
  data: { sport: UrlFragments.NFL },
  children: [
    {
      path: UrlFragments.Empty,
      component: FootballHomeComponent,
    },
    {
      path: UrlParams.LeagueId,
      resolve: [FantasyFootballLeagueResolver],
      children: [
        {
          path: UrlFragments.Empty,
          component: FootballHomeComponent,
        },
        {
          path: UrlFragments.FreeAgents,
          resolve: [FantasyFootballFreeAgentsResolver],
          children: [
            {
              path: UrlFragments.Empty,
              component: FootballFreeAgentsComponent,
            },
          ],
        },
        {
          path: UrlFragments.Team,
          children: [
            {
              path: UrlFragments.Empty,
              component: FootballHomeComponent,
            },
            {
              path: UrlParams.TeamId,
              component: FootballTeamComponent,
            },
          ],
        },
      ],
    },
  ],
};

const mlbRoutes = {
  path: UrlFragments.MLB,
  data: { sport: UrlFragments.MLB },
  children: [
    {
      path: UrlFragments.Empty,
      component: BaseballHomeComponent,
    },
    {
      path: UrlParams.LeagueId,
      resolve: [FantasyBaseballResolver],
      children: [
        {
          path: UrlFragments.Empty,
          component: BaseballHomeComponent,
        },
        {
          path: UrlFragments.FreeAgents,
          children: [
            {
              path: UrlFragments.Empty,
              component: BaseballFreeAgentsComponent,
            },
          ],
        },
        {
          path: UrlFragments.Team,
          children: [
            {
              path: UrlFragments.Empty,
              component: BaseballTeamComponent,
            },
            {
              path: UrlParams.TeamId,
              component: BaseballTeamComponent,
            },
          ],
        },
      ],
    },
  ],
};

export const routes: Routes = [
  {
    path: UrlFragments.Empty,
    component: EspnHomeComponent,
  },
  nflRoutes,
  mlbRoutes,
  { path: '**', redirectTo: UrlFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspnRoutingModule {}
