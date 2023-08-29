import { Injectable } from '@angular/core';
import { EspnService } from '@app/espn/service/espn.service';
import { Action, State } from '@ngxs/store';
import { SportsUiLeagueForm } from '../actions/sports-ui-league-form.actions';
import { SportsUiLeagueFormFacade } from '../facades/sports-ui-league-form.facade';
import { LeaguesClientService } from '../service/leagues-client.service';

@State({ name: SportsUiLeagueForm.name + 'ActionHandler' })
@Injectable()
export class SportsUiLeagueFormActionHandler {
  constructor(
    private espnService: EspnService,
    private leagueClientService: LeaguesClientService,
    private sportsUiLeagueFormFacade: SportsUiLeagueFormFacade
  ) {}

  @Action(SportsUiLeagueForm.Submit)
  async submit(): Promise<void> {
    const sport = this.sportsUiLeagueFormFacade.sport;
    const leagueId = this.sportsUiLeagueFormFacade.leagueId;
    const season = new Date().getFullYear().toString();

    if (!sport || !leagueId) throw new Error('League sport and league id are required');

    try {
      const {
        settings: { name },
      } = await this.espnService.verifyLeague(sport, leagueId, season).toPromise();

      this.sportsUiLeagueFormFacade.setName(name);
    } catch (error) {
      if (error.status === 404) {
        throw new Error('League not found');
      }
    }

    const requestBody = {
      leagueId,
      name,
      sport,
      season,
    };

    // const league = await this.leagueClientService.create(requestBody);

    this.sportsUiLeagueFormFacade.reset();
  }
}
