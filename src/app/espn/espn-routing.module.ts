import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlFragments, UrlParams } from '@app/@shared/url-builder';
import { FreeAgentsComponent } from './mlb/pages/free-agents/free-agents.component';
import { HomeComponent as MlbHomeComponent } from './mlb/pages/home/home.component';
import { TeamComponent as MlbTeamComponent } from './mlb/pages/team/team.component';
import { HomeComponent as NflHomeComponent } from './nfl/pages/home/home.component';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';
import { EspnResolver } from './resolvers/espn.resolver';

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
      component: MlbHomeComponent,
    },
    {
      path: UrlParams.LeagueId,
      children: [
        {
          path: UrlFragments.Empty,
          component: MlbHomeComponent,
        },
        {
          path: UrlFragments.FreeAgents,
          children: [
            {
              path: UrlFragments.Empty,
              component: FreeAgentsComponent,
            },
          ],
        },
        {
          path: UrlFragments.Team,
          children: [
            {
              path: UrlFragments.Empty,
              component: MlbTeamComponent,
            },
            {
              path: UrlParams.TeamId,
              component: MlbTeamComponent,
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
    resolve: [EspnResolver],
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
