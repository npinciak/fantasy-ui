import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';
import { EspnLineupCardComponent } from './components/espn-lineup-card/espn-lineup-card.component';
import { EspnPlayerDialogComponent } from './components/espn-player-dialog/espn-player-dialog.component';
import { EspnPlayerInfoColComponent } from './components/espn-player-info-col/espn-player-info-col.component';
import { EspnPlayerTrendingColComponent } from './components/espn-player-trending-col/espn-player-trending-col.component';
import { EspnPlayerComponent } from './components/espn-player/espn-player.component';
import { EspnStandingsTableComponent } from './components/espn-standings-table/espn-standings-table.component';
import { EspnStatsTableComponent } from './components/espn-stats-table/espn-stats-table.component';
import { EspnTeamInfoColComponent } from './components/espn-team-info-col/espn-team-info-col.component';
import { EspnRoutingModule } from './espn-routing.module';
import { BaseballLineupCardComponent } from './mlb/components/baseball-lineup-card/baseball-lineup-card.component';
import { LeagueScoreboardComponent } from './mlb/components/league-scoreboard/league-scoreboard.component';
import { PlayerComponent } from './mlb/components/player/player.component';
import { StandingsComponent } from './mlb/components/standings/standings.component';
import { BaseballFreeAgentsComponent } from './mlb/pages/baseball-free-agents/baseball-free-agents.component';
import { BaseballHomeComponent } from './mlb/pages/baseball-home/baseball-home.component';
import { BaseballTeamComponent } from './mlb/pages/baseball-team/baseball-team.component';
import { FantasyBaseballEventsState } from './mlb/state/fantasy-baseball-events.state';
import { FantasyBaseballFreeAgentsFilterState } from './mlb/state/fantasy-baseball-free-agents-filter.state';
import { FantasyBaseballFreeAgentsState } from './mlb/state/fantasy-baseball-free-agents.state';
import { FantasyBaseballLeagueState } from './mlb/state/fantasy-baseball-league.state';
import { FantasyBaseballPlayerNewsState } from './mlb/state/fantasy-baseball-player-news.state';
import { FantasyBaseballTeamsLiveState } from './mlb/state/fantasy-baseball-team-live.state';
import { FantasyBaseballTeamState } from './mlb/state/fantasy-baseball-team.state';
import { FootballLineupCardComponent } from './nfl/components/football-lineup-card/football-lineup-card.component';
import { FootballScoreboardCardTeamComponent } from './nfl/components/football-scoreboard-card-team/football-scoreboard-card-team.component';
import { FootballFreeAgentsComponent } from './nfl/pages/football-free-agents/football-free-agents.component';
import { FootballHomeComponent } from './nfl/pages/football-home/football-home.component';
import { FootballTeamComponent } from './nfl/pages/football-team/football-team.component';
import { FantasyFootballFreeAgentsFilterState } from './nfl/state/fantasy-football-free-agents-filter.state';
import { FantasyFootballFreeAgentsState } from './nfl/state/fantasy-football-free-agents.state';
import { FantasyFootballLeagueState } from './nfl/state/fantasy-football-league.state';
import { FantasyFootballPlayerNewsState } from './nfl/state/fantasy-football-player-news.state';
import { FantasyFootballScheduleState } from './nfl/state/fantasy-football-schedule.state';
import { FantasyFootballTeamState } from './nfl/state/fantasy-football-teams.state';
import { FantasyFootballTransactionState } from './nfl/state/fantasy-football-transaction.state';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';

@NgModule({
  declarations: [
    EspnHomeComponent,
    BaseballHomeComponent,
    BaseballFreeAgentsComponent,
    BaseballTeamComponent,
    FootballHomeComponent,
    FootballFreeAgentsComponent,
    FootballTeamComponent,
    FootballLineupCardComponent,
    FootballScoreboardCardTeamComponent,
    EspnStatsTableComponent,
    EspnPlayerComponent,
    EspnPlayerTrendingColComponent,
    EspnPlayerInfoColComponent,
    StandingsComponent,
    PlayerComponent,
    EspnTeamInfoColComponent,
    LeagueScoreboardComponent,
    BaseballLineupCardComponent,
    EspnPlayerDialogComponent,
    EspnStandingsTableComponent,
    EspnLineupCardComponent,
  ],
  imports: [
    NgxsModule.forFeature([
      FantasyFootballLeagueState,
      FantasyFootballScheduleState,
      FantasyFootballTeamState,
      FantasyFootballFreeAgentsState,
      FantasyFootballFreeAgentsFilterState,
      FantasyFootballPlayerNewsState,
      FantasyFootballTransactionState,
      FantasyBaseballLeagueState,
      FantasyBaseballTeamState,
      FantasyBaseballTeamsLiveState,
      FantasyBaseballFreeAgentsState,
      FantasyBaseballFreeAgentsFilterState,
      FantasyBaseballPlayerNewsState,
      FantasyBaseballEventsState,
    ]),
    CommonModule,
    EspnRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [StandingsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EspnModule {}
