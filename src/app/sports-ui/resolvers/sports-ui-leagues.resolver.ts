import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SportsUiLeaguesFacade } from '../facades/sports-ui-leagues.facade';
import { SportsUiUserFacade } from '../facades/sports-ui-user.facade';

@Injectable({
  providedIn: 'root',
})
export class SportsUiLeaguesResolver implements Resolve<void> {
  constructor(private sportsUiLeaguesFacade: SportsUiLeaguesFacade, private sportsUiUsersFacade: SportsUiUserFacade) {}
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     this.sportsUiLeaguesFacade.fetchLeagues()
    this.sportsUiUsersFacade.fetchUser();
  }
}
