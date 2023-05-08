import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPathFragments, UrlPathParams } from '@app/@core/store/router/url-builder';
import { BaseballRoutes } from './mlb/baseball.routes';
import { FootballFreeAgentsComponent } from './nfl/pages/football-free-agents/football-free-agents.component';
import { FootballHomeComponent } from './nfl/pages/football-home/football-home.component';
import { FootballTeamComponent } from './nfl/pages/football-team/football-team.component';
import { FantasyFootballFreeAgentResolver } from './nfl/resolvers/fantasy-football-free-agent.resolver';
import { FantasyFootballLeagueResolver } from './nfl/resolvers/fantasy-football-league.resolver';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';

const nflRoutes = {
  path: UrlPathFragments.NFL,
  data: { sport: UrlPathFragments.NFL },
  children: [
    {
      path: UrlPathParams.Year,
      children: [
        {
          path: UrlPathFragments.League,
          children: [
            {
              path: UrlPathParams.LeagueId,
              resolve: [FantasyFootballLeagueResolver],
              children: [
                {
                  path: UrlPathFragments.Empty,
                  component: FootballHomeComponent,
                },
                {
                  path: UrlPathFragments.Team,
                  children: [
                    {
                      path: UrlPathParams.TeamId,
                      children: [
                        {
                          path: UrlPathFragments.Empty,
                          component: FootballTeamComponent,
                        },
                      ],
                    },
                  ],
                },
                {
                  path: UrlPathFragments.FreeAgents,
                  resolve: [FantasyFootballFreeAgentResolver],
                  children: [
                    {
                      path: UrlPathFragments.Empty,
                      component: FootballFreeAgentsComponent,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const routes: Routes = [
  {
    path: UrlPathFragments.Empty,
    component: EspnHomeComponent,
  },
  nflRoutes,
  BaseballRoutes,
  // { path: '**', redirectTo: UrlPathFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspnRoutingModule {}
