import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlFragments, UrlParams } from '@app/@shared/url-builder';
import { BaseballFreeAgentsComponent } from './mlb/pages/baseball-free-agents/baseball-free-agents.component';
import { BaseballHomeComponent } from './mlb/pages/baseball-home/baseball-home.component';
import { BaseballTeamComponent } from './mlb/pages/baseball-team/baseball-team.component';
import { FantasyBaseballResolver } from './mlb/resolvers/mlb.resolver';
import { HomeComponent as NflHomeComponent } from './nfl/pages/home/home.component';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';

const nflRoutes = {
  path: UrlFragments.NFL,
  children: [
    {
      path: UrlFragments.Empty,
      component: NflHomeComponent,
    },
    {
      path: UrlParams.LeagueId,
      children: [
        {
          path: UrlFragments.Empty,
          component: NflHomeComponent,
        },
        {
          path: UrlFragments.Team,
          children: [
            {
              path: UrlFragments.Empty,
              component: NflHomeComponent,
            },
            {
              path: UrlParams.TeamId,
              component: NflHomeComponent,
            },
          ],
        },
      ],
    },
  ],
};

const mlbRoutes = {
  path: UrlFragments.MLB,
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
