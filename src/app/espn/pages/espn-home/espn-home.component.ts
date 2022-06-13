import { Component, OnInit } from '@angular/core';
import { LocalStorageFacade } from '@app/@core/store/local-storage/local-storage.facade';
import { LocalStorageKeys } from '@app/@core/store/local-storage/local-storage.state';
import { EspnFastcastEventFacade } from '@app/espn-fastcast/facade/espn-fastcast-event.facade';
import { EspnFastcastLeagueFacade } from '@app/espn-fastcast/facade/espn-fastcast-league.facade';
import { EspnFastcastFacade } from '@app/espn-fastcast/facade/espn-fastcast.facade';
import { FantasyBaseballLeagueFacade } from '@app/espn/mlb/facade/fantasy-baseball-league.facade';
import { FantasyBaseballLeagueSelectors } from '@app/espn/mlb/selectors/fantasy-baseball-league.selectors';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-espn-home',
  templateUrl: './espn-home.component.html',
  styleUrls: ['./espn-home.component.scss'],
})
export class EspnHomeComponent implements OnInit {
  constructor(
    readonly fastcastFacade: EspnFastcastFacade,
    readonly fastcastLeagueFacade: EspnFastcastLeagueFacade,
    readonly fastcastEventFacade: EspnFastcastEventFacade,
    readonly fantasyLeagueFacade: FantasyBaseballLeagueFacade,
    private localStorageFacade: LocalStorageFacade,
    private store: Store
  ) {}

  ngOnInit(): void {}

  // TODO: Refactor me
  onAddLeague(event: Record<string, { sport: string }>): void {
    const key = Object.keys(event)[0];

    const notEmpty = this.localStorageFacade.getLocalStorageValue(LocalStorageKeys.UserLeagues);

    if (!notEmpty) {
      const map = { ...event };
      this.localStorageFacade.setLocalStorageValue(LocalStorageKeys.UserLeagues, JSON.stringify(map));
    } else {
      const exists = this.store.selectSnapshot(FantasyBaseballLeagueSelectors.getLeagueExists)(key);

      if (!exists) {
        const original = this.localStorageFacade.getLocalStorageValue(LocalStorageKeys.UserLeagues);

        if (!original) {
          const map = {
            ...event,
          };
          this.localStorageFacade.setLocalStorageValue(LocalStorageKeys.UserLeagues, JSON.stringify(map));
        } else {
          const map = {
            ...JSON.parse(original),
            ...event,
          };
          this.localStorageFacade.setLocalStorageValue(LocalStorageKeys.UserLeagues, JSON.stringify(map));
        }
      }
    }
  }

  // TODO: Refactor me
  onRemoveLeague(leagueId): void {
    const league = this.localStorageFacade.getLocalStorageValue(LocalStorageKeys.UserLeagues);

    const original = league !== null ? JSON.parse(league) : null;

    delete original[leagueId];

    const map = { ...original };

    this.localStorageFacade.setLocalStorageValue(LocalStorageKeys.UserLeagues, JSON.stringify(map));
  }
}
