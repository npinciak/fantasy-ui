import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { SportsUiTeams } from '../actions/sports-ui-teams.actions';
import { SportsUiTeamsFacade } from '../facades/sports-ui-teams.facade';
import { TeamsClientService } from '../service/teams-client.service';

@State({ name: SportsUiTeams.stateName + 'ActionHandler' })
@Injectable()
export class SportsUiTeamsActionHandler {
  constructor(private teamClientService: TeamsClientService, private sportsUiTeamsFacade: SportsUiTeamsFacade) {}

  @Action(SportsUiTeams.Fetch)
  async fetchUserTeams(): Promise<void> {
    const teams = await this.teamClientService.getAll();
    this.sportsUiTeamsFacade.addOrUpdate(teams);
  }
}
