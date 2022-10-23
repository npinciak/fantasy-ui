import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageFacade } from '@app/@core/store/local-storage/local-storage.facade';
import { LocalStorageKeys } from '@app/@core/store/local-storage/local-storage.state';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { UrlFragments } from '@app/@core/store/router/url-builder';
import { EspnFastcastEventFacade } from '@app/espn-fastcast/facade/espn-fastcast-event.facade';
import { EspnFastcastLeagueFacade } from '@app/espn-fastcast/facade/espn-fastcast-league.facade';
import { EspnFastcastFacade } from '@app/espn-fastcast/facade/espn-fastcast.facade';
import { EspnAddLeagueFormFacade } from '@app/espn/facades/espn-add-league-form.facade';
import { EspnLeaguesFacade } from '@app/espn/facades/espn-leagues.facade';
import { FantasyBaseballLeagueFacade } from '@app/espn/mlb/facade/fantasy-baseball-league.facade';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-espn-home',
  templateUrl: './espn-home.component.html',
  styleUrls: ['./espn-home.component.scss'],
})
export class EspnHomeComponent implements OnInit {
  constructor(
    readonly routerFacade: RouterFacade,
    readonly espnLeaguesFacade: EspnLeaguesFacade,
    readonly fastcastFacade: EspnFastcastFacade,
    readonly fastcastLeagueFacade: EspnFastcastLeagueFacade,
    readonly fastcastEventFacade: EspnFastcastEventFacade,
    readonly fantasyLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyForm: EspnAddLeagueFormFacade,
    private localStorageFacade: LocalStorageFacade,
    private store: Store,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.espnLeaguesFacade.fetchLeagues();
  }

  onNavigateLeague(val: { sport: UrlFragments; leagueId: string }) {
    this.routerFacade.navigateToLeagueHome(val.sport, val.leagueId);
  }

  // TODO: Refactor me
  onAddLeague(event: Record<string, { sport: string }>): void {
    const key = Object.keys(event)[0];

    const notEmpty = this.localStorageFacade.getLocalStorageValue(LocalStorageKeys.UserLeagues);
  }

  onRemoveLeague(leagueId: string): void {
    this.espnLeaguesFacade.deleteLeague(leagueId);
  }
}
