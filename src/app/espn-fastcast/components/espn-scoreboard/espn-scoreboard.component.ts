import { Component } from '@angular/core';
import { EspnFastcastEventToggleFacade } from '@app/espn-fastcast/facade/espn-fastcast-event-toggle.facade';
import { EspnFastcastEventFacade } from '@app/espn-fastcast/facade/espn-fastcast-event.facade';
import { EspnFastcastLeagueFacade } from '@app/espn-fastcast/facade/espn-fastcast-league.facade';
import { EspnFastcastFacade } from '@app/espn-fastcast/facade/espn-fastcast.facade';
import { FastcastEvent } from '@app/espn-fastcast/models/fastcast-event.model';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-espn-scoreboard',
  templateUrl: './espn-scoreboard.component.html',
  styleUrls: ['./espn-scoreboard.component.scss'],
})
export class EspnScoreboardComponent {
  selectedLeagueId: string = '10';

  constructor(
    readonly fastcastEventToggleFacade: EspnFastcastEventToggleFacade,
    readonly fastcastFacade: EspnFastcastFacade,
    readonly fastcastEventFacade: EspnFastcastEventFacade,
    readonly fastcastLeagueFacade: EspnFastcastLeagueFacade,
    readonly store: Store
  ) {}

  onLeaderboardFilterChange(val: string) {
    this.selectedLeagueId = val;
  }

  onToggleExpandedEvent(val: string) {
    this.fastcastEventToggleFacade.selectExpandedEvent(val);
  }

  onToggleOffExpandedEvent(val: string) {
    this.fastcastEventToggleFacade.deselectExpandedEvent(val);
  }

  onEventCardClick(event: FastcastEvent) {
    // this.store.dispatch(
    //   new Navigate([UrlFragments.Espn, UrlFragments.Game], {
    //     gameId: event.id,
    //   })
    // );
  }
}
