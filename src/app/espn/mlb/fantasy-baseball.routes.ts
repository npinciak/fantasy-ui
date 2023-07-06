import { UrlPathFragments, UrlPathParams } from '@app/@core/store/router/url-builder';
import { BaseballBattersComponent } from './pages/baseball-batters/baseball-batters.component';
import { BaseballFreeAgentsComponent } from './pages/baseball-free-agents/baseball-free-agents.component';
import { BaseballHomeComponent } from './pages/baseball-home/baseball-home.component';
import { BaseballPlayerComponent } from './pages/baseball-player/baseball-player.component';
import { BaseballTeamComponent } from './pages/baseball-team/baseball-team.component';
import { FantasyBaseballFreeAgentsResolver } from './resolvers/fantasy-baseball-free-agents.resolver';
import { FantasyBaseballLeagueResolver } from './resolvers/fantasy-baseball-league.resolver';
import { FantasyBaseballPlayerNewsResolver } from './resolvers/fantasy-baseball-player-news.resolver';

export const FantasyBaseballRoutes = {
  path: UrlPathFragments.MLB,
  data: { sport: UrlPathFragments.MLB },
  children: [
    {
      // year
      path: UrlPathParams.Year,
      children: [
        {
          path: UrlPathFragments.League,
          children: [
            {
              // league
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
                      // team
                      path: UrlPathParams.TeamId,
                      children: [
                        {
                          path: UrlPathFragments.Empty,
                          component: BaseballTeamComponent,
                        },
                        {
                          path: UrlPathFragments.Batters,
                          children: [
                            {
                              path: UrlPathFragments.Empty,
                              component: BaseballBattersComponent,
                              data: { position: UrlPathFragments.Batters },
                            },
                          ],
                        },
                        {
                          path: UrlPathFragments.Pitchers,
                          children: [
                            {
                              path: UrlPathFragments.Empty,
                              component: BaseballTeamComponent,
                              data: { position: UrlPathFragments.Pitchers },
                            },
                          ],
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
                {
                  path: UrlPathFragments.Player,
                  children: [
                    {
                      // player
                      path: UrlPathParams.PlayerId,
                      resolve: [FantasyBaseballPlayerNewsResolver],
                      children: [
                        {
                          path: UrlPathFragments.Empty,
                          component: BaseballPlayerComponent,
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
  ],
};
