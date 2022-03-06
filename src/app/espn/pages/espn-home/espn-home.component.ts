import { Component, OnInit } from '@angular/core';
import { LocalStorageFacade } from '@app/@core/store/local-storage/local-storage.facade';
import { LocalStorageKeys } from '@app/@core/store/local-storage/local-storage.state';
import { EspnFastcastEventFacade } from '@app/espn/facade/espn-fastcast-event.facade';
import { EspnFastcastLeagueFacade } from '@app/espn/facade/espn-fastcast-league.facade';
import { EspnFastcastFacade } from '@app/espn/facade/espn-fastcast.facade';
import { FantasyBaseballLeagueFacade } from '@app/espn/mlb/facade/fantasy-baseball-league.facade';
import { FantasyBaseballLeagueSelectors } from '@app/espn/mlb/selectors/fantasy-baseball-league.selectors';
import { HomeAwayTeam } from '@app/espn/models/espn-home-away.model';
import { EspnService, FastCastGameStatus } from '@app/espn/service/espn.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-espn-home',
  templateUrl: './espn-home.component.html',
  styleUrls: ['./espn-home.component.scss'],
})
export class EspnHomeComponent implements OnInit {
  readonly HomeAwayTeam = HomeAwayTeam;
  readonly FastCastGameStatus = FastCastGameStatus;

  constructor(
    readonly fastcastFacade: EspnFastcastFacade,
    readonly fastcastLeagueFacade: EspnFastcastLeagueFacade,
    readonly fastcastEventFacade: EspnFastcastEventFacade,
    readonly fantasyLeagueFacade: FantasyBaseballLeagueFacade,
    private localStorageFacade: LocalStorageFacade,
    private store: Store,
    private espnService: EspnService
  ) {}

  ngOnInit(): void {}

  onAddLeague(event: Record<string, { sport: string }>) {
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

  onRemoveLeague(leagueId) {
    console.log(leagueId);
    const original: Record<string, { sport: string }> = JSON.parse(
      this.localStorageFacade.getLocalStorageValue(LocalStorageKeys.UserLeagues)
    );

    console.log(original[leagueId]);

    delete original[leagueId];
    console.log(original);

    const map = { ...original };

    console.log(map);
    this.localStorageFacade.setLocalStorageValue(LocalStorageKeys.UserLeagues, JSON.stringify(map));
  }
}
