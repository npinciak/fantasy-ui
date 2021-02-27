import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspnComponent } from './espn.component';
import { StandingsComponent } from './components/standings/standings.component';
import { MaterialModule } from 'src/app/material.module';
import { TeamComponent } from './components/team/team.component';



@NgModule({
  declarations: [EspnComponent, StandingsComponent, TeamComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [StandingsComponent]
})
export class EspnModule { }
