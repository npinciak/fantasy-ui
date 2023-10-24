import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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
    await firstValueFrom(this.sportsUiLeaguesFacade.fetchLeagues());
    await firstValueFrom(this.sportsUiUsersFacade.fetchUser());
    await firstValueFrom(this.sportsUiTeamsFacade.fetchTeams());
  }
}
