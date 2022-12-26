import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlBuilder, UrlFragments, UrlQueryParams } from '@app/@core/store/router/url-builder';
import { EspnFastcastConnectionFacade } from '@app/espn-fastcast/facade/espn-fastcast-connection.facade';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterFacade } from '../store/router/router.facade';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @Input() pageTitle = 'SportsUi';

  readonly URL_FRAGMENT = UrlFragments;
  readonly URL_QUERY_PARAMS = UrlQueryParams;
  readonly UrlBuilder = UrlBuilder;

  leagueId = this.routerFacade.leagueId;
  teamId = this.routerFacade.teamId;
  sport = this.routerFacade.sport;

  sport$ = this.routerFacade.sport$;
  leagueId$ = this.routerFacade.leagueId$;
  teamId$ = this.routerFacade.teamId$;
  isEspn$ = this.routerFacade.isEspn$;

  routerParams$ = combineLatest([this.routerFacade.sport$, this.routerFacade.leagueId$, this.routerFacade.teamId$]).pipe(
    map(([sport, leagueId, teamId]) => ({
      sport,
      leagueId,
      teamId,
    }))
  );

  constructor(
    private fastcastFacade: EspnFastcastConnectionFacade,
    readonly routerFacade: RouterFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fastcastFacade.fetchStaticFastcast({
      sport: null,
      league: null,
      weeks: null,
      seasontype: null,
    });
    // this.fastcastFacade.connectWebSocket();
  }

  onNavigateToMyProfile() {
    this.routerFacade.navigateToMyProfile();
  }

  onNavigateToEspnHome() {
    this.routerFacade.navigateToEspnHome();
  }

  onNavigateToEspnLeagueHome() {
    this.routerFacade.navigateToLeagueHome(this.routerFacade.sport, this.routerFacade.leagueId);
  }

  onNavigateToEspnFreeAgents() {
    this.routerFacade.navigateToFreeAgents(this.routerFacade.sport, this.routerFacade.leagueId);
  }

  navigateDfs(sport: UrlFragments) {
    this.routerFacade.navigateDfs(sport, 'draftkings');
  }
}
