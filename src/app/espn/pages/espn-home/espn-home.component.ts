import { Component, OnInit } from '@angular/core';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { UrlFragments } from '@app/@core/store/router/url-builder';
import { LayoutService } from '@app/@shared/services/layout.service';
import { SportsUiLeaguesFacade } from '@app/sports-ui/facades/sports-ui-leagues.facade';

@Component({
  selector: 'app-espn-home',
  templateUrl: './espn-home.component.html',
  styleUrls: ['./espn-home.component.scss'],
})
export class EspnHomeComponent implements OnInit {
  isMobile$ = this.layoutService.isMobile$;
  allLeagues$ = this.sportsUiLeaguesFacade.allLeagues$;

  constructor(
    private layoutService: LayoutService,
    private routerFacade: RouterFacade,
    private sportsUiLeaguesFacade: SportsUiLeaguesFacade
  ) {}

  ngOnInit() {
    this.sportsUiLeaguesFacade.fetchLeagues();
  }

  onNavigateLeague(val: { sport: UrlFragments; leagueId: string }) {
    this.routerFacade.navigateToLeagueHome(val.sport, val.leagueId);
  }

  // TODO: Refactor me
  onAddLeague(event: Record<string, { sport: string }>): void {
    const key = Object.keys(event)[0];
  }

  onRemoveLeague(leagueId: string): void {
    this.sportsUiLeaguesFacade.deleteLeague(leagueId);
  }
}
