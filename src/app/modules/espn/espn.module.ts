import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { EspnComponent } from './espn.component';
import { StandingsComponent } from './components/standings/standings.component';
import { TeamComponent } from './components/team/team.component';
import { RosterComponent } from './components/roster/roster.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayerInfoColComponent } from './components/roster/player-info-col/player-info-col.component';
import { TeamInfoColComponent } from './components/standings/team-info-col/team-info-col.component';
import { RankingColComponent } from './components/standings/ranking-col/ranking-col.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { PlayerRatingColComponent } from './components/roster/player-rating-col/player-rating-col.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScoreboardExpComponent } from './components/scoreboard-exp/scoreboard-exp.component';
import { FreeAgentsComponent } from './components/free-agents/free-agents.component';

const components = [
  EspnComponent,
  StandingsComponent,
  TeamComponent,
  RosterComponent,
  PlayerComponent,
  ScoreboardComponent,
  ScoreboardExpComponent,
  PlayerInfoColComponent,
  PlayerRatingColComponent,
  TeamInfoColComponent,
  RankingColComponent,
  FreeAgentsComponent,
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    GridModule,
    BrowserAnimationsModule,
  ],
  exports: [StandingsComponent, RosterComponent]
})

export class EspnModule { }
