import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPathFragments, UrlPathParams } from '@app/@core/store/router/url-builder';
import { BaseballFreeAgentsComponent } from './mlb/pages/baseball-free-agents/baseball-free-agents.component';
import { BaseballHomeComponent } from './mlb/pages/baseball-home/baseball-home.component';
import { BaseballTeamComponent } from './mlb/pages/baseball-team/baseball-team.component';
import { FantasyBaseballFreeAgentsResolver } from './mlb/resolvers/fantasy-baseball-free-agents.resolver';
import { FantasyBaseballLeagueResolver } from './mlb/resolvers/fantasy-baseball-league.resolver';
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

  //   data: { sport: UrlPathFragments.NFL },
  //   // canActivate: [AuthenticationGuard],
  //   children: [
  //     {
  //       path: UrlPathFragments.Empty,
  //       component: FootballHomeComponent,
  //     },
  //     {
  //       path: UrlPathParams.LeagueId,
  //       resolve: [FantasyFootballLeagueResolver],
  //       children: [
  //         {
  //           path: UrlPathFragments.Empty,
  //           component: FootballHomeComponent,
  //         },
  //         {
  //           path: UrlPathFragments.FreeAgents,
  //           resolve: [FantasyFootballFreeAgentsResolver],
  //           children: [
  //             {
  //               path: UrlPathFragments.Empty,
  //               component: FootballFreeAgentsComponent,
  //             },
  //           ],
  //         },
  //         {
  //           path: UrlPathFragments.Team,
  //           children: [
  //             {
  //               path: UrlPathFragments.Empty,
  //               component: FootballHomeComponent,
  //             },
  //             {
  //               path: UrlPathParams.TeamId,
  //               component: FootballTeamComponent,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
};

const mlbRoutes = {
  path: UrlPathFragments.MLB,
  data: { sport: UrlPathFragments.MLB },
  children: [
    {
      path: UrlPathParams.Year,
      children: [
        {
          path: UrlPathFragments.League,
          children: [
            {
              path: UrlPathParams.LeagueId,
              resolve: [FantasyBaseballLeagueResolver],
              children: [
                {
                  path: UrlPathFragments.Empty,
                  component: BaseballHomeComponent,
                },
                {
                  path: UrlPathFragments.Team,
                  children: [
                    {
                      path: UrlPathParams.TeamId,
                      children: [
                        {
                          path: UrlPathFragments.Empty,
                          component: BaseballTeamComponent,
                        },
                      ],
                    },
                  ],
                },
                {
                  path: UrlPathFragments.FreeAgents,
                  resolve: [FantasyBaseballFreeAgentsResolver],
                  children: [
                    {
                      path: UrlPathFragments.Empty,
                      component: BaseballFreeAgentsComponent,
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
  mlbRoutes,
  // { path: '**', redirectTo: UrlPathFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspnRoutingModule {}
