import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { EspnFastcastEventMlbComponent } from './components/espn-fastcast-event-mlb/espn-fastcast-event-mlb.component';
import { EspnScoreboardCardTeamComponent } from './components/espn-scoreboard-card-team/espn-scoreboard-card-team.component';
import { EspnScoreboardCardComponent } from './components/espn-scoreboard-card/espn-scoreboard-card.component';
import { EspnScoreboardComponent } from './components/espn-scoreboard/espn-scoreboard.component';
import { EspnFastcastConnectionState } from './state/espn-fastcast-connection.state';
import { EspnFastcastEventToggleState } from './state/espn-fastcast-event-toggle.state';
import { EspnFastcastEventsState } from './state/espn-fastcast-events.state';
import { EspnFastcastLeagueState } from './state/espn-fastcast-league.state';
import { EspnFastcastSportState } from './state/espn-fastcast-sport.state';
import { EspnFastcastTeamState } from './state/espn-fastcast-team.state';
import { EspnFastcastConnectionHandler } from './handlers/espn-fastcast-connection.handler';

@NgModule({
  declarations: [EspnScoreboardComponent, EspnScoreboardCardComponent, EspnScoreboardCardTeamComponent, EspnFastcastEventMlbComponent],
  exports: [EspnScoreboardComponent],
  imports: [
    SharedModule,
    MaterialModule,
    CommonModule,
    NgxsModule.forFeature([
      EspnFastcastConnectionHandler,
      EspnFastcastConnectionState,
      EspnFastcastEventsState,
      EspnFastcastLeagueState,
      EspnFastcastTeamState,
      EspnFastcastSportState,
      EspnFastcastEventToggleState,
    ]),
  ],
})
export class EspnFastcastModule {}
