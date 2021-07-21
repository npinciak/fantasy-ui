import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { StandingsComponent } from './mlb/components/standings/standings.component';
import { TeamComponent } from './mlb/pages/team/team.component';
import { RosterComponent } from './mlb/components/roster/roster.component';
import { PlayerComponent } from './mlb/components/player/player.component';
import { PlayerInfoColComponent } from './mlb/components/roster/player-info-col/player-info-col.component';
import { TeamInfoColComponent } from './mlb/components/standings/team-info-col/team-info-col.component';
import { RankingColComponent } from './mlb/components/standings/ranking-col/ranking-col.component';
import { ScoreboardComponent } from './mlb/components/scoreboard/scoreboard.component';
import { PlayerRatingColComponent } from './mlb/components/roster/player-rating-col/player-rating-col.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeagueScoreboardComponent } from './mlb/components/league-scoreboard/league-scoreboard.component';
import { SharedModule } from '@app/@shared/shared.module';
import { ScoreboardEventComponent } from './mlb/components/scoreboard-event/scoreboard-event.component';
import { HomeComponent } from './mlb/pages/home/home.component';
import { StadiumWeatherComponent } from './mlb/components/stadium-weather/stadium-weather.component';
import { LineupCardComponent } from './mlb/components/lineup-card/lineup-card.component';

const components = [
  HomeComponent,
  StandingsComponent,
  TeamComponent,
  RosterComponent,
  PlayerComponent,
  ScoreboardComponent,
  ScoreboardEventComponent,
  PlayerInfoColComponent,
  PlayerRatingColComponent,
  TeamInfoColComponent,
  RankingColComponent,
  StadiumWeatherComponent,
  LeagueScoreboardComponent,
  LineupCardComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, MaterialModule, FlexLayoutModule, GridModule, SharedModule, BrowserAnimationsModule],
  exports: [StandingsComponent, RosterComponent],
})
export class EspnModule {}
