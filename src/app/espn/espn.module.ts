import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { EspnFastcastModule } from '@app/espn-fastcast/espn-fastcast.module';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';
import { EspnFreeAgentFilterComponentComponent } from './components/espn-free-agent-filter-component/espn-free-agent-filter-component.component';
import { EspnPlayerDialogComponent } from './components/espn-player-dialog/espn-player-dialog.component';
import { EspnPlayerInfoColComponent } from './components/espn-player-info-col/espn-player-info-col.component';
import { EspnPlayerNewsComponent } from './components/espn-player-news/espn-player-news.component';
import { EspnPlayerTrendingColComponent } from './components/espn-player-trending-col/espn-player-trending-col.component';
import { EspnPlayerComponent } from './components/espn-player/espn-player.component';
import { EspnStandingsTableComponent } from './components/espn-standings-table/espn-standings-table.component';
import { EspnStatsTableComponent } from './components/espn-stats-table/espn-stats-table.component';
import { EspnTeamInfoColComponent } from './components/espn-team-info-col/espn-team-info-col.component';
import { FantasyTeamHeaderComponent } from './components/fantasy-team-header/fantasy-team-header.component';
import { EspnRoutingModule } from './espn-routing.module';
import { BaseballLineupCardComponent } from './mlb/components/baseball-lineup-card/baseball-lineup-card.component';
import { LeagueScoreboardComponent } from './mlb/components/league-scoreboard/league-scoreboard.component';
import { FantasyBaseballLeagueActionHandler } from './mlb/handlers/fantasy-baseball-league.handler';
import { FantasyBaseballPlayerCardActionHandler } from './mlb/handlers/fantasy-baseball-player-card.handler';
import { BaseballBattersComponent } from './mlb/pages/baseball-batters/baseball-batters.component';
import { BaseballFreeAgentsComponent } from './mlb/pages/baseball-free-agents/baseball-free-agents.component';
import { BaseballHomeComponent } from './mlb/pages/baseball-home/baseball-home.component';
import { BaseballPitchersComponent } from './mlb/pages/baseball-pitchers/baseball-pitchers.component';
import { BaseballPlayerComponent } from './mlb/pages/baseball-player/baseball-player.component';
import { BaseballTeamComponent } from './mlb/pages/baseball-team/baseball-team.component';
import { FantasyBaseballEventsState } from './mlb/state/fantasy-baseball-events.state';
import { FantasyBaseballFreeAgentsFilterState } from './mlb/state/fantasy-baseball-free-agents-filter.state';
import { FantasyBaseballFreeAgentsState } from './mlb/state/fantasy-baseball-free-agents.state';
import { FantasyBaseballLeagueState } from './mlb/state/fantasy-baseball-league.state';
import { FantasyBaseballPlayerCardState } from './mlb/state/fantasy-baseball-player-card.state';
import { FantasyBaseballPlayerNewsState } from './mlb/state/fantasy-baseball-player-news.state';
import { FantasyBaseballProTeamScheduleState } from './mlb/state/fantasy-baseball-pro-team-schedule.state';
import { FantasyBaseballTeamsLiveState } from './mlb/state/fantasy-baseball-team-live.state';
import { FantasyBaseballTeamState } from './mlb/state/fantasy-baseball-team.state';
import { FootballLineupCardComponent } from './nfl/components/football-lineup-card/football-lineup-card.component';
import { FootballScoreboardCardTeamComponent } from './nfl/components/football-scoreboard-card-team/football-scoreboard-card-team.component';
import { FootballTeamHeaderComponent } from './nfl/components/football-team-header/football-team-header.component';
import { FantasyFootballLeagueActionHandler } from './nfl/handlers/fantasy-football-league.handler';
import { FootballFreeAgentsComponent } from './nfl/pages/football-free-agents/football-free-agents.component';
import { FootballHomeComponent } from './nfl/pages/football-home/football-home.component';
import { FootballTeamComponent } from './nfl/pages/football-team/football-team.component';
import { FantasyFootballFreeAgentFilterState } from './nfl/state/fantasy-football-free-agent-filter.state';
import { FantasyFootballFreeAgentState } from './nfl/state/fantasy-football-free-agent.state';
import { FantasyFootballLeagueState } from './nfl/state/fantasy-football-league.state';
import { FantasyFootballPlayerNewsState } from './nfl/state/fantasy-football-player-news.state';
import { FantasyFootballScheduleState } from './nfl/state/fantasy-football-schedule.state';
import { FantasyFootballTeamState } from './nfl/state/fantasy-football-team.state';
import { FantasyFootballTransactionState } from './nfl/state/fantasy-football-transaction.state';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';
import { FreeAgentsAvailabilitySelectedState } from './state/free-agent-availability-selected.state';

@NgModule({
  declarations: [
    EspnHomeComponent,
    BaseballHomeComponent,
    BaseballFreeAgentsComponent,
    BaseballTeamComponent,
    FootballHomeComponent,
    FootballFreeAgentsComponent,
    FootballTeamComponent,
    FootballTeamHeaderComponent,
    FootballLineupCardComponent,
    FootballScoreboardCardTeamComponent,
    EspnStatsTableComponent,
    EspnPlayerComponent,
    EspnPlayerNewsComponent,
    EspnPlayerTrendingColComponent,
    EspnPlayerInfoColComponent,
    EspnTeamInfoColComponent,
    LeagueScoreboardComponent,
    EspnPlayerDialogComponent,
    BaseballLineupCardComponent,
    EspnStandingsTableComponent,
    FantasyTeamHeaderComponent,
    EspnFreeAgentFilterComponentComponent,
    BaseballPlayerComponent,
    BaseballBattersComponent,
    BaseballPitchersComponent,
  ],
  imports: [
    EspnRoutingModule,
    EspnFastcastModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    NgxsModule.forFeature([
      FantasyFootballLeagueActionHandler,
      FantasyFootballLeagueState,
      FantasyFootballScheduleState,
      FantasyFootballTeamState,
      FantasyFootballFreeAgentState,
      FantasyFootballFreeAgentFilterState,
      FantasyFootballPlayerNewsState,
      FantasyFootballTransactionState,
      FantasyBaseballLeagueActionHandler,
      FantasyBaseballLeagueState,
      FantasyBaseballTeamState,
      FantasyBaseballTeamsLiveState,
      FantasyBaseballFreeAgentsState,
      FantasyBaseballFreeAgentsFilterState,
      FantasyBaseballPlayerNewsState,
      FantasyBaseballPlayerCardState,
      FantasyBaseballPlayerCardActionHandler,
      FantasyBaseballEventsState,
      FantasyBaseballProTeamScheduleState,
      FreeAgentsAvailabilitySelectedState,
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EspnModule {}
