import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { SportsUiLeagues } from '../actions/sports-ui-leagues.actions';
import { SportsUiLeaguesFacade } from '../facades/sports-ui-leagues.facade';
import { LeaguesClientService } from '../service/leagues-client.service';

@State({ name: SportsUiLeagues.stateName + 'ActionHandler' })
@Injectable()
export class SportsUiLeaguesActionHandler {
  constructor(private sportsUiLeaguesFacade: SportsUiLeaguesFacade) {}

  @Action(SportsUiLeagues.Fetch)
  async fetchUserLeagues(): Promise<void> {
    const leagues = await LeaguesClientService.getAll();
    this.sportsUiLeaguesFacade.addOrUpdate(leagues);
  }
}
