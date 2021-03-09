import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspnComponent } from './espn.component';
import { StandingsComponent } from './components/standings/standings.component';
import { MaterialModule } from 'src/app/material.module';
import { TeamComponent } from './components/team/team.component';
import { RosterComponent } from './components/roster/roster.component';



@NgModule({
  declarations: [EspnComponent, StandingsComponent, TeamComponent, RosterComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [StandingsComponent, RosterComponent]
})
export class EspnModule { }
