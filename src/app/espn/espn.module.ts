import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';
import { EspnFastcastEventToggleState } from '../espn-fastcast/state/espn-fastcast-event-toggle.state';
import { AddLeagueFormComponent } from './components/add-league-form/add-league-form.component';
import { EspnStatsTableComponent } from './components/espn-stats-table/espn-stats-table.component';
import { EspnRoutingModule } from './espn-routing.module';
import { LeagueScoreboardComponent } from './mlb/components/league-scoreboard/league-scoreboard.component';
import { LineupCardPlayerComponent } from './mlb/components/lineup-card-player/lineup-card-player.component';
import { LineupCardComponent } from './mlb/components/lineup-card/lineup-card.component';
import { PlayerComponent } from './mlb/components/player/player.component';
import { PlayerInfoColComponent } from './mlb/components/roster/player-info-col/player-info-col.component';
import { PlayerRatingColComponent } from './mlb/components/roster/player-rating-col/player-rating-col.component';
import { PlayerTrendingColComponent } from './mlb/components/roster/player-trending-col/player-trending-col.component';
import { RosterComponent } from './mlb/components/roster/roster.component';
import { StandingsComponent } from './mlb/components/standings/standings.component';
import { TeamInfoColComponent } from './mlb/components/standings/team-info-col/team-info-col.component';
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
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';
import { EspnAddLeagueFormState } from './state/espn-add-league-form.state';
import { EspnLeaguesState } from './state/espn-leagues.state';

const declarations = [
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
  StandingsComponent,
  RosterComponent,
  PlayerComponent,
  PlayerInfoColComponent,
  PlayerTrendingColComponent,
  PlayerRatingColComponent,
  TeamInfoColComponent,
  LeagueScoreboardComponent,
  LineupCardComponent,
  LineupCardPlayerComponent,
  AddLeagueFormComponent,
];

const states = [
  FantasyFootballLeagueState,
  FantasyFootballScheduleState,
  FantasyFootballTeamState,
  FantasyFootballFreeAgentsState,
  FantasyFootballFreeAgentsFilterState,
  FantasyBaseballLeagueState,
  FantasyBaseballTeamState,
  FantasyBaseballTeamsLiveState,
  FantasyBaseballFreeAgentsState,
  FantasyBaseballFreeAgentsFilterState,
  FantasyBaseballPlayerState,
  FantasyBaseballEventsState,
  EspnFastcastEventToggleState,
  EspnAddLeagueFormState,
  EspnLeaguesState,
];

const imports = [
  CommonModule,
  EspnRoutingModule,
  MaterialModule,
  FlexLayoutModule,
  GridModule,
  SharedModule,
  NgxsModule.forFeature(states),
];

const exports = [StandingsComponent, RosterComponent];

@NgModule({
  declarations,
  imports,
  exports,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EspnModule {}
