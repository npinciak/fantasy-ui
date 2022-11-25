import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { SportsUiModule } from '@app/sports-ui/sports-ui.module';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';
import { EspnPlayerDialogComponent } from './components/espn-player-dialog/espn-player-dialog.component';
import { EspnPlayerTrendingColComponent } from './components/espn-player-trending-col/espn-player-trending-col.component';
import { EspnPlayerComponent } from './components/espn-player/espn-player.component';
import { EspnStandingsTableComponent } from './components/espn-standings-table/espn-standings-table.component';
import { EspnStatsTableComponent } from './components/espn-stats-table/espn-stats-table.component';
import { EspnTeamInfoColComponent } from './components/espn-team-info-col/espn-team-info-col.component';
import { EspnRoutingModule } from './espn-routing.module';
import { LeagueScoreboardComponent } from './mlb/components/league-scoreboard/league-scoreboard.component';
import { LineupCardComponent } from './mlb/components/lineup-card/lineup-card.component';
import { PlayerComponent } from './mlb/components/player/player.component';
import { PlayerInfoColComponent } from './mlb/components/roster/player-info-col/player-info-col.component';
import { PlayerRatingColComponent } from './mlb/components/roster/player-rating-col/player-rating-col.component';
import { PlayerTrendingColComponent } from './mlb/components/roster/player-trending-col/player-trending-col.component';
import { RosterComponent } from './mlb/components/roster/roster.component';
import { StandingsComponent } from './mlb/components/standings/standings.component';
import { BaseballFreeAgentsComponent } from './mlb/pages/baseball-free-agents/baseball-free-agents.component';
import { BaseballHomeComponent } from './mlb/pages/baseball-home/baseball-home.component';
import { BaseballTeamComponent } from './mlb/pages/baseball-team/baseball-team.component';
import { FantasyBaseballEventsState } from './mlb/state/fantasy-baseball-events.state';
import { FantasyBaseballFreeAgentsFilterState } from './mlb/state/fantasy-baseball-free-agents-filter.state';
import { FantasyBaseballFreeAgentsState } from './mlb/state/fantasy-baseball-free-agents.state';
import { FantasyBaseballLeagueState } from './mlb/state/fantasy-baseball-league.state';
import { FantasyBaseballPlayerState } from './mlb/state/fantasy-baseball-player.state';
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
import { FantasyFootballScheduleState } from './nfl/state/fantasy-football-schedule.state';
import { FantasyFootballTeamState } from './nfl/state/fantasy-football-teams.state';
import { FantasyFootballTransactionState } from './nfl/state/fantasy-football-transaction.state';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';

const states = [
  FantasyFootballLeagueState,
  FantasyFootballScheduleState,
  FantasyFootballTeamState,
  FantasyFootballFreeAgentsState,
  FantasyFootballFreeAgentsFilterState,
  FantasyFootballTransactionState,
  FantasyBaseballLeagueState,
  FantasyBaseballTeamState,
  FantasyBaseballTeamsLiveState,
  FantasyBaseballFreeAgentsState,
  FantasyBaseballFreeAgentsFilterState,
  FantasyBaseballPlayerState,
  FantasyBaseballEventsState,
];

const imports = [CommonModule, EspnRoutingModule, MaterialModule, SharedModule, SportsUiModule, NgxsModule.forFeature(states)];

const exports = [StandingsComponent, RosterComponent];

@NgModule({
  imports,
  exports,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    StandingsComponent,
    RosterComponent,
    PlayerComponent,
    PlayerInfoColComponent,
    PlayerTrendingColComponent,
    PlayerRatingColComponent,
    EspnTeamInfoColComponent,
    LeagueScoreboardComponent,
    LineupCardComponent,
    EspnPlayerDialogComponent,
    EspnStandingsTableComponent,
  ],
})
export class EspnModule {}
