import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/@shared/shared.module';

import { ShellComponent } from './shell.component';
import { PageLayoutComponent } from '@app/@shared/components/page-layout/page-layout.component';
import { EspnScoreboardComponent } from '@app/@shared/components/espn-scoreboard/espn-scoreboard.component';
import { EspnScoreboardCardComponent } from '@app/@shared/components/espn-scoreboard-card/espn-scoreboard-card.component';
import { EspnScoreboardCardTeamComponent } from '@app/@shared/components/espn-scoreboard-card-team/espn-scoreboard-card-team.component';

@NgModule({
  imports: [SharedModule, CommonModule, MaterialModule, RouterModule],
  declarations: [
    ShellComponent,
    PageLayoutComponent,
    EspnScoreboardComponent,
    EspnScoreboardCardComponent,
    EspnScoreboardCardTeamComponent,
  ],
})
export class ShellModule {}
