import { Component, OnInit } from '@angular/core';
import { EspnFastcastConnectionFacade } from '@app/espn-fastcast/facade/espn-fastcast-connection.facade';
import { EspnFastcastEventToggleFacade } from '@app/espn-fastcast/facade/espn-fastcast-event-toggle.facade';
import { EspnFastcastEventFacade } from '@app/espn-fastcast/facade/espn-fastcast-event.facade';
import { EspnFastcastLeagueFacade } from '@app/espn-fastcast/facade/espn-fastcast-league.facade';
import { Store } from '@ngxs/store';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-espn-scoreboard',
  templateUrl: './espn-scoreboard.component.html',
})
export class EspnScoreboardComponent implements OnInit {
  showNoEventsMessage$ = this.fastcastFacade.showNoEventsMessage$;
  showFeed$ = of(true);

  leagueList$ = this.fastcastLeagueFacade.leagueList$;
  dateFilterList$ = this.fastcastLeagueFacade.dateFilterList$;

  eventsByLeagueId$ = combineLatest([this.fastcastEventFacade.eventsByLeagueId$, this.fastcastFacade.selectedLeagueId$]).pipe(
    map(([events, selectedLeague]) => events(selectedLeague))
  );

  isIdToggled$ = this.fastcastEventToggleFacade.isIdToggled$;

  constructor(
    readonly fastcastEventToggleFacade: EspnFastcastEventToggleFacade,
    readonly fastcastFacade: EspnFastcastConnectionFacade,
    readonly fastcastConnectionFacade: EspnFastcastConnectionFacade,
    readonly fastcastEventFacade: EspnFastcastEventFacade,
    readonly fastcastLeagueFacade: EspnFastcastLeagueFacade,
    readonly store: Store
  ) {}
  ngOnInit(): void {
    this.fastcastConnectionFacade.fetchStaticFastcast({
      sport: null,
      league: null,
      weeks: null,
      seasontype: null,
    });
  }

  onLeagueSelectChange(val: string) {
    this.fastcastFacade.setSelectedLeague(val);
  }

  onDateSelectChange(val: string) {
    this.fastcastFacade.setSelectedDate(val);
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
