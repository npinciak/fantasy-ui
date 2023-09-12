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

  @Action(SportsUiLeagueForm.VerifyLeague)
  async verifyLeague(): Promise<void> {
    const sport = this.sportsUiLeagueFormFacade.sport;
    const leagueId = this.sportsUiLeagueFormFacade.leagueId;
    const season = new Date().getFullYear().toString();

    if (!sport || !leagueId) throw new Error('League sport and league id are required');

    try {
      const { settings } = await this.espnService.verifyLeague(sport, leagueId, season).toPromise();

      this.sportsUiLeagueFormFacade.setName(settings.name);
    } catch (error) {
      if (error.status === 404) throw new Error('League not found');
    }
  }

  @Action(SportsUiLeagueForm.Submit)
  async submit(): Promise<void> {
    const sport = this.sportsUiLeagueFormFacade.sport;
    const leagueId = this.sportsUiLeagueFormFacade.leagueId;
    const name = this.sportsUiLeagueFormFacade.name;
    const season = new Date().getFullYear().toString();

    if (!sport || !leagueId) throw new Error('League sport and league id are required');

    try {
      const requestBody = {
        leagueId,
        name,
        sport,
        season,
      };
      await this.leagueClientService.create(requestBody);
      await this.leagueClientService.getAll();
    } catch (error) {
      if (error.status === 404) throw new Error('League not found');
      this.sportsUiLeagueFormFacade.reset();
    }
  }
}
