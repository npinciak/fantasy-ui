import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
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

const components = [EspnScoreboardComponent, EspnScoreboardCardComponent, EspnScoreboardCardTeamComponent, EspnFastcastEventMlbComponent];
const states = [
  EspnFastcastConnectionState,
  EspnFastcastEventsState,
  EspnFastcastLeagueState,
  EspnFastcastTeamState,
  EspnFastcastSportState,
  EspnFastcastEventToggleState,
];
@NgModule({
  declarations: components,
  exports: components,
  imports: [SharedModule, FlexLayoutModule, MaterialModule, CommonModule, NgxsModule.forFeature(states)],
})
export class EspnFastcastModule {}
