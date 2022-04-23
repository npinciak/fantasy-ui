import { CommonModule } from '@angular/common';
import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { EspnFastcastEventMlbComponent } from './components/espn-fastcast-event-mlb/espn-fastcast-event-mlb.component';
import { EspnScoreboardCardTeamComponent } from './components/espn-scoreboard-card-team/espn-scoreboard-card-team.component';
import { EspnScoreboardCardComponent } from './components/espn-scoreboard-card/espn-scoreboard-card.component';
import { EspnScoreboardComponent } from './components/espn-scoreboard/espn-scoreboard.component';
import { EspnFastcastEventState } from './state/espn-fastcast-event.state';
import { EspnFastcastLeagueState } from './state/espn-fastcast-league.state';
import { EspnFastcastState } from './state/espn-fastcast.state';

const components = [EspnScoreboardComponent, EspnScoreboardCardComponent, EspnScoreboardCardTeamComponent, EspnFastcastEventMlbComponent];
const states = [EspnFastcastState, EspnFastcastEventState, EspnFastcastLeagueState];
@NgModule({
  declarations: components,
  exports: components,
  imports: [SharedModule, MaterialModule, CommonModule, NgxsModule.forFeature(states)],
})
export class EspnFastcastModule {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  resolveComponent(): ComponentFactory<EspnScoreboardComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(EspnScoreboardComponent);
  }
}
