import { Injectable } from '@angular/core';
import { GenericState, GenericStateClass } from '@app/@shared/generic-state/generic.state';
import { ApiService } from '@app/@shared/services/api.service';
import { Action, State, StateContext } from '@ngxs/store';
import { DeleteEspnLeague, FetchEspnLeagues, SetEspnLeagues } from '../actions/espn-leagues.actions';
import { SportsUiClientLeague } from '../models/league.model';

@State({ name: 'espnLeagues' })
@Injectable()
export class EspnLeaguesState extends GenericState({ idProperty: 'leagueId', addOrUpdate: SetEspnLeagues }) {
  constructor(private apiService: ApiService) {
    super();
  }

  @Action(FetchEspnLeagues)
  async fetchEspnLeagues({ dispatch }: StateContext<GenericStateClass<SportsUiClientLeague>>): Promise<void> {
    const leagues = await this.apiService.get<SportsUiClientLeague[]>('http://localhost:8080/leagues').toPromise();
    dispatch([new SetEspnLeagues(leagues)]);
  }

  @Action(DeleteEspnLeague)
  async deleteEspnLeague(
    { dispatch }: StateContext<GenericStateClass<SportsUiClientLeague>>,
    { payload: { id } }: DeleteEspnLeague
  ): Promise<void> {
    await this.apiService.delete<SportsUiClientLeague[]>('http://localhost:8080/leagues/' + id).toPromise();
    dispatch([new FetchEspnLeagues()]);
  }
}
