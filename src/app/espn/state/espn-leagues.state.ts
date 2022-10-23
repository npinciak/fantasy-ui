import { Injectable } from '@angular/core';
import { GenericState, GenericStateClass } from '@app/@shared/generic-state/generic.state';
import { SchemeHeaderExpertService } from '@app/scheme-header-expert.service';
import { Action, State, StateContext } from '@ngxs/store';
import { ClearAndAddEspnLeagues, DeleteEspnLeague, FetchEspnLeagues, SetEspnLeagues } from '../actions/espn-leagues.actions';
import { SportsUiClientLeague } from '../models/league.model';

@State({ name: 'espnLeagues' })
@Injectable()
export class EspnLeaguesState extends GenericState({
  idProperty: 'leagueId',
  addOrUpdate: SetEspnLeagues,
  clearAndAdd: ClearAndAddEspnLeagues,
}) {
  constructor(private apiService: SchemeHeaderExpertService) {
    super();
  }

  @Action(FetchEspnLeagues)
  async fetchEspnLeagues({ dispatch }: StateContext<GenericStateClass<SportsUiClientLeague>>): Promise<void> {
    const leagues = await this.apiService.getLeagues().toPromise();
    dispatch([new ClearAndAddEspnLeagues(leagues)]);
  }

  @Action(DeleteEspnLeague)
  async deleteEspnLeague(
    { dispatch }: StateContext<GenericStateClass<SportsUiClientLeague>>,
    { payload: { leagueId } }: DeleteEspnLeague
  ): Promise<void> {
    try {
      await this.apiService.deleteLeague({ leagueId }).toPromise();
    } catch (error) {}
    dispatch([new FetchEspnLeagues()]);
  }
}
