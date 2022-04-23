import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { EspnFastcastEventFacade } from '@app/espn-fastcast/facade/espn-fastcast-event.facade';
import { EspnFastcastLeagueFacade } from '@app/espn-fastcast/facade/espn-fastcast-league.facade';
import { EspnFastcastFacade } from '@app/espn-fastcast/facade/espn-fastcast.facade';

@Component({
  selector: 'app-espn-scoreboard',
  templateUrl: './espn-scoreboard.component.html',
  styleUrls: ['./espn-scoreboard.component.scss'],
})
export class EspnScoreboardComponent {
  selectedLeagueId: string = '10';

  constructor(
    readonly fastcastFacade: EspnFastcastFacade,
    readonly fastcastEventFacade: EspnFastcastEventFacade,
    readonly fastcastLeagueFacade: EspnFastcastLeagueFacade
  ) {}

  onLeaderboardFilterChange(event: MatSelectChange) {
    this.selectedLeagueId = event.value;
    this.fastcastEventFacade.fastcastLeagueChangeLeaderboard(event.value);
  }

  onToggleExpandedEvent(val: string) {
    this.fastcastEventFacade.selectExpandedEvent(val);
  }

  onToggleOffExpandedEvent(val: string) {
    this.fastcastEventFacade.deselectExpandedEvent(val);
  }
}
