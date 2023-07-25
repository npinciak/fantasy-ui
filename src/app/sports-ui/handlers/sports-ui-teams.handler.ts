import { Injectable } from '@angular/core';
import { GenericStateClass } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { Database } from '@sports-ui/ui-sdk';
import { SportsUiTeams } from '../actions/sports-ui-teams.actions';
import { TeamsClientService } from '../service/teams-client.service';

@State({ name: SportsUiTeams.stateName + 'ActionHandler' })
@Injectable()
export class SportsUiTeamsActionHandler {
  constructor(private teamClientService: TeamsClientService, private store: Store) {}

  @Action(SportsUiTeams.Fetch)
  async fetchUserTeams(_: StateContext<GenericStateClass<Database['public']['Tables']['Teams']['Row']>>): Promise<void> {
    const teams = await this.teamClientService.getAll();
    this.store.dispatch([new SportsUiTeams.AddOrUpdate(teams)]);
  }
}
