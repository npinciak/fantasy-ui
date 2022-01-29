import { Component } from '@angular/core';
import { EspnFastcastEventFacade } from '@app/espn/facade/espn-fastcast-event.facade';
import { EspnFastcastLeagueFacade } from '@app/espn/facade/espn-fastcast-league.facade';
import { EspnFastcastFacade } from '@app/espn/facade/espn-fastcast.facade';

@Component({
  selector: 'app-espn-scoreboard',
  templateUrl: './espn-scoreboard.component.html',
  styleUrls: ['./espn-scoreboard.component.scss'],
})
export class EspnScoreboardComponent {
  constructor(
    readonly fastcastFacade: EspnFastcastFacade,
    readonly fastcastEventFacade: EspnFastcastEventFacade,
    readonly fastcastLeagueFacade: EspnFastcastLeagueFacade
  ) {}
}
