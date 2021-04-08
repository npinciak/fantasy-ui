import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

import { EspnComponent } from './espn.component';
import { StandingsComponent } from './components/standings/standings.component';
import { TeamComponent } from './components/team/team.component';
import { RosterComponent } from './components/roster/roster.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayerInfoColComponent } from './components/roster/player-info-col/player-info-col.component';
import { TeamInfoColComponent } from './components/standings/team-info-col/team-info-col.component';
import { RankingColComponent } from './components/standings/ranking-col/ranking-col.component';

const components = [
  EspnComponent,
  StandingsComponent,
  TeamComponent,
  RosterComponent,
  PlayerComponent,
  PlayerInfoColComponent,
  TeamInfoColComponent,
  RankingColComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule
  ],
  exports: [StandingsComponent, RosterComponent]
})
export class EspnModule { }


