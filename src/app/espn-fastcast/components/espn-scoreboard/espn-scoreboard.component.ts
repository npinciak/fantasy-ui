import { Component } from '@angular/core';
import { LayoutService } from '@app/@shared/services/layout.service';
import { EspnFastcastConnectionFacade } from '@app/espn-fastcast/facade/espn-fastcast-connection.facade';
import { EspnFastcastEventToggleFacade } from '@app/espn-fastcast/facade/espn-fastcast-event-toggle.facade';
import { EspnFastcastEventFacade } from '@app/espn-fastcast/facade/espn-fastcast-event.facade';
import { EspnFastcastLeagueFacade } from '@app/espn-fastcast/facade/espn-fastcast-league.facade';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';

@Component({
  selector: 'app-espn-scoreboard',
  templateUrl: './espn-scoreboard.component.html',
  styleUrls: ['./espn-scoreboard.component.scss'],
})
export class EspnScoreboardComponent {
  selectedLeagueId$ = this.fastcastFacade.selectedLeagueId$;

  showNoEventsMessage$ = this.fastcastFacade.showNoEventsMessage$;
  feedLoadingValue$ = this.fastcastFacade.feedLoadingValue$;
  showFeed$ = of(true); //this.fastcastFacade.showFeed$;
  showLoader$ = this.fastcastFacade.showLoader$;
  lastRefreshAsTickerDate$ = this.fastcastFacade.lastRefreshAsTickerDate$;
  paused$ = this.fastcastFacade.paused$;

  leagueList$ = this.fastcastLeagueFacade.leagueList$;

  eventsByLeagueId$ = this.fastcastEventFacade.eventsByLeagueId$;

  isIdToggled$ = this.fastcastEventToggleFacade.isIdToggled$;

  isMobile$ = this.layoutService.isMobile$;

  constructor(
    readonly fastcastEventToggleFacade: EspnFastcastEventToggleFacade,
    readonly fastcastFacade: EspnFastcastConnectionFacade,
    readonly fastcastEventFacade: EspnFastcastEventFacade,
    readonly fastcastLeagueFacade: EspnFastcastLeagueFacade,
    readonly store: Store,
    private layoutService: LayoutService
  ) {}

  onLeagueSelectChange(val: string) {
    this.fastcastFacade.setSelectedLeague(val);
  }

  onToggleExpandedEvent(val: string) {
    this.fastcastEventToggleFacade.selectExpandedEvent(val);
  }

  onToggleOffExpandedEvent(val: string) {
    this.fastcastEventToggleFacade.deselectExpandedEvent(val);
  }

  onStartFeed() {
    this.fastcastFacade.setPauseState();
  }
}
