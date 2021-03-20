import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspnComponent } from './espn.component';
import { StandingsComponent } from './components/standings/standings.component';
import { MaterialModule } from 'src/app/material.module';
import { TeamComponent } from './components/team/team.component';
import { RosterComponent } from './components/roster/roster.component';
import { PlayerComponent } from './components/player/player.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlayerInfoColComponent } from './components/roster/player-info-col/player-info-col.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [EspnComponent, StandingsComponent, TeamComponent, RosterComponent, PlayerComponent, PlayerInfoColComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule
  ],
  exports: [StandingsComponent, RosterComponent]
})
export class EspnModule { }
