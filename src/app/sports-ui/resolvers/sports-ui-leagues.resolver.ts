import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SportsUiLeaguesFacade } from '../facades/sports-ui-leagues.facade';
import { SportsUiTeamsFacade } from '../facades/sports-ui-teams.facade';
import { SportsUiUserFacade } from '../facades/sports-ui-user.facade';

@Injectable({
  providedIn: 'root',
})
export class SportsUiLeaguesResolver implements Resolve<void> {
  constructor(
    private sportsUiTeamsFacade: SportsUiTeamsFacade,
    private sportsUiLeaguesFacade: SportsUiLeaguesFacade,
    private sportsUiUsersFacade: SportsUiUserFacade
  ) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.sportsUiLeaguesFacade.fetchLeagues().toPromise();
    this.sportsUiUsersFacade.fetchUser().toPromise();
    this.sportsUiTeamsFacade.fetchTeams().toPromise();
  }
}
