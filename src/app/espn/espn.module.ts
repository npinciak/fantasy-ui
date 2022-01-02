import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { NgxsModule } from '@ngxs/store';

import { SharedModule } from '@app/@shared/shared.module';
import { EspnRoutingModule } from './espn-routing.module';

import { StandingsComponent } from './mlb/components/standings/standings.component';
import { TeamComponent } from './mlb/pages/team/team.component';
import { RosterComponent } from './mlb/components/roster/roster.component';
import { PlayerComponent } from './mlb/components/player/player.component';
import { PlayerInfoColComponent } from './mlb/components/roster/player-info-col/player-info-col.component';
import { TeamInfoColComponent } from './mlb/components/standings/team-info-col/team-info-col.component';
import { RankingColComponent } from './mlb/components/standings/ranking-col/ranking-col.component';
import { PlayerRatingColComponent } from './mlb/components/roster/player-rating-col/player-rating-col.component';
import { LeagueScoreboardComponent } from './mlb/components/league-scoreboard/league-scoreboard.component';
import { HomeComponent as FantasyBaseballHomeComponent } from './mlb/pages/home/home.component';
import { LineupCardComponent } from './mlb/components/lineup-card/lineup-card.component';
import { LineupCardPlayerComponent } from './mlb/components/lineup-card-player/lineup-card-player.component';
import { HomeComponent as FantasyFootballHomeComponent } from './nfl/pages/home/home.component';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';
import { EspnListTeamComponent } from './components/espn-list-team/espn-list-team.component';

import { FantasyBaseballLeagueState } from './mlb/state/fantasy-baseball-league.state';
import { FantasyBaseballTeamState } from './mlb/state/fantasy-baseball-team.state';
import { FantasyFootballLeagueState } from './nfl/state/fantasy-football-league.state';
import { FantasyFootballScheduleState } from './nfl/state/fantasy-football-schedule.state';
import { FantasyFootballTeamsState } from './nfl/state/fantasy-football-teams.state';

const components = [
  EspnHomeComponent,
  FantasyBaseballHomeComponent,
  StandingsComponent,
  TeamComponent,
  RosterComponent,
  PlayerComponent,
  PlayerInfoColComponent,
  PlayerRatingColComponent,
  TeamInfoColComponent,
  RankingColComponent,
  LeagueScoreboardComponent,
  LineupCardComponent,
  LineupCardPlayerComponent,
  FantasyFootballHomeComponent,
  EspnListTeamComponent,
];

const states = [
  FantasyFootballLeagueState,
  FantasyFootballScheduleState,
  FantasyFootballTeamsState,
  FantasyBaseballLeagueState,
  FantasyBaseballTeamState,
];

const modules = [
  CommonModule,
  EspnRoutingModule,
  MaterialModule,
  FlexLayoutModule,
  GridModule,
  SharedModule,
  NgxsModule.forFeature(states),
];

@NgModule({
  declarations: components,
  imports: modules,
  exports: [StandingsComponent, RosterComponent],
})
export class EspnModule {}
