import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPathFragments, UrlPathParams } from '@app/@core/store/router/url-builder';
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
      path: UrlPathFragments.Empty,
      component: BaseballHomeComponent,
    },
    {
      path: UrlPathParams.LeagueId,
      resolve: [FantasyBaseballResolver],
      children: [
        {
          path: UrlPathFragments.Empty,
          component: BaseballHomeComponent,
        },
        {
          path: UrlPathFragments.FreeAgents,
          children: [
            {
              path: UrlPathFragments.Empty,
              component: BaseballFreeAgentsComponent,
            },
          ],
        },
        {
          path: UrlPathFragments.Team,
          children: [
            {
              path: UrlPathFragments.Empty,
              component: BaseballTeamComponent,
            },
            {
              path: UrlPathParams.TeamId,
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
