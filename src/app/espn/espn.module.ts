import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';
import { EspnFastcastEventToggleState } from '../espn-fastcast/state/espn-fastcast-event-toggle.state';
import { AddLeagueFormComponent } from './components/add-league-form/add-league-form.component';
import { EspnListTeamComponent } from './components/espn-list-team/espn-list-team.component';
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
import { FreeAgentsComponent } from './mlb/pages/free-agents/free-agents.component';
import { HomeComponent as FantasyBaseballHomeComponent } from './mlb/pages/home/home.component';
import { TeamComponent } from './mlb/pages/team/team.component';
import { FantasyBaseballFreeAgentsState } from './mlb/state/fantasy-baseball-free-agents.state';
import { FantasyBaseballLeagueState } from './mlb/state/fantasy-baseball-league.state';
import { FantasyBaseballPlayerState } from './mlb/state/fantasy-baseball-player.state';
import { FantasyBaseballTeamsLiveState } from './mlb/state/fantasy-baseball-team-live.state';
import { FantasyBaseballTeamState } from './mlb/state/fantasy-baseball-team.state';
import { HomeComponent as FantasyFootballHomeComponent } from './nfl/pages/home/home.component';
import { FantasyFootballLeagueState } from './nfl/state/fantasy-football-league.state';
import { FantasyFootballScheduleState } from './nfl/state/fantasy-football-schedule.state';
import { FantasyFootballTeamsState } from './nfl/state/fantasy-football-teams.state';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';
import { EspnAddLeagueFormState } from './state/espn-add-league-form.state';

const declarations = [
  EspnHomeComponent,
  FantasyBaseballHomeComponent,
  FreeAgentsComponent,
  StandingsComponent,
  TeamComponent,
  RosterComponent,
  PlayerComponent,
  PlayerInfoColComponent,
  PlayerTrendingColComponent,
  PlayerRatingColComponent,
  TeamInfoColComponent,
  LeagueScoreboardComponent,
  LineupCardComponent,
  LineupCardPlayerComponent,
  FantasyFootballHomeComponent,
  EspnListTeamComponent,
  AddLeagueFormComponent,
];

const states = [
  FantasyFootballLeagueState,
  FantasyFootballScheduleState,
  FantasyFootballTeamsState,
  FantasyBaseballLeagueState,
  FantasyBaseballTeamState,
  FantasyBaseballTeamsLiveState,
  FantasyBaseballFreeAgentsState,
  FantasyBaseballPlayerState,
  EspnFastcastEventToggleState,
  EspnAddLeagueFormState,
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
