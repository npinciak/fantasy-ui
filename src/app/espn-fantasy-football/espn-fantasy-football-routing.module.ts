import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPathFragments, UrlPathParams } from '@app/@core/store/router/url-builder';
import { FootballFreeAgentsComponent } from './pages/football-free-agents/football-free-agents.component';
import { FootballHomeComponent } from './pages/football-home/football-home.component';
import { FootballTeamComponent } from './pages/football-team/football-team.component';
import { FantasyFootballFreeAgentsResolver } from './resolvers/fantasy-football-free-agents.resolver';
import { FantasyFootballLeagueResolver } from './resolvers/fantasy-football-league.resolver';

export const routes: Routes = [
  {
    path: UrlPathFragments.Empty,
    data: { sport: UrlPathFragments.Football },
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
                    resolve: [FantasyFootballFreeAgentsResolver],
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspnFantasyFootballRoutingModule {}
